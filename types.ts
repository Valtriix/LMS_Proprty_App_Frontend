// USER ROLES
export enum UserRole {
  ADMIN = 'ADMIN',
  SALES_EXECUTIVE = 'SALES_EXECUTIVE',
  SALES_COORDINATOR = 'SALES_COORDINATOR',
  TELE_CALLER = 'TELE_CALLER'
}

// ENTITY STATUS (City, Area, Project)
export enum EntityStatus {
  ACTIVE = 'ACTIVE',
  FUTURE = 'FUTURE',
  INACTIVE = 'INACTIVE',
  COMPLETED = 'COMPLETED'
}

// LEAD STATUS (CRM PIPELINE)
export enum LeadStatus {
  // Initial Stage
  NEW = 'NEW',

  // Active Pipeline
  IN_PROGRESS = 'IN_PROGRESS',
  FOLLOW_UP = 'FOLLOW_UP',
  SITE_VISIT_SCHEDULED = 'SITE_VISIT_SCHEDULED',
  SITE_VISIT_DONE = 'SITE_VISIT_DONE',
  NEGOTIATION = 'NEGOTIATION',

  // Cross Pitch
  VCVP_PROPOSED = 'VCVP_PROPOSED',
  VCVP_CONFIRMED = 'VCVP_CONFIRMED',

  // Closure
  CLOSED_WON = 'CLOSED_WON',
  CLOSED_LOST = 'CLOSED_LOST'
}

// LEAD QUALIFICATION
export enum LeadQualification {
  HOT = 'HOT',
  WARM = 'WARM',
  COLD = 'COLD',
  LOST = 'LOST'
}

// USER
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

// CITY
export interface City {
  id: string;
  name: string;
  status: EntityStatus;
}

// AREA
export interface Area {
  id: string;
  cityId: string;
  name: string;
  status: EntityStatus;
  pincode?: string;
}

// PROJECT
export interface Project {
  id: string;
  name: string;
  areaId: string;
  cityId: string;
  status: EntityStatus;
  salesTeamIds: string[];
  lat?: number;
  lng?: number;
  pincode?: string;
}

// TASK
export interface Task {
  id: string;
  description: string;
  dueDate: string;
  status: 'PENDING' | 'COMPLETED';
}

// LEAD
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsappNo?: string;
  source: string;
  cityId: string;
  areaId: string;
  projectIds: string[];
  status: LeadStatus;
  qualification?: LeadQualification;
  configuration?: '1BHK' | '2BHK' | '3BHK' | '4BHK' | 'Studio';
  originalContactDate: string;
  lastContactDate?: string;
  nextContactDate?: string;
  actionPending: boolean;
  notes: string;
  tasks?: Task[];
  pincode?: string;
}


// CROSS PITCH PROPOSAL
export interface CrossPitchProposal {
  id: string;
  leadId: string;
  fromProjectId: string;
  toProjectId: string;
  proposedBy: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  timestamp: string;
}