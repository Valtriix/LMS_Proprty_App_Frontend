import ProjectsGrid from "./ProjectsGrid";

const projects = [
  {
    id: 1,
    name: "Skyline Residency",
    status: "ACTIVE",
    pincode: 411045,
    areaId: 12,
  },
  {
    id: 2,
    name: "Green Heights",
    status: "INACTIVE",
    pincode: 411021,
    areaId: 8,
  },
];

export default function Projects() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative w-full max-w-6xl">
        <ProjectsGrid
          title="Available Projects"
          projects={projects}
        />
      </div>
    </div>
  );
}
