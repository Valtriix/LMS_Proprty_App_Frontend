
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Lead, UserRole, LeadStatus } from '@/types';

interface DashboardProps {
  leads: Lead[];
  user: any;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6366f1'];

export const Dashboard: React.FC<DashboardProps> = ({ leads, user }) => {
  const isAdmin = user.role === UserRole.ADMIN;

  const stats = [
    { label: 'Total Leads', value: leads.length, icon: '📈', color: 'bg-blue-50' },
    { label: 'Active VCVP', value: leads.filter(l => [LeadStatus.VCVP_PROPOSED, LeadStatus.VCVP_CONFIRMED].includes(l.status)).length, icon: '📅', color: 'bg-green-50' },
    { label: 'Site Visits Done', value: leads.filter(l => l.status === LeadStatus.SITE_VISIT_DONE).length, icon: '🏠', color: 'bg-purple-50' },
    { label: 'Deals Won', value: leads.filter(l => l.status === LeadStatus.CLOSED_WON).length, icon: '🏆', color: 'bg-amber-50' },
  ];

  const statusDistribution = [
    { name: 'New', value: leads.filter(l => l.status === LeadStatus.NEW).length },
    { name: 'In Progress', value: leads.filter(l => l.status === LeadStatus.IN_PROGRESS).length },
    { name: 'VCVP', value: leads.filter(l => [LeadStatus.VCVP_PROPOSED, LeadStatus.VCVP_CONFIRMED].includes(l.status)).length },
    { name: 'Site Visit', value: leads.filter(l => l.status === LeadStatus.SITE_VISIT_DONE).length },
    { name: 'Closed', value: leads.filter(l => [LeadStatus.CLOSED_WON, LeadStatus.CLOSED_LOST].includes(l.status)).length },
  ];

  const performanceData = [
    { name: 'Mon', leads: 4 },
    { name: 'Tue', leads: 7 },
    { name: 'Wed', leads: 12 },
    { name: 'Thu', leads: 9 },
    { name: 'Fri', leads: 15 },
    { name: 'Sat', leads: 8 },
    { name: 'Sun', leads: 5 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className={`p-4 rounded-xl text-2xl ${stat.color}`}>{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Lead Inflow Trend</h3>
            <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Pipeline Breakdown</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {statusDistribution.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Pending Actions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="pb-3 font-semibold">Lead Name</th>
                <th className="pb-3 font-semibold">Requirement</th>
                <th className="pb-3 font-semibold">Next Contact</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leads.filter(l => l.actionPending).slice(0, 5).map(lead => (
                <tr key={lead.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 font-medium text-gray-900">{lead.name}</td>
                  <td className="py-4 text-sm text-gray-600">{lead.notes.substring(0, 30)}...</td>
                  <td className="py-4 text-sm text-gray-600">
                    {lead.nextContactDate ? new Date(lead.nextContactDate).toLocaleDateString() : 'TBD'}
                  </td>
                  <td className="py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                      Follow Up
                    </button>
                  </td>
                </tr>
              ))}
              {leads.filter(l => l.actionPending).length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500 italic">No pending actions for today! 🎉</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
