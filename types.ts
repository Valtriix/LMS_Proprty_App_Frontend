
export enum UserRole {
  ADMIN = 'ADMIN',
  SALES_EXECUTIVE = 'SALES_EXECUTIVE',
  SALES_COORDINATOR = 'SALES_COORDINATOR',
  TELE_CALLER = 'TELE_CALLER'
}

export enum EntityStatus {
  ACTIVE = 'ACTIVE',
  FUTURE = 'FUTURE',
  INACTIVE = 'INACTIVE',
  COMPLETED = 'COMPLETED'
}

export enum LeadStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  VCVP_PROPOSED = 'VCVP_PROPOSED',
  VCVP_CONFIRMED = 'VCVP_CONFIRMED',
  SITE_VISIT_DONE = 'SITE_VISIT_DONE',
  CLOSED_WON = 'CLOSED_WON',
  CLOSED_LOST = 'CLOSED_LOST'
}

export enum LeadQualification {
  HOT = 'HOT',
  WARM = 'WARM',
  COLD = 'COLD',
  LOST = 'LOST'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface City {
  id: string;
  name: string;
  status: EntityStatus;
}

export interface Area {
  id: string;
  cityId: string;
  name: string;
  status: EntityStatus;
  pincode?: string;
}

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

export interface Task {
  id: string;
  description: string;
  dueDate: string;
  status: 'PENDING' | 'COMPLETED';
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  cityId: string;
  areaId: string;
  projectIds: string[]; 
  status: LeadStatus;
  qualification?: LeadQualification;
  originalContactDate: string;
  lastContactDate?: string;
  nextContactDate?: string;
  actionPending: boolean;
  notes: string;
  tasks?: Task[];
  pincode?: string;
}

export interface CrossPitchProposal {
  id: string;
  leadId: string;
  fromProjectId: string;
  toProjectId: string;
  proposedBy: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  timestamp: string;
}
