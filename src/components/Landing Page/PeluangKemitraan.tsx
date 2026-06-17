import { useState, useMemo } from 'react';
import { CheckCircle2, TrendingUp, Handshake, AlertCircle, HelpCircle } from 'lucide-react';

interface PeluangKemitraanProps {
  onOpenMitra: () => void;
}

export default function PeluangKemitraan({ onOpenMitra }: PeluangKemitraanProps) {
  // Simulator State
  const [numTables, setNumTables] = useState<number>(4);
  const [occupancyRate, setOccupancyRate] = useState<number>(60); // in percent
  const pricePerSeat = 25000; // Average price in IDR
  const workHoursPerDay = 10; // active work hours in coffee shops (e.g. 9 to 19)
  const workDaysPerMonth = 26; // days open for work per month

  // Live calculation of profit sharing estimation
  const profitSimulations = useMemo(() => {
    // Gross: Number of tables * Occupancy% * Seat Price * 10 hours * 26 days
    const monthlyGross = numTables * (occupancyRate / 100) * pricePerSeat * workHoursPerDay * workDaysPerMonth;
    
    // Partner gets 75%
    const partnerShare = monthlyGross * 0.75;
    const weworkShare = monthlyGross * 0.25;

    return {
      gross: monthlyGross,
      partner: partnerShare,
      wework: weworkShare
    };
  }, [numTables, occupancyRate]);

  return (
    <section id="kemitraan" className="py-20 bg-warm-beige/35 border-t border-warm-beige scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text and Benefits Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-bold px-3 py-1 bg-coffee-brown/10 text-coffee-brown rounded-full font-mono uppercase">
              Program Kemitraan Lokal
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-gray font-display tracking-tight leading-tight">
              Punya Ruang Kosong? <br />
              <span className="text-coffee-brown">Jadikan Sumber Pendapatan Baru</span>
            </h2>

            <p className="text-dark-gray/80 text-sm sm:text-base leading-relaxed">
              We Work membantu coffee shop, lounge, restoran, dan pemilik properti mengoptimalkan meja/ruangan yang tidak terpakai melalui sistem sharing profit yang sepenuhnya transparan, otomatis, dan menguntungkan.
            </p>

            {/* Checklist items requested */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-dark-gray">Pendapatan Tambahan</h4>
                  <p className="text-dark-gray/60 text-xs mt-0.5">Hasilkan jutaan rupiah pasif tiap bulan dari kursi kosong.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-dark-gray">Meningkatkan Traffic</h4>
                  <p className="text-dark-gray/60 text-xs mt-0.5">Penjualan makanan & kopi reguler naik dari coworker yang hadir.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-dark-gray">Monitoring Digital</h4>
                  <p className="text-dark-gray/60 text-xs mt-0.5">Pantau jumlah check-in & hasil harian terintegrasi via cloud dashboard.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-dark-gray">Tanpa Investasi Besar</h4>
                  <p className="text-dark-gray/60 text-xs mt-0.5">Cukup manfaatkan furniture dan koneksi internet yang sudah ada.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                id="mitra-cta-daftar"
                onClick={onOpenMitra}
                className="px-8 py-3.5 bg-coffee-brown hover:bg-coffee-dark hover:shadow-lg hover:shadow-coffee-brown/20 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer text-sm shadow inline-flex"
              >
                Daftar Menjadi Mitra <Handshake className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Interactive Calculator Graphic Tab */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border-2 border-warm-beige p-6 shadow-xl space-y-6">
              
              {/* Calculator Header */}
              <div className="flex items-center justify-between border-b border-warm-beige pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-coffee-brown/10 text-coffee-brown rounded-lg">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-dark-gray font-display text-sm sm:text-base">
                      Kalkulator Pendapatan Mitra
                    </h3>
                    <p className="text-[11px] text-dark-gray/50">Simulasikan potensi profit sharing bulanan Anda</p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100 font-mono">
                  75% BAGI HASIL
                </span>
              </div>

              {/* Slider 1: Table Amount */}
              <div className="space-y-2 text-left">
                <div className="flex justify-between text-xs font-semibold text-dark-gray/80">
                  <label htmlFor="tables-slider">Jumlah Meja Terdaftar (Kapasitas 4 orang/meja)</label>
                  <span className="font-mono text-coffee-brown font-bold text-sm bg-coffee-brown/5 px-2 rounded">{numTables} Meja</span>
                </div>
                <input
                  id="tables-slider"
                  type="range"
                  min="1"
                  max="15"
                  value={numTables}
                  onChange={(e) => setNumTables(parseInt(e.target.value))}
                  className="w-full h-1.5 accent-coffee-brown bg-warm-beige rounded"
                />
                <div className="flex justify-between text-[9px] text-dark-gray/55 font-mono">
                  <span>1 meja</span>
                  <span>5 meja</span>
                  <span>10 meja</span>
                  <span>15 meja</span>
                </div>
              </div>

              {/* Slider 2: Occupancy Rate */}
              <div className="space-y-2 text-left">
                <div className="flex justify-between text-xs font-semibold text-dark-gray/80">
                  <label htmlFor="occupancy-slider">Estimasi Tingkat Keterisian Rata-rata</label>
                  <span className="font-mono text-coffee-brown font-bold text-sm bg-coffee-brown/5 px-2 rounded">{occupancyRate}% Full</span>
                </div>
                <input
                  id="occupancy-slider"
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={occupancyRate}
                  onChange={(e) => setOccupancyRate(parseInt(e.target.value))}
                  className="w-full h-1.5 accent-coffee-brown bg-warm-beige rounded"
                />
                <div className="flex justify-between text-[9px] text-dark-gray/55 font-mono">
                  <span>20% (Sepi)</span>
                  <span>50% (Sore)</span>
                  <span>80% (Ramai)</span>
                  <span>100% (Sempurna)</span>
                </div>
              </div>

              {/* Results Breakdown Grid */}
              <div className="bg-warm-beige/35 p-4 rounded-xl border border-warm-beige text-left space-y-3.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-dark-gray/70">Asumsi Tarif Workspace:</span>
                  <span className="font-mono font-bold text-dark-gray">Rp {pricePerSeat.toLocaleString('id-ID')}/jam</span>
                </div>

                <div className="flex justify-between items-center text-xs pb-2 border-b border-coffee-brown/10">
                  <span className="text-dark-gray/70">Total Estimasi Omset Kotor:</span>
                  <span className="font-mono font-bold text-dark-gray/80">Rp {profitSimulations.gross.toLocaleString('id-ID')}</span>
                </div>

                {/* Final highlight result */}
                <div className="flex justify-between items-center pt-1.5">
                  <div>
                    <p className="text-xs font-bold text-coffee-brown font-display">Hubungan Profit Bersih Anda (75%):</p>
                    <p className="text-[10px] text-dark-gray/50">Di transfer langsung tiap tanggal 1</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-lg sm:text-xl font-extrabold text-emerald-700">
                      Rp {profitSimulations.partner.toLocaleString('id-ID')}
                    </p>
                    <p className="text-[9px] text-emerald-800 font-bold uppercase bg-emerald-50 px-1.5 inline-block rounded">
                      Estimasi Bulanan
                    </p>
                  </div>
                </div>
              </div>

              {/* Disclaimer footer */}
              <div className="text-[10px] text-dark-gray/50 flex gap-1.5 leading-relaxed text-left">
                <AlertCircle className="w-4 h-4 text-coffee-brown flex-shrink-0" />
                <span>Simulasi di atas didasarkan pada asumsi operasional {workHoursPerDay} jam/hari selama {workDaysPerMonth} hari kerja sebulan dengan harga satuan rata-rata Rp {pricePerSeat.toLocaleString('id-ID')}/jam. Keberhasilan riil mungkin dipengaruhi oleh lokasi, kebersihan, dan ulasan coworker.</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
