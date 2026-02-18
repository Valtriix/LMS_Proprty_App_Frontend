import { useNavigate } from "react-router-dom";
import RoleCard from "./rolecard";

 
const Homemain = () => {
  const navigate = useNavigate();
 
  return (
    <div className="
      min-h-screen flex items-center justify-center
      px-6
      bg-gradient-to-br from-slate-900 to-slate-950
      text-slate-200
      font-sans
    ">
      <div className="max-w-6xl w-full text-center">
 
        {/* Badge */}
        <span className="
          inline-block mb-4
          px-5 py-2
          rounded-full
          bg-blue-500/20
          text-blue-400
          font-medium
          tracking-wide
          text-sm sm:text-base
        ">
          EstateFlow CRM
        </span>
 
        {/* Heading */}
        <h1 className="
          text-4xl sm:text-5xl md:text-6xl
          font-extrabold
          leading-tight
          text-slate-50
          mb-4
        ">
          Smart Real Estate <br />
          Lead Management System
        </h1>
 
        {/* Subtitle */}
        <p className="
          max-w-3xl mx-auto
          text-slate-400
          text-base sm:text-lg md:text-xl
          mb-12
        ">
          Manage leads, projects, and properties efficiently with a
          centralized real estate CRM platform.
        </p>
 
        {/* Cards - same width */}
        <div className="flex justify-center gap-6 flex-wrap">
          <div className="flex-1 max-w-sm min-w-[250px]">
            <RoleCard
              title="User"
              description="Register, track leads, and manage your assigned projects with ease."
              onClick={() => navigate("/user-registration")}
            />
          </div>
 
          <div className="flex-1 max-w-sm min-w-[250px]">
            <RoleCard
              title="Developer"
              description="Control properties, projects, teams, and lead pipelines."
              onClick={() => navigate("/developer-registration")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Homemain;