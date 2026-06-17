import { useState, useMemo } from 'react';
import { Partner, Booking, RevenueShare, PayoutStatus } from '../types';
import { 
  Coins, 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle, 
  RefreshCw, 
  Send,
  Zap
} from 'lucide-react';

interface RevenueSharingProps {
  partners: Partner[];
  commissionPercentage: number; // dynamically linked to settings!
  onDispatchedPayout: (partnerId: string) => void;
}

export default function RevenueSharingView({
  partners,
  commissionPercentage,
  onDispatchedPayout,
}: RevenueSharingProps) {
  const [selectedPayoutFilter, setSelectedPayoutFilter] = useState<string>('All');

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  // Compute platform splits based on configured commission %
  const financialTotals = useMemo(() => {
    const totalRevenue = partners.reduce((acc, p) => acc + p.revenue, 0);
    const platformRevenue = totalRevenue * (commissionPercentage / 100);
    const partnerRevenue = totalRevenue - platformRevenue;
    
    // Hardcoded dummy values representing standard pending bank payout ledger cycles
    const pendingPayout = partners.filter(p => p.status === 'Active').length * 280.0;

    return {
      totalRevenue,
      platformRevenue,
      partnerRevenue,
      pendingPayout
    };
  }, [partners, commissionPercentage]);

  // Compute individual partner splits lists
  const partnerShares: RevenueShare[] = useMemo(() => {
    return partners.map((p, idx) => {
      // Create high-fidelity individual totals
      const totalBookings = Math.round(p.revenue / 28) + 12;
      const partnerShare = p.revenue * (1 - (commissionPercentage / 100));
      const platformShare = p.revenue * (commissionPercentage / 100);
      
      // Determine logical payout status
      let payoutStatus: PayoutStatus = 'Paid';
      if (p.status === 'Suspended') {
        payoutStatus = 'Pending';
      } else if (p.id === 'PT-01' || p.id === 'PT-04') {
        payoutStatus = 'Processing';
      }

      return {
        partnerId: p.id,
        partnerName: p.name,
        totalBookings,
        totalRevenue: p.revenue,
        partnerShare,
        platformShare,
        payoutStatus
      };
    });
  }, [partners, commissionPercentage]);

  const filteredShares = useMemo(() => {
    if (selectedPayoutFilter === 'All') return partnerShares;
    return partnerShares.filter(s => s.payoutStatus === selectedPayoutFilter);
  }, [partnerShares, selectedPayoutFilter]);

  const getPayoutBadge = (status: PayoutStatus) => {
    switch (status) {
      case 'Paid':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100 font-mono">Paid</span>;
      case 'Pending':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-100 font-mono">Held / Suspended</span>;
      case 'Processing':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-850 border border-blue-150 font-mono animate-pulse">Processing</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Financial Key summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="flex justify-between items-start mb-2 text-stone-500">
            <span className="p-1.5 bg-stone-50 rounded-lg">
              <DollarSign className="w-4 h-4 text-stone-600" />
            </span>
            <span className="text-[10px] font-mono font-bold text-stone-400">LEDGER GROSS</span>
          </div>
          <p className="text-[10px] font-semibold text-stone-400 font-mono tracking-wider uppercase">Platform Gross GMV</p>
          <p className="text-xl font-bold text-stone-850 font-display mt-0.5">{formatCurrency(financialTotals.totalRevenue)}</p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#F5F1EB] p-4 rounded-xl border border-[#8B5E3C]/10 shadow-xs">
          <div className="flex justify-between items-start mb-2 text-[#8B5E3C]">
            <span className="p-1.5 bg-[#8B5E3C]/10 rounded-lg">
              <Coins className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-mono font-bold text-[#8B5E3C]">HOST SPLIT ({(100 - commissionPercentage)}%)</span>
          </div>
          <p className="text-[10px] font-semibold text-stone-500 font-mono tracking-wider uppercase">Combined Partner Yield</p>
          <p className="text-xl font-bold text-stone-850 font-display mt-0.5">{formatCurrency(financialTotals.partnerRevenue)}</p>
        </div>

        {/* Card 3 */}
        <div className="bg-stone-900 p-4 rounded-xl border border-stone-850 shadow-xs text-white">
          <div className="flex justify-between items-start mb-2 text-amber-100">
            <span className="p-1.5 bg-[#8B5E3C]/30 rounded-lg">
              <TrendingUp className="w-4 h-4 text-[#CBA081]" />
            </span>
            <span className="text-[10px] font-mono font-bold text-[#CBA081]">TAKE RATE ({commissionPercentage}%)</span>
          </div>
          <p className="text-[10px] font-semibold text-stone-400 font-mono tracking-wider uppercase">Platform Take Revenue</p>
          <p className="text-xl font-bold text-white font-display mt-0.5">{formatCurrency(financialTotals.platformRevenue)}</p>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="flex justify-between items-start mb-2 text-stone-500">
            <span className="p-1.5 bg-stone-50 rounded-lg">
              <Clock className="w-4 h-4 text-stone-605" />
            </span>
            <span className="text-[10px] font-mono text-stone-400 font-bold">NEXT PAYOUT</span>
          </div>
          <p className="text-[10px] font-semibold text-stone-400 font-mono tracking-wider uppercase">Pending clearing</p>
          <p className="text-xl font-bold text-stone-850 font-display mt-0.5">{formatCurrency(financialTotals.pendingPayout)}</p>
        </div>
      </div>

      {/* Main Breakdown Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* Table list: takes 2 cols */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-stone-200/80 p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2">
            <div>
              <h3 className="text-base font-display font-semibold text-stone-850">Revenue Allocations Ledger</h3>
              <p className="text-xs text-stone-400">List of affiliated hosts with calculated profits splits</p>
            </div>

            <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 text-xs text-stone-600">
              <span>Filter Status:</span>
              <select
                value={selectedPayoutFilter}
                onChange={(e) => setSelectedPayoutFilter(e.target.value)}
                className="bg-transparent border-none text-xs font-semibold focus:ring-0 cursor-pointer"
              >
                <option value="All">All statuses</option>
                <option value="Paid">Cleared (Paid)</option>
                <option value="Processing">Processing</option>
                <option value="Pending">Held/Suspended</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-150 text-stone-400 text-[10px] font-mono uppercase font-semibold">
                  <th className="pb-3 text-stone-500">Partner Details</th>
                  <th className="pb-3 text-center text-stone-500">Transactions</th>
                  <th className="pb-3 text-right text-stone-500">Gross Vol</th>
                  <th className="pb-3 text-right text-stone-500">Host share</th>
                  <th className="pb-3 text-right text-[#8B5E3C]">Platform Yield</th>
                  <th className="pb-3 text-center text-stone-500">Payout Status</th>
                  <th className="pb-3 text-center text-stone-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-sans">
                {filteredShares.map((share) => (
                  <tr key={share.partnerId} className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-3">
                      <p className="font-semibold text-stone-850">{share.partnerName}</p>
                      <span className="font-mono text-[9px] text-stone-400 font-bold uppercase">{share.partnerId}</span>
                    </td>
                    <td className="py-3 text-center font-mono font-medium text-stone-605">{share.totalBookings} check-ins</td>
                    <td className="py-3 text-right font-mono font-semibold text-stone-700">
                      {formatCurrency(share.totalRevenue)}
                    </td>
                    <td className="py-3 text-right font-mono font-semibold text-emerald-800">
                      {formatCurrency(share.partnerShare)}
                    </td>
                    <td className="py-3 text-right font-mono font-semibold text-[#8B5E3C]">
                      {formatCurrency(share.platformShare)}
                    </td>
                    <td className="py-3 text-center">{getPayoutBadge(share.payoutStatus)}</td>
                    <td className="py-3">
                      <div className="flex justify-center">
                        <button
                          onClick={() => {
                            if (share.payoutStatus === 'Processing') {
                              onDispatchedPayout(share.partnerId);
                            } else {
                              alert(`Manual ledger adjustment:\nHost ${share.partnerName} has current status: ${share.payoutStatus}. Continuous payout automation is routed.`);
                            }
                          }}
                          className={`
                            px-2 py-1 rounded-sm text-[9px] font-mono font-bold tracking-wider uppercase border inline-flex items-center justify-center gap-1 cursor-pointer
                            ${share.payoutStatus === 'Processing' 
                              ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600' 
                              : 'bg-stone-50 text-stone-400 border-stone-200 hover:bg-stone-100 hover:text-stone-750'
                            }
                          `}
                          title={share.payoutStatus === 'Processing' ? 'Trigger Manual Bank Release' : 'Audited details'}
                        >
                          <Send className="w-2.5 h-2.5 shrink-0" />
                          <span>Release</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Breakdown Visualization card: takes 1 col */}
        <div className="bg-stone-900 border border-stone-850 rounded-xl p-5 shadow-xs text-[#F5F1EB] space-y-4">
          <div>
            <h3 className="text-base font-semibold text-white font-display">Marginal Profit Split</h3>
            <p className="text-xs text-stone-450 font-medium">Dynamic marketplace split commission visualization</p>
          </div>

          {/* Sizable clear diagram of current commission percentages */}
          <div className="flex flex-col items-center justify-center py-6 bg-stone-950/40 rounded-xl border border-stone-850">
            <div className="relative w-36 h-36 flex items-center justify-center select-none">
              
              {/* Complex SVG Donut slice diagram math */}
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#333"
                  strokeWidth="10"
                />
                
                {/* Partner portion */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#8B5E3C"
                  strokeWidth="10"
                  strokeDasharray={`${(100 - commissionPercentage) * 2.512} 251.2`}
                  strokeLinecap="round"
                />

                {/* Platform portion */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#CBA081"
                  strokeWidth="10"
                  strokeDasharray={`${commissionPercentage * 2.512} 251.2`}
                  strokeDashoffset={`-${(100 - commissionPercentage) * 2.512}`}
                  strokeLinecap="round"
                />
              </svg>

              {/* Central text overlay */}
              <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-center items-center text-center font-display leading-tight">
                <span className="text-xs font-mono font-bold text-stone-500 uppercase tracking-widest leading-none">TAKE RATE</span>
                <span className="text-2xl font-bold text-white tracking-tight mt-0.5">{commissionPercentage}%</span>
              </div>
            </div>

            {/* Key legend */}
            <div className="w-full px-5 mt-5 space-y-2 text-[11px] font-mono font-medium">
              <div className="flex justify-between items-center bg-stone-900/60 p-2 rounded border border-stone-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#8B5E3C]" />
                  <span>Partners Split</span>
                </div>
                <span>{(100 - commissionPercentage)}%</span>
              </div>

              <div className="flex justify-between items-center bg-stone-900/60 p-2 rounded border border-stone-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#CBA081]" />
                  <span>Platform Take-Rate</span>
                </div>
                <span>{commissionPercentage}%</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-800 text-xs text-stone-400 space-y-1.5 font-sans leading-relaxed">
            <p className="font-semibold text-[#CBA081] font-display flex items-center gap-1.5 text-[11px]">
              <Zap className="w-3.5 h-3.5 fill-amber-400/20 text-amber-300" /> State Configurable Split
            </p>
            <p>Calculations on this ledger change in real-time according to settings parameters. Platform currently keeps <strong>{commissionPercentage}%</strong> of every successfully completed visitor booking session.</p>
          </div>
        </div>

      </div>

    </div>
  );
}
