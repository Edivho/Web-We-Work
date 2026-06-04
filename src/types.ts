export interface Workspace {
  id: string;
  name: string;
  location: string;
  city: string;
  type: 'Coffee Shop' | 'Lounge' | 'Meeting Room' | 'Private Room';
  pricePerHour: number;
  rating: number;
  ratingCount: number;
  imageUrl: string;
  facilities: string[];
  capacity: number;
  description: string;
  isPopular?: boolean;
}

export interface Booking {
  id: string;
  workspaceId: string;
  workspaceName: string;
  imageUrl: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  bookingDate: string;
  startTime: string;
  duration: number; // in hours
  totalPrice: number;
  ticketCode: string;
  paymentMethod: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  feedback: string;
  rating: number;
  category: 'User' | 'Mitra';
}

export interface PartnerRegistration {
  id: string;
  ownerName: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  address: string;
  spaceDescription: string;
  submittedAt: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  category: 'Workshop' | 'Seminar Startup' | 'Gathering' | 'Networking';
  date: string;
  time: string;
  location: string;
  description: string;
  speaker: string;
  spotsLeft: number;
}
