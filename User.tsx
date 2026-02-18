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
        const response = await apis.getLeadById("9103d479-c77d-4e3b-b581-201d92b3f24f");
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