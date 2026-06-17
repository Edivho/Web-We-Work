import { BarChart3, TrendingUp, Handshake, Building2, Armchair, HelpCircle, Layers, MapPin, Sparkles, Trophy } from 'lucide-react';
import { Partner, Workspace } from '../types';
import { MONTHLY_TREND_DATA, HOURLY_BOOKING_DISTRIBUTION } from '../data';
import { RevenueTrendLineChart, BookingTrendBarChart, HourlyBookingDistributionChart, LocationAnalyticsChart } from './Charts';

interface AnalyticsViewProps {
  partners: Partner[];
  workspaces: Workspace[];
}

export default function AnalyticsView({ partners, workspaces }: AnalyticsViewProps) {
  
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  // Rank partners by revenue
  const rankedPartners = [...partners]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Rank workspaces by bookings
  const rankedWorkspaces = [...workspaces]
    .sort((a, b) => b.bookingsCount - a.bookingsCount)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Intro Header banner */}
      <div className="p-6 bg-stone-900 border border-stone-850 rounded-2xl text-[#F5F1EB] relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Decorative background circle */}
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-[#8B5E3C] opacity-15 rounded-full blur-2xl pointer-events-none" />
        
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-amber-300 stroke-[2] animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-amber-200">KONTROL METRIK EKSEKUTIF</span>
          </div>
          <h2 className="text-xl font-display font-bold text-white tracking-tight">Performa Bisnis & Pendapatan Marketplace</h2>
          <p className="text-xs text-stone-400 max-w-xl leading-relaxed">Menganalisis tren tingkat tinggi, mengidentifikasi jam masuk puncak pengguna, menghitung kontribusi partner kemitraan, dan meninjau alokasi wilayah operasional.</p>
        </div>

        <div className="flex gap-4 shrink-0 font-mono text-xs text-stone-400 bg-stone-950/60 p-4 rounded-xl border border-stone-800/80">
          <div>
            <p className="text-[9px] text-stone-500 uppercase font-bold tracking-wider">Total GMV Platform</p>
            <p className="text-base font-bold text-white font-sans mt-0.5">Rp 5.910.465.000</p>
          </div>
          <div className="border-l border-stone-800" />
          <div>
            <p className="text-[9px] text-stone-500 uppercase font-bold tracking-wider">Komisi Bersih</p>
            <p className="text-base font-bold text-[#CBA081] font-sans mt-0.5">20.0%</p>
          </div>
        </div>
      </div>

      {/* Primary Graphs Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueTrendLineChart data={MONTHLY_TREND_DATA} />
        <BookingTrendBarChart data={MONTHLY_TREND_DATA} />
      </div>

      {/* Business Rank lists side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Partners by Yield */}
        <div className="bg-white p-5 rounded-xl border border-[#E8E8E8] shadow-3xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
              <h3 className="text-base font-sans font-bold text-[#333333]">Peringkat Partner Teratas (Pendapatan Kemitraan Aktif)</h3>
            </div>
            <p className="text-xs text-[#8C8C8C] mb-4">Total payout hasil bersih yang ditarik oleh partner/host di Open Office Space</p>

            <div className="space-y-3.5">
              {rankedPartners.map((pt, i) => (
                <div key={pt.id} className="flex items-center justify-between p-2.5 rounded-lg border border-stone-100 hover:bg-[#F5F1EB]/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-[#8B5E3C]/15 border border-[#8B5E3C]/30 flex items-center justify-center font-bold text-xs text-[#8B5E3C] font-mono">
                      #{i + 1}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#333333]">{pt.name}</p>
                      <p className="text-[10px] text-[#8C8C8C] font-mono">Pemilik: {pt.ownerName} &bull; {pt.workspaceCount} Unit Ruangan</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-[#333333] font-mono">{formatCurrency(pt.revenue)}</p>
                    <span className="text-[9px] bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded-xs font-medium">92% okupansi</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-[10px] text-[#8C8C8C] font-mono mt-4 pt-3 border-t border-[#E8E8E8] text-right">
            Sistem pencairan: Transfer Langsung aktif Bank Lokal &bull; Siklus otomatis harian (Net-15)
          </div>
        </div>

        {/* Top Workspaces by Bookings */}
        <div className="bg-white p-5 rounded-xl border border-[#E8E8E8] shadow-3xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-[#8B5E3C] shrink-0" />
              <h3 className="text-base font-sans font-bold text-[#333333]">Unit Ruangan Terpopuler</h3>
            </div>
            <p className="text-xs text-[#8C8C8C] mb-4">Unit meja individu atau ruangan privat terpopuler berdasarkan frekuensi transaksi harian</p>

            <div className="space-y-3.5">
              {rankedWorkspaces.map((ws, i) => (
                <div key={ws.id} className="flex items-center justify-between p-2.5 rounded-lg border border-stone-100 hover:bg-[#F5F1EB]/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-xs text-stone-600 font-mono">
                      #{i + 1}
                    </div>
                    <div className="truncate max-w-[200px]">
                      <p className="text-xs font-semibold text-[#333333] truncate">{ws.name}</p>
                      <p className="text-[10px] text-[#8C8C8C] truncate font-mono">{ws.location}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-stone-900 font-mono">{ws.bookingsCount} pesanan</p>
                    <span className="text-[10px] text-[#8B5E3C] font-semibold">{formatCurrency(ws.price)}/jam</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-[#8C8C8C] font-mono mt-4 pt-3 border-t border-[#E8E8E8] text-right">
            Rata-rata ulasan bintang dari pengguna: 4.96 / 5.00
          </div>
        </div>
      </div>

      {/* Hourly and Location Breakdown charts side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HourlyBookingDistributionChart data={HOURLY_BOOKING_DISTRIBUTION} />
        <LocationAnalyticsChart />
      </div>
    </div>
  );
}
