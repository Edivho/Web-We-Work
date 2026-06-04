import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, User, Mail, Phone, MapPin, Layers, Coffee, Send, ChevronRight, Sparkles } from 'lucide-react';
import { PartnerRegistration } from '../types';

interface MitraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (registration: PartnerRegistration) => void;
}

export default function MitraModal({ isOpen, onClose, onSubmitSuccess }: MitraModalProps) {
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('Coffee Shop');
  const [address, setAddress] = useState('');
  const [spaceDescription, setSpaceDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<PartnerRegistration | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName || !email || !phone || !businessName || !address) {
      alert('Mohon lengkapi seluruh field berbintang (*)');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const regData: PartnerRegistration = {
        id: `reg-${Date.now()}`,
        ownerName,
        email,
        phone,
        businessName,
        businessType,
        address,
        spaceDescription,
        submittedAt: new Date().toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };

      setSubmitted(regData);
      setIsSubmitting(false);
      onSubmitSuccess(regData);
    }, 1500);
  };

  return (
    <div id="mitra-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/70 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-2xl border border-warm-beige max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-warm-beige bg-warm-beige/30">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-coffee-brown/10 text-coffee-brown flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark-gray font-display leading-tight">
                    Daftar Sebagai Mitra
                  </h3>
                  <p className="text-xs text-dark-gray/60">Gabung jaringan sharing profit We Work</p>
                </div>
              </div>
              <button
                id="btn-close-mitra-modal"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-warm-beige text-dark-gray/60 hover:text-dark-gray transition-colors"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="p-3 bg-warm-beige/25 rounded-xl border border-warm-beige/50 text-xs text-dark-gray/80 leading-relaxed">
                Kami membantu mengonversi setiap meter persegi ruangan Anda yang tidak terpakai (seperti meja kosong di coffee shop, ruang rapat non-efektif, atau lounge) menjadi mesin penghasilan digital.
              </div>

              {/* Owner Identity */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-dark-gray uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-coffee-brown" /> Detail Pemilik/Kontak
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-dark-gray/80 mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      id="mitra-owner-name"
                      type="text"
                      placeholder="e.g., Hendra Wijaya"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      required
                      className="w-full text-xs px-3 py-2 border border-warm-beige/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-brown/40 focus:border-coffee-brown bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-dark-gray/80 mb-1">
                      No. WhatsApp Aktif *
                    </label>
                    <input
                      id="mitra-owner-phone"
                      type="tel"
                      placeholder="e.g., 08123456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full text-xs px-3 py-2 border border-warm-beige/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-brown/40 focus:border-coffee-brown bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-dark-gray/80 mb-1">
                    Email Bisnis Resmi *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-dark-gray/40">
                      <Mail className="w-3.5 h-3.5" />
                    </span>
                    <input
                      id="mitra-owner-email"
                      type="email"
                      placeholder="e.g., owner@kopiruangkerja.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full text-xs pl-9 pr-3 py-2 border border-warm-beige/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-brown/40 focus:border-coffee-brown bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Space Information */}
              <div className="space-y-3 pt-3 border-t border-warm-beige">
                <h4 className="text-xs font-bold text-dark-gray uppercase tracking-wider flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-coffee-brown" /> Detail Lokasi & Ruangan
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-dark-gray/80 mb-1">
                      Nama Tempat / Usaha *
                    </label>
                    <input
                      id="mitra-business-name"
                      type="text"
                      placeholder="e.g., Kopi Ruang Kerja Dago"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                      className="w-full text-xs px-3 py-2 border border-warm-beige/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-brown/40 focus:border-coffee-brown bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-dark-gray/80 mb-1">
                      Jenis Ruang Usaha *
                    </label>
                    <select
                      id="mitra-business-type"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-warm-beige/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-brown/40 focus:border-coffee-brown bg-white"
                    >
                      <option value="Coffee Shop">Coffee Shop / Cafe</option>
                      <option value="Lounge">Lounge / Restoran</option>
                      <option value="Meeting Room">Meeting Room Khusus</option>
                      <option value="Private Room">Private Office Suite</option>
                      <option value="Ruang Komersial Lainnya">Ruang Komersial Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-dark-gray/80 mb-1">
                    Alamat Lengkap Usaha *
                  </label>
                  <div className="relative">
                    <span className="absolute top-2 left-0 pl-3 flex items-center pointer-events-none text-dark-gray/40">
                      <MapPin className="w-3.5 h-3.5" />
                    </span>
                    <textarea
                      id="mitra-address"
                      rows={2}
                      placeholder="Tuliskan alamat detail beserta nomor ruko, kecamatan, dan kota..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="w-full text-xs pl-9 pr-3 py-2 border border-warm-beige/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-brown/40 focus:border-coffee-brown bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-dark-gray/80 mb-1">
                    Deskripsi Ruangan & Fasilitas Pendukung (Opsional)
                  </label>
                  <div className="relative">
                    <span className="absolute top-2 left-0 pl-3 flex items-center pointer-events-none text-dark-gray/40">
                      <Layers className="w-3.5 h-3.5" />
                    </span>
                    <textarea
                      id="mitra-description"
                      rows={3}
                      placeholder="e.g., Ada 4 meja kosong berkapasitas total 12 orang di lantai 2 yang sepi di siang hari. Lengkap dengan koneksi internet IndiHome 100 Mbps dan 2 AC split."
                      value={spaceDescription}
                      onChange={(e) => setSpaceDescription(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2 border border-warm-beige/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-brown/40 focus:border-coffee-brown bg-white"
                    />
                  </div>
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="p-4 border-t border-warm-beige bg-warm-beige/10 flex items-center justify-end">
              <button
                id="btn-submit-mitra-form"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-coffee-brown hover:bg-coffee-dark text-white rounded-lg font-semibold shadow text-xs transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Memproses...
                  </>
                ) : (
                  <>
                    Kirim Formulir <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          /* SUCCESS RESPONSE TIMELINE */
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl border border-warm-beige p-6 space-y-5 text-center"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Sparkles className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-dark-gray font-display">Registrasi Diterima!</h3>
              <p className="text-xs text-dark-gray/70">Terima kasih, <strong>{submitted.ownerName}</strong>. Pengajuan <strong>{submitted.businessName}</strong> kini sedang diproses.</p>
            </div>

            {/* Custom Interactive Timeline */}
            <div className="bg-warm-beige/35 p-4 rounded-xl text-left border border-warm-beige/60 space-y-4">
              <p className="text-xs font-bold text-coffee-brown uppercase tracking-wider">Tahapan Verifikasi Selanjutnya:</p>
              
              <div className="relative pl-5 space-y-4 border-l border-coffee-brown/20 text-xs">
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-coffee-brown text-white flex items-center justify-center font-bold text-[8px]">✓</div>
                  <p className="font-bold text-dark-gray">Formulir Dikirim</p>
                  <p className="text-dark-gray/60 text-[11px]">Selesai pada {submitted.submittedAt}</p>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-coffee-brown/30 border border-coffee-brown text-coffee-brown font-bold text-[8px] animate-pulse">2</div>
                  <p className="font-bold text-dark-gray">Tinjauan Tim Lapangan We Work</p>
                  <p className="text-dark-gray/60 text-[11px]">Estimasi waktu: 1-2 hari kerja. Kami akan menghubungi Anda via WhatsApp untuk validasi detail.</p>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-warm-beige border border-dark-gray/30 text-dark-gray/50 text-[8px] flex items-center justify-center font-bold">3</div>
                  <p className="font-bold text-dark-gray/40">Integrasi Dashboard & Publikasi</p>
                  <p className="text-dark-gray/40 text-[11px]">Instalasi petunjuk visual, penempatan QR check-in, dan go-live tempat Anda di portal pencarian.</p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-dark-gray/50 italic leading-relaxed">
              Ada pertanyaan mendesak terkait kemitraan? Silakan hubungi tim Business Development kami di <span className="text-coffee-brown font-semibold font-mono">partnership@wework.co.id</span>
            </p>

            <button
              id="btn-close-mitra-success"
              onClick={onClose}
              className="w-full py-2.5 bg-coffee-brown hover:bg-coffee-dark text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
