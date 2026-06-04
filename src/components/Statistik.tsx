import { motion } from 'motion/react';
import { Landmark, Compass, CalendarCheck2, Users2, ShieldCheck } from 'lucide-react';

export default function Statistik() {
  const stats = [
    {
      value: '100+',
      label: 'Workspace Partner',
      description: 'Coffee shop, lounge, dan ruko terverifikasi di seluruh nusantara.',
      icon: Landmark
    },
    {
      value: '5.000+',
      label: 'Booking Berhasil',
      description: 'Reservasi tempat terjamin mulus, instan, & sharing profit aman.',
      icon: CalendarCheck2
    },
    {
      value: '1.500+',
      label: 'Pengguna Aktif',
      description: 'Freelancer, remote workers, pegiat startup, UMKM, & mahasiswa.',
      icon: Users2
    },
    {
      value: '50+',
      label: 'Kota Cakupan',
      description: 'Hadir meluas di Jabodetabek, Bandung, Surabaya, Bali, Medan, dll.',
      icon: Compass
    }
  ];

  return (
    <section className="bg-white py-16 border-b border-warm-beige/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Card Container for statistics */}
        <div className="bg-brand-charcoal text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          {/* Ambient Background Glow matching warm coffee vibe */}
          <div className="absolute top-0 right-0 -translate-y-20 translate-x-20 w-80 h-80 rounded-full bg-coffee-brown/10 pointer-events-none filter blur-2xl" />
          <div className="absolute bottom-0 left-0 translate-y-20 -translate-x-20 w-60 h-60 rounded-full bg-coffee-brown/10 pointer-events-none filter blur-2xl" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {stats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={idx}
                  className={`space-y-3 hover:scale-[1.02] transition-transform duration-200 ${
                    idx === 0 ? '' : 'pt-6 sm:pt-0 sm:pl-6 lg:pl-8'
                  }`}
                >
                  {/* Miniature decorative Icon indicator */}
                  <div className="inline-flex w-8 h-8 rounded-lg bg-white/5 items-center justify-center text-coffee-light">
                    <IconComponent className="w-4.5 h-4.5" />
                  </div>

                  <div className="space-y-1">
                    {/* Big Metric value */}
                    <p className="text-4xl lg:text-5xl font-extrabold font-display leading-none text-warm-beige">
                      {stat.value}
                    </p>
                    
                    {/* Plain English label */}
                    <h3 className="text-sm font-bold tracking-tight text-white/95">
                      {stat.label}
                    </h3>
                  </div>

                  {/* Clarification paragraph */}
                  <p className="text-xs text-white/60 leading-relaxed max-w-[210px] sm:max-w-none">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Micro trust-building statement */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-white/55 gap-4">
            <span className="flex items-center gap-1.5 justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Seluruh laba & bagi hasil tercatat transparan di akuntabilitas AI system audit.
            </span>
            <span className="font-mono text-[10px] text-white/40">
              Pembaruan Terakhir: UTC {new Date().toLocaleDateString('id-ID')}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
