
import React from 'react';
import { Lead, CrossPitchProposal, Project } from '@/types';

interface CrossPitchManagerProps {
  proposals: CrossPitchProposal[];
  leads: Lead[];
  projects: Project[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export const CrossPitchManager: React.FC<CrossPitchManagerProps> = ({ proposals, leads, projects, onAccept, onReject }) => {
  const getLeadName = (id: string) => leads.find(l => l.id === id)?.name || 'Unknown Lead';
  const getProjectName = (id: string) => projects.find(p => p.id === id)?.name || 'Unknown Project';

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-50 bg-slate-50/30">
        <h3 className="text-xl font-black text-slate-900">Cross-Pitch Proposals</h3>
        <p className="text-sm text-slate-500">Manage leads shared across projects and locations</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-gray-50">
              <th className="px-8 py-4">Lead</th>
              <th className="px-8 py-4">Proposed From</th>
              <th className="px-8 py-4">Target Project</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {proposals.map(prop => (
              <tr key={prop.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5">
                  <p className="font-bold text-slate-900">{getLeadName(prop.leadId)}</p>
                  <p className="text-xs text-slate-400">Proposed by {prop.proposedBy}</p>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-medium text-slate-600">{getProjectName(prop.fromProjectId)}</span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-bold text-blue-600">{getProjectName(prop.toProjectId)}</span>
                </td>
                <td className="px-8 py-5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                    prop.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 
                    prop.status === 'ACCEPTED' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {prop.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  {prop.status === 'PENDING' && (
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => onAccept(prop.id)}
                        className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 shadow-md shadow-emerald-600/10"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => onReject(prop.id)}
                        className="px-3 py-1.5 bg-white border border-gray-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-gray-50"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {proposals.length === 0 && (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center text-slate-400 italic">
                  No cross-pitch proposals yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
