import { 
  BarChart3, 
  TrendingUp, 
  CalendarCheck, 
  Building2, 
  Armchair, 
  Coins, 
  Users, 
  CheckSquare, 
  Settings, 
  LogOut, 
  Coffee,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  pendingApprovalsCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  adminName?: string;
  adminEmail?: string;
  onLogout?: () => void;
}

export default function Sidebar({ 
  currentView, 
  onViewChange, 
  pendingApprovalsCount, 
  isOpen, 
  setIsOpen,
  adminName = 'Edivho Febrian',
  adminEmail = 'edivho01@gmail.com',
  onLogout
}: SidebarProps) {
  
  const menuItems = [
    { id: 'dashboard', label: 'Dasbor Utama', icon: BarChart3 },
    { id: 'analytics', label: 'Analisis Data', icon: TrendingUp },
    { id: 'bookings', label: 'Kelola Pemesanan', icon: CalendarCheck },
    { id: 'partners', label: 'Kelola Partner', icon: Building2 },
    { id: 'workspaces', label: 'Kelola Ruangan', icon: Armchair },
    { id: 'revenue', label: 'Bagi Hasil Komisi', icon: Coins },
    { id: 'users', label: 'Kelola Pengguna', icon: Users },
    { 
      id: 'approvals', 
      label: 'Persetujuan Partner', 
      icon: CheckSquare, 
      count: pendingApprovalsCount 
    },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  const handleMenuClick = (id: string) => {
    onViewChange(id);
    setIsOpen(false); // Close sidebar on mobile after clicking
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/45 md:hidden z-40 transition-opacity" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Left Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 bg-white text-[#333333] w-64 flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out border-r border-[#E8E8E8]
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        {/* Header Branding */}
        <div className="p-6 border-b border-[#E8E8E8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#8B5E3C] p-2 rounded-lg text-white">
              <Coffee className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h1 className="font-sans font-bold text-base tracking-tight text-[#333333]">Open Office</h1>
              <p className="text-[10px] text-[#8C8C8C] font-bold tracking-wider uppercase">Admin Portal</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="md:hidden text-stone-400 hover:text-[#333333]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Actions list */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto space-y-1">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                id={`sidebar-item-${item.id}`}
                onClick={() => handleMenuClick(item.id)}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-150 group cursor-pointer
                  ${isActive 
                    ? 'bg-[#F5F1EB] text-[#8B5E3C]' 
                    : 'text-[#8C8C8C] hover:bg-[#8B5E3C]/5 hover:text-[#333333]'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <IconComponent className={`
                    w-4 h-4 transition-transform duration-150 group-hover:scale-105
                    ${isActive ? 'text-[#8B5E3C]' : 'text-[#8C8C8C] group-hover:text-[#333333]'}
                  `} />
                  <span>{item.label}</span>
                </div>
                
                {/* Dynamically update badge numbers (e.g. pending workspace partner requests!) */}
                {item.count !== undefined && item.count > 0 && (
                  <span className={`
                    px-2 py-0.5 rounded-full text-[9px] font-bold font-mono transition-colors
                    ${isActive ? 'bg-[#8B5E3C]/10 text-[#8B5E3C]' : 'bg-red-500/10 text-red-650'}
                  `}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Admin profile and log out card */}
        <div className="p-4 border-t border-[#E8E8E8] bg-[#FAFAF9] text-xs">
          <div className="flex items-center gap-3 mb-3 p-2.5 rounded-lg bg-[#F5F1EB] border border-[#E8E8E8]">
            <div className="w-8 h-8 rounded-full bg-[#8B5E3C] text-white font-sans font-bold flex items-center justify-center text-[11px] shadow-3xs uppercase">
              {adminName.slice(0, 2)}
            </div>
            <div className="truncate flex-1">
              <p className="font-semibold text-[#333333] tracking-tight">{adminName}</p>
              <p className="text-[10px] text-[#8C8C8C] truncate font-mono">{adminEmail}</p>
            </div>
          </div>

          <button 
            onClick={() => {
              if (onLogout) {
                onLogout();
              } else {
                alert("Keluar dari sesi administrasi secara aman.");
              }
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-[#8C8C8C] hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-[#8C8C8C]" />
            <span>Keluar Sistem</span>
          </button>
        </div>
      </aside>
    </>
  );
}
