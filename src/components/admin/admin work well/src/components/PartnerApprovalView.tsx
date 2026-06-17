import { useState } from 'react';
import { PartnerApproval } from '../types';
import { 
  Building2, 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  FileText, 
  CheckCircle, 
  X, 
  AlertCircle, 
  Check, 
  HelpCircle, 
  Camera, 
  Eye, 
  Sparkles 
} from 'lucide-react';

interface PartnerApprovalProps {
  approvals: PartnerApproval[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function PartnerApprovalView({
  approvals,
  onApprove,
  onReject,
}: PartnerApprovalProps) {
  
  // Slideover or sub modal state
  const [selectedApproval, setSelectedApproval] = useState<PartnerApproval | null>(null);

  const pendingApprovals = approvals.filter(a => a.status === 'Pending');
  const pastApprovals = approvals.filter(a => a.status !== 'Pending');

  return (
    <div className="space-y-6">
      
      {/* Dynamic Counter Banner Card */}
      <div className="p-6 bg-[#F5F1EB] rounded-2xl border border-[#8B5E3C]/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#8B5E3C]">PARTNER INTAK REGISTER</span>
          <h2 className="text-lg font-display font-bold text-stone-900 mt-1">Pending Business Applications</h2>
          <p className="text-xs text-stone-500 max-w-xl">Review and verify submitted commercial tenant agreements, general liability insurance PDF submissions, and physical photos of potential coffee shop workspace environments.</p>
        </div>

        <div className="shrink-0 bg-[#8B5E3C] text-white px-5 py-3 rounded-xl border border-[#724a2f] shadow-sm font-mono text-center">
          <p className="text-[9px] font-semibold text-amber-100 uppercase tracking-wider">Awaiting review</p>
          <p className="text-2xl font-bold font-sans mt-0.5">{pendingApprovals.length}</p>
        </div>
      </div>

      {pendingApprovals.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pendingApprovals.map((ap) => (
            <div key={ap.id} className="bg-white rounded-xl border border-stone-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4">
              
              <div className="space-y-3">
                {/* Proposed venue header image */}
                <div className="relative h-40 w-full bg-stone-100 rounded-lg overflow-hidden border border-stone-200">
                  <img 
                    src={ap.photoUrl} 
                    alt={ap.businessName} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#333333]/90 text-[#F5F1EB] text-[9px] font-mono tracking-widest uppercase border border-stone-700 font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 backdrop-blur-xs">
                    <Camera className="w-3.5 h-3.5 text-[#CBA081]" />
                    <span>Submitted Venue Proposal</span>
                  </div>
                </div>

                {/* Partner Details */}
                <div className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-semibold text-stone-850 font-display">{ap.businessName}</h3>
                    <span className="text-[10px] font-mono text-stone-400 font-bold">{ap.id}</span>
                  </div>
                  <p className="text-xs text-stone-500 italic max-w-lg leading-relaxed">&ldquo;{ap.description}&rdquo;</p>
                </div>

                {/* Owner & contact cards */}
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-stone-55 border border-stone-100 p-2.5 rounded-lg font-mono">
                  <div>
                    <span className="text-stone-400 block text-[9px] uppercase font-bold">Authorized Agent</span>
                    <span className="font-sans font-medium text-stone-800">{ap.ownerName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[9px] uppercase font-bold">In-Person Address</span>
                    <span className="font-sans font-medium text-stone-600 truncate block text-[10px]" title={ap.address}>
                      {ap.address.split(',')[0]}
                    </span>
                  </div>
                </div>

                {/* Submitted Legal Documents stack list */}
                <div className="space-y-1.5">
                  <label className="block text-stone-450 uppercase font-mono tracking-widest text-[9px]">Submitted Legal Documents</label>
                  <div className="space-y-1">
                    {ap.submittedDocuments.map((doc, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-stone-50 p-2 rounded-md border border-stone-150">
                        <div className="flex items-center gap-2 text-[11px] truncate text-stone-700">
                          <FileText className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span className="truncate font-medium">{doc.name}</span>
                          <span className="text-[9px] text-stone-400 font-mono">({doc.size})</span>
                        </div>
                        <span className={`inline-flex px-1.5 py-0.5 rounded-xs text-[8px] font-bold font-mono tracking-wider border shadow-3xs ${
                          doc.status === 'Verified' 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-100' 
                            : 'bg-amber-50 text-amber-800 border-amber-100'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Proposed metrics */}
                <div className="bg-[#F5F1EB]/50 border border-[#8B5E3C]/10 rounded-lg p-3 text-[11px] space-y-1.5">
                  <p className="font-bold text-[#8B5E3C] uppercase text-[9px] font-mono tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Proposed Launch Catalog Item
                  </p>
                  <p className="text-stone-800 font-semibold font-display">{ap.workspaceDetails.proposedName}</p>
                  <div className="flex gap-4 text-stone-550 font-mono text-[10px]">
                    <span>Capacity: {ap.workspaceDetails.capacity} Desk Units</span>
                    <span>Target Rate: ${ap.workspaceDetails.proposedPrice}/hour</span>
                  </div>
                </div>
              </div>

              {/* Main Intake Action Buttons */}
              <div className="flex gap-2 pt-2 border-t border-stone-100">
                <button
                  onClick={() => onApprove(ap.id)}
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Verify & Approve Host</span>
                </button>
                
                <button
                  onClick={() => onReject(ap.id)}
                  className="px-4 py-2 border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>

                <button
                  onClick={() => setSelectedApproval(ap)}
                  className="px-2.5 py-2 border border-stone-250 hover:bg-stone-50 text-stone-605 rounded-lg inline-flex items-center justify-center transition-colors cursor-pointer"
                  title="Inspected Complete Dossier"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-stone-200 p-8">
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3 stroke-[1.5]" />
          <h3 className="text-base font-display font-semibold text-stone-800">Clean Application Intake Deck</h3>
          <p className="text-xs text-stone-405 mt-1 max-w-sm mx-auto">There are zero pending workspace submissions requiring security vetting. Good job keeping the deck cleared!</p>
        </div>
      )}

      {/* Historical Verification Audits */}
      {pastApprovals.length > 0 && (
        <div className="bg-white rounded-xl border border-stone-200/80 p-5 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-stone-850 font-display">Historical Host Verification Audits</h3>
            <p className="text-xs text-stone-400">Past decisions track logs</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-100 text-stone-400 text-[9px] font-mono uppercase font-semibold">
                  <th className="pb-2">Business Name</th>
                  <th className="pb-2">Vetting Officer</th>
                  <th className="pb-2">Proposed Space</th>
                  <th className="pb-2 text-center">Decisions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {pastApprovals.map((p) => (
                  <tr key={p.id} className="text-stone-605">
                    <td className="py-2.5 font-semibold text-stone-800">{p.businessName}</td>
                    <td className="py-2.5 font-mono">{p.ownerName} &bull; {p.email}</td>
                    <td className="py-2.5 font-medium">{p.workspaceDetails.proposedName}</td>
                    <td className="py-2.5 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold font-mono tracking-wider border uppercase shadow-3xs ${
                        p.status === 'Approved' 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-100' 
                          : 'bg-rose-50 text-rose-800 border-rose-100'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------- MODAL - FULL DOCUMENTS LEGAL DOSSIER ----------------- */}
      {selectedApproval && (
        <div className="fixed inset-0 bg-stone-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-stone-900 border border-stone-850 rounded-2xl text-[#F5F1EB] max-w-lg w-full overflow-hidden shadow-2xl p-6 space-y-5">
            
            <div className="flex justify-between items-start border-b border-stone-800 pb-3">
              <div>
                <span className="text-[10px] text-[#CBA081] font-mono tracking-widest uppercase">In-Depth Verification Dossier</span>
                <h3 className="text-base font-semibold text-white font-display mt-0.5">{selectedApproval.businessName}</h3>
              </div>
              <button 
                onClick={() => setSelectedApproval(null)}
                className="p-1 border border-stone-800 bg-stone-950 rounded-lg text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <h4 className="text-stone-500 font-mono uppercase text-[9px] font-bold">Commercial Statement</h4>
                <p className="text-stone-300 leading-relaxed bg-stone-950/40 p-3 rounded-lg border border-stone-850">
                  {selectedApproval.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-stone-500 font-mono uppercase text-[9px] font-bold">Security Legal Verification checklist</h4>
                
                <div className="space-y-2 font-mono">
                  <div className="flex justify-between items-center p-2.5 bg-stone-950/50 border border-stone-850 rounded-lg">
                    <span className="text-[11px] text-stone-300">County Commercial Zoning Clearance</span>
                    <span className="inline-flex px-1.5 py-0.5 rounded-sm text-[8px] font-bold bg-[#E8F5E9]/10 text-emerald-400 border border-emerald-900">VERIFIED</span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 bg-stone-950/50 border border-stone-850 rounded-lg">
                    <span className="text-[11px] text-stone-300">Liability General Insurance Block Receipt</span>
                    <span className="inline-flex px-1.5 py-0.5 rounded-sm text-[8px] font-bold bg-[#E8F5E9]/10 text-emerald-400 border border-emerald-900">VERIFIED</span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 bg-stone-950/50 border border-stone-850 rounded-lg">
                    <span className="text-[11px] text-stone-300">High-Speed Broadband Speedtest upload speed (100Mbps)</span>
                    <span className="inline-flex px-1.5 py-0.5 rounded-sm text-[8px] font-bold bg-[#FFF3E0]/10 text-amber-400 border border-amber-900">PENDING AUDIT</span>
                  </div>
                </div>
              </div>

              {/* Physical details block */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs border-t border-b border-stone-800 py-3 font-mono">
                <div>
                  <span className="text-stone-500 block text-[9px] uppercase font-bold">Rooms proposed</span>
                  <span className="text-white font-sans font-bold">1</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[9px] uppercase font-bold">Combined Desk spots</span>
                  <span className="text-white font-sans font-bold">{selectedApproval.workspaceDetails.capacity}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[9px] uppercase font-bold">Proposed Hourly fee</span>
                  <span className="text-white font-sans font-bold">${selectedApproval.workspaceDetails.proposedPrice}/hr</span>
                </div>
              </div>
            </div>

            {/* Quick response buttons */}
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setSelectedApproval(null)}
                className="px-4 py-2 border border-stone-800 rounded-lg hover:bg-stone-800 text-stone-300 text-xs font-semibold cursor-pointer"
              >
                Close Folder
              </button>
              
              <button
                onClick={() => {
                  onApprove(selectedApproval.id);
                  setSelectedApproval(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Verify & Approved
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
