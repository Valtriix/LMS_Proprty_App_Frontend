
import React, { useState } from 'react';
import { Lead, LeadStatus, EntityStatus } from '@/types';

interface LeadListProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onUpdateStatus: (leadId: string, status: LeadStatus) => void;
}

export const LeadList: React.FC<LeadListProps> = ({ leads, onSelectLead, onUpdateStatus }) => {
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'ALL'>('ALL');

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(filter.toLowerCase()) || 
                          l.phone.includes(filter) || 
                          l.email.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case LeadStatus.NEW: return 'bg-blue-100 text-blue-800';
      case LeadStatus.IN_PROGRESS: return 'bg-yellow-100 text-yellow-800';
      case LeadStatus.VCVP_CONFIRMED: return 'bg-purple-100 text-purple-800';
      case LeadStatus.SITE_VISIT_DONE: return 'bg-green-100 text-green-800';
      case LeadStatus.CLOSED_WON: return 'bg-emerald-100 text-emerald-800';
      case LeadStatus.CLOSED_LOST: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search name, phone or email..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="flex items-center space-x-3">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="ALL">All Status</option>
            {Object.values(LeadStatus).map(s => (
              <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
            ))}
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Lead
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 text-xs uppercase tracking-wider text-gray-500">
              <th className="px-6 py-4 font-bold">Contact</th>
              <th className="px-6 py-4 font-bold">Location</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold">Source</th>
              <th className="px-6 py-4 font-bold">Last Action</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredLeads.map(lead => (
              <tr 
                key={lead.id} 
                className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                onClick={() => onSelectLead(lead)}
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-bold text-gray-900">{lead.name}</p>
                    <p className="text-sm text-gray-500">{lead.phone}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="text-gray-900 font-medium">Area ID: {lead.areaId}</p>
                    <p className="text-gray-500">City ID: {lead.cityId}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(lead.status)}`}>
                    {lead.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-600 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                    {lead.source}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-500">
                    {lead.lastContactDate ? new Date(lead.lastContactDate).toLocaleDateString() : 'No contact yet'}
                  </p>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 text-purple-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-lg font-medium text-gray-500">No leads found matching your criteria</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
