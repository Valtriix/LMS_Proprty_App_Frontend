
import React, { useState } from 'react';
import { Lead, Task, LeadStatus, Project } from '@/types';

interface LeadDetailProps {
  lead: Lead;
  onBack: () => void;
  onAddTask: (leadId: string, description: string, dueDate: string) => void;
  onToggleTask: (leadId: string, taskId: string) => void;
  onUpdateStatus: (leadId: string, status: LeadStatus) => void;
  onProposeCrossPitch: (leadId: string, targetProjectId: string) => void;
  projects: Project[];
}

export const LeadDetail: React.FC<LeadDetailProps> = ({ 
  lead, onBack, onAddTask, onToggleTask, onUpdateStatus, onProposeCrossPitch, projects 
}) => {
  const [taskDesc, setTaskDesc] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [showCrossPitch, setShowCrossPitch] = useState(false);
  const [selectedTargetProject, setSelectedTargetProject] = useState('');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskDesc || !taskDate) return;
    onAddTask(lead.id, taskDesc, taskDate);
    setTaskDesc('');
    setTaskDate('');
  };

  const handleCrossPitchSubmit = () => {
    if (selectedTargetProject) {
      onProposeCrossPitch(lead.id, selectedTargetProject);
      setShowCrossPitch(false);
    }
  };

  const isOverdue = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dateStr) < today;
  };

  const sortedTasks = [...(lead.tasks || [])].sort((a, b) => {
    const dateA = new Date(a.dueDate).getTime();
    const dateB = new Date(b.dueDate).getTime();
    return sortOrder === 'ASC' ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button 
          onClick={onBack}
          className="group flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 transition-all"
        >
          <div className="mr-2 p-1 rounded-lg bg-white border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          Back to Leads
        </button>
        <div className="flex items-center space-x-3">
          {lead.status === LeadStatus.NEW && (
            <button 
              onClick={() => onUpdateStatus(lead.id, LeadStatus.IN_PROGRESS)}
              className="px-5 py-2.5 bg-blue-600 rounded-xl text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20"
            >
              Mark In Progress
            </button>
          )}
          {lead.status === LeadStatus.IN_PROGRESS && (
            <button 
              onClick={() => onUpdateStatus(lead.id, LeadStatus.VCVP_PROPOSED)}
              className="px-5 py-2.5 bg-indigo-600 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 transition-all"
            >
              Propose Visit
            </button>
          )}
          {lead.status === LeadStatus.VCVP_CONFIRMED && (
            <button 
              onClick={() => onUpdateStatus(lead.id, LeadStatus.SITE_VISIT_DONE)}
              className="px-5 py-2.5 bg-emerald-600 rounded-xl text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20"
            >
              Mark Site Visit Done
            </button>
          )}
          <button 
            onClick={() => setShowCrossPitch(!showCrossPitch)}
            className={`px-5 py-2.5 border rounded-xl text-sm font-bold transition-all shadow-sm ${
              showCrossPitch ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Cross Pitch
          </button>
        </div>
      </div>

      {showCrossPitch && (
        <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100 animate-in fade-in slide-in-from-top-4 shadow-sm">
          <h4 className="font-black text-blue-900 mb-1">Cross-Pitch Proposal</h4>
          <p className="text-sm text-blue-700/70 mb-5">Identify potential synergy with other projects based on client requirement.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <select 
              className="flex-1 bg-white border border-blue-200 rounded-2xl px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedTargetProject}
              onChange={(e) => setSelectedTargetProject(e.target.value)}
            >
              <option value="">Select Target Project</option>
              {projects.filter(p => !lead.projectIds.includes(p.id)).map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.pincode})</option>
              ))}
            </select>
            <button 
              onClick={handleCrossPitchSubmit}
              disabled={!selectedTargetProject}
              className="px-8 py-3 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-600/20"
            >
              Send Proposal
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="h-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900"></div>
            <div className="px-8 pb-8 -mt-12">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-xl border-[6px] border-white flex items-center justify-center text-blue-600 text-4xl font-black">
                  {lead.name.charAt(0)}
                </div>
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
              </div>
              
              <h2 className="text-2xl font-black text-slate-950 leading-tight mb-1">{lead.name}</h2>
              <p className="text-sm font-medium text-slate-400 mb-5 tracking-tight">{lead.source} Acquisition</p>
              
              <div className="inline-flex px-4 py-1.5 rounded-full text-[10px] font-black bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-widest mb-8">
                {lead.status.replace(/_/g, ' ')}
              </div>
              
              <div className="space-y-5 pt-6 border-t border-slate-50">
                <div className="flex items-center group">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center mr-4 group-hover:bg-blue-50 transition-colors">
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-slate-700">{lead.phone}</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center mr-4 group-hover:bg-blue-50 transition-colors">
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-slate-700 truncate">{lead.email}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Core Requirement</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
              "{lead.notes}"
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-10 py-8 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-950">Action Log & Tasks</h3>
                <p className="text-sm font-medium text-slate-400">Keep track of every interaction and follow-up.</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSortOrder(prev => prev === 'ASC' ? 'DESC' : 'ASC')}
                  className="px-4 py-2 bg-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all flex items-center"
                >
                  <svg className={`w-3 h-3 mr-2 transition-transform duration-300 ${sortOrder === 'DESC' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 4h13M3 8h9m-9 4h6" />
                  </svg>
                  Sort: {sortOrder === 'ASC' ? 'Soonest' : 'Latest'}
                </button>
                <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                  {lead.tasks?.filter(t => t.status === 'COMPLETED').length || 0} / {lead.tasks?.length || 0} DONE
                </div>
              </div>
            </div>
            
            <div className="p-10">
              <form onSubmit={handleAddTaskSubmit} className="mb-12 p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col xl:flex-row gap-5">
                <div className="flex-1 relative group">
                  <div className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Describe the next step..." 
                    className="w-full pl-12 pr-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-slate-300"
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                  />
                </div>
                <div className="w-full xl:w-56 relative group">
                  <div className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input 
                    type="date" 
                    className="w-full pl-12 pr-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={!taskDesc || !taskDate}
                  className="px-10 py-3.5 bg-slate-950 text-white font-black rounded-2xl text-sm hover:bg-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xl shadow-slate-950/20 whitespace-nowrap active:scale-[0.98]"
                >
                  Create Task
                </button>
              </form>

              <div className="grid grid-cols-1 gap-4">
                {sortedTasks.map(task => {
                  const overdue = task.status === 'PENDING' && isOverdue(task.dueDate);
                  return (
                    <div 
                      key={task.id} 
                      className={`group flex items-center justify-between p-6 rounded-3xl border transition-all duration-300 ${
                        task.status === 'COMPLETED' 
                          ? 'bg-slate-50 border-slate-100 opacity-60' 
                          : overdue
                            ? 'bg-red-50/50 border-red-100 hover:border-red-300'
                            : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-600/5'
                      }`}
                    >
                      <div className="flex items-center space-x-6 flex-1 min-w-0">
                        <button 
                          onClick={() => onToggleTask(lead.id, task.id)}
                          className={`shrink-0 w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                            task.status === 'COMPLETED' 
                              ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                              : overdue
                                ? 'bg-white border-red-200 text-red-500 hover:border-red-500'
                                : 'bg-white border-slate-200 text-blue-600 hover:border-blue-500 hover:scale-105'
                          }`}
                        >
                          {task.status === 'COMPLETED' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {task.status === 'PENDING' && overdue && (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                        <div className="min-w-0">
                          <p className={`text-base font-bold truncate leading-snug ${
                            task.status === 'COMPLETED' ? 'text-slate-400 line-through' : 'text-slate-900'
                          }`}>
                            {task.description}
                          </p>
                          <div className="flex items-center mt-1 space-x-4">
                            <span className={`flex items-center text-[10px] font-black uppercase tracking-[0.15em] ${
                              overdue ? 'text-red-500' : 'text-slate-400'
                            }`}>
                              <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {task.dueDate}
                              {overdue && <span className="ml-3 px-2 py-0.5 bg-red-100 text-red-600 rounded-lg">Overdue</span>}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="hidden md:flex items-center gap-4">
                         <div className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border ${
                           task.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-100'
                         }`}>
                           {task.status}
                         </div>
                      </div>
                    </div>
                  );
                })}
                {sortedTasks.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-24 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                      <svg className="w-8 h-8 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-slate-950 font-black text-xl mb-2">Clean Slate</p>
                    <p className="text-slate-400 text-sm font-medium">No tasks logged for this lead. Start by planning your next move.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
