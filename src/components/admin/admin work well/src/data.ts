import { Workspace, Partner, Booking, User, PartnerApproval, DashboardMetrics, MonthlyData } from './types';

// Data Workspace Kafe & Coworking Space dalam Rupiah
export const INITIAL_WORKSPACES: Workspace[] = [
  {
    id: 'WS-001',
    name: 'Espresso Hub - Window Bench 4',
    partnerName: 'PT Seduh Kopi Nusantara',
    location: 'Sudirman, Jakarta Pusat',
    capacity: 1,
    price: 120000, // Rp 120.000 / jam
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80',
    bookingsCount: 245,
    revenue: 62475000, // Rp 62.475.000
    occupancyRate: 85,
  },
  {
    id: 'WS-002',
    name: 'Velvet Lounge - Private Phone Booth B',
    partnerName: 'Velvet Drip Roasters',
    location: 'Kebayoran Baru, Jakarta Selatan',
    capacity: 1,
    price: 225000, // Rp 225.000 / jam
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80',
    bookingsCount: 182,
    revenue: 81900000, // Rp 81.900.000
    occupancyRate: 72,
  },
  {
    id: 'WS-003',
    name: 'Roast Room - Ruang Meeting 6 Orang',
    partnerName: 'Ruang Roast & Diskus',
    location: 'Dago, Bandung',
    capacity: 6,
    price: 675000, // Rp 675.000 / jam
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&auto=format&fit=crop&q=80',
    bookingsCount: 92,
    revenue: 186300000, // Rp 186.300.000
    occupancyRate: 91,
  },
  {
    id: 'WS-004',
    name: 'Selasar Pojok - Standing Desk 12',
    partnerName: 'Bean & Byte Suite',
    location: 'Serpong, Tangerang Selatan',
    capacity: 1,
    price: 180000, // Rp 180.000 / jam
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80',
    bookingsCount: 310,
    revenue: 111600000, // Rp 111.600.000
    occupancyRate: 88,
  },
  {
    id: 'WS-005',
    name: 'Chai Study Chambers - Workbench Besar A',
    partnerName: 'Nectar Chai Lounge',
    location: 'Depok, Jawa Barat',
    capacity: 10,
    price: 450000, // Rp 450.000 / jam
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&auto=format&fit=crop&q=80',
    bookingsCount: 144,
    revenue: 129600000, // Rp 129.600.000
    occupancyRate: 64,
  },
  {
    id: 'WS-006',
    name: 'Selasar Taman - Meja Semi Outdoor 3',
    partnerName: 'Verdanth Green Cafe',
    location: 'Sleman, Yogyakarta',
    capacity: 2,
    price: 270000, // Rp 270.000 / jam
    status: 'Inactive',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&auto=format&fit=crop&q=80',
    bookingsCount: 68,
    revenue: 367200000, // Rp 36.720.000
    occupancyRate: 45,
  }
];

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: 'PT-01',
    name: 'PT Seduh Kopi Nusantara',
    ownerName: 'Margaret Hall',
    email: 'margaret@brewbrew.com',
    phone: '+62 812-5555-8291',
    location: 'Jakarta Pusat, DKI Jakarta',
    workspaceCount: 3,
    revenue: 126750000,
    status: 'Active',
    dateJoined: '2025-01-14',
    logo: 'SK',
  },
  {
    id: 'PT-02',
    name: 'Velvet Drip Roasters',
    ownerName: 'Marcus Sterling',
    email: 'marcus@velvetdrip.com',
    phone: '+62 821-3333-1928',
    location: 'Jakarta Selatan, DKI Jakarta',
    workspaceCount: 2,
    revenue: 91800000,
    status: 'Active',
    dateJoined: '2025-02-19',
    logo: 'VD',
  },
  {
    id: 'PT-03',
    name: 'Ruang Roast & Diskus',
    ownerName: 'Elena Rostova',
    email: 'elena@roastresearch.com',
    phone: '+62 819-8888-2941',
    location: 'Bandung, Jawa Barat',
    workspaceCount: 1,
    revenue: 186300000,
    status: 'Active',
    dateJoined: '2025-03-01',
    logo: 'RD',
  },
  {
    id: 'PT-04',
    name: 'Bean & Byte Suite',
    ownerName: 'Derrick Powell',
    email: 'derrick@beanandbyte.co',
    phone: '+62 855-7777-1049',
    location: 'Tangerang, Banten',
    workspaceCount: 2,
    revenue: 141000000,
    status: 'Active',
    dateJoined: '2025-03-24',
    logo: 'BB',
  },
  {
    id: 'PT-05',
    name: 'Nectar Chai Lounge',
    ownerName: 'Amina Al-Mansoor',
    email: 'amina@nectarchai.com',
    phone: '+62 813-4444-2091',
    location: 'Depok, Jawa Barat',
    workspaceCount: 2,
    revenue: 129600000,
    status: 'Active',
    dateJoined: '2025-04-05',
    logo: 'NC',
  },
  {
    id: 'PT-06',
    name: 'Verdanth Green Cafe',
    ownerName: 'Silas Vance',
    email: 'silas@verdanth.space',
    phone: '+62 878-2222-7711',
    location: 'Yogyakarta, DIY',
    workspaceCount: 1,
    revenue: 36720000,
    status: 'Suspended',
    dateJoined: '2025-04-12',
    logo: 'VG',
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-8492',
    customerName: 'Siti Rahma',
    customerEmail: 'siti.rahma@uxflow.org',
    workspaceId: 'WS-001',
    workspaceName: 'Espresso Hub - Window Bench 4',
    partnerName: 'PT Seduh Kopi Nusantara',
    date: '2026-06-17',
    time: '09:00 WIB',
    durationHours: 3,
    pricePaid: 382500, // Rp 382.500
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BK-8492-SitiRahma',
    qrCodeResentCount: 0,
    timeline: [
      { time: '07:15 WIB', title: 'Pembayaran Dikonfirmasi', description: 'Transaksi #TX-77382 selesai melalui Gateway Pembayaran.' },
      { time: '07:15 WIB', title: 'Pemesanan Dibuat', description: 'Pengguna Siti Rahma memesan WS-001.' },
    ]
  },
  {
    id: 'BK-8491',
    customerName: 'Aditya Pratama',
    customerEmail: 'aditya.p@devstack.io',
    workspaceId: 'WS-003',
    workspaceName: 'Roast Room - Ruang Meeting 6 Orang',
    partnerName: 'Ruang Roast & Diskus',
    date: '2026-06-17',
    time: '11:00 WIB',
    durationHours: 4,
    pricePaid: 2700000, // Rp 2.700.000
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BK-8491-AdityaPratama',
    qrCodeResentCount: 1,
    timeline: [
      { time: '16-06-2026 16:30 WIB', title: 'Kode QR Dibagikan', description: 'Kode QR akses SMS/Email telah dikirim ulang ke pelanggan.' },
      { time: '16-06-2026 15:00 WIB', title: 'Pembayaran Dikonfirmasi', description: 'Transaksi #TX-77381 selesai melalui Virtual Account.' },
      { time: '16-06-2026 14:54 WIB', title: 'Pemesanan Dibuat', description: 'Pengguna Aditya Pratama memesan WS-003.' },
    ]
  },
  {
    id: 'BK-8490',
    customerName: 'David Kuncoro',
    customerEmail: 'kojo@funder.vc',
    workspaceId: 'WS-002',
    workspaceName: 'Velvet Lounge - Private Phone Booth B',
    partnerName: 'Velvet Drip Roasters',
    date: '2026-06-17',
    time: '14:00 WIB',
    durationHours: 2,
    pricePaid: 450000, // Rp 450.000
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BK-8490-DavidKuncoro',
    qrCodeResentCount: 0,
    timeline: [
      { time: '16-06-2026 11:22 WIB', title: 'Pembayaran Dikonfirmasi', description: 'Transaksi #TX-77378 diselesaikan secara online.' },
      { time: '16-06-2026 11:20 WIB', title: 'Pemesanan Dibuat', description: 'Pengguna David Kuncoro memesan WS-002.' },
    ]
  },
  {
    id: 'BK-8489',
    customerName: 'Hana Lestari',
    customerEmail: 'hanalin@bloomdesign.co',
    workspaceId: 'WS-004',
    workspaceName: 'Selasar Pojok - Standing Desk 12',
    partnerName: 'Bean & Byte Suite',
    date: '2026-06-16',
    time: '10:00 WIB',
    durationHours: 6,
    pricePaid: 1080000, // Rp 1.080.000
    paymentStatus: 'Paid',
    bookingStatus: 'Completed',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BK-8489-HanaLestari',
    qrCodeResentCount: 0,
    timeline: [
      { time: '16-06-2026 16:00 WIB', title: 'Sesi Selesai', description: 'Check-out berhasil dicatat di meja partner.' },
      { time: '16-06-2026 10:02 WIB', title: 'Masuk Check-In', description: 'Kode QR Access berhasil divalidasi dan dipindai.' },
      { time: '15-06-2026 09:12 WIB', title: 'Pemesanan Dikonfirmasi', description: 'Sistem menyetujui pemesanan secara otomatis.' }
    ]
  },
  {
    id: 'BK-8488',
    customerName: 'Marcus Budiman',
    customerEmail: 'brody@museumnet.org',
    workspaceId: 'WS-005',
    workspaceName: 'Chai Study Chambers - Workbench Besar A',
    partnerName: 'Nectar Chai Lounge',
    date: '2026-06-15',
    time: '13:00 WIB',
    durationHours: 5,
    pricePaid: 2250000, // Rp 2.250.000
    paymentStatus: 'Paid',
    bookingStatus: 'Completed',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BK-8488-MarcusBudiman',
    qrCodeResentCount: 0,
    timeline: [
      { time: '15-06-2026 18:12 WIB', title: 'Otomatis Selesai', description: 'Durasi sewa ruang telah berakhir.' },
      { time: '15-06-2026 13:10 WIB', title: 'Check-In Terlambat', description: 'Akses dipindai di kasir Chai Lounge.' }
    ]
  },
  {
    id: 'BK-8487',
    customerName: 'Zoe Widiastuti',
    customerEmail: 'zoe@winterscodes.com',
    workspaceId: 'WS-001',
    workspaceName: 'Espresso Hub - Window Bench 4',
    partnerName: 'PT Seduh Kopi Nusantara',
    date: '2026-06-14',
    time: '16:00 WIB',
    durationHours: 2,
    pricePaid: 255000, // Rp 255.000
    paymentStatus: 'Refunded',
    bookingStatus: 'Cancelled',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BK-8487-ZoeWidiastuti',
    qrCodeResentCount: 0,
    timeline: [
      { time: '13-06-2026 11:00 WIB', title: 'Pengembalian Dana Dikirim', description: '100% pengembalian dana sebesar Rp 255.000 berhasil dikirim.' },
      { time: '13-06-2026 10:45 WIB', title: 'Pembatalan Diajukan', description: 'Pelanggan membatalkan transaksi dalam ambang batas waktu.' }
    ]
  }
];

export const INITIAL_APPROVALS: PartnerApproval[] = [
  {
    id: 'AP-201',
    businessName: 'The Daily Brew & Chat',
    ownerName: 'Tobias Funke',
    email: 'tobias@dailybrewchat.com',
    phone: '+62 821-882-9112',
    address: 'Jl. Kemang Raya No. 42, Jakarta Selatan, DKI Jakarta 12730',
    photoUrl: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=600&auto=format&fit=crop&q=80',
    description: 'Kami menyediakan loteng tenang lantai atas untuk bekerja remote. Fasilitas espresso bar premium, stopkontak ergonomis, internet serat optik kecepatan tinggi, dan isi ulang kopi sepuasnya.',
    status: 'Pending',
    workspaceDetails: {
      proposedName: 'Loteng Atas Tenang - Meja Flex',
      capacity: 12,
      proposedPrice: 150000,
    },
    submittedDocuments: [
      { name: 'izin_usaha_nib_2026.pdf', size: '1.4 MB', status: 'Verified' },
      { name: 'asuransi_tanggung_gugat.pdf', size: '2.8 MB', status: 'Verified' },
      { name: 'foto_blueprint_ruangan.pdf', size: '12.4 MB', status: 'Pending' }
    ]
  },
  {
    id: 'AP-202',
    businessName: 'Beanstalk Library Cafe',
    ownerName: 'Sophia Lin',
    email: 'sophia@beanstalkcafe.net',
    phone: '+62 811-902-8472',
    address: 'Jl. Ir. H. Juanda No. 182, Bandung, Jawa Barat 40135',
    photoUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
    description: 'Dek kayu baca super tenang di Bandung Utara dengan dinding kedap suara, banyak stopkontak, dan pilihan teh berkualitas tinggi. Sempurna untuk studi jarak jauh dan penulis.',
    status: 'Pending',
    workspaceDetails: {
      proposedName: 'Dek Baca & Menulis Tenang',
      capacity: 8,
      proposedPrice: 172500,
    },
    submittedDocuments: [
      { name: 'sertifikat_laik_fungsi.pdf', size: '3.1 MB', status: 'Verified' },
      { name: 'akta_pendirian_perusahaan.pdf', size: '920 KB', status: 'Verified' }
    ]
  },
  {
    id: 'AP-203',
    businessName: 'Amara Co-working & Coffee',
    ownerName: 'Ryan Reynolds',
    email: 'ryan@amaracoffee.co',
    phone: '+62 822-412-2931',
    address: 'Jl. Malioboro No. 320, Yogyakarta, DIY 55271',
    photoUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&auto=format&fit=crop&q=80',
    description: 'Ruang kerja desain eksekutif langsung di pusat Yogyakarta dengan papan tulis lengkap, layar presentasi profesional, dan layanan barista diantarkan langsung ke meja.',
    status: 'Approved',
    workspaceDetails: {
      proposedName: 'Boardroom Presentasi Barista',
      capacity: 8,
      proposedPrice: 750000,
    },
    submittedDocuments: [
      { name: 'izin_gangguan_ho_yogyakarta.pdf', size: '4.2 MB', status: 'Verified' }
    ]
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'USR-9001',
    name: 'Siti Rahma',
    email: 'siti.rahma@uxflow.org',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    totalBookings: 24,
    totalSpent: 6427500,
    lastActivity: '17-06-2026 09:15 WIB',
    status: 'Active',
    joinedDate: '12-05-2025'
  },
  {
    id: 'USR-9002',
    name: 'Aditya Pratama',
    email: 'aditya.p@devstack.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    totalBookings: 18,
    totalSpent: 18600000,
    lastActivity: '17-06-2026 11:00 WIB',
    status: 'Active',
    joinedDate: '28-07-2025'
  },
  {
    id: 'USR-9003',
    name: 'David Kuncoro',
    email: 'kojo@funder.vc',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    totalBookings: 32,
    totalSpent: 13050000,
    lastActivity: '17-06-2026 14:20 WIB',
    status: 'Active',
    joinedDate: '10-02-2025'
  },
  {
    id: 'USR-9004',
    name: 'Hana Lestari',
    email: 'hanalin@bloomdesign.co',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    totalBookings: 15,
    totalSpent: 5925000,
    lastActivity: '16-06-2026 16:00 WIB',
    status: 'Active',
    joinedDate: '01-09-2025'
  },
  {
    id: 'USR-9005',
    name: 'Robert Budiman',
    email: 'r.budiman@freelancer.net',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    totalBookings: 8,
    totalSpent: 1650000,
    lastActivity: '12-06-2026 11:30 WIB',
    status: 'Suspended',
    joinedDate: '20-11-2025'
  }
];

export const INITIAL_METRICS: DashboardMetrics = {
  totalBookings: 2184,
  totalBookingsChange: 14.5,
  revenueThisMonth: 663465000, // Rp 663.465.000
  revenueChange: 18.2,
  activePartners: 48,
  activePartnersChange: 8.3,
  activeWorkspaces: 156,
  activeWorkspacesChange: 4.0,
  occupancyRate: 74.8,
  occupancyRateChange: 2.1,
  repeatCustomersRate: 68.4,
  repeatCustomersRateChange: 5.8
};

export const MONTHLY_TREND_DATA: MonthlyData[] = [
  { month: 'Jul 25', revenue: 375000000, bookings: 1200, partnerPayout: 300000000, platformCommission: 75000000 },
  { month: 'Agt 25', revenue: 426000000, bookings: 1350, partnerPayout: 340800000, platformCommission: 85200000 },
  { month: 'Sep 25', revenue: 468000000, bookings: 1420, partnerPayout: 374400000, platformCommission: 93600000 },
  { month: 'Okt 25', revenue: 447000000, bookings: 1380, partnerPayout: 357600000, platformCommission: 89400000 },
  { month: 'Nov 25', revenue: 502500000, bookings: 1610, partnerPayout: 402000000, platformCommission: 100500000 },
  { month: 'Des 25', revenue: 465000000, bookings: 1500, partnerPayout: 372000000, platformCommission: 93000000 },
  { month: 'Jan 26', revenue: 525000000, bookings: 1720, partnerPayout: 420000000, platformCommission: 105000000 },
  { month: 'Feb 26', revenue: 573000000, bookings: 1890, partnerPayout: 458400000, platformCommission: 114600000 },
  { month: 'Mar 26', revenue: 615000000, bookings: 1980, partnerPayout: 492000000, platformCommission: 123000000 },
  { month: 'Apr 26', revenue: 592500000, bookings: 1910, partnerPayout: 474000000, platformCommission: 118500000 },
  { month: 'Mei 26', revenue: 642000000, bookings: 2100, partnerPayout: 513600000, platformCommission: 128400000 },
  { month: 'Jun 26', revenue: 663465000, bookings: 2184, partnerPayout: 530772000, platformCommission: 132693000 },
];

export const HOURLY_BOOKING_DISTRIBUTION = [
  { hour: '08:00 WIB', count: 145 },
  { hour: '09:00 WIB', count: 320 },
  { hour: '10:00 WIB', count: 410 },
  { hour: '11:00 WIB', count: 380 },
  { hour: '12:00 WIB', count: 210 },
  { hour: '13:00 WIB', count: 280 },
  { hour: '14:00 WIB', count: 340 },
  { hour: '15:00 WIB', count: 290 },
  { hour: '16:00 WIB', count: 180 },
  { hour: '17:00 WIB', count: 95 },
];

export const CITY_DISTRIBUTION = [
  { city: 'Jakarta', percentage: 48, bookings: 1048, color: '#8B5E3C' },
  { city: 'Bandung', percentage: 22, bookings: 480, color: '#A0714F' },
  { city: 'Depok', percentage: 18, bookings: 393, color: '#B68563' },
  { city: 'Yogyakarta', percentage: 12, bookings: 263, color: '#CBA081' },
];
