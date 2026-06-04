import { useState, useMemo } from 'react';
import { Star, Quote, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimoni() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'User' | 'Mitra'>('All');

  const filteredTestimonials = useMemo(() => {
    if (activeFilter === 'All') return TESTIMONIALS;
    return TESTIMONIALS.filter(t => t.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="py-20 bg-warm-beige/35 border-y border-warm-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold px-3 py-1 bg-coffee-brown/10 text-coffee-brown rounded-full font-mono uppercase">
            Cerita Keberhasilan Hub
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-gray font-display mt-3 tracking-tight">
            Ulasan Tulus Komunitas We Work
          </h2>
          <p className="text-dark-gray/70 mt-3 text-sm sm:text-base">
            Dengarkan langsung dari mitra coffee shop yang omsetnya tumbuh pesat, dan klan remote workers yang produktivitas kerjanya melonjak tajam.
          </p>

          {/* Testimonial category toggle pills */}
          <div className="inline-flex gap-1.5 p-1 bg-white border border-warm-beige rounded-xl shadow-sm mt-8 text-xs font-bold">
            <button
              onClick={() => setActiveFilter('All')}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                activeFilter === 'All' ? 'bg-coffee-brown text-white' : 'text-dark-gray/60 hover:text-dark-gray'
              }`}
            >
              Semua Ulasan
            </button>
            <button
              onClick={() => setActiveFilter('User')}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                activeFilter === 'User' ? 'bg-coffee-brown text-white' : 'text-dark-gray/60 hover:text-dark-gray'
              }`}
            >
              Sebagai Pengguna / Coworker
            </button>
            <button
              onClick={() => setActiveFilter('Mitra')}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                activeFilter === 'Mitra' ? 'bg-coffee-brown text-white' : 'text-dark-gray/60 hover:text-dark-gray'
              }`}
            >
              Sebagai Mitra / Owner Space
            </button>
          </div>
        </div>

        {/* Testimonials Masonry/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch justify-center">
          {filteredTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-warm-beige p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative text-left"
            >
              {/* Decorative floating double quotes */}
              <div className="absolute top-6 right-6 text-coffee-brown/10">
                <Quote className="w-10 h-10 transform scale-x-[-1]" />
              </div>

              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-dark-gray/25'
                      }`}
                    />
                  ))}
                </div>

                {/* Feedback text paragraph */}
                <p className="text-xs sm:text-sm text-dark-gray/80 leading-relaxed italic pr-2">
                  "{t.feedback}"
                </p>
              </div>

              {/* Profile Card Footer */}
              <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-warm-beige">
                <img
                  className="w-11 h-11 rounded-full object-cover border-2 border-coffee-brown/15 shadow-inner"
                  src={t.avatarUrl}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                />
                <div className="text-xs truncate">
                  <h4 className="font-bold text-dark-gray">{t.name}</h4>
                  <p className="text-dark-gray/60 text-[11px] leading-tight">
                    {t.role} <span className="font-bold text-coffee-brown">@ {t.company}</span>
                  </p>
                </div>
                
                {/* Micro Category Identifier badge */}
                <span className="ml-auto text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 bg-warm-beige/60 text-coffee-brown rounded border border-warm-beige/85">
                  {t.category === 'User' ? 'Pekerja' : 'Mitra'}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
