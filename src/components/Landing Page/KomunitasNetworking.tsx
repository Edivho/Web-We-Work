import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Clock, MapPin, Users, Check, AlertCircle } from 'lucide-react';
import { EVENTS } from '../../data';
import { CommunityEvent } from '../../types';

export default function KomunitasNetworking() {
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [showEventSuccess, setShowEventSuccess] = useState<CommunityEvent | null>(null);

  const handleRegisterEvent = (event: CommunityEvent) => {
    if (registeredEvents.includes(event.id)) {
      return;
    }
    
    // Track registration
    setRegisteredEvents([...registeredEvents, event.id]);
    setShowEventSuccess(event);
  };

  return (
    <section id="komunitas" className="py-20 bg-white scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold px-3 py-1 bg-coffee-brown/10 text-coffee-brown rounded-full font-mono uppercase">
            Kolaborasi & Jejaring Sosial
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-gray font-display mt-3 tracking-tight">
            Lebih dari Sekadar Tempat Bekerja
          </h2>
          <p className="text-dark-gray/70 mt-3 text-sm sm:text-base">
            Bangun koneksi, kolaborasi, dan akselerasi peluang bisnis baru bersama komunitas Open Office Space teraktif di kota Anda.
          </p>
        </div>

        {/* 4 Pillars Category Highlight List requested */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            {
              title: 'Workshop Intensif',
              subtitle: 'Kuasai keterampilan baru yang bernilai tinggi langsung dari praktisi top.',
              bg: 'bg-amber-50 border-coffee-brown/20',
              text: 'text-coffee-brown'
            },
            {
              title: 'Seminar Startup',
              subtitle: 'Pelajari validasi pasar, legalitas, hingga strategi pitching ke pendana ventura.',
              bg: 'bg-emerald-50 border-emerald-200',
              text: 'text-emerald-800'
            },
            {
              title: 'Freelancer Gathering',
              subtitle: 'Saling berjejaring dengan klan desainer, programer, dan penulis kreatif seni.',
              bg: 'bg-blue-50 border-blue-200',
              text: 'text-blue-800'
            },
            {
              title: 'Business Networking',
              subtitle: 'Hubungkan penawaran bisnis, kumpulkan lead, dan temukan calon mitra strategis.',
              bg: 'bg-purple-50 border-purple-200',
              text: 'text-purple-800 font-bold'
            }
          ].map((pillar, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border text-left space-y-1.5 shadow-sm hover:scale-[1.02] transition-transform duration-200 ${pillar.bg}`}
            >
              <h3 className={`font-bold text-xs sm:text-sm font-display ${pillar.text}`}>{pillar.title}</h3>
              <p className="text-[11px] text-dark-gray/75 leading-relaxed">{pillar.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Dynamic Card Grid containing Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
          {EVENTS.map((event) => {
            const isRegistered = registeredEvents.includes(event.id);
            return (
              <div
                key={event.id}
                className="bg-warm-beige/15 rounded-2xl border border-warm-beige/80 p-5 flex flex-col justify-between hover:shadow-md transition-shadow text-left"
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-extrabold tracking-wide uppercase px-2 py-0.5 rounded-md ${
                      event.category === 'Workshop' ? 'bg-amber-100 text-coffee-brown' :
                      event.category === 'Seminar Startup' ? 'bg-emerald-100 text-emerald-800' :
                      event.category === 'Gathering' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {event.category}
                    </span>
                    
                    <span className="text-[11px] text-dark-gray/60 font-semibold flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-coffee-light" />
                      Sisa Kursi: <strong className="text-coffee-brown">{isRegistered ? event.spotsLeft - 1 : event.spotsLeft}</strong>
                    </span>
                  </div>

                  {/* Event Title */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-base sm:text-lg text-dark-gray leading-snug font-display hover:text-coffee-brown transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-xs text-dark-gray/70 leading-relaxed truncate-2-lines min-h-[36px]">
                      {event.description}
                    </p>
                  </div>

                  {/* Specs grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 border-t border-warm-beige/40">
                    <div className="flex items-center gap-1.5 text-dark-gray/70">
                      <Calendar className="w-3.5 h-3.5 text-coffee-brown flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-dark-gray/70 font-mono">
                      <Clock className="w-3.5 h-3.5 text-coffee-brown flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="col-span-1 sm:col-span-2 flex items-center gap-1.5 text-dark-gray/70">
                      <MapPin className="w-3.5 h-3.5 text-coffee-brown flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* Speaker & Action Row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 mt-4 border-t border-warm-beige/60">
                  <div className="text-left">
                    <p className="text-[10px] text-dark-gray/40 font-bold uppercase">Pembicara / Host</p>
                    <p className="text-xs font-semibold text-dark-gray truncate max-w-[200px]">{event.speaker}</p>
                  </div>

                  <button
                    onClick={() => handleRegisterEvent(event)}
                    disabled={isRegistered}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
                      isRegistered
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold flex items-center justify-center gap-1 cursor-default'
                        : 'bg-coffee-brown hover:bg-coffee-dark text-white hover:shadow'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        Terdaftar <Check className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      'Amankan Slot Gratis'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Event RSVP Animation Confirmation */}
        <AnimatePresence>
          {showEventSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/70 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl border-2 border-coffee-brown p-6 max-w-sm w-full text-center space-y-4 shadow-2xl relative"
              >
                <div className="inline-flex w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full items-center justify-center">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-lg text-dark-gray">RSVP Event Sukses!</h3>
                  <p className="text-xs text-dark-gray/70">
                    Anda berhasil terdaftar untuk: <br />
                    <strong className="text-coffee-brown font-display leading-relaxed">{showEventSuccess.title}</strong>
                  </p>
                </div>

                <div className="p-3 bg-warm-beige/35 rounded-xl text-left border border-warm-beige text-xs space-y-1 leading-snug">
                  <p className="text-dark-gray/60 font-semibold uppercase text-[10px] tracking-wide">Konfirmasi Kehadiran</p>
                  <p className="font-bold text-dark-gray">🗓️ {showEventSuccess.date}</p>
                  <p className="font-mono text-dark-gray">⏰ {showEventSuccess.time}</p>
                  <p className="text-dark-gray/80">📍 {showEventSuccess.location}</p>
                </div>

                <div className="flex gap-2 text-xs">
                  <div className="flex items-start gap-1 p-2 bg-amber-50 text-coffee-dark border border-amber-100 rounded-lg text-left text-[11px] leading-relaxed">
                    <AlertCircle className="w-4 h-4 text-coffee-brown flex-shrink-0 mt-0.5" />
                    <span>Sebuah undangan kalender Google Calendar beserta link grup WhatsApp koordinasi telah dikirimkan ke email terhubung.</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowEventSuccess(null)}
                  className="w-full py-2 bg-coffee-brown hover:bg-coffee-dark text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Tutup & Lanjutkan Membaca
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
