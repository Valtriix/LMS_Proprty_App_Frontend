
import React, { useState } from 'react';

import { 
  MOCK_LEADS, 
  MOCK_USERS, 
  MOCK_PROJECTS, 
  MOCK_AREAS, 
  MOCK_CITIES,
  MOCK_PROPOSALS
} from './constants';
import { 
  Lead, 
  LeadStatus, 
  UserRole, 
  Project, 
  EntityStatus,
  LeadQualification,
  CrossPitchProposal
} from './types';
import { onProjectActivated } from './services/crmEngine';
import { LeadDetail } from './src/components/Leads/LeadDetail';
import { Dashboard } from './src/components/Dashboard';
import { LeadList } from './src/components/Leads/LeadList';
import { VCVPManager } from './src/components/VCVP/VCVPManager';
import { SiteVisitManager } from './src/components/SiteVisits/SiteVisitManager';
import { CrossPitchManager } from './src/components/CrossPitch/CrossPitchManager';
import { Layout } from './src/components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './src/pages/home';
import ProjectsGrid from './src/pages/ProjectsGrid';
import UserForm from './src/pages/UserForm';
import DeveloperForm from './src/pages/DeveloperForm';

const App: React.FC = () => {
  const [user, setUser] = useState(MOCK_USERS[0]); 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [proposals, setProposals] = useState<CrossPitchProposal[]>(MOCK_PROPOSALS);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const handleUpdateStatus = (leadId: string, status: LeadStatus) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status } : l));
  };

  const handleUpdateQualification = (leadId: string, qualification: LeadQualification) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, qualification } : l));
  };

  const handleAddTask = (leadId: string, description: string, dueDate: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const newTask = { id: Math.random().toString(36).substr(2, 9), description, dueDate, status: 'PENDING' as const };
        return { ...l, tasks: [...(l.tasks || []), newTask] };
      }
      return l;
    }));
  };

  const handleToggleTask = (leadId: string, taskId: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return { 
          ...l, 
          tasks: l.tasks?.map(t => t.id === taskId ? { ...t, status: t.status === 'PENDING' ? 'COMPLETED' : 'PENDING' } : t) 
        };
      }
      return l;
    }));
  };

  const handleProposeCrossPitch = (leadId: string, targetProjectId: string) => {
    const newProposal: CrossPitchProposal = {
      id: Math.random().toString(36).substr(2, 9),
      leadId,
      fromProjectId: leads.find(l => l.id === leadId)?.projectIds[0] || 'unknown',
      toProjectId: targetProjectId,
      proposedBy: user.name,
      status: 'PENDING',
      timestamp: new Date().toISOString()
    };
    setProposals(prev => [...prev, newProposal]);
  };

  const handleAcceptProposal = (proposalId: string) => {
    const proposal = proposals.find(p => p.id === proposalId);
    if (proposal) {
      setLeads(prev => prev.map(l => {
        if (l.id === proposal.leadId) {
          return { ...l, projectIds: [...l.projectIds, proposal.toProjectId] };
        }
        return l;
      }));
      setProposals(prev => prev.map(p => p.id === proposalId ? { ...p, status: 'ACCEPTED' } : p));
    }
  };

  const renderContent = () => {
    // Lead Detail View takes precedence when a lead is selected in the leads tab
    if (selectedLeadId && activeTab === 'leads') {
      const selectedLead = leads.find(l => l.id === selectedLeadId);
      if (selectedLead) {
        return (
          <LeadDetail 
            lead={selectedLead} 
            projects={projects}
            onBack={() => setSelectedLeadId(null)} 
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onUpdateStatus={handleUpdateStatus}
            onProposeCrossPitch={handleProposeCrossPitch}
          />
        );
      }
    }

    // Role-based route guard
    const isSales = user.role === UserRole.SALES_EXECUTIVE;
    if (isSales && ['cross-pitch', 'reports', 'projects'].includes(activeTab)) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-xl font-bold">Access Restricted</p>
          <p className="text-sm">You do not have permission to view the {activeTab.replace('-', ' ')} module.</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard leads={leads} user={user} />;
      case 'leads':
        return (
          <LeadList 
            leads={leads} 
            onSelectLead={(l) => setSelectedLeadId(l.id)} 
            onUpdateStatus={handleUpdateStatus} 
          />
        );
      case 'vcvp':
        return <VCVPManager leads={leads} />;
      case 'site-visits':
        return (
          <SiteVisitManager 
            leads={leads} 
            projects={projects} 
            onUpdateQualification={handleUpdateQualification}
          />
        );
      case 'cross-pitch':
        return (
          <CrossPitchManager 
            proposals={proposals} 
            leads={leads} 
            projects={projects} 
            onAccept={handleAcceptProposal} 
            onReject={(id) => setProposals(prev => prev.map(p => p.id === id ? { ...p, status: 'REJECTED' } : p))}
          />
        );
      case 'projects':
        return (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Master Data</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map(p => (
                <div key={p.id} className="p-4 rounded-xl border border-gray-200 hover:border-blue-500 transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-900">{p.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                      p.status === EntityStatus.ACTIVE ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Pincode: {p.pincode}</p>
                  <p className="text-xs text-slate-400 mt-1">Area ID: {p.areaId}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 text-center">
            <h3 className="text-xl font-black text-slate-900 mb-2">Reports & Analytics</h3>
            <p className="text-slate-500 text-sm mb-6">Deep dive into your sales performance and governance metrics.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {['Compliance Audit', 'Lead Conversion SLA', 'Visit Quality Score', 'Daily Executive Summary'].map(r => (
                <div key={r} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all cursor-pointer text-left group">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{r}</p>
                  <p className="text-xs text-slate-500 mt-1">Generated daily at 00:00 UTC</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div className="p-10 text-center text-gray-400">Module Under Construction</div>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 px-4">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-12 shadow-2xl text-center">
          <div className="mb-8">
            <h1 className="text-4xl font-black text-slate-950 tracking-tight mb-2">EstateFlow</h1>
            <p className="text-slate-500 text-sm font-medium">Enterprise Real Estate CRM</p>
          </div>
          <div className="space-y-4">
            <button 
              onClick={() => { setIsAuthenticated(true); setUser(MOCK_USERS[0]); }} 
              className="w-full bg-slate-950 text-white p-5 rounded-3xl font-bold hover:bg-slate-900 transition-all active:scale-[0.98]"
            >
              Sign in as Administrator
            </button>
            <button 
              onClick={() => { setIsAuthenticated(true); setUser(MOCK_USERS[1]); }} 
              className="w-full bg-blue-600 text-white p-5 rounded-3xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]"
            >
              Sign in as Sales Executive
            </button>
          </div>
          <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Powered by Gemini Engine</p>
        </div>
      </div>
    );
  }

  return (
    // <Layout 
    //   user={user} 
    //   onLogout={() => setIsAuthenticated(false)} 
    //   activeTab={activeTab} 
    //   setActiveTab={(t) => { setActiveTab(t); setSelectedLeadId(null); }}
    // >
    //   {renderContent()}
    // </Layout>

    <BrowserRouter>
      <Routes>

        
         {/* <Route path="/" element={<Home />} /> 

        
        <Route path="/user-registration" element={<UserForm/>} />
        
        <Route path="/developer-registration" element={<DeveloperForm/>} />
        <Route path="/projects" element={<ProjectsGrid title="Projects" projects={projects} />} />
        
        <Route path="/leads" element={<LeadList 
            leads={leads} 
            onSelectLead={(l) => setSelectedLeadId(l.id)} 
            onUpdateStatus={handleUpdateStatus}
          />}/>
        <Route path="/leads/create" element={<LeadForm />} /> */}

         <Route path="/" element={<Home/>} />
         <Route path="/user-registration" element={<UserForm />} />
         <Route path="/developer-registration" element={<DeveloperForm />} />
         <Route path="/projects" element={<ProjectsGrid title="Projects" projects={projects} />} />


         <Route
          path="/dashboard/*"
          element={
          <Layout
            user={user}
            onLogout={() => setIsAuthenticated(false)}
            activeTab={activeTab}
            setActiveTab={(t) => {
              setActiveTab(t);
              setSelectedLeadId(null);
            }}
          >
            {renderContent()}
          </Layout>
        }
      />
        
      
       

      </Routes>
    </BrowserRouter>
  );
};

export default App;
