import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lead } from "../api-client";
import { leadsApi } from "@/ApiServices";


interface EnrollFormProps {
  onClose: () => void;
}

interface FormState {
  name: string;
  email: string;
  contact: string;
  pincode: string;
  source: string;
}

const EnrollForm = ({ onClose }: EnrollFormProps) => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    contact: "",
    pincode: "",
    source: "",
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  const navigate = useNavigate();

  // Lock scroll when modal opens
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setAnimate(true), 100);

    return () => {
      document.body.style.overflow = "auto";
      clearTimeout(timer);
    };
  }, []);

  const validate = () => {
    const newErrors: Partial<FormState> = {};

    if (formData.name.trim().length < 3)
      newErrors.name = "Enter full name";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!/^[0-9]{10}$/.test(formData.contact))
      newErrors.contact = "10-digit mobile required";

    if (!/^[0-9]{6}$/.test(formData.pincode))
      newErrors.pincode = "Invalid pincode";

    if (!formData.source)
      newErrors.source = "Select source";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setApiError("");
  };

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => onClose(), 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setApiError("");

      const payload: Lead = {
        leadName: formData.name,
        email: formData.email,
        contactNo: formData.contact,
        pincode: formData.pincode,
        source: formData.source,
      };

      await leadsApi.createLead(payload);

      navigate(`/projects?pincode=${formData.pincode}`);
      handleClose();
    } catch (error: any) {
      if (error.response) {
        setApiError(
          error.response.data?.message || "Failed to save lead"
        );
      } else {
        setApiError("Backend not reachable. Check server.");
      }
    } finally {
      setLoading(false);
    }
  };

  const baseInputClass =
    "w-full bg-transparent border-b py-2 text-sm text-white placeholder-white/70 " +
    "focus:outline-none transition";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">

      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal Card */}
      <div
        className={`relative w-full max-w-sm p-6 rounded-2xl
        bg-white/10 backdrop-blur-xl
        border border-white/20 shadow-2xl text-white
        transform transition-all duration-300 ease-out
        ${animate ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-white/60 hover:text-red-400 text-lg"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-1">Enroll Now</h2>
        <p className="text-sm text-white/70 mb-5">
          Get updates on premium properties
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {["name", "email", "contact", "pincode"].map((field) => (
            <div key={field}>
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "contact"
                    ? "tel"
                    : field === "pincode"
                    ? "number"
                    : "text"
                }
                name={field}
                placeholder={
                  field === "contact"
                    ? "Mobile Number"
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }
                value={(formData as any)[field]}
                onChange={handleChange}
                className={`${baseInputClass} ${
                  (errors as any)[field]
                    ? "border-red-400"
                    : "border-white/40 focus:border-emerald-400"
                }`}
              />
              <p className="text-red-400 text-xs mt-1 h-4">
                {(errors as any)[field] || ""}
              </p>
            </div>
          ))}

          <div>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className={`${baseInputClass} ${
                errors.source
                  ? "border-red-400"
                  : "border-white/40 focus:border-emerald-400"
              }`}
            >
              <option value="" className="text-black">
                How did you hear about us?
              </option>
              <option value="google" className="text-black">Google</option>
              <option value="facebook" className="text-black">Facebook</option>
              <option value="website" className="text-black">Website</option>
              <option value="referral" className="text-black">Referral</option>
            </select>
            <p className="text-red-400 text-xs mt-1 h-4">
              {errors.source || ""}
            </p>
          </div>

          {apiError && (
            <p className="text-red-400 text-sm text-center">
              {apiError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 
                       py-2.5 rounded-lg text-sm font-semibold
                       transition shadow-lg disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnrollForm;
