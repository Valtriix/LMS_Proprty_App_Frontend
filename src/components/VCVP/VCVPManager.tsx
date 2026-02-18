
import React from 'react';
import { Lead, LeadStatus } from '@/types';

interface VCVPManagerProps {
  leads: Lead[];
}

export const VCVPManager: React.FC<VCVPManagerProps> = ({ leads }) => {
  const vcvpLeads = leads.filter(l => [LeadStatus.VCVP_PROPOSED, LeadStatus.VCVP_CONFIRMED].includes(l.status));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Proposed Stage */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800 flex items-center">
            <span className="w-2 h-6 bg-blue-500 rounded-full mr-3"></span>
            Visit Proposed
          </h3>
          <span className="bg-gray-200 text-gray-700 px-2.5 py-1 rounded-lg text-sm font-bold">
            {vcvpLeads.filter(l => l.status === LeadStatus.VCVP_PROPOSED).length}
          </span>
        </div>
        
        <div className="space-y-4">
          {vcvpLeads.filter(l => l.status === LeadStatus.VCVP_PROPOSED).map(lead => (
            <div key={lead.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-gray-900">{lead.name}</h4>
                  <p className="text-sm text-gray-500">{lead.phone}</p>
                </div>
                <button className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Move to Confirmed</button>
              </div>
              <div className="flex items-center text-xs text-gray-500 space-x-4 border-t pt-3">
                <span className="flex items-center">
                  <svg className="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Proposed: {lead.nextContactDate ? new Date(lead.nextContactDate).toLocaleDateString() : 'TBD'}
                </span>
              </div>
            </div>
          ))}
          {vcvpLeads.filter(l => l.status === LeadStatus.VCVP_PROPOSED).length === 0 && (
            <div className="py-12 border-2 border-dashed border-gray-100 rounded-2xl text-center text-gray-400 text-sm italic">
              No visits proposed yet
            </div>
          )}
        </div>
      </div>

      {/* Confirmed Stage */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800 flex items-center">
            <span className="w-2 h-6 bg-green-500 rounded-full mr-3"></span>
            Visit Confirmed
          </h3>
          <span className="bg-gray-200 text-gray-700 px-2.5 py-1 rounded-lg text-sm font-bold">
            {vcvpLeads.filter(l => l.status === LeadStatus.VCVP_CONFIRMED).length}
          </span>
        </div>

        <div className="space-y-4">
          {vcvpLeads.filter(l => l.status === LeadStatus.VCVP_CONFIRMED).map(lead => (
            <div key={lead.id} className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100 border-l-4 border-l-emerald-500 group hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-gray-900">{lead.name}</h4>
                  <p className="text-sm text-gray-500">{lead.phone}</p>
                </div>
                <button className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Log Site Visit</button>
              </div>
              <div className="bg-emerald-50/50 rounded-lg p-3 text-xs text-emerald-800 font-medium mb-3">
                Appointment: {lead.nextContactDate ? new Date(lead.nextContactDate).toLocaleString() : 'Check calendar'}
              </div>
              <div className="flex items-center text-xs text-gray-500 space-x-4">
                <span className="flex items-center">
                  <svg className="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  Project: Blue Horizon
                </span>
              </div>
            </div>
          ))}
          {vcvpLeads.filter(l => l.status === LeadStatus.VCVP_CONFIRMED).length === 0 && (
            <div className="py-12 border-2 border-dashed border-gray-100 rounded-2xl text-center text-gray-400 text-sm italic">
              No visits confirmed yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
