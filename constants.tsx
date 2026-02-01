
import { 
  UserRole, 
  EntityStatus, 
  LeadStatus, 
  Lead, 
  Project, 
  Area, 
  City, 
  User,
  CrossPitchProposal
} from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'John Admin', email: 'admin@estateflow.com', role: UserRole.ADMIN, avatar: 'https://picsum.photos/seed/admin/40/40' },
  { id: 'u2', name: 'Sarah Sales', email: 'sarah@estateflow.com', role: UserRole.SALES_EXECUTIVE, avatar: 'https://picsum.photos/seed/sales1/40/40' },
  { id: 'u3', name: 'Mike Sales', email: 'mike@estateflow.com', role: UserRole.SALES_EXECUTIVE, avatar: 'https://picsum.photos/seed/sales2/40/40' },
];

export const MOCK_CITIES: City[] = [
  { id: 'c1', name: 'Mumbai', status: EntityStatus.ACTIVE },
  { id: 'c2', name: 'Pune', status: EntityStatus.ACTIVE },
];

export const MOCK_AREAS: Area[] = [
  { id: 'a1', cityId: 'c1', name: 'Andheri', status: EntityStatus.ACTIVE, pincode: '400053' },
  { id: 'a2', cityId: 'c1', name: 'Bandra', status: EntityStatus.ACTIVE, pincode: '400050' },
  { id: 'a3', cityId: 'c2', name: 'Hinjewadi', status: EntityStatus.ACTIVE, pincode: '411057' },
];

export const MOCK_PROJECTS: Project[] = [
  { id: 'p1', name: 'Blue Horizon Towers', areaId: 'a1', cityId: 'c1', status: EntityStatus.ACTIVE, salesTeamIds: ['u2'], pincode: '400053', lat: 19.1136, lng: 72.8697 },
  { id: 'p2', name: 'Oceanic Residences', areaId: 'a2', cityId: 'c1', status: EntityStatus.ACTIVE, salesTeamIds: ['u2', 'u3'], pincode: '400050', lat: 19.0596, lng: 72.8295 },
  { id: 'p3', name: 'IT Tech Park Living', areaId: 'a3', cityId: 'c2', status: EntityStatus.ACTIVE, salesTeamIds: ['u3'], pincode: '411057', lat: 18.5913, lng: 73.7389 },
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'l1',
    name: 'Robert Brown',
    email: 'robert@example.com',
    phone: '+91 9876543210',
    source: 'Facebook',
    cityId: 'c1',
    areaId: 'a1',
    projectIds: ['p1'],
    status: LeadStatus.NEW,
    originalContactDate: '2023-10-20T10:00:00Z',
    actionPending: true,
    notes: 'Interested in 2BHK flat.',
    pincode: '400053',
    tasks: [
      { id: 't1', description: 'Initial call done', dueDate: '2023-12-01', status: 'COMPLETED' },
      { id: 't2', description: 'Send property brochure', dueDate: '2023-12-25', status: 'PENDING' }
    ]
  },
  {
    id: 'l2',
    name: 'Emily Davis',
    email: 'emily@example.com',
    phone: '+91 9123456789',
    source: 'Instagram',
    cityId: 'c1',
    areaId: 'a2',
    projectIds: ['p2'],
    status: LeadStatus.SITE_VISIT_DONE,
    originalContactDate: '2023-10-21T11:00:00Z',
    nextContactDate: '2023-10-25T15:00:00Z',
    actionPending: false,
    notes: 'Wants a sea view apartment. Visit completed, liked the site.',
    pincode: '400050',
    tasks: []
  },
  {
    id: 'l3',
    name: 'Rahul Khanna',
    email: 'rahul@example.com',
    phone: '+91 9988776655',
    source: 'Google Search',
    cityId: 'c2',
    areaId: 'a3',
    projectIds: ['p3'],
    status: LeadStatus.VCVP_CONFIRMED,
    originalContactDate: '2023-11-15T09:00:00Z',
    actionPending: true,
    notes: 'IT professional looking for 1BHK near workplace.',
    pincode: '411057',
    tasks: []
  }
];

export const MOCK_PROPOSALS: CrossPitchProposal[] = [
  {
    id: 'cp1',
    leadId: 'l1',
    fromProjectId: 'p1',
    toProjectId: 'p2',
    proposedBy: 'Sarah Sales',
    status: 'PENDING',
    timestamp: '2023-11-20T14:30:00Z'
  },
  {
    id: 'cp2',
    leadId: 'l3',
    fromProjectId: 'p3',
    toProjectId: 'p1',
    proposedBy: 'Mike Sales',
    status: 'ACCEPTED',
    timestamp: '2023-11-18T10:00:00Z'
  }
];
