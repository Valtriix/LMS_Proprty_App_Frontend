import React from 'react';

export enum EntityStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type Project = {
  id: string | number;
  name: string;
  status: EntityStatus;
  pincode: string | number;
  areaId: string | number;
};

type ProjectsGridProps = {
  title?: string;
  projects: Project[];
  className?: string;
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const isActive = project.status === EntityStatus.ACTIVE;
  const badgeClass = isActive
    ? 'bg-emerald-100 text-emerald-700'
    : 'bg-slate-100 text-slate-600';

  return (
    <div className="p-4 rounded-xl border border-gray-200 hover:border-blue-500 transition-all">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-slate-900">{project.name}</span>
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${badgeClass}`}
        >
          {project.status}
        </span>
      </div>
      <p className="text-xs text-slate-500">Pincode: {project.pincode}</p>
      <p className="text-xs text-slate-400 mt-1">Area ID: {project.areaId}</p>
    </div>
  );
};

export const ProjectsGrid: React.FC<any> = ({
  title = 'Projects',
  projects,
  className = '',
}) => {
  return (
    <div className={`bg-white p-8 rounded-2xl shadow-sm border border-gray-100 ${className}`}>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      {projects.length === 0 ? (
        <div className="text-sm text-slate-500 border border-dashed border-slate-200 rounded-xl p-6 text-center">
          No projects to display.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsGrid;