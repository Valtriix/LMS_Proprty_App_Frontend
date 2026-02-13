import { useNavigate } from "react-router-dom";

const LeadHome = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center px-16 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Content */}
      <div className="relative z-10 max-w-xl text-white">
        <h1 className="text-4xl font-extrabold leading-tight mb-4">
          Real Estate <br />
          <span className="text-yellow-400">Lead Management System</span>
        </h1>

        <p className="text-gray-200 text-lg mb-8">
          Capture, track, and manage property leads efficiently.
          Turn prospects into real buyers with ease.
        </p>

        <button
        onClick={() => navigate("/leads/new")}
        className="bg-blue-800 hover:bg-blue-900
             px-9 py-4 rounded-xl font-semibold text-white
             shadow-xl hover:scale-105 transition-all duration-200"
           >
         🏗️ Create New Lead
         </button>
      </div>
    </div>
  );
};

export default LeadHome;
