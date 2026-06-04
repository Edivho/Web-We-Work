import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Mail, Phone, ShieldCheck, CheckCircle2, Ticket, QrCode } from 'lucide-react';
import { Workspace, Booking } from '../types';

interface BookingModalProps {
  workspace: Workspace | null;
  onClose: () => void;
  onBookingSuccess: (booking: Booking) => void;
}

export default function BookingModal({ workspace, onClose, onBookingSuccess }: BookingModalProps) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [duration, setDuration] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState('QRIS (Gopay/OVO/Dana)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketDetails, setTicketDetails] = useState<Booking | null>(null);

  if (!workspace) return null;

  const PRICE_PER_HOUR = workspace.pricePerHour;
  const SERVICE_FEE = 2000;
  const rawTotal = PRICE_PER_HOUR * duration;
  const grandTotal = rawTotal + SERVICE_FEE;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail || !userPhone || !bookingDate) {
      alert('Mohon lengkapi semua data formulir.');
      return;
    }

    setIsSubmitting(true);

    // Simulate server response after 1.2 seconds
    setTimeout(() => {
      const ticketCode = `WEWORK-${workspace.type.substring(0, 2).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const bookingData: Booking = {
        id: `b-${Date.now()}`,
        workspaceId: workspace.id,
        workspaceName: workspace.name,
        imageUrl: workspace.imageUrl,
        userName,
        userEmail,
        userPhone,
        bookingDate,
        startTime,
        duration,
        totalPrice: grandTotal,
        ticketCode,
        paymentMethod
      };

      setTicketDetails(bookingData);
      setIsSubmitting(false);
      onBookingSuccess(bookingData);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/70 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        {!ticketDetails ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-2xl border border-warm-beige max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-warm-beige bg-warm-beige/30">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-coffee-brown/10 text-coffee-brown rounded-full">
                  {workspace.type}
                </span>
                <h3 className="text-lg font-bold text-dark-gray mt-1 font-display leading-tight">
                  Pesan {workspace.name}
                </h3>
              </div>
              <button
                id="btn-close-booking-modal"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-warm-beige text-dark-gray/60 hover:text-dark-gray transition-colors"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Location Mini Overview */}
              <div className="flex items-center gap-3 p-3 bg-warm-beige/20 rounded-xl border border-warm-beige/40">
                <img
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  src={workspace.imageUrl}
                  alt={workspace.name}
                  referrerPolicy="no-referrer"
                />
                <div className="text-sm">
                  <p className="font-semibold text-dark-gray">{workspace.name}</p>
                  <p className="text-xs text-dark-gray/70">{workspace.location}</p>
                  <p className="font-mono text-xs font-semibold text-coffee-brown mt-1">
                    Rp {workspace.pricePerHour.toLocaleString('id-ID')}/jam
                  </p>
                </div>
              </div>

              {/* Booking Options */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-dark-gray/80 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-coffee-brown" /> Tanggal
                  </label>
                  <input
                    id="input-booking-date"
                    type="date"
                    min={todayStr}
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                    className="w-full text-sm px-3 py-2 border border-warm-beige/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-brown/40 focus:border-coffee-brown bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-dark-gray/80 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-coffee-brown" /> Mulai Jam
                  </label>
                  <select
                    id="select-booking-time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full text-sm px-3 py-2 border border-warm-beige/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-brown/40 focus:border-coffee-brown bg-white"
                  >
                    <option value="08:00">08:00 WIB</option>
                    <option value="09:00">09:00 WIB</option>
                    <option value="10:00">10:00 WIB</option>
                    <option value="11:00">11:00 WIB</option>
                    <option value="12:00">12:00 WIB</option>
                    <option value="13:00">13:00 WIB</option>
                    <option value="14:00">14:00 WIB</option>
                    <option value="15:00">15:00 WIB</option>
                    <option value="16:00">16:00 WIB</option>
                    <option value="17:00">17:00 WIB</option>
                    <option value="18:00">18:00 WIB</option>
                    <option value="19:00">19:00 WIB</option>
                  </select>
                </div>
              </div>

              {/* Duration Slider/Selector */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-dark-gray/80">
                    Durasi Sewa
                  </label>
                  <span className="text-xs font-bold text-coffee-brown font-mono bg-coffee-brown/5 px-2 py-0.5 rounded">
                    {duration} Jam
                  </span>
                </div>
                <input
                  id="range-booking-duration"
                  type="range"
                  min="1"
                  max="12"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full accent-coffee-brown bg-warm-beige"
                />
                <div className="flex justify-between text-[10px] text-dark-gray/50 px-1 font-mono">
                  <span>1 jam</span>
                  <span>4 jam</span>
                  <span>8 jam</span>
                  <span>12 jam</span>
                </div>
              </div>

              {/* User Identity Details */}
              <div className="space-y-3 pt-2 border-t border-warm-beige">
                <h4 className="text-xs font-bold text-dark-gray uppercase tracking-wider">Data Diri Pemesan</h4>
                
                <div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-dark-gray/40">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      id="input-user-name"
                      type="text"
                      placeholder="Nama Lengkap Anda"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                      className="w-full text-sm pl-10 pr-3 py-2 border border-warm-beige/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-brown/40 focus:border-coffee-brown bg-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-dark-gray/40">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      id="input-user-email"
                      type="email"
                      placeholder="Alamat Email Gmail/Korporat"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                      className="w-full text-sm pl-10 pr-3 py-2 border border-warm-beige/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-brown/40 focus:border-coffee-brown bg-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-dark-gray/40">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      id="input-user-phone"
                      type="tel"
                      placeholder="Nomor WhatsApp Aktif (e.g., 081234...)"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      required
                      className="w-full text-sm pl-10 pr-3 py-2 border border-warm-beige/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-brown/40 focus:border-coffee-brown bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-dark-gray/80 mb-1.5">
                  Metode Pembayaran (Sistem Simulasi)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'QRIS (Gopay/OVO/Dana)',
                    'Transfer Bank Mandiri/BCA',
                    'We Work Points Credits',
                    'Kartu Kredit Visa/Master'
                  ].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`text-xs p-2 text-left border rounded-lg transition-all ${
                        paymentMethod === method
                          ? 'border-coffee-brown bg-coffee-brown/5 text-coffee-brown font-semibold shadow-sm'
                          : 'border-warm-beige bg-white text-dark-gray/80 hover:bg-warm-beige/25'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Invoice Breakdown */}
              <div className="p-3 bg-warm-beige/40 rounded-xl space-y-1.5 text-xs">
                <div className="flex justify-between text-dark-gray/80">
                  <span>Biaya Sewa ({duration} jam × Rp {PRICE_PER_HOUR.toLocaleString('id-ID')})</span>
                  <span className="font-mono">Rp {rawTotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-dark-gray/80 pb-1.5 border-b border-coffee-brown/10">
                  <span>Biaya Layanan Platform We Work</span>
                  <span className="font-mono">Rp {SERVICE_FEE.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between font-bold text-dark-gray text-sm pt-0.5">
                  <span className="text-coffee-brown font-display">Total Tagihan</span>
                  <span className="font-mono text-coffee-brown">Rp {grandTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </form>

            {/* Footer with actions */}
            <div className="p-4 border-t border-warm-beige bg-warm-beige/15 flex items-center justify-between gap-3 text-xs">
              <span className="text-dark-gray/60 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Jaminan Aman
              </span>
              <button
                id="btn-submit-booking-form"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-coffee-brown hover:bg-coffee-dark text-white rounded-lg font-semibold shadow transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Mencadangkan...
                  </>
                ) : (
                  'Lanjutkan ke Pembayaran'
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          /* DIGITAL TICKET - SUCCESS SCREEN */
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-sm overflow-hidden bg-white shadow-2xl rounded-2xl border-2 border-dashed border-coffee-brown animate-print"
          >
            {/* Cutout half circles for classic boarding pass look */}
            <div className="absolute left-0 top-[220px] -translate-x-[12px] w-6 h-6 rounded-full bg-brand-charcoal/70 z-10 border-r border-coffee-brown/20" />
            <div className="absolute right-0 top-[220px] translate-x-[12px] w-6 h-6 rounded-full bg-brand-charcoal/70 z-10 border-l border-coffee-brown/20" />

            {/* Success Banner */}
            <div className="p-6 bg-coffee-brown text-white text-center pb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-3 text-white">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-display">Pemesanan Sukses!</h3>
              <p className="text-xs text-white/85 mt-1">Simpan atau tunjukkan boarding-pass ini di lokasi</p>
            </div>

            {/* Ticket Info Area */}
            <div className="p-5 space-y-4">
              {/* Header Details */}
              <div className="flex justify-between items-center bg-warm-beige/30 p-2.5 rounded-lg border border-warm-beige">
                <div className="flex items-center gap-1.5 text-xs text-coffee-brown font-bold tracking-wider uppercase">
                  <Ticket className="w-4 h-4" /> Boarding Pass
                </div>
                <div className="font-mono text-xs font-bold text-dark-gray bg-white border px-2 py-0.5 rounded">
                  {ticketDetails.ticketCode}
                </div>
              </div>

              {/* Space Name */}
              <div>
                <label className="text-[10px] text-dark-gray/50 uppercase font-bold tracking-wider">Lokasi Workspace</label>
                <p className="text-sm font-bold text-dark-gray leading-tight">{ticketDetails.workspaceName}</p>
                <p className="text-xs text-dark-gray/70">{workspace.location}</p>
              </div>

              {/* Key Details Grid */}
              <div className="grid grid-cols-2 gap-y-3 border-t border-dashed border-warm-beige/80 pt-3">
                <div>
                  <label className="text-[10px] text-dark-gray/50 uppercase font-bold tracking-wider">Atas Nama</label>
                  <p className="text-xs font-semibold text-dark-gray truncate">{ticketDetails.userName}</p>
                </div>
                <div>
                  <label className="text-[10px] text-dark-gray/50 uppercase font-bold tracking-wider">Metode Bayar</label>
                  <p className="text-xs font-semibold text-dark-gray truncate">{ticketDetails.paymentMethod}</p>
                </div>
                <div>
                  <label className="text-[10px] text-dark-gray/50 uppercase font-bold tracking-wider">Tanggal</label>
                  <p className="text-xs font-semibold text-dark-gray">{ticketDetails.bookingDate}</p>
                </div>
                <div>
                  <label className="text-[10px] text-dark-gray/50 uppercase font-bold tracking-wider">Waktu & Durasi</label>
                  <p className="text-xs font-semibold text-dark-gray">{ticketDetails.startTime} ({ticketDetails.duration} Jam)</p>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="pt-3 border-t border-warm-beige flex justify-between items-center">
                <div>
                  <label className="text-[10px] text-dark-gray/50 uppercase font-bold tracking-wider">Status Pembayaran</label>
                  <span className="block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
                    LUNAS (SIMULASI)
                  </span>
                </div>
                <div className="text-right">
                  <label className="text-[10px] text-dark-gray/50 uppercase font-bold tracking-wider">Total Dibayar</label>
                  <p className="font-mono text-sm font-bold text-coffee-brown">Rp {ticketDetails.totalPrice.toLocaleString('id-ID')}</p>
                </div>
              </div>

              {/* QR Code Graphic & Disclaimer */}
              <div className="pt-4 border-t border-dashed border-warm-beige space-y-2 flex flex-col items-center justify-center">
                <div className="p-2 bg-warm-beige/20 border border-warm-beige rounded-xl">
                  <QrCode className="w-24 h-24 text-coffee-brown" />
                </div>
                <p className="text-[10px] text-center text-dark-gray/50 leading-relaxed max-w-[250px]">
                  Pindai QR Code ini di meja administrasi lokasi untuk check-in dan mengaktifkan koneksi WiFi premium Anda.
                </p>
              </div>

              {/* print / close actions */}
              <div className="flex gap-2 pt-2 print:hidden">
                <button
                  id="btn-print-ticket"
                  onClick={handlePrint}
                  className="flex-1 py-2 border border-coffee-brown/40 text-coffee-brown font-semibold hover:bg-warm-beige rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Cetak / Simpan PDF
                </button>
                <button
                  id="btn-close-ticket-success"
                  onClick={onClose}
                  className="flex-1 py-2 bg-coffee-brown hover:bg-coffee-dark text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
