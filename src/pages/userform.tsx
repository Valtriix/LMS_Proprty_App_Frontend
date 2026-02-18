import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserForm.css";
 
interface UserFormData {
  userName: string;
  email: string;
  contact: string;
  pincode: string;
  department: string;
  position: string;
  userStatus: string;
}
 
interface FormErrors {
  [key: string]: string;
}
 
// Email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
//  Initial state
const initialFormData: UserFormData = {
  userName: "",
  email: "",
  contact: "",
  pincode: "",
  department: "",
  position: "",
  userStatus: "Active",
};
 
const UserForm = () => {
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState<UserFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
 
  // Validation function
  const validateField = (name: keyof UserFormData, value: string) => {
    switch (name) {
      case "userName":
        if (!value) return "User Name is required";
        if (value.length < 3) return "User Name must be at least 3 characters";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!emailRegex.test(value)) return "Invalid email format";
        return "";
      case "contact":
         if (!value) return "Contact is required";
        if (value && !/^\d{10}$/.test(value)) return "Contact must be 10 digits";
        return "";
      case "pincode":
         if (!value) return "Pincode is required";
        if (value && !/^\d{6}$/.test(value)) return "Pincode must be 6 digits";
        return "";
      case "department":
        if (!value) return "Department is required";
        return "";
      case "position":
        if (!value) return "Position is required";
        return "";
      default:
        return "";
    }
  };
 
  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name as keyof UserFormData, value);
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };
 
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
 
    const errors: FormErrors = {};
 
    // Validate all fields
    (Object.keys(formData) as (keyof UserFormData)[]).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });
 
    setFormErrors(errors);
 
    if (Object.keys(errors).length === 0) {
      console.log("User Payload →", formData);
      // alert("Form submitted successfully!");
 
      //  Reset form after successful submission
      setFormData(initialFormData);
      setFormErrors({});
      navigate("/projects");
    } else {
      console.log("Validation errors →", errors);
    }
  };
 
  // Handle Cancel button → go back to home page
  const handleCancel = () => {
    navigate("/"); // 🔹 Redirect to Home
  };
 
  return (
    <div className="user-form-page">
      <div className="user-form-card">
        <h1>Create User</h1>
 
        <form onSubmit={handleSubmit}>
          {/* BASIC INFO */}
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-grid">
              <div>
                <label>User Name *</label>
                <input
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
                {formErrors.userName && (
                  <span className="error">{formErrors.userName}</span>
                )}
              </div>
 
              <div>
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                />
                {formErrors.email && (
                  <span className="error">{formErrors.email}</span>
                )}
              </div>
 
              <div>
                <label>Contact</label>
                <input
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                />
                {formErrors.contact && (
                  <span className="error">{formErrors.contact}</span>
                )}
              </div>
 
              <div>
                <label>Pincode</label>
                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter area pincode"
                />
                {formErrors.pincode && (
                  <span className="error">{formErrors.pincode}</span>
                )}
              </div>
 
              <div>
                <label>Status</label>
                <select
                  name="userStatus"
                  value={formData.userStatus}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
 
          {/* ROLE INFO */}
          <div className="form-section">
            <h3>Role & Department</h3>
            <div className="form-grid">
              <div>
                <label>Department *</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="CRM">CRM</option>
                </select>
                {formErrors.department && (
                  <span className="error">{formErrors.department}</span>
                )}
              </div>
 
              <div>
                <label>Position *</label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Position
                  </option>
                  <option value="Manager">Manager</option>
                  <option value="Executive">Executive</option>
                  <option value="Telecaller">Telecaller</option>
                </select>
                {formErrors.position && (
                  <span className="error">{formErrors.position}</span>
                )}
              </div>
            </div>
          </div>
 
          {/* ACTIONS */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={handleCancel}
            >
              Back
            </button>
            <button type="submit" className="btn-primary">
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
 
export default UserForm;
 