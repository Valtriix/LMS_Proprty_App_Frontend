// filepath: src/components/UserList.tsx
import { useEffect, useState } from 'react';
import { apis } from './ApiServices';
// Import the generated Lead type if available for better type safety
 
const User = () => {
  // Use 'Lead' type instead of 'any' if possible
  const [lead, setLead] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
 
  useEffect(() => {
    // Define the async function correctly
    const fetchLead = async () => {
      try {
        setLoading(true);
        // Ensure apis.getLeadById matches your generated API class method
        //const response = await apis.getLeadById("d259c843-21c9-42eb-9cd8-59f9d83d9b1c");
         // const response=await apis.deleteLead("9fa5b964-590e-48fe-8720-c3a484b9d430");
          const response=await apis.getLeads();
        // Axios stores the actual JSON body in response.data
        setLead(response.data); 
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch lead:", error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchLead();
  }, []); // Runs once on mount
 
  if (loading) return <p>Loading lead details...</p>;
  if (!lead) return <p>No lead data found.</p>;
 
  return (
<div>
<h3>Lead Details</h3>
<ul>
<li key={lead.id}>
<strong>Name:</strong> {lead.name} <br />
<strong>Email:</strong> {lead.email}
</li>
</ul>
</div>
  );
};
 
export default User;