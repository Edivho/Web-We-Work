import React, { useState, useMemo } from 'react';
import { Partner, PartnerStatus } from '../types';
import { 
  Building2, 
  Search, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Coins, 
  Sparkles, 
  X, 
  AlertTriangle, 
  Eye, 
  UserX, 
  UserCheck, 
  Edit3 
} from 'lucide-react';

interface PartnerManagementProps {
  partners: Partner[];
  workspacesCountByPartner: Record<string, number>;
  onTogglePartnerStatus: (id: string, newStatus: PartnerStatus) => void;
  onEditPartner: (partner: Partner) => void;
}

export default function PartnerManagementView({
  partners,
  workspacesCountByPartner,
  onTogglePartnerStatus,
  onEditPartner
}: PartnerManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  
  // Selected partner modal detail
  const [detailPartner, setDetailPartner] = useState<Partner | null>(null);
  
  // Edit form modal
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [editName, setEditName] = useState('');
  const [editOwner, setEditOwner] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editLocation, setEditLocation] = useState('');

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const filteredPartners = useMemo(() => {
    return partners.filter(p => {
      const matchText = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = selectedStatus === 'All' || p.status === selectedStatus;
      return matchText && matchStatus;
    });
  }, [partners, searchTerm, selectedStatus]);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPartner) return;

    onEditPartner({
      ...editingPartner,
      name: editName,
      ownerName: editOwner,
      email: editEmail,
      phone: editPhone,
      location: editLocation
    });

    setEditingPartner(null);
  };

  const openEditModal = (p: Partner) => {
    setEditingPartner(p);
    setEditName(p.name);
    setEditOwner(p.ownerName);
    setEditEmail(p.email);
    setEditPhone(p.phone);
    setEditLocation(p.location);
  };

  return (
    <div className="space-y-6">
      
      {/* Search and control bar */}
      <div className="bg-white rounded-xl border border-stone-200/80 p-4 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-stone-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, owner, email..."
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
          <option value="Active">Active only</option>
          <option value="Suspended">Suspended only</option>
          <option value="PendingApproval">Pending approval only</option>
        </select>
      </div>

      {/* Main Table Register */}
      <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-150 text-stone-400 text-[10px] font-mono uppercase tracking-wider select-none">
                <th className="pb-3 font-semibold text-stone-500">Partner Brand</th>
                <th className="pb-3 font-semibold text-stone-500">Authorized Owner</th>
                <th className="pb-3 font-semibold text-stone-500">Location</th>
                <th className="pb-3 font-semibold text-stone-500 text-center">Workspaces Owned</th>
                <th className="pb-3 font-semibold text-stone-500 text-right">Gross GMV Yield</th>
                <th className="pb-3 font-semibold text-stone-500 text-center">Status</th>
                <th className="pb-3 font-semibold text-stone-500 text-center">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs">
              {filteredPartners.map((pt) => {
                const workspacesCount = workspacesCountByPartner[pt.name] || pt.workspaceCount;
                return (
                  <tr key={pt.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-3.5 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 text-[#F5F1EB] font-bold text-xs flex items-center justify-center font-display shadow-2xs">
                        {pt.logo}
                      </div>
                      <div>
                        <p className="font-semibold text-stone-850">{pt.name}</p>
                        <p className="text-[10px] text-stone-400 font-mono">{pt.id} &bull; Joined {pt.dateJoined}</p>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <div>
                        <p className="font-semibold text-stone-800">{pt.ownerName}</p>
                        <p className="text-[10px] text-stone-450 font-mono">{pt.email}</p>
                      </div>
                    </td>
                    <td className="py-3.5 text-stone-500 font-medium font-display">{pt.location}</td>
                    <td className="py-3.5 text-center font-mono font-medium text-stone-700">{workspacesCount} rooms</td>
                    <td className="py-3.5 text-right font-mono font-bold text-stone-900">{formatCurrency(pt.revenue)}</td>
                    <td className="py-3.5 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase tracking-wider border shadow-3xs ${
                        pt.status === 'Active' 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-250' 
                          : pt.status === 'Suspended'
                          ? 'bg-rose-50 text-rose-800 border-rose-250'
                          : 'bg-amber-50 text-amber-800 border-amber-250'
                      }`}>
                        {pt.status === 'PendingApproval' ? 'Pending' : pt.status}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setDetailPartner(pt)}
                          className="p-1.5 border border-stone-200 bg-white hover:bg-stone-50 text-stone-605 rounded-md transition-colors cursor-pointer"
                          title="View Partner Profile Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => openEditModal(pt)}
                          className="p-1.5 border border-stone-200 bg-white hover:bg-stone-50 text-stone-605 rounded-md transition-colors cursor-pointer"
                          title="Edit Personal Information"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onTogglePartnerStatus(pt.id, pt.status === 'Active' ? 'Suspended' : 'Active')}
                          className={`p-1.5 border rounded-md transition-colors cursor-pointer ${
                            pt.status === 'Active'
                              ? 'border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-100'
                              : 'border-emerald-100 bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          }`}
                          title={pt.status === 'Active' ? 'Suspend host and lock listings' : 'Activate host'}
                        >
                          {pt.status === 'Active' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ----------------- MODAL - PARTNER DETAILED VIEW ----------------- */}
      {detailPartner && (
        <div className="fixed inset-0 bg-stone-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-stone-900 text-[#F5F1EB] rounded-2xl border border-stone-800 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 p-6 space-y-6">
            
            {/* Header branding */}
            <div className="flex justify-between items-start border-b border-stone-850 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-[#8B5E3C] border border-[#8B5E3C] text-white font-bold text-sm flex items-center justify-center rounded-xl font-display">
                  {detailPartner.logo}
                </div>
                <div>
                  <h3 className="text-base font-display font-semibold text-white">{detailPartner.name}</h3>
                  <p className="text-xs text-stone-400 font-mono">UID Serial: {detailPartner.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setDetailPartner(null)}
                className="text-stone-400 hover:text-white p-1 border border-stone-800 bg-stone-950 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile body context */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-stone-950/40 p-3 rounded-lg border border-stone-850">
                <p className="text-stone-500 uppercase text-[9px] font-bold">Authorized Signee</p>
                <div className="flex items-center gap-2 mt-1 text-white font-sans font-semibold">
                  <User className="w-3.5 h-3.5 text-[#CBA081]" />
                  <span>{detailPartner.ownerName}</span>
                </div>
              </div>

              <div className="bg-stone-950/40 p-3 rounded-lg border border-stone-850">
                <p className="text-stone-500 uppercase text-[9px] font-bold">Location Jurisdiction</p>
                <div className="flex items-center gap-2 mt-1 text-white font-sans font-medium">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span className="truncate">{detailPartner.location}</span>
                </div>
              </div>

              <div className="bg-stone-950/40 p-3 rounded-lg border border-stone-850">
                <p className="text-stone-500 uppercase text-[9px] font-bold">Authorized Email</p>
                <div className="flex items-center gap-2 mt-1 text-stone-300 font-sans truncate">
                  <Mail className="w-3.5 h-3.5 text-stone-450" />
                  <span className="truncate">{detailPartner.email}</span>
                </div>
              </div>

              <div className="bg-stone-950/40 p-3 rounded-lg border border-stone-850">
                <p className="text-stone-500 uppercase text-[9px] font-bold">SMS / Phone contact</p>
                <div className="flex items-center gap-2 mt-1 text-stone-300 font-sans">
                  <Phone className="w-3.5 h-3.5 text-stone-450" />
                  <span>{detailPartner.phone}</span>
                </div>
              </div>
            </div>

            {/* Financial summaries */}
            <div className="p-4 bg-[#F5F1EB] rounded-xl border border-stone-805 text-[#333333] flex justify-between items-center">
              <div>
                <p className="text-stone-500 uppercase font-mono text-[9px] font-bold tracking-wider">Gross Co-Sharing Payouts</p>
                <p className="text-xl font-bold font-sans text-stone-905 mt-0.5">{formatCurrency(detailPartner.revenue)}</p>
              </div>

              <div className="text-right">
                <p className="text-stone-500 uppercase font-mono text-[9px] font-bold tracking-wider">Net Host Split</p>
                <p className="text-xl font-bold font-sans text-[#8B5E3C] mt-0.5">80.0% <span className="text-xs font-mono text-stone-500 font-normal">(${(detailPartner.revenue * 0.8).toLocaleString()})</span></p>
              </div>
            </div>

            {/* Catalog audit info */}
            <div className="space-y-2 text-xs">
              <p className="text-stone-500 uppercase font-mono text-[9px] font-bold tracking-widest border-b border-stone-850 pb-2">Active Workspace Footprint</p>
              <div className="bg-stone-950/50 rounded-xl p-3 border border-stone-850 space-y-2 text-stone-300">
                <div className="flex justify-between items-center text-[11px]">
                  <span>Total Rooms Owned:</span>
                  <span className="font-bold font-mono text-white">{workspacesCountByPartner[detailPartner.name] || detailPartner.workspaceCount} Rooms</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span>Date Commissioned:</span>
                  <span className="font-mono">{detailPartner.dateJoined} (SF ISO-Registry)</span>
                </div>
                <div className="flex justify-between items-center text-[11px] border-t border-stone-850 pt-2 text-[#CBA081]">
                  <span>Operational Status:</span>
                  <span className="font-bold underline uppercase">{detailPartner.status}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-stone-850">
              <button
                onClick={() => setDetailPartner(null)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-750 text-white rounded-lg font-semibold text-xs cursor-pointer shadow-xs"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- MODAL - EDIT PARTNER GENERAL INFO ----------------- */}
      {editingPartner && (
        <div className="fixed inset-0 bg-stone-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-stone-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#CBA081]" />
                <h3 className="font-display font-semibold text-sm">Edit Host Partner Info</h3>
              </div>
              <button 
                onClick={() => setEditingPartner(null)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-5 space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="block font-semibold text-stone-605 uppercase font-mono tracking-wider text-[9px]">Business Brand Title</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-250 bg-stone-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] text-stone-850"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-stone-605 uppercase font-mono tracking-wider text-[9px]">Authorized Agent Name</label>
                <input
                  type="text"
                  required
                  value={editOwner}
                  onChange={(e) => setEditOwner(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-250 bg-stone-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] text-stone-850"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-stone-605 uppercase font-mono tracking-wider text-[9px]">Registered Email</label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-250 bg-stone-50 rounded-lg focus:outline-none text-stone-850"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-stone-605 uppercase font-mono tracking-wider text-[9px]">Operator SMS / Phone</label>
                <input
                  type="text"
                  required
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-250 bg-stone-50 rounded-lg focus:outline-none text-stone-850"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-stone-605 uppercase font-mono tracking-wider text-[9px]">Regional Office location</label>
                <input
                  type="text"
                  required
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-250 bg-stone-50 rounded-lg focus:outline-none text-stone-850"
                />
              </div>

              <div className="pt-4 border-t border-stone-100 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setEditingPartner(null)}
                  className="px-4 py-2 border border-stone-250 rounded-lg hover:bg-stone-100 text-stone-600 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#8B5E3C] hover:bg-[#724a2f] text-white rounded-lg font-semibold shadow-xs cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
