import { Landmark, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-charcoal text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-coffee-brown flex items-center justify-center">
                <Landmark className="w-5 h-5 text-white" />
              </div>
              <div className="font-display font-extrabold text-lg text-white leading-none">
                We <span className="text-coffee-brown">Work</span>
              </div>
            </div>
            
            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              We Work adalah platform pelopor sharing profit workspace di Indonesia. Kami menghubungkan coffee shop, lounge, dan ruang komersial idle dengan klan remote workers yang butuh ketenangan produktif.
            </p>

            {/* Social Grid */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-coffee-brown/20 text-white/70 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram We Work Indonesia"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-coffee-brown/20 text-white/70 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn We Work Indonesia"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Col 1: Tentang Kami */}
          <div className="md:col-span-3 space-y-3.5 text-left text-xs">
            <h4 className="font-bold text-white/95 uppercase tracking-wider font-display">Tentang Kami</h4>
            <ul className="space-y-2.5 text-white/60">
              <li>
                <a href="#cara-kerja" className="hover:text-coffee-light transition-colors">Visi & Misi</a>
              </li>
              <li>
                <a href="#kemitraan" className="hover:text-coffee-light transition-colors">Program Kemitraan</a>
              </li>
              <li>
                <a href="#komunitas" className="hover:text-coffee-light transition-colors">Komunitas & Agenda</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-coffee-light transition-colors">Pusat Hub Bantuan</a>
              </li>
            </ul>
          </div>

          {/* Links Col 2: Hubungi Kami / Kontak */}
          <div className="md:col-span-4 space-y-3.5 text-left text-xs">
            <h4 className="font-bold text-white/95 uppercase tracking-wider font-display">Kontak Resmi</h4>
            
            <ul className="space-y-2.5 text-white/60">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-coffee-brown flex-shrink-0 mt-0.5" />
                <span>Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12130, Indonesia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-coffee-brown flex-shrink-0" />
                <span>+62 812-3456-7890 (Customer Care)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-coffee-brown flex-shrink-0" />
                <span>hello@wework.co.id / partnership@wework.co.id</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Legals block */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40 text-center sm:text-left">
          <p>© {currentYear} We Work Indonesia (PT Solusi Ruang Bersama). Hak Cipta Dilindungi.</p>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#privasi" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#ketentuan" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            <a href="#disclaimer" className="hover:text-white transition-colors">Sanggahan Layanan</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
