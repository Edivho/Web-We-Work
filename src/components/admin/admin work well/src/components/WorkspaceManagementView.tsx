import React, { useState, useMemo } from 'react';
import { Workspace, WorkspaceStatus } from '../types';
import { 
  Building2, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Armchair, 
  DollarSign, 
  FileText, 
  MapPin, 
  Users, 
  Eye, 
  Grid, 
  List, 
  Sparkles, 
  CheckCircle2, 
  X,
  Lock,
  Unlock
} from 'lucide-react';

interface WorkspaceManagementViewProps {
  workspaces: Workspace[];
  partnersList: { id: string; name: string }[];
  onAddWorkspace: (ws: Omit<Workspace, 'bookingsCount' | 'revenue' | 'occupancyRate'>) => void;
  onEditWorkspace: (ws: Workspace) => void;
  onToggleStatus: (id: string) => void;
  onDeleteWorkspace: (id: string) => void;
}

export default function WorkspaceManagementView({
  workspaces,
  partnersList,
  onAddWorkspace,
  onEditWorkspace,
  onToggleStatus,
  onDeleteWorkspace
}: WorkspaceManagementViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modal forms states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingWs, setEditingWs] = useState<Workspace | null>(null);

  // Form states (Add/Edit)
  const [formName, setFormName] = useState('');
  const [formPartnerId, setFormPartnerId] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formCapacity, setFormCapacity] = useState(1);
  const [formPrice, setFormPrice] = useState(10.0);
  const [formStatus, setFormStatus] = useState<WorkspaceStatus>('Active');
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80');

  // Filter workspaces
  const filteredWorkspaces = useMemo(() => {
    return workspaces.filter(ws => {
      const matchesSearch = 
        ws.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ws.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ws.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === 'All' || ws.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [workspaces, searchTerm, selectedStatus]);

  // Open Edit Form
  const triggerEdit = (ws: Workspace) => {
    setEditingWs(ws);
    setFormName(ws.name);
    
    // Find active partner id
    const foundPartner = partnersList.find(p => p.name === ws.partnerName);
    setFormPartnerId(foundPartner?.id || partnersList[0]?.id || '');
    setFormLocation(ws.location);
    setFormCapacity(ws.capacity);
    setFormPrice(ws.price);
    setFormStatus(ws.status);
    setFormImage(ws.image);
    setIsEditOpen(true);
  };

  const triggerAdd = () => {
    setFormName('');
    setFormPartnerId(partnersList[0]?.id || '');
    setFormLocation('Downtown San Francisco, CA');
    setFormCapacity(1);
    setFormPrice(12.5);
    setFormStatus('Active');
    setFormImage('https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&auto=format&fit=crop&q=80');
    setIsAddOpen(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const partnerObj = partnersList.find(p => p.id === formPartnerId);
    if (!formName || !partnerObj) return;

    onAddWorkspace({
      id: `WS-00${workspaces.length + 1}`,
      name: formName,
      partnerName: partnerObj.name,
      location: formLocation,
      capacity: formCapacity,
      price: formPrice,
      status: formStatus,
      image: formImage
    });

    setIsAddOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const partnerObj = partnersList.find(p => p.id === formPartnerId);
    if (!editingWs || !partnerObj) return;

    onEditWorkspace({
      ...editingWs,
      name: formName,
      partnerName: partnerObj.name,
      location: formLocation,
      capacity: formCapacity,
      price: formPrice,
      status: formStatus,
      image: formImage
    });

    setIsEditOpen(false);
    setEditingWs(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Control Utility Toolbar */}
      <div className="bg-white rounded-xl border border-stone-200/80 p-4 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-3">
        
        {/* Search & filtering */}
        <div className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto flex-1">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-stone-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by workspace name, host..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] focus:border-[#8B5E3C] text-stone-805"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none text-stone-605 cursor-pointer font-medium"
          >
            <option value="All">All statuses</option>
            <option value="Active">Active only</option>
            <option value="Inactive">Inactive only</option>
          </select>
        </div>

        {/* View Layout Toggle & Add Button */}
        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
          <div className="flex border border-stone-250 bg-stone-50 rounded-lg p-0.5 max-sm:hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md cursor-pointer ${viewMode === 'grid' ? 'bg-[#8B5E3C] text-white shadow-xs' : 'text-stone-500 hover:bg-stone-100'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md cursor-pointer ${viewMode === 'list' ? 'bg-[#8B5E3C] text-white shadow-xs' : 'text-stone-500 hover:bg-stone-100'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={triggerAdd}
            className="w-full sm:w-auto px-4 py-2 bg-[#8B5E3C] hover:bg-[#724a2f] text-[#F5F1EB] rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Workspace Unit</span>
          </button>
        </div>
      </div>

      {/* Grid Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkspaces.map((ws) => (
            <div 
              key={ws.id} 
              className={`
                bg-white border rounded-xl overflow-hidden shadow-xs transition-transform duration-200 hover:-translate-y-0.5 flex flex-col justify-between
                ${ws.status === 'Inactive' ? 'border-dashed border-stone-300 opacity-75' : 'border-stone-200/80'}
              `}
            >
              <div>
                <div className="relative h-44 w-full bg-stone-100">
                  <img 
                    src={ws.image} 
                    alt={ws.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Status Overlay Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold font-mono tracking-wider uppercase border shadow-sm ${
                      ws.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                        : 'bg-stone-100 text-stone-650 border-stone-250'
                    }`}>
                      {ws.status}
                    </span>
                  </div>

                  {/* Hourly Rate Overlay */}
                  <div className="absolute bottom-3 left-3 bg-[#333333]/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-xs font-mono font-bold border border-stone-700">
                    ${ws.price}/hr
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <p className="text-[10px] font-semibold text-[#8B5E3C] tracking-wide uppercase font-mono">{ws.id}</p>
                    <h3 className="text-sm font-semibold text-stone-850 line-clamp-1">{ws.name}</h3>
                    <p className="text-xs text-stone-500 font-medium font-display">{ws.partnerName}</p>
                  </div>

                  <div className="flex gap-4 text-stone-450 border-t border-b border-stone-100 py-2.5 text-xs font-mono">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span className="truncate max-w-[120px] font-sans text-stone-500 font-medium">{ws.location.split(',')[0]}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      <span>Cap: {ws.capacity}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary of revenue and interactive modifiers */}
              <div className="px-4 pb-4 bg-stone-50/50 pt-3 border-t border-stone-50 flex items-center justify-between">
                <div className="font-mono text-[10px]">
                  <p className="text-stone-400 uppercase font-bold tracking-tight">GROSS GENERATED</p>
                  <p className="text-xs font-bold text-stone-750 font-sans mt-0.5">${ws.revenue.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-1.5 pt-1">
                  <button
                    onClick={() => triggerEdit(ws)}
                    className="p-1.5 border border-stone-200 bg-white hover:bg-stone-100 text-stone-600 rounded-md transition-colors cursor-pointer"
                    title="Edit Unit parameters"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onToggleStatus(ws.id)}
                    className={`p-1.5 border rounded-md transition-colors cursor-pointer ${
                      ws.status === 'Active'
                        ? 'border-rose-100 bg-rose-50/50 hover:bg-rose-100 text-rose-600'
                        : 'border-emerald-100 bg-emerald-50/50 hover:bg-emerald-100 text-emerald-600'
                    }`}
                    title={ws.status === 'Active' ? 'Disable space unit' : 'Enable space unit'}
                  >
                    {ws.status === 'Active' ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to permanently delete workspace ${ws.id}? This will remove it from search queries.`)) {
                        onDeleteWorkspace(ws.id);
                      }
                    }}
                    className="p-1.5 border border-rose-200 hover:bg-rose-50 text-rose-500 rounded-md transition-colors cursor-pointer"
                    title="Delete space unit"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List (Table) Mode */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-150 text-stone-400 text-[10px] font-mono uppercase tracking-wider select-none">
                  <th className="pb-3 font-semibold text-stone-500">Image & Name</th>
                  <th className="pb-3 font-semibold text-stone-500">Host Partner</th>
                  <th className="pb-3 font-semibold text-stone-500">Location</th>
                  <th className="pb-3 font-semibold text-stone-500 text-center">Capacity</th>
                  <th className="pb-3 font-semibold text-stone-500 text-right">Price/hr</th>
                  <th className="pb-3 font-semibold text-stone-500 text-right">Bookings</th>
                  <th className="pb-3 font-semibold text-stone-500 text-center">Status</th>
                  <th className="pb-3 font-semibold text-stone-500 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs">
                {filteredWorkspaces.map((ws) => (
                  <tr key={ws.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-3 flex items-center gap-3">
                      <img 
                        src={ws.image} 
                        alt={ws.name} 
                        className="w-10 h-10 object-cover rounded-lg border border-stone-100 shadow-3xs" 
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-semibold text-stone-850">{ws.name}</p>
                        <span className="font-mono text-[9px] font-bold text-[#8B5E3C] bg-[#F5F1EB] px-1.5 py-0.5 rounded-sm">{ws.id}</span>
                      </div>
                    </td>
                    <td className="py-3 font-medium text-stone-600">{ws.partnerName}</td>
                    <td className="py-3 text-stone-500 font-display font-medium">{ws.location}</td>
                    <td className="py-3 text-center text-stone-605 font-mono">{ws.capacity} guests</td>
                    <td className="py-3 text-right font-mono font-bold text-stone-800">${ws.price}</td>
                    <td className="py-3 text-right font-mono text-stone-605">{ws.bookingsCount}</td>
                    <td className="py-3 text-center">
                      <span className={`inline-flex px-1.5 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase tracking-wider border shadow-sm ${
                        ws.status === 'Active' 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                          : 'bg-stone-50 text-stone-500 border-stone-200'
                      }`}>
                        {ws.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => triggerEdit(ws)}
                          className="p-1 border border-stone-200 bg-white hover:bg-stone-100 text-stone-600 rounded-md transition-colors cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onToggleStatus(ws.id)}
                          className="p-1 border border-stone-200 bg-white hover:bg-stone-150 text-stone-605 rounded-md transition-colors cursor-pointer"
                        >
                          {ws.status === 'Active' ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------- MODAL DRAWER - ADD WORKSPACE ----------------- */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-stone-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-stone-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#CBA081]" />
                <h3 className="font-display font-semibold text-sm">Add New Workspace Unit</h3>
              </div>
              <button 
                onClick={() => setIsAddOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-5 space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="block font-semibold text-stone-605 uppercase font-mono tracking-wider text-[9px]">Workspace Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Quiet Flex Desk B - SOMA"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-250 bg-stone-50 hover:bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] focus:bg-white focus:border-[#8B5E3C] text-stone-850"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-stone-605 uppercase font-mono tracking-wider text-[9px]">Associated Partner Hub</label>
                <select
                  value={formPartnerId}
                  onChange={(e) => setFormPartnerId(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-250 bg-stone-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] text-stone-850 cursor-pointer"
                >
                  {partnersList.map((pr) => (
                    <option key={pr.id} value={pr.id}>{pr.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-stone-605 uppercase font-mono tracking-wider text-[9px]">Street Address / City</label>
                <input
                  type="text"
                  required
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-250 bg-stone-50 rounded-lg focus:outline-none text-stone-850"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-semibold text-stone-605 uppercase font-mono tracking-wider text-[9px]">Hourly Rate ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-stone-250 bg-stone-50 rounded-lg focus:outline-none text-stone-850"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-stone-605 uppercase font-mono tracking-wider text-[9px]">Max Guest Capacity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formCapacity}
                    onChange={(e) => setFormCapacity(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-stone-250 bg-stone-50 rounded-lg focus:outline-none text-stone-850"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-stone-605 uppercase font-mono tracking-wider text-[9px]">Workspace Unsplash Photo URL</label>
                <input
                  type="text"
                  required
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-250 bg-stone-50 rounded-lg focus:outline-none text-stone-850 font-mono text-[10px]"
                />
              </div>

              <div className="pt-4 border-t border-stone-100 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 border border-stone-250 rounded-lg hover:bg-stone-100 text-stone-600 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#8B5E3C] hover:bg-[#724a2f] text-white rounded-lg font-semibold shadow-xs cursor-pointer"
                >
                  Submit Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- MODAL DRAWER - EDIT WORKSPACE ----------------- */}
      {isEditOpen && editingWs && (
        <div className="fixed inset-0 bg-stone-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-[#8B5E3C] text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-amber-100" />
                <h3 className="font-display font-semibold text-sm">Edit Workspace: {editingWs.id}</h3>
              </div>
              <button 
                onClick={() => {
                  setIsEditOpen(false);
                  setEditingWs(null);
                }}
                className="text-stone-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-5 space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="block font-semibold text-stone-605 uppercase font-mono tracking-wider text-[9px]">Workspace Title</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-250 bg-stone-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] text-stone-850"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-[#8B5E3C] uppercase font-mono tracking-wider text-[9px]">Hub Partner Affiliate</label>
                <select
                  value={formPartnerId}
                  onChange={(e) => setFormPartnerId(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-250 bg-stone-50 rounded-lg focus:outline-none text-stone-850 cursor-pointer text-xs"
                >
                  {partnersList.map((pr) => (
                    <option key={pr.id} value={pr.id}>{pr.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-stone-605 uppercase font-mono tracking-wider text-[9px]">Full Address Location</label>
                <input
                  type="text"
                  required
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-250 bg-stone-50 rounded-lg focus:outline-none text-stone-850"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-semibold text-stone-605 uppercase font-mono tracking-wider text-[9px]">Hourly Fare ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-stone-250 bg-stone-50 rounded-lg focus:outline-none text-stone-850"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-stone-605 uppercase font-mono tracking-wider text-[9px]">Max Desk Capacity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formCapacity}
                    onChange={(e) => setFormCapacity(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-stone-250 bg-stone-50 rounded-lg focus:outline-none text-stone-850"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-1">
                <label className="block font-semibold text-stone-605 uppercase font-mono tracking-wider text-[9px]">Unit Operating Status</label>
                <div className="flex gap-4 items-center pt-1">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="formStatus"
                      checked={formStatus === 'Active'}
                      onChange={() => setFormStatus('Active')}
                      className="text-[#8B5E3C] focus:ring-[#8B5E3C]"
                    />
                    <span>Active In Catalog</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="formStatus"
                      checked={formStatus === 'Inactive'}
                      onChange={() => setFormStatus('Inactive')}
                      className="text-[#8B5E3C] focus:ring-[#8B5E3C]"
                    />
                    <span>Temporarily Disabled</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-stone-605 uppercase font-mono tracking-wider text-[9px]">Workspace Photo URL</label>
                <input
                  type="text"
                  required
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-250 bg-stone-50 rounded-lg focus:outline-none text-stone-850 font-mono text-[10px]"
                />
              </div>

              <div className="pt-4 border-t border-stone-100 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditOpen(false);
                    setEditingWs(null);
                  }}
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
