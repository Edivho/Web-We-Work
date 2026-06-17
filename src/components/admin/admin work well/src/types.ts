export type PaymentStatus = 'Paid' | 'Refunded' | 'Pending';
export type BookingStatus = 'Confirmed' | 'Completed' | 'Cancelled';
export type PartnerStatus = 'Active' | 'Suspended' | 'PendingApproval';
export type WorkspaceStatus = 'Active' | 'Inactive';
export type PayoutStatus = 'Paid' | 'Pending' | 'Processing';
export type UserStatus = 'Active' | 'Suspended';

export interface Workspace {
  id: string;
  name: string;
  partnerName: string;
  location: string;
  capacity: number;
  price: number; // hourly price or day rate
  status: WorkspaceStatus;
  image: string;
  bookingsCount: number;
  revenue: number;
  occupancyRate: number; // e.g. 78%
}

export interface Partner {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  location: string;
  workspaceCount: number;
  revenue: number;
  status: PartnerStatus;
  dateJoined: string;
  logo: string;
}

export interface BookingTimelineItem {
  time: string;
  title: string;
  description: string;
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  workspaceId: string;
  workspaceName: string;
  partnerName: string;
  date: string;
  time: string;
  durationHours: number;
  pricePaid: number;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  qrCodeUrl: string;
  qrCodeResentCount: number;
  timeline: BookingTimelineItem[];
}

export interface PartnerApproval {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  photoUrl: string;
  submittedDocuments: { name: string; size: string; status: 'Verified' | 'Pending' }[];
  status: 'Pending' | 'Approved' | 'Rejected';
  description: string;
  workspaceDetails: {
    proposedName: string;
    capacity: number;
    proposedPrice: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalBookings: number;
  totalSpent: number;
  lastActivity: string;
  status: UserStatus;
  joinedDate: string;
}

export interface RevenueShare {
  partnerId: string;
  partnerName: string;
  totalBookings: number;
  totalRevenue: number;
  partnerShare: number; // calculated based on commission config
  platformShare: number; // commission config percentage
  payoutStatus: PayoutStatus;
}

export interface DashboardMetrics {
  totalBookings: number;
  totalBookingsChange: number;
  revenueThisMonth: number;
  revenueChange: number;
  activePartners: number;
  activePartnersChange: number;
  activeWorkspaces: number;
  activeWorkspacesChange: number;
  occupancyRate: number;
  occupancyRateChange: number;
  repeatCustomersRate: number;
  repeatCustomersRateChange: number;
}

export interface MonthlyData {
  month: string;
  revenue: number;
  bookings: number;
  partnerPayout: number;
  platformCommission: number;
}
