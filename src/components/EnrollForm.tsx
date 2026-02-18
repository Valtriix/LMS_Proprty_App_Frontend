import { useEffect, useState } from "react";
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
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(false);

  

  useEffect(() => {
  const delayTimer = setTimeout(() => {
    setVisible(true);

    setTimeout(() => {
      setAnimate(true);
    }, 50); // animation trigger delay
  }, 3000); // popup delay (change this)

  return () => clearTimeout(delayTimer);
}, []);


  const validate = () => {
    const newErrors: Partial<FormData> = {};

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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    navigate(`/projects?pincode=${formData.pincode}`);
    onClose();
  };

  const baseInputClass =
    "w-full bg-transparent border-b py-2 text-sm text-white placeholder-white/70 " +
    "focus:outline-none transition";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">

      {/* Background Blur */}
      {/* <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div> */}
      <div
  className={`absolute inset-0 
              backdrop-blur-sm
              bg-gradient-to-br from-black/50 via-black/50 to-black/50
              transition-all duration-300
              ${animate ? "opacity-100" : "opacity-0"}`}
></div>


      {/* Glass Card */}
      
      <div
        className={`relative w-full max-w-sm p-6 rounded-2xl
        bg-white/10 backdrop-blur-xl
        border border-white/20 shadow-2xl text-white
        transform transition-all duration-300 ease-out
        ${animate ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
      >


        {/* Close Button */}
        <button
          onClick={() => {
          setAnimate(false);
          setTimeout(() => {
            onClose();
          }, 300);
        }}
          className="absolute top-3 right-4 text-white/60 hover:text-red-400 text-lg"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-1">
          Enroll Now
        </h2>
        <p className="text-sm text-white/70 mb-5">
          Get updates on premium properties
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={`${baseInputClass} ${
                errors.name
                  ? "border-red-400"
                  : "border-white/40 focus:border-emerald-400"
              }`}
            />
            <p className="text-red-400 text-xs mt-1 h-4">
              {errors.name || ""}
            </p>
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`${baseInputClass} ${
                errors.email
                  ? "border-red-400"
                  : "border-white/40 focus:border-emerald-400"
              }`}
            />
            <p className="text-red-400 text-xs mt-1 h-4">
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
              className={`${baseInputClass} ${
                errors.contact
                  ? "border-red-400"
                  : "border-white/40 focus:border-emerald-400"
              }`}
            />
            <p className="text-red-400 text-xs mt-1 h-4">
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
              className={`${baseInputClass} ${
                errors.pincode
                  ? "border-red-400"
                  : "border-white/40 focus:border-emerald-400"
              }`}
            />
            <p className="text-red-400 text-xs mt-1 h-4">
              {errors.pincode || ""}
            </p>
          </div>

          {/* Source */}
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

          <button
            type="submit"
            className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 
                       py-2.5 rounded-lg text-sm font-semibold
                       transition shadow-lg"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
};

export default EnrollForm;
