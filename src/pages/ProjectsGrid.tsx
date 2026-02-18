import { EntityStatus, Project } from "@/types";
import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";

interface ProjectsGridProps {
  title: string;
  projects: Project[];
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ title, projects }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const pincodeFromURL = queryParams.get("pincode")?.trim();

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (project.status !== EntityStatus.ACTIVE) return false;

      const q = searchQuery.trim().toLowerCase();

      if (q) {
        return (
          project.name.toLowerCase().includes(q) ||
          project.pincode.includes(q)
        );
      }

      if (pincodeFromURL) {
        return project.pincode.trim() === pincodeFromURL;
      }

      return true;
    });
  }, [projects, searchQuery, pincodeFromURL]);

  return (
    <div
      className="h-screen bg-cover bg-center bg-fixed relative overflow-y-auto p-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6')",
      }}
    >
      {/* Soft gradient overlay instead of black */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40"></div>

      <div className="relative w-full max-w-7xl">

        {/* Glass Container */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/10 p-10 rounded-2xl shadow-3xl">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
  
            {/* Title */}
            <h2 className="text-3xl font-bold text-white tracking-wide">
              {title}
            </h2>

            <div className="relative w-full md:w-72">
  
              {/* Search Icon */}
              <span className="absolute inset-y-0 left-4 flex items-center text-white/70">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search project or pincode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-5 py-3 rounded-full 
                          bg-white/30 text-white placeholder-white/70
                          border border-white/40 
                          focus:outline-none focus:ring-2 focus:ring-white/60
                          backdrop-blur-md transition-all"
              />
            </div>


          </div>


          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((p) => (
                <div
                key={p.id}
                className="p-6 rounded-2xl 
                          bg-white/70 
                          backdrop-blur-xl 
                          border border-white/40 
                          shadow-xl 
                          hover:shadow-2xl 
                          hover:-translate-y-2 
                          transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-gray-900">
                    {p.name}
                  </h3>

                  <span
                    className={`px-3 py-1 text-[11px] font-semibold uppercase rounded-full tracking-wide ${
                      p.status === EntityStatus.ACTIVE
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">Pincode:</span> {p.pincode}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">Area ID:</span> {p.areaId}
                  </p>
                </div>
              </div>

              ))
            ) : (
              <p className="text-white/80 col-span-full text-center">
                {searchQuery
                  ? "No projects match your search."
                  : pincodeFromURL
                  ? "No active projects available for this pincode."
                  : "No projects found."}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectsGrid;
