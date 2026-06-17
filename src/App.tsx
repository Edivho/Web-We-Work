import { useState } from 'react';
import Navbar from './components/Landing Page/Navbar';
import Hero from './components/Landing Page/Hero';
import CaraKerja from './components/Landing Page/CaraKerja';
import SearchWorkspace from './components/Landing Page/SearchWorkspace';
import MengapaMemilih from './components/Landing Page/MengapaMemilih';
import PeluangKemitraan from './components/Landing Page/PeluangKemitraan';
import KomunitasNetworking from './components/Landing Page/KomunitasNetworking';
import Testimoni from './components/Landing Page/Testimoni';
import Statistik from './components/Landing Page/Statistik';
import FAQComponent from './components/Landing Page/FAQComponent';
import FinalCTA from './components/Landing Page/FinalCTA';
import Footer from './components/Landing Page/Footer';
import BookingModal from './components/Landing Page/BookingModal';
import MitraModal from './components/Landing Page/MitraModal';

import { Workspace, Booking, PartnerRegistration } from './types';
import { Landmark, CheckCircle2, Heart, X } from 'lucide-react';

export default function App() {
  const [isMitraOpen, setIsMitraOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  
  // Simulated State for Notifications Feed
  const [activeNotification, setActiveNotification] = useState<string | null>(null);
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);

  const handleOpenMitra = () => {
    setIsMitraOpen(true);
  };

  const handleCloseMitra = () => {
    setIsMitraOpen(false);
  };

  const handleSelectWorkspace = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
  };

  const handleCloseBooking = () => {
    setSelectedWorkspace(null);
  };

  const handleScrollToSearch = () => {
    const element = document.getElementById('cari-workspace');
    if (element) {
      const offset = 85; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Callback Triggers
  const handleBookingSuccess = (booking: Booking) => {
    setBookingHistory((prev) => [booking, ...prev]);
    triggerToast(`Pemesanan Berhasil! Tiket #${booking.ticketCode} resmi tersimpan.`);
  };

  const handleMitraSuccess = (registration: PartnerRegistration) => {
    triggerToast(`Pengajuan Mitra sukses dikirim! Terima kasih, ${registration.ownerName}.`);
  };

  const triggerToast = (msg: string) => {
    setActiveNotification(msg);
    setTimeout(() => {
      setActiveNotification(null);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-white text-dark-gray flex flex-col font-sans antialiased relative">
      
      {/* Sticky Top Navigation */}
      <Navbar
        onOpenMitra={handleOpenMitra}
        onScrollToSearch={handleScrollToSearch}
      />

      {/* Main Sections Stack */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <Hero
          onOpenMitra={handleOpenMitra}
          onScrollToSearch={handleScrollToSearch}
        />

        {/* 2. Interactive Search Tool & 4. Workspace Choices Section */}
        <SearchWorkspace
          onSelectWorkspace={handleSelectWorkspace}
        />

        {/* 3. Cara Kerja (Walkthrough User / Partner) */}
        <CaraKerja />

        {/* 5. Mengapa Memilih (Value Propositions grid) */}
        <MengapaMemilih />

        {/* 6. Peluang Kemitraan (Promotional simulator) */}
        <PeluangKemitraan
          onOpenMitra={handleOpenMitra}
        />

        {/* 9. Statistik Section (Counters dashboard banner) */}
        <Statistik />

        {/* 7. Komunitas & Networking Events Section */}
        <KomunitasNetworking />

        {/* 8. Testimoni (Reviews client / hosts filter list) */}
        <Testimoni />

        {/* 10. Frequently Asked Questions collapsible panels */}
        <FAQComponent />

        {/* 11. Final CTA conversion block */}
        <FinalCTA
          onOpenMitra={handleOpenMitra}
          onScrollToSearch={handleScrollToSearch}
        />

      </main>

      {/* 12. Structured Indonesian brand Footer */}
      <Footer />

      {/* INTERACTIVE POPUP DRAWERS MODAL SYSTEM */}

      {/* Workspace Booking modal */}
      {selectedWorkspace && (
        <BookingModal
          workspace={selectedWorkspace}
          onClose={handleCloseBooking}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Mitra registration signup modal */}
      {isMitraOpen && (
        <MitraModal
          isOpen={isMitraOpen}
          onClose={handleCloseMitra}
          onSubmitSuccess={handleMitraSuccess}
        />
      )}

      {/* REAL-TIME SIMULATION PERSISTENT FLOATING TOASTS */}
      {activeNotification && (
        <div id="toast-notif" className="fixed bottom-6 right-6 z-50 p-4 bg-brand-charcoal border border-white/10 rounded-2xl shadow-2xl text-white text-xs max-w-sm flex items-center justify-between gap-3 animate-slide-in">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-coffee-brown flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-warm-beige" />
            </div>
            <div>
              <p className="font-bold text-white/95">Notifikasi Sistem</p>
              <p className="text-white/70 mt-0.5">{activeNotification}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveNotification(null)}
            className="p-1 hover:bg-white/10 text-white/50 hover:text-white rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
