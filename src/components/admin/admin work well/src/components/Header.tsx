import { Menu, Search, Calendar, Bell, ChevronRight, HelpCircle } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onMenuToggle: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  searchPlaceholder?: string;
  onQuickReportClick?: () => void;
}

export default function Header({ 
  currentView, 
  onMenuToggle, 
  searchTerm, 
  onSearchChange,
  searchPlaceholder = "Cari di dasbor...",
  onQuickReportClick
}: HeaderProps) {

  // Translate view id to readable Indonesian breadcrumb
  const getViewLabel = (id: string) => {
    switch(id) {
      case 'dashboard': return 'Ikhtisar Dasbor';
      case 'analytics': return 'Analisis & Wawasan Bisnis';
      case 'bookings': return 'Log Pemesanan & Kode QR';
      case 'partners': return 'Manajemen Partner Kemitraan';
      case 'workspaces': return 'Inventaris & Detail Ruangan';
      case 'revenue': return 'Bagi Hasil Komisi Platform';
      case 'users': return 'Basis Data Pengguna';
      case 'approvals': return 'Verifikasi Pendaftaran Partner';
      case 'settings': return 'Pengaturan Sistem';
      default: return 'Komando Admin';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E8E8E8] px-6 py-4 flex items-center justify-between shadow-2xs">
      {/* Active view breadcrumbs */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuToggle}
          className="p-1.5 h-9 w-9 flex items-center justify-center border border-[#E8E8E8] rounded-lg text-[#333333] hover:bg-[#F5F1EB] active:bg-[#E8E8E8] md:hidden transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden md:flex items-center gap-1.5 text-xs text-[#8C8C8C] font-mono tracking-tight select-none">
          <span>Open Office</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C8C8C]" />
          <span className="text-[#333333] font-semibold font-sans text-sm">{getViewLabel(currentView)}</span>
        </div>
      </div>

      {/* Center/Right controls */}
      <div className="flex items-center gap-4">
        {/* Search input if current view supports filtering tables */}
        {['bookings', 'partners', 'workspaces', 'users'].includes(currentView) && (
          <div className="relative w-48 sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#8C8C8C] pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#F5F1EB]/50 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] focus:border-[#8B5E3C] focus:bg-white transition-all text-[#333333]"
            />
          </div>
        )}

        {/* Operating Date Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#F5F1EB] border border-[#E8E8E8] rounded-lg text-[11px] font-mono font-semibold text-[#8B5E3C]">
          <Calendar className="w-3.5 h-3.5 text-[#8B5E3C] stroke-[2]" />
          <span>17 Juni 2026</span>
        </div>

        {/* Action triggers */}
        <div className="flex items-center gap-1.5">
          <button 
            type="button"
            onClick={() => onQuickReportClick && onQuickReportClick()}
            className="hidden sm:inline-flex items-center justify-center px-3.5 py-2 bg-[#8B5E3C] hover:opacity-90 active:opacity-100 text-white rounded-lg text-xs font-semibold tracking-wide transition-opacity cursor-pointer shadow-sm"
          >
            Ekspor Laporan
          </button>
          
          <button 
            onClick={() => alert("Pusat notifikasi saat ini siaga. Tidak ada laporan sistem penting yang ditunda.")}
            className="p-2 border border-[#E8E8E8] hover:bg-stone-50 text-stone-550 rounded-lg transition-colors cursor-pointer relative"
          >
            <Bell className="w-4 h-4 text-[#8C8C8C]" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#8B5E3C] rounded-full" />
          </button>

          <button 
            onClick={() => alert("Grup Admin Support Open Office: admin-support@openoffice.space")}
            className="p-2 border border-[#E8E8E8] hover:bg-stone-50 text-stone-550 rounded-lg transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-[#8C8C8C]" />
          </button>
        </div>
      </div>
    </header>
  );
}
