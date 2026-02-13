import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LeadForm.css";

interface LeadFormData {
  name: string;
  source: string;
  email: string;
  contact: string;
  pincode: string;
}

interface FormErrors {
  [key: string]: string;
}

// Email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Initial state
const initialFormData: LeadFormData = {
  name: "",
  source: "",
  email: "",
  contact: "",
  pincode: "",
};

const LeadForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Validation
  const validateField = (name: keyof LeadFormData, value: string) => {
    switch (name) {
      case "name":
        if (!value) return "Name is required";
        if (value.length < 3) return "Name must be at least 3 characters";
        return "";

      case "source":
        if (!value) return "Source is required";
        return "";

      case "email":
        if (!value) return "Email is required";
        if (!emailRegex.test(value)) return "Invalid email format";
        return "";

      case "contact":
        if (!value) return "Contact is required";
        if (!/^\d{10}$/.test(value)) return "Contact must be 10 digits";
        return "";

      case "pincode":
        if (!value) return "Pincode is required";
        if (!/^\d{6}$/.test(value)) return "Pincode must be 6 digits";
        return "";

      default:
        return "";
    }
  };

  // Handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    const error = validateField(name as keyof LeadFormData, value);
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: FormErrors = {};
    (Object.keys(formData) as (keyof LeadFormData)[]).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Lead Payload →", formData);

      setFormData(initialFormData);
      setFormErrors({});
      navigate("/leads");
    }
  };

  return (
    <div className="lead-form-page">
      <div className="lead-form-card">
        <h1>Create Lead</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label>Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter lead name"
              />
              {formErrors.name && (
                <span className="error">{formErrors.name}</span>
              )}
            </div>

            <div>
              <label>Source *</label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Source
                </option>
                <option value="Website">Website</option>
                <option value="Facebook">Facebook</option>
                <option value="Google Ads">Google Ads</option>
                <option value="Referral">Referral</option>
              </select>
              {formErrors.source && (
                <span className="error">{formErrors.source}</span>
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
              <label>Contact *</label>
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
              <label>Pincode *</label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
              />
              {formErrors.pincode && (
                <span className="error">{formErrors.pincode}</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <button type="submit" className="btn-primary">
              Save Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
