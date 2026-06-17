import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQS } from '../../data';

export default function FAQComponent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    if (openIndex === idx) {
      setOpenIndex(null);
    } else {
      setOpenIndex(idx);
    }
  };

  return (
    <section id="faq" className="py-20 bg-white scroll-mt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold px-3 py-1 bg-coffee-brown/10 text-coffee-brown rounded-full font-mono uppercase">
            Tanya Jawab Umum
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-gray font-display mt-3 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-dark-gray/70 mt-3 text-sm sm:text-base">
            Masih ragu tentang ekosistem Open Office Space? Temukan aneka jawaban cepat untuk meluruskan rasa penasaran Anda.
          </p>
        </div>

        {/* Accordions List */}
        <div className="space-y-4 text-left">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? 'border-coffee-brown bg-coffee-brown/[0.02] shadow-sm'
                    : 'border-warm-beige bg-white hover:bg-warm-beige/20'
                }`}
              >
                {/* Accordion trigger button header */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 font-semibold text-dark-gray hover:text-coffee-brown transition-colors cursor-pointer text-sm sm:text-base"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-5 h-5 text-coffee-light flex-shrink-0" />
                    {faq.question}
                  </span>
                  <span className={`p-1 bg-warm-beige/60 rounded-lg text-coffee-brown transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}>
                    <ChevronDown className="w-4.5 h-4.5" />
                  </span>
                </button>

                {/* Animated expandable content pane */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-dark-gray/75 leading-relaxed border-t border-warm-beige/50 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic Support Contact Box */}
        <div className="mt-12 p-5 bg-warm-beige/35 rounded-2xl border border-warm-beige text-center space-y-3">
          <p className="text-xs text-dark-gray/70 font-semibold">
            Punya kueri teknis atau korporat yang khusus yang belum terjawab di atas?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="font-bold text-dark-gray">Senin - Minggu (08:00 - 21:00 WIB)</span>
            <span className="text-dark-gray/30">|</span>
            <span>WhatsApp CS: <strong className="text-coffee-brown font-mono font-bold">+62 812-3456-7890</strong></span>
            <span className="text-dark-gray/30">|</span>
            <span>Email Admin: <strong className="text-coffee-brown font-semibold font-mono">support@wework.co.id</strong></span>
          </div>
        </div>

      </div>
    </section>
  );
}
