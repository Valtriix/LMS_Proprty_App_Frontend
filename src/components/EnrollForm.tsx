import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface EnrollFormProps {
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  contact: string;
  pincode: string;
  source: string;
}

const EnrollForm = ({ onClose }: EnrollFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contact: "",
    pincode: "",
    source: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = () => {
    const newErrors: Partial<FormData> = {};

    if (formData.name.trim().length < 3)
      newErrors.name = "Please enter your full name";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";

    if (!/^[0-9]{10}$/.test(formData.contact))
      newErrors.contact = "Enter a 10-digit mobile number";

    if (!/^[0-9]{6}$/.test(formData.pincode))
      newErrors.pincode = "Enter a valid pincode";

    if (!formData.source)
      newErrors.source = "Please select a source";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // alert("Thank you! Our team will contact you shortly.");
    navigate(`/projects?pincode=${formData.pincode}`);
    onClose();
  };

  const inputClass =
    "w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 " +
    "focus:outline-none focus:ring-2 focus:ring-emerald-400";

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Enroll Now
        </h2>
        <p className="text-gray-500 mb-5">
          Get updates on premium apartments & projects
        </p>

        {/* Reduced spacing */}
        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Name */}
          <div>
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
            />
            <p className="text-red-500 text-sm h-4 mt-1">
              {errors.name || ""}
            </p>
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
            <p className="text-red-500 text-sm h-4 mt-1">
              {errors.email || ""}
            </p>
          </div>

          {/* Contact */}
          <div>
            <input
              name="contact"
              placeholder="Mobile Number"
              value={formData.contact}
              onChange={handleChange}
              className={inputClass}
            />
            <p className="text-red-500 text-sm h-4 mt-1">
              {errors.contact || ""}
            </p>
          </div>

          {/* Pincode */}
          <div>
            <input
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className={inputClass}
            />
            <p className="text-red-500 text-sm h-4 mt-1">
              {errors.pincode || ""}
            </p>
          </div>

          {/* Source */}
          <div>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">How did you hear about us?</option>
              <option value="google">Google</option>
              <option value="facebook">Facebook</option>
              <option value="website">Website</option>
              <option value="referral">Referral</option>
            </select>
            <p className="text-red-500 text-sm h-4 mt-1">
              {errors.source || ""}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 
                       text-white py-3 rounded-xl text-lg font-semibold
                       transition shadow-md mt-2"
          >
            Enroll Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnrollForm;
