import { motion } from 'motion/react';
import { Landmark, Compass, Sparkles, ShieldAlert, HeartHandshake, CalendarCheck2, Users, Receipt, Gem } from 'lucide-react';

export default function MengapaMemilih() {
  const benefits = [
    {
      title: 'Harga Fleksibel',
      description: 'Pilih rentang sewa per jam, paket harian, mingguan, hingga bulanan sesuai intensitas produktivitas tim Anda.',
      icon: Receipt,
      color: 'bg-amber-100 text-coffee-brown'
    },
    {
      title: 'Booking Mudah',
      description: 'Pesan workspace premium pilihan kapan saja secara real-time melalui platform integrasi digital kami.',
      icon: CalendarCheck2,
      color: 'bg-emerald-50 text-emerald-700'
    },
    {
      title: 'Ruang Nyaman',
      description: 'Nikmati jaminan atmosfer tempat yang kondusif, colokan listrik melimpah, sirkulasi AC, dan koneksi internet super kencang.',
      icon: Sparkles,
      color: 'bg-indigo-50 text-indigo-700'
    },
    {
      title: 'Lokasi Strategis',
      description: 'Bekerja berpindah dari aneka coffee shop, lounge komersial, maupun executive boardroom pilihan di pusat kota.',
      icon: Compass,
      color: 'bg-sky-50 text-sky-700'
    },
    {
      title: 'Komunitas Profesional',
      description: 'Buka peluang kolaborasi baru melalui perjumpaan langsung dengan klan freelancer, pelaku startup, dan UMKM nasional.',
      icon: Users,
      color: 'bg-purple-50 text-purple-700'
    },
    {
      title: 'Sistem Sharing Profit',
      description: 'Membantu pemilik kedai lokal mengonversi space mati menjadi keuntungan finansial berkelanjutan yang transparan.',
      icon: HeartHandshake,
      color: 'bg-amber-50 text-amber-700'
    }
  ];

  return (
    <section id="mengapa-memilih" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper text headings */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold px-3 py-1 bg-coffee-brown/10 text-coffee-brown rounded-full font-mono uppercase">
            Fitur Utama & Keunggulan
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-gray font-display mt-3 tracking-tight">
            Mengapa Memilih Open Office Space?
          </h2>
          <p className="text-dark-gray/70 mt-3 text-sm sm:text-base">
            Kami menciptakan ekosistem ruang kerja fleksibel yang mutualistis bagi coworker yang butuh ketenangan dan pengusaha lokal yang butuh profit lebih.
          </p>
        </div>

        {/* Dynamic Bento-Styled Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, idx) => {
            const IconComp = benefit.icon;
            return (
              <div
                key={idx}
                className="group p-6 bg-warm-beige/25 hover:bg-warm-beige/40 rounded-2xl border border-warm-beige/50 hover:border-coffee-brown/25 hover:shadow-lg transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Distinctive custom icon sphere */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md shadow-coffee-brown/5 ${benefit.color} group-hover:scale-105 transition-transform`}>
                    <IconComp className="w-5.5 h-5.5" />
                  </div>

                  {/* Title & paragraph */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-dark-gray text-base sm:text-lg font-display">
                      {benefit.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-dark-gray/70 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                {/* Aesthetic footer marker line */}
                <div className="w-10 h-1 bg-coffee-brown/10 rounded-full mt-6 group-hover:w-full group-hover:bg-coffee-brown/35 transition-all duration-300" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
