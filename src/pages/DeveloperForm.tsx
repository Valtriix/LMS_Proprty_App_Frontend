import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    if (Object.keys(newErrors).length === 0) {
      console.log("Developer Payload →", formData);
      navigate("/dashboard");
      setFormData(initialFormData);
      setErrors({});
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Create Developer
          </h2>

          <button
            onClick={() => navigate("/")}
            className="text-sm text-blue-700 hover:underline"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          <div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name *"
              className="w-full h-9 px-3 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email *"
              className="w-full h-9 px-3 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact Number *"
              className="w-full h-9 px-3 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.contact && (
              <p className="text-xs text-red-600 mt-1">{errors.contact}</p>
            )}
          </div>

          <div>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full h-9 px-3 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select City *</option>
              <option>Pune</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
            </select>
            {errors.city && (
              <p className="text-xs text-red-600 mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name *"
              className="w-full h-9 px-3 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.company && (
              <p className="text-xs text-red-600 mt-1">{errors.company}</p>
            )}
          </div>

          <div>
            <select
              name="roleType"
              value={formData.roleType}
              onChange={handleChange}
              className="w-full h-9 px-3 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Developer">Developer</option>
              <option value="Channel Partner">Channel Partner</option>
            </select>
          </div>

          <div className="col-span-2">
            <select
              name="salesTeamSize"
              value={formData.salesTeamSize}
              onChange={handleChange}
              className="w-full h-9 px-3 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Sales Team Size *</option>
              <option>1-5</option>
              <option>6-10</option>
              <option>10+</option>
            </select>
            {errors.salesTeamSize && (
              <p className="text-xs text-red-600 mt-1">
                {errors.salesTeamSize}
              </p>
            )}
          </div>

          <div className="col-span-2 text-right mt-3">
            <button
              type="submit"
              className="bg-slate-800 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-slate-900 transition"
            >
              Save Developer
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default DeveloperForm;
