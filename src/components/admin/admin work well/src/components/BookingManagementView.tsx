import React, { useState, useMemo } from 'react';
import { Booking, BookingStatus, PaymentStatus } from '../types';
import { 
  Calendar, 
  Search, 
  Trash2, 
  QrCode, 
  Mail, 
  CheckCircle, 
  X, 
  Clock, 
  AlertTriangle, 
  Filter, 
  ArrowUpDown, 
  DollarSign, 
  Send,
  Camera,
  Check,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Layers,
  MapPin,
  UserCheck
} from 'lucide-react';

interface BookingManagementViewProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onResendQR: (id: string) => void;
  onCheckInBooking: (id: string) => void;
}

export default function BookingManagementView({
  bookings,
  onCancelBooking,
  onResendQR,
  onCheckInBooking,
}: BookingManagementViewProps) {
  const [subTab, setSubTab] = useState<'database' | 'scanner'>('database');
  
  // 1. Database Tab states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedPayment, setSelectedPayment] = useState<string>('All');
  const [sortField, setSortField] = useState<'date' | 'price' | 'id'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [detailBookingId, setDetailBookingId] = useState<string | null>(bookings[0]?.id || null);

  // 2. Scanner Tab states (Simulasi Akses QR Ruko & Coworking)
  const [simulatedScanId, setSimulatedScanId] = useState<string>('');
  const [manualCode, setManualCode] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [hasScanned, setHasScanned] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<Booking | null>(null);
  const [scanSuccessMessage, setScanSuccessMessage] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  const selectedBooking = useMemo(() => {
    return bookings.find(b => b.id === detailBookingId) || bookings[0] || null;
  }, [detailBookingId, bookings]);

  // Format currency helper in IDR for consistency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  // Handle Sort Toggle
  const handleSort = (field: 'date' | 'price' | 'id') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Filter & Search Logic
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchSearch = 
        b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.workspaceName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = selectedStatus === 'All' || b.bookingStatus === selectedStatus;
      const matchPayment = selectedPayment === 'All' || b.paymentStatus === selectedPayment;

      return matchSearch && matchStatus && matchPayment;
    }).sort((a,b) => {
      let comparison = 0;
      if (sortField === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortField === 'price') {
        comparison = a.pricePaid - b.pricePaid;
      } else {
        comparison = a.id.localeCompare(b.id);
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }, [bookings, searchTerm, selectedStatus, selectedPayment, sortField, sortOrder]);

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Confirmed':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100 font-mono">Confirmed</span>;
      case 'Completed':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 font-mono">Completed</span>;
      case 'Cancelled':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-100 font-mono">Cancelled</span>;
      default:
        return null;
    }
  };

  const getPaymentBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'Paid':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">Paid</span>;
      case 'Refunded':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">Refunded</span>;
      case 'Pending':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">Pending</span>;
      default:
        return null;
    }
  };

  // QR CODE SCAN PROCESSOR
  const handleStartSimulatedScan = (e: React.FormEvent) => {
    e.preventDefault();
    const targetedId = manualCode.trim() ? manualCode.toUpperCase() : simulatedScanId;

    if (!targetedId) {
      setScanError("Silakan pilih salah satu kode tiket booking atau ketik kode manual.");
      setScanResult(null);
      setHasScanned(false);
      return;
    }

    setIsScanning(true);
    setScanError(null);
    setScanSuccessMessage(null);
    setHasScanned(false);

    // Simulate 1.2s high-speed laser read latency
    setTimeout(() => {
      const match = bookings.find(b => b.id.toUpperCase() === targetedId.toUpperCase());
      setIsScanning(false);
      setHasScanned(true);

      if (!match) {
        setScanError(`Sistem gagal mendeteksi Kode: "${targetedId}". Pastikan kode terdaftar di rincian database.`);
        setScanResult(null);
      } else {
        setScanResult(match);
        if (match.bookingStatus === 'Completed') {
          setScanError(`Kode tiket ${match.id} sudah pernah divalidasi & menempati ruang kerja (Check-In Sukses sebelumnya pada log sistem).`);
        } else if (match.bookingStatus === 'Cancelled') {
          setScanError(`Tiket ${match.id} ini tidak aktif / tidak sah karena pemesanan dibatalkan (Pengembalian Dana sukses).`);
        }
      }
    }, 1200);
  };

  const handleConfirmPlacement = () => {
    if (!scanResult) return;
    onCheckInBooking(scanResult.id);
    
    // Auto update localized scanner visual
    const updated = {
      ...scanResult,
      bookingStatus: 'Completed' as BookingStatus
    };
    setScanResult(updated);
    setScanSuccessMessage(`Tiket Valid! Calon penyewa atas nama "${scanResult.customerName}" sukses diverifikasi kehadiran. Ruang Kerja "${scanResult.workspaceName}" kini siap ditempati.`);
    
    // Auto sync selection in main detail pane
    setDetailBookingId(scanResult.id);
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher & Title header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-stone-200/80 shadow-3xs">
        <div>
          <h2 className="text-lg font-bold text-[#333333] font-display">Resepsionis & Pengelola Pemesanan</h2>
          <p className="text-xs text-stone-500 mt-0.5">Pantau status transaksi, log kedatangan, dan verifikasi tiket QR masuk tenant.</p>
        </div>

        {/* Dynamic Indonesia style tab control */}
        <div className="flex bg-[#F5F1EB] p-1 rounded-xl border border-[#E8E8E8] w-full md:w-auto shrink-0 select-none">
          <button
            onClick={() => setSubTab('database')}
            className={`flex-grow md:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${subTab === 'database' ? 'bg-[#8B5E3C] text-white shadow-xs' : 'text-stone-600 bg-transparent hover:text-stone-800'}`}
          >
            <Clock className="w-3.5 h-3.5" />
            Database Log Pemesanan
          </button>
          <button
            onClick={() => setSubTab('scanner')}
            className={`flex-grow md:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${subTab === 'scanner' ? 'bg-[#8B5E3C] text-white shadow-xs' : 'text-stone-600 bg-transparent hover:text-stone-800'}`}
          >
            <QrCode className="w-3.5 h-3.5 animate-pulse" />
            Scanner Validasi QR Code
          </button>
        </div>
      </div>

      {subTab === 'database' ? (
        /* ======================== TAB 1: BOOKING LOG DATABASE ======================== */
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          {/* Table & Filtering */}
          <div className="xl:col-span-2 bg-white rounded-xl border border-stone-200/80 shadow-xs p-5 space-y-4">
            
            <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
              {/* Text search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-stone-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari ID booking, nama tamu, atau nama ruko..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] focus:border-[#8B5E3C] focus:bg-white text-stone-850"
                />
              </div>

              {/* Select filters */}
              <div className="flex gap-2 items-center flex-wrap">
                <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-600">
                  <Filter className="w-3.5 h-3.5 text-stone-500" />
                  <span>Masa:</span>
                  <select 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="bg-transparent font-medium border-none focus:ring-0 text-xs text-stone-850 cursor-pointer"
                  >
                    <option value="All">Semua Status</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-600">
                  <DollarSign className="w-3.5 h-3.5 text-stone-500" />
                  <span>Bayar:</span>
                  <select 
                    value={selectedPayment}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="bg-transparent font-medium border-none focus:ring-0 text-xs text-stone-850 cursor-pointer"
                  >
                    <option value="All">Semua</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Main Table */}
            <div className="overflow-x-auto min-h-[350px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-150 text-stone-400 text-[10px] font-mono uppercase tracking-wider select-none">
                    <th className="pb-3 font-semibold text-stone-500">
                      <button onClick={() => handleSort('id')} className="flex items-center gap-1 hover:text-stone-800 transition-colors cursor-pointer">
                        Kode Booking <ArrowUpDown className="w-3.5 h-3.5" />
                      </button>
                    </th>
                    <th className="pb-3 font-semibold text-stone-500">Ruang Kerja / Ruko</th>
                    <th className="pb-3 font-semibold text-stone-500">Penyewa (Tamu)</th>
                    <th className="pb-3 font-semibold text-stone-500">
                      <button onClick={() => handleSort('date')} className="flex items-center gap-1 hover:text-stone-800 transition-colors cursor-pointer">
                        Waktu Sewa <ArrowUpDown className="w-3.5 h-3.5" />
                      </button>
                    </th>
                    <th className="pb-3 font-semibold text-stone-500 text-right">
                      <button onClick={() => handleSort('price')} className="flex items-center gap-1 hover:text-stone-800 transition-colors cursor-pointer justify-end">
                        Total Biaya <ArrowUpDown className="w-3.5 h-3.5" />
                      </button>
                    </th>
                    <th className="pb-3 font-semibold text-stone-500 text-center">Transfer</th>
                    <th className="pb-3 font-semibold text-stone-500 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((bk) => (
                      <tr 
                        key={bk.id}
                        onClick={() => setDetailBookingId(bk.id)}
                        className={`
                          group transition-colors duration-150 cursor-pointer hover:bg-stone-50/70
                          ${selectedBooking?.id === bk.id ? 'bg-[#F5F1EB]/50' : ''}
                        `}
                      >
                        <td className="py-3 font-mono font-bold text-[#8B5E3C]">{bk.id}</td>
                        <td className="py-3">
                          <div className="max-w-[160px] truncate">
                            <p className="font-semibold text-stone-800 truncate">{bk.workspaceName}</p>
                            <p className="text-[10px] text-stone-400 truncate font-medium">{bk.partnerName}</p>
                          </div>
                        </td>
                        <td className="py-3">
                          <div>
                            <p className="font-semibold text-stone-800">{bk.customerName}</p>
                            <p className="text-[10px] text-stone-450 font-mono truncate max-w-[140px]">{bk.customerEmail}</p>
                          </div>
                        </td>
                        <td className="py-3 text-stone-605 text-nowrap">
                          <div className="font-medium">{bk.date}</div>
                          <div className="text-[10px] text-stone-400 font-mono">{bk.time} ({bk.durationHours} jam)</div>
                        </td>
                        <td className="py-3 text-right font-mono font-semibold text-stone-850">
                          {formatCurrency(bk.pricePaid)}
                        </td>
                        <td className="py-3 text-center">{getPaymentBadge(bk.paymentStatus)}</td>
                        <td className="py-3 text-center">{getStatusBadge(bk.bookingStatus)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-stone-400">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <AlertTriangle className="w-8 h-8 text-stone-300" />
                          <p className="font-semibold text-stone-600">Tidak ada data rincian pemesanan</p>
                          <p className="text-xs">Ubah filter pencarian Anda dan coba kembali</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pt-3 border-t border-stone-100 flex justify-between items-center text-xs text-stone-400">
              <span>Menampilkan {filteredBookings.length} dari {bookings.length} total pesanan terdaftar.</span>
              <span className="font-mono">Latensi: Realtime DB sync</span>
            </div>
          </div>

          {/* Booking Details Pane (Right Sidebar style) */}
          <div id="booking-detail-pane" className="bg-stone-900 text-[#F5F1EB] rounded-xl border border-stone-850 shadow-md p-5 sticky top-24 space-y-5">
            {selectedBooking ? (
              <>
                <div className="flex justify-between items-center border-b border-stone-800 pb-4">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#CBA081] tracking-widest uppercase bg-[#8B5E3C]/20 border border-[#8B5E3C]/40 px-2 py-0.5 rounded-sm">
                      {selectedBooking.id}
                    </span>
                    <h3 className="text-base font-display font-bold text-white mt-1.5 font-sans">Kartu Bukti QR</h3>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(selectedBooking.bookingStatus)}
                  </div>
                </div>

                {/* QR graphic */}
                <div className="flex flex-col items-center justify-center py-5 bg-white rounded-xl border border-stone-200">
                  <div className="w-32 h-32 bg-stone-50 border border-stone-200 rounded-lg p-2.5 flex flex-col justify-between relative shadow-inner select-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-[#333333]">
                      {/* outer squares finders */}
                      <rect x="0" y="0" width="25" height="25" />
                      <rect x="3" y="3" width="19" height="19" fill="#FFFFFF" />
                      <rect x="7" y="7" width="11" height="11" />

                      <rect x="75" y="0" width="25" height="25" />
                      <rect x="78" y="3" width="19" height="19" fill="#FFFFFF" />
                      <rect x="82" y="7" width="11" height="11" />

                      <rect x="0" y="75" width="25" height="25" />
                      <rect x="3" y="78" width="19" height="19" fill="#FFFFFF" />
                      <rect x="7" y="82" width="11" height="11" />

                      {/* center metadata lines */}
                      <rect x="35" y="10" width="8" height="8" />
                      <rect x="50" y="5" width="6" height="12" />
                      <rect x="60" y="15" width="10" height="4" />
                      <rect x="5" y="35" width="12" height="6" />
                      <rect x="25" y="30" width="6" height="6" />
                      <rect x="10" y="50" width="8" height="10" />
                      <rect x="35" y="45" width="15" height="15" />
                      <rect x="55" y="35" width="12" height="12" />
                      <rect x="75" y="40" width="5" height="15" />
                      <rect x="70" y="60" width="14" height="6" />
                      <rect x="30" y="75" width="8" height="8" />
                      <rect x="45" y="85" width="12" height="6" />
                      <rect x="62" y="75" width="6" height="15" />
                      <rect x="80" y="78" width="12" height="10" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-stone-500 uppercase mt-3">PAS AKSES FISIK QR</span>
                  <p className="text-[9px] text-stone-400 font-mono mt-0.5 select-all">KODE: {selectedBooking.id}</p>
                </div>

                {/* Info details */}
                <div className="space-y-3.5 text-xs">
                  <div className="border-b border-stone-800/80 pb-2">
                    <p className="text-stone-450 uppercase font-mono tracking-widest text-[9px]">CALON PENYEWA (TAMU)</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="font-semibold text-stone-100 text-sm font-sans">{selectedBooking.customerName}</p>
                      <a href={`mailto:${selectedBooking.customerEmail}`} className="p-1 border border-stone-700 bg-stone-850 hover:bg-stone-800 text-stone-400 hover:text-white rounded-md transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <p className="text-stone-400 text-[11px] font-mono mt-0.5">{selectedBooking.customerEmail}</p>
                  </div>

                  <div className="border-b border-stone-800/80 pb-2">
                    <p className="text-stone-450 uppercase font-mono tracking-widest text-[9px]">RUANGAN & RUKO</p>
                    <p className="font-semibold text-stone-100 mt-1">{selectedBooking.workspaceName}</p>
                    <p className="text-stone-400 text-[11px]">{selectedBooking.partnerName}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-b border-stone-800/80 pb-2">
                    <div>
                      <p className="text-stone-450 uppercase font-mono tracking-widest text-[9px]">JADWAL SEWA</p>
                      <p className="font-semibold text-stone-100 mt-1">{selectedBooking.date}</p>
                      <p className="text-stone-400 text-[11px] font-mono">{selectedBooking.time}</p>
                    </div>
                    <div>
                      <p className="text-stone-450 uppercase font-mono tracking-widest text-[9px]">BIAYA LUNAS</p>
                      <p className="font-semibold text-stone-100 mt-1">{formatCurrency(selectedBooking.pricePaid)}</p>
                      <p className="text-stone-400 text-[11px] font-mono">Bagi Hasil: 80%</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-stone-450 uppercase font-mono tracking-widest text-[9px] mb-1">STATUS PEMBAYARAN</p>
                      {getPaymentBadge(selectedBooking.paymentStatus)}
                    </div>
                    <div className="text-right">
                      <p className="text-stone-450 uppercase font-mono tracking-widest text-[9px] mb-1 font-mono">PENGIRIMAN QR</p>
                      <span className="text-[10px] font-mono text-stone-300 font-bold">Kirim Ulang: {selectedBooking.qrCodeResentCount} kali</span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2 flex gap-2">
                  <button
                    disabled={selectedBooking.bookingStatus === 'Cancelled'}
                    onClick={() => {
                      if (confirm(`Kirim ulang pengingat akses fisik dan QR tiket ke ${selectedBooking.customerName}?`)) {
                        onResendQR(selectedBooking.id);
                      }
                    }}
                    className={`
                      flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 border border-stone-700 bg-stone-850 text-xs font-semibold rounded-lg text-white transition-colors cursor-pointer
                      ${selectedBooking.bookingStatus === 'Cancelled' ? 'opacity-40 cursor-not-allowed bg-stone-800 text-stone-500' : 'hover:bg-stone-800 active:bg-stone-750'}
                    `}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Ulang QR</span>
                  </button>

                  <button
                    disabled={selectedBooking.bookingStatus === 'Cancelled'}
                    onClick={() => {
                      if (confirm(`PEMBATALAN SISTEM:\nApakah Anda yakin ingin membatalkan pemesanan ${selectedBooking.id} dan mengembalikan saldo otomatis ke saldo penyewa?`)) {
                        onCancelBooking(selectedBooking.id);
                      }
                    }}
                    className={`
                      inline-flex items-center justify-center p-2 rounded-lg text-stone-400 transition-colors cursor-pointer border border-[#FF3B30]/20 bg-[#FF3B30]/5
                      ${selectedBooking.bookingStatus === 'Cancelled' ? 'opacity-40 cursor-not-allowed bg-transparent text-stone-600 border-stone-800' : 'hover:bg-[#FF3B30] hover:text-white'}
                    `}
                    title="Batalkan & Refund"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Timeline */}
                <div className="pt-3 border-t border-stone-800 space-y-3">
                  <p className="text-stone-450 uppercase font-mono tracking-widest text-[9px] mb-1">LOG AKTIVITAS AUDIT HISTORIS</p>
                  
                  <div className="space-y-3 text-xs relative max-h-40 overflow-y-auto pr-1">
                    {selectedBooking.timeline.map((item, idx) => (
                      <div key={idx} className="flex gap-2.5 relative group">
                        {idx < selectedBooking.timeline.length - 1 && (
                          <span className="absolute left-[5px] top-[14px] bottom-[-15px] w-0.5 bg-stone-800" />
                        )}
                        <span className="w-2.5 h-2.5 rounded-full bg-[#8B5E3C] border border-stone-900 shrink-0 mt-1 relative z-10" />
                        <div className="flex-1">
                          <div className="flex justify-between items-baseline mb-0.5">
                            <p className="font-semibold text-stone-200">{item.title}</p>
                            <span className="text-[9px] font-mono text-stone-400 shrink-0 select-none">{item.time}</span>
                          </div>
                          <p className="text-[11px] text-stone-400 leading-relaxed font-light">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-stone-500">
                <QrCode className="w-12 h-12 stroke-[1] mx-auto mb-2 text-stone-600" />
                <p className="font-semibold text-stone-400">Belum ada Pemesanan Terpilih</p>
                <p className="text-xs text-stone-500 mt-1">Pilih salah satu baris di sebelah kiri untuk melihat rincian pas akses.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ======================== TAB 2: VIRTUAL QR CODE SCANNER ======================== */
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          
          {/* Main Simulated Scanner Console Viewports */}
          <div className="xl:col-span-2 bg-white rounded-xl border border-stone-200/80 shadow-xs p-5 space-y-5">
            
            <div className="border-b border-stone-100 pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-[#333333] font-display">Kamera Akses Ruang Kerja</h3>
                <p className="text-xs text-stone-500">Aparatus virtual untuk mengevakuasi, memicu, dan memvalidasi tiket QR milik penyewa.</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-stone-900 text-[#F5F1EB] rounded-lg text-[10px] font-mono font-bold">
                <Camera className="w-3.5 h-3.5 text-amber-300 shrink-0 animate-ping" />
                CAM-1 ACTIVE
              </span>
            </div>

            {/* Custom Interactive Camera Terminal Frame */}
            <div className="relative w-full max-w-lg mx-auto bg-stone-900 rounded-2xl p-4 border-2 border-stone-800 shadow-2xl overflow-hidden group">
              <style>{`
                @keyframes scanlaser {
                  0%, 100% { top: 4%; }
                  50% { top: 96%; }
                }
              `}</style>

              {/* Glowing Corner Bracket Borders inside viewport */}
              <div className="relative aspect-video w-full rounded-xl bg-radial from-stone-900 via-stone-950 to-stone-1050 border border-stone-800 flex flex-col justify-center items-center overflow-hidden">
                
                {/* 4 Brackets corners */}
                <span className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/60 rounded-tl-sm pointer-events-none" />
                <span className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/60 rounded-tr-sm pointer-events-none" />
                <span className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/60 rounded-bl-sm pointer-events-none" />
                <span className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/60 rounded-br-sm pointer-events-none" />

                {/* Moving Green Scanning Laser Beam */}
                {isScanning && (
                  <div 
                    className="absolute left-[4%] right-[4%] h-[3px] bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)] z-20 pointer-events-none"
                    style={{ animation: 'scanlaser 2s linear infinite' }}
                  />
                )}

                {/* Subtitle feedback on viewport */}
                <div className="absolute top-4 right-4 z-10 flex gap-1.5 font-mono text-[9px] text-[#CBA081] font-bold">
                  <span>RES: 1080P</span>
                  <span>FPS: 30</span>
                </div>

                {isScanning ? (
                  <div className="text-center space-y-2 z-10 animate-pulse">
                    <QrCode className="w-16 h-16 text-emerald-400 mx-auto animate-spin shrink-0" />
                    <p className="text-emerald-400 font-mono text-xs font-bold tracking-wider uppercase">MENAPAK KODE QR TENTANG LAZER...</p>
                    <p className="text-[10px] text-stone-400 font-mono leading-none">Menganalisis matriks tanda pengenal akses</p>
                  </div>
                ) : hasScanned && scanResult ? (
                  <div className="text-center space-y-3 z-10">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-white font-sans text-sm font-bold">KODE QR VALID</p>
                      <p className="text-xs text-[#CBA081] font-mono">{scanResult.id} &bull; {scanResult.customerName}</p>
                      <p className="text-[11px] text-stone-300 font-sans">{scanResult.workspaceName}</p>
                    </div>
                  </div>
                ) : hasScanned && scanError ? (
                  <div className="text-center space-y-3 z-10 p-4 max-w-sm">
                    <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-450">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-rose-400 font-sans text-sm font-bold">VERIFIKASI GAGAL</p>
                      <p className="text-[11px] text-stone-305 leading-relaxed font-sans">{scanError}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 space-y-2 z-10">
                    <QrCode className="w-16 h-16 text-stone-500 mx-auto hover:scale-105 transition-transform" />
                    <p className="text-stone-300 font-sans text-sm font-medium">Kamera Siap Memindai QR</p>
                    <p className="text-[11px] text-stone-500 max-w-xs mx-auto">Gunakan simulator pemilih tiket di bawah atau ketikan kode tiket calon penyewa untuk menguji kecocokan sistem.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Simulation Controls Area */}
            <form onSubmit={handleStartSimulatedScan} className="bg-stone-50 rounded-xl p-4 border border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              
              {/* Option A: Dropdown Quick SELECT for simplicity */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                  1. Pilih Tiket Tenant Terdaftar (Simulator)
                </label>
                <select
                  disabled={isScanning}
                  value={simulatedScanId}
                  onChange={(e) => {
                    setSimulatedScanId(e.target.value);
                    setManualCode(''); // clear other
                    setHasScanned(false);
                    setScanResult(null);
                    setScanError(null);
                    setScanSuccessMessage(null);
                  }}
                  className="w-full text-xs font-semibold px-3 py-2 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-[#8B5E3C] focus:border-[#8B5E3C] cursor-pointer"
                >
                  <option value="">-- Pilih Rincian Penumpang Ruko --</option>
                  {bookings.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.id} - {b.customerName} ({b.bookingStatus === 'Confirmed' ? 'Menunggu QR Scan' : b.bookingStatus})
                    </option>
                  ))}
                </select>
              </div>

              {/* Option B: Manual typing */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                  Atau 2. Masukkan ID Booking Manual
                </label>
                <div className="flex gap-2">
                  <input
                    disabled={isScanning}
                    type="text"
                    value={manualCode}
                    onChange={(e) => {
                      setManualCode(e.target.value);
                      setSimulatedScanId(''); // clear other
                      setHasScanned(false);
                      setScanResult(null);
                      setScanError(null);
                      setScanSuccessMessage(null);
                    }}
                    placeholder="cth: BK-101"
                    className="flex-grow text-xs px-3 py-2 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-[#8B5E3C] focus:border-[#8B5E3C] font-mono uppercase placeholder-stone-400"
                  />
                  <button
                    type="submit"
                    disabled={isScanning || (!simulatedScanId && !manualCode)}
                    className="px-5 py-2 bg-[#8B5E3C] hover:opacity-90 disabled:opacity-40 text-white rounded-lg text-xs font-semibold tracking-wider hover:shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                  >
                    {isScanning ? 'Memindai...' : 'Mulai Pindai'}
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Informational tips on QR Access */}
            <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/15 text-stone-600 text-xs leading-relaxed flex items-start gap-2.5">
              <span className="p-1 bg-[#8B5E3C]/10 rounded text-[#8B5E3C] font-bold shrink-0 text-[10px] font-mono leading-none">ID-INFO</span>
              <div>
                <span className="font-bold text-[#8B5E3C]">💡 Aturan Penetapan Ruang Kerja Coworking</span>
                <p className="mt-0.5">Setelah menyewa ruko / meja, penyewa otomatis menerima PDF tiket beserta <strong>Kode QR akses fisik</strong> via email. Saat tiba di lokasi ruko/coworking, admin atau resepsionis memindah QR di scanner untuk memverifikasi kecocokan nomor sewa, lalu mengklik tombol check-in untuk membuka selot kunci nirkabel ruang kerja.</p>
              </div>
            </div>

          </div>

          {/* Validation & Actions Sidebar (Right Column) */}
          <div className="bg-stone-900 text-[#F5F1EB] rounded-xl border border-stone-850 shadow-md p-5 space-y-4">
            <h3 className="text-base font-bold text-white font-display border-b border-stone-800 pb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-[#CBA081]" />
              Lembar Validasi Tiket
            </h3>

            {scanResult ? (
              <div className="space-y-4 text-xs">
                {/* Result metadata blocks */}
                <div className="bg-stone-950/60 p-3.5 rounded-lg border border-stone-800">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-mono font-bold text-[#CBA081] bg-[#8B5E3C]/15 border border-[#8B5E3C]/30 px-2 py-0.5 rounded-sm">
                      {scanResult.id}
                    </span>
                    {getStatusBadge(scanResult.bookingStatus)}
                  </div>
                  <h4 className="text-sm font-sans font-bold text-white mt-2">{scanResult.workspaceName}</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">{scanResult.partnerName}</p>
                </div>

                <div className="space-y-3 font-sans">
                  <div className="border-b border-stone-800/80 pb-2.5">
                    <span className="text-[9px] font-mono text-stone-450 uppercase tracking-widest block">PEMEGANG KONTRAK AKTIF</span>
                    <p className="font-semibold text-white mt-1 text-sm">{scanResult.customerName}</p>
                    <p className="text-stone-400 text-[11px] font-mono">{scanResult.customerEmail}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 border-b border-stone-800/80 pb-2.5">
                    <div>
                      <span className="text-[9px] font-mono text-stone-450 uppercase tracking-widest block">SLOT WAKTU TERSEGEL</span>
                      <p className="font-semibold text-stone-200 mt-1">{scanResult.date}</p>
                      <p className="text-stone-400 text-[11px] font-mono">{scanResult.time}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-stone-450 uppercase tracking-widest block">BIAYA TERPENUHI</span>
                      <p className="font-semibold text-stone-200 mt-1">{formatCurrency(scanResult.pricePaid)}</p>
                      <span className="text-[9.5px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-sm font-mono mt-1 inline-block font-semibold">
                        Lunas via Stripe
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Scan feedback messages */}
                {scanSuccessMessage && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-lg space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-400 stroke-[3.5]" />
                      CHECK-IN AKTIF
                    </p>
                    <p className="text-[11px] text-stone-300 leading-relaxed font-light">{scanSuccessMessage}</p>
                  </div>
                )}

                {scanError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      SALAH VALIDASI
                    </p>
                    <p className="text-[11px] text-stone-300 leading-relaxed font-light">{scanError}</p>
                  </div>
                )}

                {/* Big interactive Validate & Claim Check-In button */}
                {scanResult.bookingStatus === 'Confirmed' && (
                  <button
                    onClick={handleConfirmPlacement}
                    className="w-full py-3 bg-[#8B5E3C] hover:bg-[#724a2f] active:bg-[#825434] hover:shadow-md text-white font-bold rounded-lg text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Check-In & Tempatkan Ruangan</span>
                  </button>
                )}

                {scanResult.bookingStatus === 'Completed' && (
                  <div className="p-3 bg-neutral-800 border border-neutral-700 text-center rounded-lg text-stone-400 text-[11px] flex flex-col items-center justify-center gap-1">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <p className="font-semibold text-neutral-250">Tamu Sudah Menempati Ruang</p>
                    <p>Sesi validasi QR selesai & ditutup.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16 text-stone-500 border border-dashed border-stone-800 rounded-xl">
                <QrCode className="w-12 h-12 stroke-[1] mx-auto mb-2 text-stone-600 animate-pulse" />
                <p className="font-semibold text-stone-400">Menunggu Pindaian QR</p>
                <p className="text-[11px] text-stone-500 mt-1 max-w-[180px] mx-auto">Silakan scan kode QR tiket penyewa terlebih dahulu untuk membuka akses penempatan ruang kerja.</p>
              </div>
            )}

            {/* Simulated Live status logging feed */}
            <div className="pt-3 border-t border-stone-800">
              <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block mb-2">RESEPSIONIS FEED REALTIME</span>
              
              <div className="bg-stone-950/40 p-2.5 rounded border border-stone-800 font-mono text-[9.5px] text-stone-400 space-y-1.5 max-h-40 overflow-y-auto">
                <div className="flex gap-2 text-stone-500">
                  <span>[08:00]</span>
                  <span>Sistem resepsionis online di ap-southeast-1.</span>
                </div>
                {scanResult && scanResult.bookingStatus === 'Completed' && (
                  <div className="flex gap-2 text-emerald-500">
                    <span>[SEKARANG]</span>
                    <span>Check-In Sukses untuk {scanResult.id} &bull; Pintu Ruang Kerja Terbuka.</span>
                  </div>
                )}
                {scanError && (
                  <div className="flex gap-2 text-rose-400">
                    <span>[GAGAL]</span>
                    <span>Kesalahan pindai atau pembatalan tiket log.</span>
                  </div>
                )}
                <div className="flex gap-2">
                  <span>[07:15]</span>
                  <span>Otoritas check-in harian diresmikan oleh Edivho Febrian.</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
