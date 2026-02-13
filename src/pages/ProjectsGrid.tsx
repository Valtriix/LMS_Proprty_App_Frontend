import { EntityStatus, Project } from "@/types";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface ProjectsGridProps {
  title: string;
  projects: Project[];
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ title, projects }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");

  //  Get pincode from URL and trim spaces
  const queryParams = new URLSearchParams(location.search);
  const pincodeFromURL = queryParams.get("pincode")?.trim();

  //  Combined Filter Logic
  const filteredProjects = projects.filter((project) => {
    // Only ACTIVE
    if (project.status !== EntityStatus.ACTIVE) return false;

    // URL pincode filter (if exists)
    if (pincodeFromURL && project.pincode.trim() !== pincodeFromURL) {
      return false;
    }

    // Search filter (if exists)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        project.name.toLowerCase().includes(q) ||
        project.pincode.includes(q)
      );
    }

    // Otherwise include
    return true;
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center relative px-4 py-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-lg">

          {/* Back button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => navigate("/leads/new")}
              className="text-sm font-medium text-blue-700 hover:underline"
            >
              ← Back
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-6">{title}</h2>

          {/*  Search Input Always Active */}
          <input
            type="text"
            placeholder="Search by project name or pincode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-8 w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((p) => (
                <div
                  key={p.id}
                  className="p-6 rounded-2xl border border-gray-200 hover:border-blue-500 transition bg-white"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-lg text-slate-900">
                      {p.name}
                    </h3>

                    <span
                      className={`px-3 py-1 text-[10px] font-black uppercase rounded tracking-widest ${
                        p.status === EntityStatus.ACTIVE
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600">
                    Pincode: <strong>{p.pincode}</strong>
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    Area ID: {p.areaId}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full">
                {pincodeFromURL
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
