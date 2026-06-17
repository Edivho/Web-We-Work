import { useState, useMemo, useEffect } from 'react';
import { supabase } from "./components/lib/supabase";

import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Import our beautiful modular view layouts
import DashboardView from './components/DashboardView';
import AnalyticsView from './components/AnalyticsView';
import BookingManagementView from './components/BookingManagementView';
import PartnerManagementView from './components/PartnerManagementView';
import WorkspaceManagementView from './components/WorkspaceManagementView';
import PartnerApprovalView from './components/PartnerApprovalView';
import RevenueSharingView from './components/RevenueSharingView';
import UserManagementView from './components/UserManagementView';
import SettingsView from './components/SettingsView';
import LoginView from './components/LoginView';

// Import seed dataset
import { 
  INITIAL_BOOKINGS, 
  INITIAL_PARTNERS, 
  INITIAL_WORKSPACES, 
  INITIAL_APPROVALS, 
  INITIAL_USERS, 
  INITIAL_METRICS 
} from './data';

import { Booking, Partner, Workspace, PartnerApproval, User, PartnerStatus, UserStatus } from './types';

export default function App() {
  // ------------------------- SUPABASE CONNECTION TEST -------------------------
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Supabase Error:', error);
      } else {
        console.log('✅ Supabase Connected');
        console.log(data);
      }
    };

    testConnection();
  }, []);

  // Navigation tabs state
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Administrative account directory
  const [admins, setAdmins] = useState([
    { name: 'Edivho Febrian', email: 'edivho01@gmail.com', passwordHash: 'admin123' }
  ]);
  const [loggedInAdmin, setLoggedInAdmin] = useState<{ name: string; email: string } | null>(null);

  // Global administrative state databases
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [partners, setPartners] = useState<Partner[]>(INITIAL_PARTNERS);
  const [workspaces, setWorkspaces] = useState<Workspace[]>(INITIAL_WORKSPACES);
  const [approvals, setApprovals] = useState<PartnerApproval[]>(INITIAL_APPROVALS);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);

  // Take-rate commission split configurations (linked dynamically to Settings!)
  const [commissionPct, setCommissionPct] = useState<number>(20);

  // Shared dynamic contextual search terms
  const [searchQuery, setSearchQuery] = useState<string>('');

  // ------------------------- DATA TRANSFORMATION ACTIONS -------------------------

  // 1. Booking Actions
  const handleCancelBooking = (bookingId: string) => {
    setBookings(prevBookings => 
      prevBookings.map(b => {
        if (b.id === bookingId) {
          const formattedTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' (Override)';
          return {
            ...b,
            bookingStatus: 'Cancelled',
            paymentStatus: 'Refunded',
            timeline: [
              { time: formattedTime, title: 'Session Cancelled', description: 'Cancelled and fully refunded by administrator' },
              ...b.timeline
            ]
          };
        }
        return b;
      })
    );
  };

  const handleResendQR = (bookingId: string) => {
    setBookings(prevBookings => 
      prevBookings.map(b => {
        if (b.id === bookingId) {
          const formattedTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
          return {
            ...b,
            qrCodeResentCount: b.qrCodeResentCount + 1,
            timeline: [
              { time: formattedTime, title: 'Access Resent', description: 'System QR access token resent to user SMS & Email channels.' },
              ...b.timeline
            ]
          };
        }
        return b;
      })
    );
  };

  const handleCheckInBooking = (bookingId: string) => {
    setBookings(prevBookings => 
      prevBookings.map(b => {
        if (b.id === bookingId) {
          const formattedTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
          return {
            ...b,
            bookingStatus: 'Completed',
            timeline: [
              { 
                time: formattedTime, 
                title: 'Check-In QR Berhasil', 
                description: 'Calon penyewa berhasil memvalidasi Kode QR pemesanan dan menempati ruangan.' 
              },
              ...b.timeline
            ]
          };
        }
        return b;
      })
    );
  };

  // 2. Partner Actions
  const handleTogglePartnerStatus = (partnerId: string, newStatus: PartnerStatus) => {
    setPartners(prevPartners => 
      prevPartners.map(p => {
        if (p.id === partnerId) {
          return { ...p, status: newStatus };
        }
        return p;
      })
    );

    // If suspending, disable their corresponding workspaces out of catalog!
    const partnerObj = partners.find(p => p.id === partnerId);
    if (partnerObj) {
      const activeState = newStatus === 'Active' ? 'Active' : 'Inactive';
      setWorkspaces(prevWss => 
        prevWss.map(ws => ws.partnerName === partnerObj.name ? { ...ws, status: activeState } : ws)
      );
    }
  };

  const handleEditPartner = (updatedPartner: Partner) => {
    setPartners(prevPartners => 
      prevPartners.map(p => p.id === updatedPartner.id ? updatedPartner : p)
    );
  };

  // 3. Workspace Inventory Actions
  const handleAddWorkspace = (newWs: Omit<Workspace, 'bookingsCount' | 'revenue' | 'occupancyRate'>) => {
    const fullWs: Workspace = {
      ...newWs,
      bookingsCount: 0,
      revenue: 0.0,
      occupancyRate: 75.0, // default placeholder efficiency
    };
    setWorkspaces(prev => [fullWs, ...prev]);
  };

  const handleEditWorkspace = (updatedWs: Workspace) => {
    setWorkspaces(prev => 
      prev.map(ws => ws.id === updatedWs.id ? updatedWs : ws)
    );
  };

  const handleToggleWorkspaceStatus = (workspaceId: string) => {
    setWorkspaces(prev => 
      prev.map(ws => {
        if (ws.id === workspaceId) {
          return { ...ws, status: ws.status === 'Active' ? 'Inactive' : 'Active' };
        }
        return ws;
      })
    );
  };

  const handleDeleteWorkspace = (workspaceId: string) => {
    setWorkspaces(prev => prev.filter(ws => ws.id !== workspaceId));
  };

  // 4. Partner Application Vetting & Intake Operations
  const handleApprovePartner = (approvalId: string) => {
    const approval = approvals.find(ap => ap.id === approvalId);
    if (!approval) return;

    // A. Generate brand new affiliate profile
    const newPartnerId = `PT-${(partners.length + 1).toString().padStart(2, '0')}`;
    const cleanAddress = approval.address.split(',').slice(-2).join(',').trim(); // e.g. "San Francisco, CA"
    
    const newPartnerObj: Partner = {
      id: newPartnerId,
      name: approval.businessName,
      ownerName: approval.ownerName,
      email: approval.email,
      phone: approval.phone,
      location: cleanAddress,
      workspaceCount: 1,
      revenue: 0.0,
      status: 'Active',
      dateJoined: new Date().toISOString().split('T')[0],
      logo: approval.businessName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    };

    // B. Inject corresponding office unit into physical assets
    const newWorkspaceObj: Workspace = {
      id: `WS-00${workspaces.length + 1}`,
      name: approval.workspaceDetails.proposedName,
      partnerName: approval.businessName,
      location: approval.address,
      capacity: approval.workspaceDetails.capacity,
      price: approval.workspaceDetails.proposedPrice,
      status: 'Active',
      image: approval.photoUrl,
      bookingsCount: 0,
      revenue: 0,
      occupancyRate: 80.0
    };

    // Commit changes
    setPartners(prev => [...prev, newPartnerObj]);
    setWorkspaces(prev => [newWorkspaceObj, ...prev]);
    setApprovals(prev => prev.map(ap => ap.id === approvalId ? { ...ap, status: 'Approved' } : ap));

    alert(`🎉 Application Approved!\nHost Brand "${approval.businessName}" is now activated. Active workspace Unit "${approval.workspaceDetails.proposedName}" registered inside listing database.`);
  };

  const handleRejectPartner = (approvalId: string) => {
    setApprovals(prev => 
      prev.map(ap => ap.id === approvalId ? { ...ap, status: 'Rejected' } : ap)
    );
    alert(`Host Application ${approvalId} has been successfully flagged as Rejected.`);
  };

  // 5. User accounts controls
  const handleToggleUserStatus = (userId: string, newStatus: UserStatus) => {
    setUsers(prev => 
      prev.map(u => u.id === userId ? { ...u, status: newStatus } : u)
    );
  };

  // 6. Manual financial release confirmation trigger
  const handleReleasePayout = (partnerId: string) => {
    alert(`⚡ WIRE ACQUISITION RELEASED\nManual host payout has been compiled on behalf of Edivho Febrian. Ledger records clear immediately.`);
  };

  // ------------------------- METRICS SUMMATION CONTROLLER -------------------------

  // Count active pending intake apps
  const pendingIntakesCount = useMemo(() => {
    return approvals.filter(ap => ap.status === 'Pending').length;
  }, [approvals]);

  // Compute accurate active workspaces count
  const activeSpacesMetrics = useMemo(() => {
    return workspaces.filter(ws => ws.status === 'Active').length;
  }, [workspaces]);

  // Compile individual workspace counts mapped to host names
  const workspaceCounterMap = useMemo(() => {
    const counts: Record<string, number> = {};
    workspaces.forEach(ws => {
      counts[ws.partnerName] = (counts[ws.partnerName] || 0) + 1;
    });
    return counts;
  }, [workspaces]);

  // Dynamically recalculate KPI summary statistics based on active lists!
  const liveMetrics = useMemo(() => {
    // Computes overall bookings sums minus cancelled sessions
    const activeBookings = bookings.filter(b => b.bookingStatus !== 'Cancelled');
    const baseTotalBookings = INITIAL_METRICS.totalBookings + (activeBookings.length - INITIAL_BOOKINGS.filter(b => b.bookingStatus !== 'Cancelled').length);

    // Sum overall active workspace revenue
    const baseTotalRevenue = workspaces.reduce((sum, ws) => sum + ws.revenue, 0);

    return {
      ...INITIAL_METRICS,
      totalBookings: baseTotalBookings,
      revenueThisMonth: baseTotalRevenue,
      activePartners: partners.filter(p => p.status === 'Active').length,
      activeWorkspaces: activeSpacesMetrics,
    };
  }, [bookings, partners, workspaces, activeSpacesMetrics]);

  // Partner checklist options for selection forms
  const listPartnerCompact = useMemo(() => {
    return partners
      .filter(p => p.status === 'Active')
      .map(p => ({ id: p.id, name: p.name }));
  }, [partners]);

  // Navigation tab switcher delegate
  const handleTabTransition = (tabId: string) => {
    setCurrentTab(tabId);
    setSearchQuery(''); // Flush searches on transition
  };

  // Quick download report action
  const handleDownloadSheet = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Report: Open Office Space Executive Ledger\n"
      + `Report Time: ${new Date().toLocaleString()}\n`
      + `Total Bookings Count: ${liveMetrics.totalBookings}\n`
      + `Take commission rate: ${commissionPct}%\n`
      + `Estimated revenue: $${liveMetrics.revenueThisMonth}\n`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `OpenOffice_AdminReport_${currentTab}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!loggedInAdmin) {
    return <LoginView admins={admins} onLoginSuccess={(admin) => setLoggedInAdmin(admin)} />;
  }

  return (
    <div className="flex min-h-screen bg-[#F5F1EB] font-sans text-stone-800 antialiased overflow-x-hidden md:pl-64">
      
      {/* 1. Collapsible Fixed Brand Navigation Sidebar */}
      <Sidebar 
        currentView={currentTab}
        onViewChange={handleTabTransition}
        pendingApprovalsCount={pendingIntakesCount}
        isOpen={mobileMenuOpen}
        setIsOpen={setMobileMenuOpen}
        adminName={loggedInAdmin.name}
        adminEmail={loggedInAdmin.email}
        onLogout={() => {
          setLoggedInAdmin(null);
          setCurrentTab('dashboard');
        }}
      />

      {/* 2. Primary Layout Canvas Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Upper Sticky Breadcrumb controls & instant search */}
        <Header 
          currentView={currentTab}
          onMenuToggle={() => setMobileMenuOpen(true)}
          searchTerm={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder={`Search ${currentTab}...`}
          onQuickReportClick={handleDownloadSheet}
        />

        {/* 3. Main content body display viewport */}
        <main className="flex-grow p-4 md:p-6 space-y-6">
          
          {currentTab === 'dashboard' && (
            <DashboardView 
              metrics={liveMetrics}
              topWorkspaces={workspaces}
              recentBookings={bookings}
              partnersCount={partners.length}
              onNavigateToView={handleTabTransition}
              onOpenBookingDetail={(b) => {
                handleTabTransition('bookings');
              }}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView 
              partners={partners}
              workspaces={workspaces}
            />
          )}

          {currentTab === 'bookings' && (
            <BookingManagementView 
              bookings={bookings}
              onCancelBooking={handleCancelBooking}
              onResendQR={handleResendQR}
              onCheckInBooking={handleCheckInBooking}
            />
          )}

          {currentTab === 'partners' && (
            <PartnerManagementView 
              partners={partners}
              workspacesCountByPartner={workspaceCounterMap}
              onTogglePartnerStatus={handleTogglePartnerStatus}
              onEditPartner={handleEditPartner}
            />
          )}

          {currentTab === 'workspaces' && (
            <WorkspaceManagementView 
              workspaces={workspaces}
              partnersList={listPartnerCompact}
              onAddWorkspace={handleAddWorkspace}
              onEditWorkspace={handleEditWorkspace}
              onToggleStatus={handleToggleWorkspaceStatus}
              onDeleteWorkspace={handleDeleteWorkspace}
            />
          )}

          {currentTab === 'approvals' && (
            <PartnerApprovalView 
              approvals={approvals}
              onApprove={handleApprovePartner}
              onReject={handleRejectPartner}
            />
          )}

          {currentTab === 'revenue' && (
            <RevenueSharingView 
              partners={partners}
              commissionPercentage={commissionPct}
              onDispatchedPayout={handleReleasePayout}
            />
          )}

          {currentTab === 'users' && (
            <UserManagementView 
              users={users}
              onToggleUserStatus={handleToggleUserStatus}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView 
              commission={commissionPct}
              onCommissionChange={setCommissionPct}
              admins={admins}
              onAddAdmin={(newAdmin) => setAdmins(prev => [...prev, newAdmin])}
            />
          )}

        </main>

        {/* Footer info line */}
        <footer className="py-4 px-6 border-t border-[#E8E8E8] text-[10px] text-[#8C8C8C] font-mono flex flex-col sm:flex-row justify-between items-center bg-white/80">
          <span>&copy; 2026 Open Office Space Indonesia. Hak Cipta Dilindungi.</span>
          <span>Lingkungan: PRODUKSI &bull; Latensi: &lt;5ms &bull; Area: ap-southeast (Jakarta)</span>
        </footer>

      </div>
    </div>
  );
}