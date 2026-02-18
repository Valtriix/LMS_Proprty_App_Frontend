import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DeveloperForm.css";
 
interface DeveloperFormData {
  name: string;
  email: string;
  contact: string;
  city: string;
  country: string;
  company: string;
  roleType: string;
  salesTeamSize: string;
}
 
interface FormErrors {
  [key: string]: string;
}
 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
// 🔹 Initial state (used for reset)
const initialFormData: DeveloperFormData = {
  name: "",
  email: "",
  contact: "",
  city: "",
  country: "India",
  company: "",
  roleType: "Developer",
  salesTeamSize: "",
};
 
const DeveloperForm = () => {
  const navigate = useNavigate();
 
  const [formData, setFormData] =
    useState<DeveloperFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
 
  const validateField = (
    name: keyof DeveloperFormData,
    value: string
  ) => {
    switch (name) {
      case "name":
        return value ? "" : "Name is required";
      case "email":
        if (!value) return "Email is required";
        if (!emailRegex.test(value)) return "Invalid email format";
        return "";
      case "contact":
        return /^\d{10}$/.test(value)
          ? ""
          : "Contact must be 10 digits";
      case "city":
        return value ? "" : "City is required";
      case "company":
        return value ? "" : "Company is required";
      case "salesTeamSize":
        return value ? "" : "Sales team size is required";
      default:
        return "";
    }
  };
 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
 
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name as keyof DeveloperFormData, value),
    }));
  };
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
 
    const newErrors: FormErrors = {};
 
    (Object.keys(formData) as (keyof DeveloperFormData)[]).forEach(
      key => {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    );
 
    setErrors(newErrors);
 
    //  If no errors → save & reset
    if (Object.keys(newErrors).length === 0) {
      console.log("Developer Payload →", formData);
      // alert("Developer saved successfully");
 
      //  RESET FORM
      setFormData(initialFormData);
      setErrors({});
      navigate("/leads");
    }
  };
 
  const handleCancel = () => {
    navigate("/"); //  Go back to Home
  };
 
  return (
    <div className="dev-form-page">
      <div className="dev-form-card">
        <h1>Create Developer</h1>
 
        <form onSubmit={handleSubmit}>
          {/* BASIC INFORMATION */}
          <div className="form-section">
            <h3>Basic Information</h3>
 
            <div className="form-grid">
              <div>
                <label>Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
 
              <div>
                <label>Email *</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
 
              <div>
                <label>Contact *</label>
                <input
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter 10-digit contact number"
                />
                {errors.contact && (
                  <span className="error">{errors.contact}</span>
                )}
              </div>
 
              <div>
                <label>Country *</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="India">India</option>
                </select>
              </div>
 
              <div>
                <label>City *</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select city
                  </option>
                  <option>Pune</option>
                  <option>Mumbai</option>
                  <option>Bangalore</option>
                </select>
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
            </div>
          </div>
 
          {/* ROLE INFORMATION */}
          <div className="form-section">
            <h3>Role & Company</h3>
 
            <div className="form-grid">
              <div>
                <label>Role Type *</label>
                <select
                  name="roleType"
                  value={formData.roleType}
                  onChange={handleChange}
                >
                  <option value="Developer">Developer</option>
                  <option value="Channel Partner">Channel Partner</option>
                </select>
              </div>
 
              <div>
                <label>Company *</label>
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter company name"
                />
                {errors.company && (
                  <span className="error">{errors.company}</span>
                )}
              </div>
 
              <div>
                <label>Sales Team Size *</label>
                <select
                  name="salesTeamSize"
                  value={formData.salesTeamSize}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select team size
                  </option>
                  <option>1-5</option>
                  <option>6-10</option>
                  <option>10+</option>
                </select>
                {errors.salesTeamSize && (
                  <span className="error">{errors.salesTeamSize}</span>
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
              Save Developer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
 
export default DeveloperForm;
 