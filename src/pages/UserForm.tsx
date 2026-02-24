import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const UserForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserFormData>({
    userName: "",
    email: "",
    contact: "",
    pincode: "",
    department: "",
    position: "",
    userStatus: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "userName":
        return value.trim() ? "" : "User name is required";

      case "email":
        return /^\S+@\S+\.\S+$/.test(value)
          ? ""
          : "Valid email is required";

      case "contact":
        return /^[6-9]\d{9}$/.test(value)
          ? ""
          : "Valid 10-digit contact required";

      case "pincode":
        return /^\d{6}$/.test(value)
          ? ""
          : "Valid 6-digit pincode required";

      case "department":
        return value.trim() ? "" : "Department required";

      case "position":
        return value.trim() ? "" : "Position required";

      case "userStatus":
        return value.trim() ? "" : "Status required";

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
    const newErrors: FormErrors = {};

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

    console.log("User saved:", formData);
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/60 backdrop-blur-md
                      rounded-2xl shadow-2xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Create User
          </h2>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-blue-700 hover:underline"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          {[
            { name: "userName", placeholder: "User Name *" },
            { name: "email", placeholder: "Email *" },
            { name: "contact", placeholder: "Contact *" },
            { name: "pincode", placeholder: "Pincode *" },
            { name: "department", placeholder: "Department *" },
            { name: "position", placeholder: "Position *" },
            { name: "userStatus", placeholder: "Status *" },
          ].map((field) => (
            <div key={field.name}>
              <input
                name={field.name}
                placeholder={field.placeholder}
                onChange={handleChange}
                className="w-full h-9 px-3 text-sm rounded-md border
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

          {/* Submit */}
          <div className="col-span-2 text-right mt-3">
            <button
              type="submit"
              className="bg-slate-800 text-white px-6 py-2 rounded-md
                         text-sm font-medium hover:bg-slate-900 transition"
            >
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
