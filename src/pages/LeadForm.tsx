import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Errors {
  [key: string]: string;
}

const LeadForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    leadName: "",
    email: "",
    contactNo: "",
    whatsappNo: "",
    pincode: "",
    source: "",
    status: "",
    leadQuality: "",
    configuration: "",
    campaignName: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  // Validate single field
  const validateField = (name: string, value: string) => {
    switch (name) {
      case "leadName":
        return value.trim() ? "" : "Lead name is required";

      case "email":
        return /^\S+@\S+\.\S+$/.test(value)
          ? ""
          : "Valid email is required";

      case "contactNo":
        return /^[6-9]\d{9}$/.test(value)
          ? ""
          : "Valid 10-digit contact number required";

      case "whatsappNo":
        return /^[6-9]\d{9}$/.test(value)
          ? ""
          : "Valid WhatsApp number required";

      case "pincode":
        return /^[1-9][0-9]{5}$/.test(value)
          ? ""
          : "Valid 6-digit pincode required";

      case "source":
        return value.trim() ? "" : "Source is required";

      case "status":
        return value.trim() ? "" : "Status is required";

      case "leadQuality":
        return value.trim() ? "" : "Lead quality is required";

      case "configuration":
        return value.trim() ? "" : "Configuration is required";

      case "campaignName":
        return value.trim() ? "" : "Campaign name is required";

      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(
        key,
        formData[key as keyof typeof formData]
      );
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Lead saved:", formData);
   navigate(`/projects?pincode=${formData.pincode}`);

  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-4xl bg-white/90 backdrop-blur-md
                      rounded-2xl shadow-2xl p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Create Lead
          </h2>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-blue-700 hover:underline"
          >
            ← Back
          </button>
        </div>

        {/* 5 Rows × 2 Columns */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">

          {[
            { name: "leadName", placeholder: "Lead Name *" },
            { name: "email", placeholder: "Email *" },
            { name: "contactNo", placeholder: "Contact No *" },
            { name: "whatsappNo", placeholder: "WhatsApp No *" },
            { name: "pincode", placeholder: "Pincode *" },
            { name: "source", placeholder: "Source *" },
            { name: "status", placeholder: "Status *" },
            { name: "leadQuality", placeholder: "Lead Quality *" },
            { name: "configuration", placeholder: "Configuration *" },
            { name: "campaignName", placeholder: "Campaign Name *" },
          ].map((field) => (
            <div key={field.name}>
              <input
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                placeholder={field.placeholder}
                onChange={handleChange}
                maxLength={
                  field.name === "pincode"
                    ? 6
                    : field.name === "contactNo" ||
                      field.name === "whatsappNo"
                    ? 10
                    : undefined
                }
                className="w-full h-10 px-3 text-sm rounded-md border
                           border-gray-300 focus:outline-none
                           focus:ring-2 focus:ring-blue-500"
              />
              {errors[field.name] && (
                <p className="text-xs text-red-600 mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          <div className="col-span-2 text-right mt-4">
            <button
              type="submit"
              className="bg-slate-800 text-white px-6 py-2 rounded-md
                         text-sm font-medium hover:bg-slate-900 transition"
            >
              Save Lead
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default LeadForm;
