import { useState, useMemo } from 'react';
import { User, UserStatus } from '../types';
import { 
  Users, 
  Search, 
  Mail, 
  Calendar, 
  CreditCard, 
  Clock, 
  X, 
  AlertTriangle, 
  Eye, 
  UserPlus, 
  UserMinus, 
  CheckCircle, 
  Smile,
  Frown
} from 'lucide-react';

interface UserManagementProps {
  users: User[];
  onToggleUserStatus: (id: string, newStatus: UserStatus) => void;
}

export default function UserManagementView({
  users,
  onToggleUserStatus,
}: UserManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  
  // Modal state
  const [inspectUser, setInspectUser] = useState<User | null>(null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesText = 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = selectedStatus === 'All' || u.status === selectedStatus;
      return matchesText && matchesStatus;
    });
  }, [users, searchTerm, selectedStatus]);

  return (
    <div className="space-y-6">
      
      {/* Search Toolbar */}
      <div className="bg-white rounded-xl border border-stone-200/80 p-4 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-stone-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search remote workers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] focus:border-[#8B5E3C] text-stone-850"
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none text-stone-605 cursor-pointer font-medium"
        >
          <option value="All">All statuses</option>
          <option value="Active">Active accounts</option>
          <option value="Suspended">Suspended accounts</option>
        </select>
      </div>

      {/* Main Table Register */}
      <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse pb-4">
            <thead>
              <tr className="border-b border-stone-150 text-stone-400 text-[10px] font-mono uppercase tracking-wider select-none">
                <th className="pb-3 text-stone-500">Workspace Customer</th>
                <th className="pb-3 text-stone-500">Contact Route</th>
                <th className="pb-3 text-stone-500">Date Commissioned</th>
                <th className="pb-3 text-center text-stone-500">Total Bookings</th>
                <th className="pb-3 text-right text-stone-500 font-mono">Gross Spent</th>
                <th className="pb-3 text-stone-500">Audit Last Active</th>
                <th className="pb-3 text-center text-stone-500">Status</th>
                <th className="pb-3 text-center text-stone-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="py-3.5 flex items-center gap-3">
                    <img 
                      src={u.avatar} 
                      alt={u.name} 
                      className="w-9 h-9 rounded-full object-cover border border-stone-150" 
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-semibold text-stone-850">{u.name}</p>
                      <span className="font-mono text-[9px] text-stone-400 font-bold uppercase">{u.id}</span>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <a href={`mailto:${u.email}`} className="text-stone-600 hover:underline inline-flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <span>{u.email}</span>
                    </a>
                  </td>
                  <td className="py-3.5 text-stone-500 font-mono">{u.joinedDate}</td>
                  <td className="py-3.5 text-center font-mono font-medium text-stone-700">{u.totalBookings} times</td>
                  <td className="py-3.5 text-right font-mono font-bold text-stone-855">
                    {formatCurrency(u.totalSpent)}
                  </td>
                  <td className="py-3.5 text-stone-500 text-[11px] whitespace-nowrap">
                    <div className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-stone-400" />
                      <span>{u.lastActivity}</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase tracking-wider border shadow-3xs ${
                      u.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-250' 
                        : 'bg-rose-50 text-rose-800 border-rose-250'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setInspectUser(u)}
                        className="p-1.5 border border-stone-200 bg-white hover:bg-stone-50 text-stone-605 rounded-md transition-colors cursor-pointer"
                        title="Vetting Customer Profile"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onToggleUserStatus(u.id, u.status === 'Active' ? 'Suspended' : 'Active')}
                        className={`p-1.5 border rounded-md transition-colors cursor-pointer ${
                          u.status === 'Active'
                            ? 'border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-100'
                            : 'border-emerald-100 bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                        }`}
                        title={u.status === 'Active' ? 'Suspend customer' : 'Activate customer'}
                      >
                        {u.status === 'Active' ? <UserMinus className="w-3.5 h-3.5 animate-pulse" /> : <UserPlus className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ----------------- MODAL - CUSTOMER PROFILE DETAIL ----------------- */}
      {inspectUser && (
        <div className="fixed inset-0 bg-stone-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-sm w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 p-6 space-y-5">
            
            <div className="flex justify-between items-start border-b border-stone-105 pb-3">
              <div className="flex items-center gap-3">
                <img 
                  src={inspectUser.avatar} 
                  alt={inspectUser.name} 
                  className="w-12 h-12 rounded-full object-cover border border-stone-200" 
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-display font-semibold text-stone-850 text-sm">{inspectUser.name}</h3>
                  <p className="text-[10px] text-stone-400 font-mono tracking-wide">{inspectUser.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setInspectUser(null)}
                className="p-1 border border-stone-200 hover:bg-stone-50 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Account general status */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                <p className="text-stone-400 text-[9px] uppercase font-bold">Billing ID</p>
                <p className="text-stone-700 font-sans font-medium mt-0.5 truncate">{inspectUser.email.split('@')[0]}</p>
              </div>

              <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                <p className="text-stone-400 text-[9px] uppercase font-bold">Vetted Status</p>
                <p className={`font-sans font-semibold mt-0.5 ${inspectUser.status === 'Active' ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {inspectUser.status}
                </p>
              </div>
            </div>

            {/* Platform statistics */}
            <div className="p-4 bg-[#F5F1EB] rounded-xl border border-[#8B5E3C]/10 text-stone-800 flex justify-between items-center text-xs">
              <div>
                <p className="text-stone-450 uppercase font-mono text-[9px] font-bold">Platform bookings</p>
                <p className="text-lg font-bold font-sans mt-0.5 text-stone-850">{inspectUser.totalBookings} check-ins</p>
              </div>

              <div className="text-right">
                <p className="text-stone-450 uppercase font-mono text-[9px] font-bold">Spent Gross value</p>
                <p className="text-lg font-bold font-sans mt-0.5 text-[#8B5E3C]">{formatCurrency(inspectUser.totalSpent)}</p>
              </div>
            </div>

            {/* Quick history timeline audit */}
            <div className="space-y-2 text-xs">
              <p className="text-stone-450 uppercase font-mono text-[9px] font-bold tracking-widest border-b border-stone-100 pb-1">Safety & Activity Record</p>
              <div className="bg-stone-50 rounded-lg p-3 text-stone-605 space-y-1.5 font-sans leading-relaxed">
                <div className="flex justify-between items-center">
                  <span>Joined Marketplace:</span>
                  <span className="font-mono text-stone-800">{inspectUser.joinedDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Session Scan Integrity:</span>
                  <span className="font-mono text-emerald-700 flex items-center gap-1 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" /> 100% Verified
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#8B5E3C] font-semibold pt-1 border-t border-stone-200 text-[11px]">
                  <span>Operational Action:</span>
                  <span>System approved access</span>
                </div>
              </div>
            </div>

            {/* Suspends override action inside inspect modal */}
            <div className="flex justify-between pt-3 border-t border-stone-100">
              <button
                onClick={() => {
                  const newS = inspectUser.status === 'Active' ? 'Suspended' : 'Active';
                  onToggleUserStatus(inspectUser.id, newS);
                  setInspectUser({ ...inspectUser, status: newS });
                }}
                className={`
                  px-3.5 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer border
                  ${inspectUser.status === 'Active' 
                    ? 'border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-100'
                    : 'border-emerald-100 bg-emerald-50 text-emerald-605 hover:bg-emerald-100'
                  }
                `}
              >
                {inspectUser.status === 'Active' ? (
                  <>
                    <Frown className="w-3.5 h-3.5" />
                    <span>Suspend Customer</span>
                  </>
                ) : (
                  <>
                    <Smile className="w-3.5 h-3.5" />
                    <span>Authorize Customer</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setInspectUser(null)}
                className="px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 text-xs font-semibold shadow-xs cursor-pointer"
              >
                Close Folder
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
