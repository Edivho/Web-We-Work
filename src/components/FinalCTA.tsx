import { motion } from 'motion/react';
import { Compass, Sparkles, Search, MessageSquare, Handshake } from 'lucide-react';

interface FinalCTAProps {
  onOpenMitra: () => void;
  onScrollToSearch: () => void;
}

export default function FinalCTA({ onOpenMitra, onScrollToSearch }: FinalCTAProps) {
  return (
    <section className="py-16 bg-white shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Fullwidth Display Banner Box */}
        <div className="relative rounded-3xl overflow-hidden bg-coffee-brown p-8 sm:p-12 md:p-16 text-center text-white shadow-xl">
          
          {/* Ambient Background Circles */}
          <div className="absolute top-0 left-0 -translate-x-12 -translate-y-12 w-96 h-96 bg-white/5 rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 translate-x-12 translate-y-12 w-96 h-96 bg-white/5 rounded-full pointer-events-none" />

          {/* Spark details */}
          <div className="relative z-10 space-y-6 max-w-3xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full border border-white/10 font-mono text-xs uppercase tracking-wider font-extrabold text-warm-beige">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Waktunya Memulai Langkah Anda
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight leading-tight">
              Siap Bekerja Lebih Produktif?
            </h2>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-xl mx-auto">
              Temukan workspace yang sesuai dengan kebutuhan Anda atau mulai hasilkan pendapatan tambahan dari ruang kosong yang Anda miliki bersama sistem sharing profit.
            </p>

            {/* Direct Triggers matching CTA Requirements */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                id="final-cta-btn-cari"
                onClick={onScrollToSearch}
                className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-warm-beige text-coffee-brown font-bold text-sm rounded-xl transition-colors shadow shadow-coffee-brown/15 flex items-center justify-center gap-2 cursor-pointer"
              >
                Cari Workspace <Search className="w-4 h-4 text-coffee-brown" />
              </button>

              <button
                id="final-cta-btn-mitra"
                onClick={onOpenMitra}
                className="w-full sm:w-auto px-8 py-3.5 bg-coffee-dark hover:bg-black/25 text-white border border-white/20 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Daftar Menjadi Mitra <Handshake className="w-4.5 h-4.5 text-white" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
