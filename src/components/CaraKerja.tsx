import { useState } from 'react';
import { Search, Sparkles, CreditCard, Coffee, Building2, ShieldCheck, CalendarRange, Coins, Users, Landmark, LandmarkIcon } from 'lucide-react';

export default function CaraKerja() {
  const [activeTab, setActiveTab] = useState<'pengguna' | 'mitra'>('pengguna');

  const stepsPengguna = [
    {
      num: '01',
      title: 'Cari Workspace',
      description: 'Gunakan filter cerdas berdasarkan kota, kedekatan, fasilitas, dan preferensi jenis ruangan (Cafe, Lounge, Rapat).',
      icon: Search,
      iconColor: 'text-amber-750 bg-amber-50'
    },
    {
      num: '02',
      title: 'Pilih Ruangan',
      description: 'Bandingkan kapasitas meja, fasilitas pendukung (koneksi WiFi AC, stopkontak) dan harga sewa transparan.',
      icon: Sparkles,
      iconColor: 'bg-emerald-50 text-emerald-700'
    },
    {
      num: '03',
      title: 'Booking Online',
      description: 'Lakukan pemesanan instan per jam menggunakan metode bayar digital (Gopay, OVO, QRIS, Transfer Bank).',
      icon: CreditCard,
      iconColor: 'bg-blue-50 text-blue-700'
    },
    {
      num: '04',
      title: 'Bekerja dengan Nyaman',
      description: 'Datang sembari scan QR tiket check-in di kasir lokasi. Duduk, nikmati complimentary drink, dan mulailah fokus produktif.',
      icon: Coffee,
      iconColor: 'bg-amber-100 text-coffee-brown'
    }
  ];

  const stepsMitra = [
    {
      num: '01',
      title: 'Daftarkan Ruangan',
      description: 'Unggah deskripsi, fasilitas, alamat, kapasitas, dan foto area kosong Anda (meja kopi, lantai atas ruko sepi, ruang rapat).',
      icon: Building2,
      iconColor: 'bg-orange-50 text-orange-700'
    },
    {
      num: '02',
      title: 'Verifikasi Mitra',
      description: 'Tim ahli We Work akan mengunjungi tempat Anda dalam 1x24 jam untuk meninjau kecocokan standar WiFi dan listrik.',
      icon: ShieldCheck,
      iconColor: 'bg-teal-50 text-teal-700'
    },
    {
      num: '03',
      title: 'Terima Booking',
      description: 'Sistem cloud kami menjadwalkan pesanan masuk otomatis. Anda bisa memantau trafik reservasi di app mitra realtime.',
      icon: CalendarRange,
      iconColor: 'bg-purple-50 text-purple-700'
    },
    {
      num: '04',
      title: 'Terima Hasil Bulanan',
      description: 'Pendapatan sharing profit bersih (75% Mitra) ditransfer transparan dan terjadwal langsung ke rekening Anda setiap bulan.',
      icon: Coins,
      iconColor: 'bg-amber-50 text-amber-700'
    }
  ];

  const currentSteps = activeTab === 'pengguna' ? stepsPengguna : stepsMitra;

  return (
    <section id="cara-kerja" className="py-20 bg-warm-beige/35 border-y border-warm-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold px-3 py-1 bg-coffee-brown/10 text-coffee-brown rounded-full font-mono uppercase">
            Alur Aliansi Berbagi Nilai
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-gray font-display mt-3 tracking-tight">
            Bagaimana Cara Kerjanya?
          </h2>
          <p className="text-dark-gray/70 mt-3 text-sm sm:text-base">
            We Work mendefinisikan ulang pemanfaatan properti idle. Pilih peran Anda untuk mengetahui betapa mudahnya berkolaborasi.
          </p>

          {/* Interactive Toggle Pill Switch */}
          <div className="inline-flex p-1.5 bg-white border border-warm-beige rounded-2xl shadow-sm mt-8">
            <button
              onClick={() => setActiveTab('pengguna')}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'pengguna'
                  ? 'bg-coffee-brown text-white shadow-md'
                  : 'text-dark-gray/60 hover:text-dark-gray'
              }`}
            >
              <Users className="w-4 h-4" /> Untuk Pengguna (Coworker)
            </button>
            <button
              onClick={() => setActiveTab('mitra')}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'mitra'
                  ? 'bg-coffee-brown text-white shadow-md'
                  : 'text-dark-gray/60 hover:text-dark-gray'
              }`}
            >
              <Building2 className="w-4 h-4" /> Untuk Mitra (Pemilik Space)
            </button>
          </div>
        </div>

        {/* Dynamic Card Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Connecting Line for Desktops */}
          <div className="hidden lg:block absolute top-[90px] left-[15%] right-[15%] h-0.5 bg-dashed border-t border-dashed border-coffee-brown/25 z-0" />

          {currentSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-2xl border border-warm-beige/80 p-5 space-y-4 hover:shadow-lg transition-all duration-300 relative z-10 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top line with step number and custom icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-extrabold text-coffee-brown/25">
                      {step.num}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner ${step.iconColor}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Text labels */}
                  <div className="space-y-1.5 text-left">
                    <h3 className="font-bold text-dark-gray font-display text-base">
                      {step.title}
                    </h3>
                    <p className="text-xs text-dark-gray/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Card footer decorative connector hint */}
                <div className="pt-2 text-left">
                  <span className="text-[10px] text-coffee-brown/60 uppercase font-mono tracking-wider font-extrabold">
                    Langkah {index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
