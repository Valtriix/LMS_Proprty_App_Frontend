
import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus, LeadQualification, Project } from '../../types';

interface SiteVisitManagerProps {
  leads: Lead[];
  projects: Project[];
  onUpdateQualification: (leadId: string, qual: LeadQualification) => void;
}

export const SiteVisitManager: React.FC<SiteVisitManagerProps> = ({ leads, projects, onUpdateQualification }) => {
  const [locationMode, setLocationMode] = useState<'PIN' | 'GEO'>('PIN');
  const [pinCode, setPinCode] = useState('');
  const [geoCoords, setGeoCoords] = useState<{lat: number, lng: number} | null>(null);

  const siteVisitLeads = leads.filter(l => l.status === LeadStatus.SITE_VISIT_DONE);

  const handleUseLocation = () => {
    setLocationMode('GEO');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setGeoCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  };

  // Simple distance calculator
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2));
  };

  const filteredProjects = projects.filter(p => {
    if (locationMode === 'PIN' && pinCode) {
      return p.pincode === pinCode;
    }
    if (locationMode === 'GEO' && geoCoords && p.lat && p.lng) {
      // Show projects within a rough "neighborhood"
      return calculateDistance(geoCoords.lat, geoCoords.lng, p.lat, p.lng) < 0.1; 
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Project Locator</h3>
          <p className="text-sm text-gray-500">Find active projects based on location for site visits</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5">
            <input 
              type="text" 
              placeholder="Enter PIN Code" 
              className="bg-transparent text-sm outline-none w-28"
              value={pinCode}
              onChange={(e) => { setPinCode(e.target.value); setLocationMode('PIN'); }}
            />
            <button className="text-blue-600 hover:text-blue-800">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <span className="text-xs text-gray-400 font-bold uppercase">OR</span>
          <button 
            onClick={handleUseLocation}
            className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            Use My Location
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Project Context */}
        <div className="lg:col-span-1 space-y-4">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Active Projects Nearby</h4>
          <div className="space-y-3">
            {filteredProjects.map(p => (
              <div key={p.id} className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                <p className="font-bold text-gray-900 text-sm">{p.name}</p>
                <p className="text-[10px] text-gray-500 mt-1 uppercase">PIN: {p.pincode || 'N/A'}</p>
              </div>
            ))}
            {filteredProjects.length === 0 && (
              <p className="text-sm text-gray-400 italic">No matching projects found.</p>
            )}
          </div>
        </div>

        {/* Site Visit Queue */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Post-Visit Qualification</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {siteVisitLeads.map(lead => (
              <div key={lead.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-bold text-gray-900">{lead.name}</h5>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-black uppercase tracking-wider">Visit Done</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{lead.notes}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-50 flex items-center justify-between gap-2">
                  <div className="flex gap-1">
                    {Object.values(LeadQualification).map(qual => (
                      <button
                        key={qual}
                        onClick={() => onUpdateQualification(lead.id, qual)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all ${
                          lead.qualification === qual 
                            ? 'bg-slate-900 text-white shadow-md' 
                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        {qual}
                      </button>
                    ))}
                  </div>
                  <button className="text-blue-600 font-bold text-xs hover:underline">Close Deal</button>
                </div>
              </div>
            ))}
            {siteVisitLeads.length === 0 && (
              <div className="col-span-full py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400">
                <p className="text-lg font-bold">No Completed Visits</p>
                <p className="text-sm">Leads move here after site visit completion.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
