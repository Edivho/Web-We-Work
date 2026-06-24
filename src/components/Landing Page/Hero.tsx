import { motion } from 'motion/react';
import { Search, Coffee, Users, ShieldCheck, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenMitra: () => void;
  onScrollToSearch: () => void;
}

export default function Hero({ onOpenMitra, onScrollToSearch }: HeroProps) {
  return (
    <section className="relative bg-warm-beige/65 pt-28 pb-16 md:py-32 overflow-hidden">
      {/* Absolute Decorative Circles for cozy visual warmth */}
      <div className="absolute top-0 right-0 -translate-y-20 translate-x-20 w-[450px] h-[450px] rounded-full bg-coffee-brown/5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-32 -translate-x-20 w-[300px] h-[300px] rounded-full bg-coffee-brown/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content Col */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-coffee-brown/10 rounded-full border border-coffee-brown/15"
            >
              <span className="w-2 h-2 rounded-full bg-coffee-brown animate-pulse" />
              <span className="text-xs font-bold text-coffee-dark uppercase tracking-wider font-mono">
                Pioneer Sharing-Profit Workspace di Indonesia
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark-gray font-display tracking-tight leading-[1.1]"
            >
              Ubah Ruang <br />
              Menjadi <span className="text-coffee-brown underline decoration-warm-beige underline-offset-8">Peluang</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-dark-gray/85 leading-relaxed max-w-xl"
            >
              Temukan workspace nyaman di coffee shop, lounge, dan ruang komersial pilihan. 
              Bekerja lebih produktif sambil membantu pertumbuhan bisnis lokal dan UMKM di sekitar Anda.
            </motion.p>

            {/* Quick CTAs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              <button
                id="hero-btn-cari"
                onClick={onScrollToSearch}
                className="px-8 py-3.5 bg-coffee-brown hover:bg-coffee-dark hover:shadow-lg hover:shadow-coffee-brown/20 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                Cari Workspace <Search className="w-4 h-4" />
              </button>
              
              <button
                id="hero-btn-mitra"
                onClick={onOpenMitra}
                className="px-8 py-3.5 bg-white border-2 border-coffee-brown/30 hover:border-coffee-brown hover:bg-warm-beige/30 text-coffee-brown rounded-xl font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                Jadi Mitra Ruangan <ArrowRight className="w-4 h-4 text-coffee-brown" />
              </button>
            </motion.div>

            {/* Micro value indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-coffee-brown/10 max-w-lg text-xs"
            >
              <div className="flex items-center gap-1.5 font-medium text-dark-gray/70">
                <Coffee className="w-4 h-4 text-coffee-brown flex-shrink-0" />
                <span>Minuman Gratis</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-dark-gray/70">
                <Users className="w-4 h-4 text-coffee-brown flex-shrink-0" />
                <span>Tanpa Subscription</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-dark-gray/70">
                <ShieldCheck className="w-4 h-4 text-coffee-brown flex-shrink-0" />
                <span>Aman Terverifikasi</span>
              </div>
            </motion.div>
          </div>

          {/* Visual Image / Interactive Mockup Column */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] lg:aspect-square shadow-2xl border-4 border-white"
            >
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                alt="Profesional muda bekerja produktif di coffee shop"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Glass Badge 1 */}
              

              {/* Overlay Glass Badge 2 */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white shadow-lg text-right">
                <p className="text-[10px] uppercase font-bold tracking-wider text-coffee-brown">Mulai Dari</p>
                <p className="text-base font-extrabold text-dark-gray font-mono">Rp 25k <span className="text-[10px] text-dark-gray/60 font-normal">/jam</span></p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
