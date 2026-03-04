import React, { useMemo, useState } from "react";
import {
  Lead,
  Project,
  LeadStatus,
} from "@/types";

interface Props {
  leads: Lead[];
  projects: Project[];
}

export const AllProjectsTable: React.FC<Props> = ({ leads, projects }) => {
  // ---------------- FILTER STATES ----------------
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "">("");
  const [projectFilter, setProjectFilter] = useState<string>("");

  // ---------------- PROCESS LEADS ----------------
  const processedLeads = useMemo(() => {
    return leads.map((lead) => {
      const leadProjects = projects.filter((project) =>
        lead.projectIds?.includes(project.id)
      );

      return {
        ...lead,
        projectNames: leadProjects.map((p) => p.name).join(", "),
        projectPins: leadProjects
          .map((p) => p.pincode ?? "")
          .filter(Boolean)
          .join(", "),
      };
    });
  }, [leads, projects]);

  // ---------------- FILTER LOGIC ----------------
  const filteredLeads = useMemo(() => {
    const lowerSearch = search.trim().toLowerCase();

    return processedLeads.filter((lead) => {
      const matchesSearch =
        lowerSearch === "" ||
        lead.name?.toLowerCase().includes(lowerSearch) ||
        lead.email?.toLowerCase().includes(lowerSearch) ||
        String(lead.phone).toLowerCase().includes(lowerSearch) ||
        String(lead.whatsappNo ?? "").toLowerCase().includes(lowerSearch) ||
        lead.projectNames?.toLowerCase().includes(lowerSearch) ||
        lead.projectPins?.toLowerCase().includes(lowerSearch) ||
        lead.configuration?.toLowerCase().includes(lowerSearch) ||
        lead.source?.toLowerCase().includes(lowerSearch);

      const matchesStatus =
        statusFilter === "" || lead.status === statusFilter;

      const matchesProject =
        projectFilter === "" || lead.projectIds?.includes(projectFilter);

      return matchesSearch && matchesStatus && matchesProject;
    });
  }, [processedLeads, search, statusFilter, projectFilter]);

  // ---------------- PROJECT DROPDOWN (ONLY USED PROJECTS) ----------------
  const availableProjects = useMemo(() => {
    const usedProjectIds = new Set<string>();

    leads.forEach((lead) => {
      lead.projectIds?.forEach((id) => {
        usedProjectIds.add(id);
      });
    });

    return projects.filter((project) =>
      usedProjectIds.has(project.id)
    );
  }, [leads, projects]);

  // ---------------- RESET ----------------
  const resetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setProjectFilter("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      
      {/* ---------------- FILTER SECTION ---------------- */}
      <div className="p-6 border-b border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search name, email, phone, project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "")}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          {Object.values(LeadStatus).map((status) => (
            <option key={status} value={status}>
              {status.replaceAll("_", " ")}
            </option>
          ))}
        </select>

        {/* Project Filter (ONLY PROJECTS USED IN LEADS) */}
        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Projects</option>
          {availableProjects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>

        {/* Reset */}
        <button
          onClick={resetFilters}
          className="bg-gray-200 hover:bg-gray-300 rounded-lg px-3 py-2 text-sm font-medium"
        >
          Reset
        </button>
      </div>

      {/* ---------------- TABLE ---------------- */}
      <div className="overflow-x-auto max-h-[75vh]">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-left">Lead ID</th>
              <th className="px-6 py-4 text-left">Source</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">Projects</th>
              <th className="px-6 py-4 text-left">Pincode</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Whatsapp</th>
              <th className="px-6 py-4 text-left">Config</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-gray-100 hover:bg-blue-50 transition"
              >
                <td className="px-6 py-4">{lead.id}</td>
                <td className="px-6 py-4">{lead.source}</td>
                <td className="px-6 py-4 font-medium text-gray-800">
                  {lead.name}
                </td>
                <td className="px-6 py-4">{lead.email}</td>
                <td className="px-6 py-4">{lead.phone}</td>
                <td className="px-6 py-4">{lead.projectNames || "-"}</td>
                <td className="px-6 py-4">{lead.projectPins || "-"}</td>
                <td className="px-6 py-4">
                  {lead.status.replaceAll("_", " ")}
                </td>
                <td className="px-6 py-4">{lead.whatsappNo ?? "-"}</td>
                <td className="px-6 py-4">{lead.configuration ?? "-"}</td>
              </tr>
            ))}

            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center py-6 text-gray-500">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};