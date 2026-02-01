
import { Lead, Project, EntityStatus, LeadStatus } from '../types';

/**
 * Assigns a lead to all active projects in its area.
 */
export const assignLeadToProjects = (lead: Lead, allProjects: Project[]): string[] => {
  return allProjects
    .filter(p => p.areaId === lead.areaId && p.status === EntityStatus.ACTIVE)
    .map(p => p.id);
};

/**
 * Trigger: When a project becomes active, link all existing leads from the same area.
 */
export const onProjectActivated = (activatedProject: Project, allLeads: Lead[]): Lead[] => {
  if (activatedProject.status !== EntityStatus.ACTIVE) return allLeads;

  return allLeads.map(lead => {
    if (lead.areaId === activatedProject.areaId) {
      const updatedProjects = Array.from(new Set([...lead.projectIds, activatedProject.id]));
      return { ...lead, projectIds: updatedProjects };
    }
    return lead;
  });
};

/**
 * Filter leads by role visibility.
 */
export const filterLeadsByVisibility = (leads: Lead, projects: Project[], userId: string, isAdmin: boolean): boolean => {
  if (isAdmin) return true;
  // Executive sees leads assigned to projects they are part of
  const userProjects = projects.filter(p => p.salesTeamIds.includes(userId)).map(p => p.id);
  return leads.projectIds.some(pid => userProjects.includes(pid));
};
