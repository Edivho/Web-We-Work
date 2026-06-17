import { BarChart3, TrendingUp, Building2, Armchair, Percent, RefreshCw, Layers, ArrowUpRight, ArrowDownRight, Clock, UserCheck, CreditCard } from 'lucide-react';
import { Workspace, Booking } from '../types';
import { MONTHLY_TREND_DATA } from '../data';
import { RevenueTrendLineChart, BookingTrendBarChart } from './Charts';

interface DashboardViewProps {
  metrics: {
    totalBookings: number;
    totalBookingsChange: number;
    revenueThisMonth: number;
    revenueChange: number;
    activePartners: number;
    activePartnersChange: number;
    activeWorkspaces: number;
    activeWorkspacesChange: number;
    occupancyRate: number;
    occupancyRateChange: number;
    repeatCustomersRate: number;
    repeatCustomersRateChange: number;
  };
  topWorkspaces: Workspace[];
  recentBookings: Booking[];
  partnersCount: number;
  onNavigateToView: (view: string) => void;
  onOpenBookingDetail: (booking: Booking) => void;
}

export default function DashboardView({
  metrics,
  topWorkspaces,
  recentBookings,
  partnersCount,
  onNavigateToView,
  onOpenBookingDetail,
}: DashboardViewProps) {

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  // Modern simulated dynamic real activity log in Indonesian
  const recentActivitiesList = [
    {
      id: 'act-1',
      type: 'booking',
      title: 'Pemesanan Baru Dikonfirmasi',
      desc: 'Siti Rahma memesan Window Bench 4 di Espresso Hub.',
      time: 'Baru saja',
      color: 'bg-emerald-500/10 text-emerald-700 border-emerald-150',
      icon: CreditCard,
    },
    {
      id: 'act-2',
      type: 'partner',
      title: 'Pendaftaran Partner Diterima',
      desc: 'Sophia Lin mengunggah berkas penawaran untuk "Beanstalk Library Cafe".',
      time: '32 menit yang lalu',
      color: 'bg-amber-500/10 text-amber-700 border-amber-150',
      icon: UserCheck,
    },
    {
      id: 'act-3',
      type: 'payment',
      title: 'Bagi Hasil Otomatis Dikirim',
      desc: 'Pembagian rasio komisi sebesar Rp 91.800.000 sukses dikirim ke Velvet Drip Roasters.',
      time: '2 jam yang lalu',
      color: 'bg-blue-500/10 text-blue-700 border-blue-150',
      icon: Clock,
    },
    {
      id: 'act-4',
      type: 'booking',
      title: 'Check-In Pengguna Berhasil',
      desc: 'Hana Lestari berhasil melakukan check-in di unit WS-004 menggunakan Kode QR akses.',
      time: '4 jam yang lalu',
      color: 'bg-[#8B5E3C]/10 text-[#8B5E3C] border-stone-200',
      icon: Layers,
    },
  ];

  // Helper render for MoM changes
  const renderChange = (value: number) => {
    const isPositive = value >= 0;
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
        {isPositive ? <ArrowUpRight className="w-3 h-3 stroke-[2.5]" /> : <ArrowDownRight className="w-3 h-3 stroke-[2.5]" />}
        {isPositive ? '+' : ''}{value}% MoM
      </span>
    );
  };

  // Filter out any suspended properties for display
  const performingWorkspacesSorted = [...topWorkspaces]
    .sort((a,b) => b.revenue - a.revenue)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Platform Executive Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Card 1 */}
        <div id="kpi-total-bookings" className="bg-white p-4 rounded-xl border border-[#E8E8E8] shadow-3xs relative overflow-hidden transition-all hover:shadow-2xs group">
          <div className="flex justify-between items-start mb-2">
            <span className="p-2 bg-[#FAFAF9] rounded-lg text-stone-500 group-hover:bg-[#8B5E3C]/10 group-hover:text-[#8B5E3C] transition-colors">
              <BarChart3 className="w-4 h-4" />
            </span>
            {renderChange(metrics.totalBookingsChange)}
          </div>
          <p className="text-[10px] font-semibold text-[#8C8C8C] font-mono tracking-wider uppercase">TOTAL PEMESANAN</p>
          <p className="text-xl font-bold text-[#333333] mt-1 font-sans tracking-tight">{metrics.totalBookings.toLocaleString('id-ID')}</p>
        </div>

        {/* Card 2 */}
        <div id="kpi-revenue-month" className="bg-white p-4 rounded-xl border border-[#E8E8E8] shadow-3xs relative overflow-hidden transition-all hover:shadow-2xs group">
          <div className="flex justify-between items-start mb-2">
            <span className="p-2 bg-[#FAFAF9] rounded-lg text-stone-500 group-hover:bg-[#8B5E3C]/10 group-hover:text-[#8B5E3C] transition-colors">
              <TrendingUp className="w-4 h-4" />
            </span>
            {renderChange(metrics.revenueChange)}
          </div>
          <p className="text-[10px] font-semibold text-[#8C8C8C] font-mono tracking-wider uppercase">PENDAPATAN BULAN INI</p>
          <p className="text-lg font-bold text-[#333333] mt-1.5 font-sans tracking-tight leading-none">{formatCurrency(metrics.revenueThisMonth)}</p>
        </div>

        {/* Card 3 */}
        <div id="kpi-active-partners" className="bg-white p-4 rounded-xl border border-[#E8E8E8] shadow-3xs relative overflow-hidden transition-all hover:shadow-2xs group">
          <div className="flex justify-between items-start mb-2">
            <span className="p-2 bg-[#FAFAF9] rounded-lg text-stone-500 group-hover:bg-[#8B5E3C]/10 group-hover:text-[#8B5E3C] transition-colors">
              <Building2 className="w-4 h-4" />
            </span>
            {renderChange(metrics.activePartnersChange)}
          </div>
          <p className="text-[10px] font-semibold text-[#8C8C8C] font-mono tracking-wider uppercase">PARTNER AKTIF</p>
          <p className="text-xl font-bold text-[#333333] mt-1 font-sans tracking-tight">{partnersCount}</p>
        </div>

        {/* Card 4 */}
        <div id="kpi-active-workspaces" className="bg-white p-4 rounded-xl border border-[#E8E8E8] shadow-3xs relative overflow-hidden transition-all hover:shadow-2xs group">
          <div className="flex justify-between items-start mb-2">
            <span className="p-2 bg-[#FAFAF9] rounded-lg text-stone-500 group-hover:bg-[#8B5E3C]/10 group-hover:text-[#8B5E3C] transition-colors">
              <Armchair className="w-4 h-4" />
            </span>
            {renderChange(metrics.activeWorkspacesChange)}
          </div>
          <p className="text-[10px] font-semibold text-[#8C8C8C] font-mono tracking-wider uppercase">RUANGAN AKTIF</p>
          <p className="text-xl font-bold text-[#333333] mt-1 font-sans tracking-tight">{metrics.activeWorkspaces}</p>
        </div>

        {/* Card 5 */}
        <div id="kpi-occupancy-rate" className="bg-white p-4 rounded-xl border border-[#E8E8E8] shadow-3xs relative overflow-hidden transition-all hover:shadow-2xs group">
          <div className="flex justify-between items-start mb-2">
            <span className="p-2 bg-[#FAFAF9] rounded-lg text-stone-500 group-hover:bg-[#8B5E3C]/10 group-hover:text-[#8B5E3C] transition-colors">
              <Percent className="w-4 h-4" />
            </span>
            {renderChange(metrics.occupancyRateChange)}
          </div>
          <p className="text-[10px] font-semibold text-[#8C8C8C] font-mono tracking-wider uppercase">TINGKAT OKUPANSI</p>
          <p className="text-xl font-bold text-[#333333] mt-1 font-sans tracking-tight">{metrics.occupancyRate}%</p>
        </div>

        {/* Card 6 */}
        <div id="kpi-repeat-customers" className="bg-white p-4 rounded-xl border border-[#E8E8E8] shadow-3xs relative overflow-hidden transition-all hover:shadow-2xs group">
          <div className="flex justify-between items-start mb-2">
            <span className="p-2 bg-[#FAFAF9] rounded-lg text-stone-500 group-hover:bg-[#8B5E3C]/10 group-hover:text-[#8B5E3C] transition-colors">
              <RefreshCw className="w-4 h-4" />
            </span>
            {renderChange(metrics.repeatCustomersRateChange)}
          </div>
          <p className="text-[10px] font-semibold text-[#8C8C8C] font-mono tracking-wider uppercase">PELANGGAN SETIA</p>
          <p className="text-xl font-bold text-[#333333] mt-1 font-sans tracking-tight">{metrics.repeatCustomersRate}%</p>
        </div>
      </div>

      {/* Primary Graphs Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueTrendLineChart data={MONTHLY_TREND_DATA} />
        <BookingTrendBarChart data={MONTHLY_TREND_DATA} />
      </div>

      {/* Split Row for Recent Activity and Top Workspaces */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Top Performing Workspaces */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-[#E8E8E8] p-5 shadow-3xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-base font-sans font-bold text-[#333333]">Ruangan dengan Performa Terbaik</h3>
                <p className="text-xs text-[#8C8C8C]">Peringkat berdasarkan volume bagi hasil kotor per bulan</p>
              </div>
              <button 
                onClick={() => onNavigateToView('workspaces')} 
                className="text-xs hover:underline decoration-[#8B5E3C] text-[#8B5E3C] font-semibold font-mono tracking-tight cursor-pointer"
              >
                Lihat Semua Ruangan &rarr;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E8E8E8] text-[#8C8C8C] text-[10px] font-mono uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Detail Ruangan</th>
                    <th className="pb-3 font-semibold">Partner Terkait</th>
                    <th className="pb-3 font-semibold text-right">Pemesanan</th>
                    <th className="pb-3 font-semibold text-right">Pendapatan Bulanan</th>
                    <th className="pb-3 font-semibold text-right">Okupansi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F1EB] text-xs">
                  {performingWorkspacesSorted.map((ws) => (
                    <tr key={ws.id} className="group hover:bg-[#F5F1EB]/30 transition-colors">
                      <td className="py-3 flex items-center gap-3">
                        <img 
                          src={ws.image} 
                          alt={ws.name} 
                          className="w-10 h-10 rounded-lg object-cover border border-[#E8E8E8] shadow-3xs" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="max-w-[200px] truncate">
                          <p className="font-semibold text-[#333333] truncate">{ws.name}</p>
                          <span className="font-mono text-[9px] text-[#8B5E3C] font-bold bg-[#F5F1EB] px-1.5 py-0.5 rounded-sm">
                            {ws.id}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-stone-650 font-medium">{ws.partnerName}</td>
                      <td className="py-3 text-right font-mono font-semibold text-[#8C8C8C]">{ws.bookingsCount}</td>
                      <td className="py-3 text-right font-mono font-semibold text-[#333333]">{formatCurrency(ws.revenue)}</td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-mono font-semibold text-[#333333]">{ws.occupancyRate}%</span>
                          <div className="w-12 bg-stone-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-[#8B5E3C] h-full rounded-full" 
                              style={{ width: `${ws.occupancyRate}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-[#E8E8E8] flex items-center justify-between text-xs text-[#8C8C8C]">
            <span>Menampilkan 4 aset berpendapatan tertinggi di katalog aktif.</span>
            <span className="font-mono text-[10px]">Frekuensi pembaruan: Near-Realtime 5m TTL</span>
          </div>
        </div>

        {/* Recent Activities Log */}
        <div className="bg-white rounded-xl border border-[#E8E8E8] p-5 shadow-3xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-5">
              <div>
                <h3 className="text-base font-sans font-bold text-[#333333]">Log Sistem Terbaru</h3>
                <p className="text-xs text-[#8C8C8C]">Aliran aktivitas pemesanan di seluruh platform</p>
              </div>
            </div>

            <div className="space-y-4">
              {recentActivitiesList.map((act) => {
                const IconComponent = act.icon;
                return (
                  <div key={act.id} className="flex gap-3 items-start group">
                    <div className={`p-2 rounded-lg border flex items-center justify-center shrink-0 ${act.color}`}>
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <p className="text-xs font-semibold text-[#333333] truncate group-hover:text-[#8B5E3C] transition-colors">
                          {act.title}
                        </p>
                        <span className="text-[9px] font-mono text-[#8C8C8C] text-right block shrink-0">
                          {act.time}
                        </span>
                      </div>
                      <p className="text-xs text-[#8C8C8C] line-clamp-2 leading-relaxed">
                        {act.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8E8E8]">
            <button 
              onClick={() => onNavigateToView('bookings')}
              className="w-full text-center px-4 py-2.5 bg-[#F5F1EB] hover:bg-[#8B5E3C]/5 border border-[#E8E8E8] rounded-lg text-xs font-semibold text-[#8B5E3C] transition-colors cursor-pointer"
            >
              Auditor Riwayat Pemesanan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
