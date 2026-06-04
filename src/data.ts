import { Workspace, Testimonial, CommunityEvent } from './types';

export const WORKSPACES: Workspace[] = [
  {
    id: 'ws-1',
    name: 'Kopi Ruang Kerja',
    location: 'Kebayoran Baru, Jakarta Selatan',
    city: 'Jakarta Selatan',
    type: 'Coffee Shop',
    pricePerHour: 25000,
    rating: 4.8,
    ratingCount: 142,
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    facilities: ['WiFi Kencang', 'AC Dingin', 'Colokan Individu', 'Kopi Gratis (1 Cup)', 'Area Merokok Terpisah'],
    capacity: 6,
    description: 'Suasana coffee shop modern dengan meja komunal yang luas, dirancang khusus untuk meminimalkan gangguan dan memaksimalkan produktivitas Anda.',
    isPopular: true
  },
  {
    id: 'ws-2',
    name: 'Veranda Creative Lounge',
    location: 'Dago, Bandung',
    city: 'Bandung',
    type: 'Lounge',
    pricePerHour: 30000,
    rating: 4.9,
    ratingCount: 96,
    imageUrl: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
    facilities: ['Super High Speed WiFi', 'Sofa Nyaman', 'Free Flow Air Mineral', 'Parkir Gratis', 'Colokan USB'],
    capacity: 10,
    description: 'Lounge bergaya semi-outdoor yang sejuk di kawasan Dago, memberikan kenyamanan serasa di rumah dengan pemandangan hijau yang menyegarkan pikiran.',
    isPopular: true
  },
  {
    id: 'ws-3',
    name: 'Nusantara Executive Boardroom',
    location: 'Sudirman, Jakarta Pusat',
    city: 'Jakarta Pusat',
    type: 'Meeting Room',
    pricePerHour: 150000,
    rating: 5.0,
    ratingCount: 38,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    facilities: ['LCD Projector', 'AC Central', 'Whiteboard', 'Sound System', 'Kapasitas 12 Orang', 'Teh & Kopi Hangat'],
    capacity: 12,
    description: 'Ruang rapat elit berskala profesional di pusat bisnis Jakarta. Cocok untuk presentasi bisnis, rapat pemegang saham, atau pitching investor.',
    isPopular: false
  },
  {
    id: 'ws-4',
    name: 'The Library Coffee & Desk',
    location: 'Gubeng, Surabaya',
    city: 'Surabaya',
    type: 'Private Room',
    pricePerHour: 45000,
    rating: 4.7,
    ratingCount: 65,
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    facilities: ['Private Pod', 'Ergonomic Chair', 'Lampu Meja Redup', 'Smart Monitor', 'WiFi 100 Mbps', 'Kedap Suara'],
    capacity: 2,
    description: 'Bekerja tanpa distraksi sama sekali. Private pod kedap suara dilengkapi dengan meja ergonomis dan monitor desktop eksternal tingkat industri.',
    isPopular: true
  },
  {
    id: 'ws-5',
    name: 'Tropical Breeze Sandbox',
    location: 'Canggu, Bali',
    city: 'Bali',
    type: 'Lounge',
    pricePerHour: 35000,
    rating: 4.9,
    ratingCount: 210,
    imageUrl: 'https://images.unsplash.com/photo-1582037919731-1e47851ede90?auto=format&fit=crop&w=800&q=80',
    facilities: ['Pool View Access', 'Genset Backup', 'WiFi Pintar', 'Beanbags', 'Diskon Makanan 15%'],
    capacity: 8,
    description: 'Bekerja santai sambil menikmati hembusan angin Bali. Lounge tepi kolam yang teduh, nyaman, dan menjadi pusat berkumpulnya digital nomad global.',
    isPopular: false
  },
  {
    id: 'ws-6',
    name: 'Dua Coffee Workspace',
    location: 'Kemang, Jakarta Selatan',
    city: 'Jakarta Selatan',
    type: 'Coffee Shop',
    pricePerHour: 30000,
    rating: 4.8,
    ratingCount: 185,
    imageUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80',
    facilities: ['Stopkontak Melimpah', 'Kursi Ergonomis', 'Diskon Pastry', 'AC Dingin', 'Indoor & Outdoor Area'],
    capacity: 6,
    description: 'Coffee shop premium legendaris di Kemang yang menyediakan sudut khusus berkecepatan tinggi bagi para freelancer yang berkolaborasi siang malam.',
    isPopular: false
  },
  {
    id: 'ws-7',
    name: 'Kalyan Private Meeting Cabin',
    location: 'Kuningan, Jakarta Selatan',
    city: 'Jakarta Selatan',
    type: 'Meeting Room',
    pricePerHour: 120000,
    rating: 4.6,
    ratingCount: 29,
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
    facilities: ['Smart TV 55 Inch', 'Glassboard Area', 'AC Independen', 'Mini Snack Bar', 'WiFi Mesh System'],
    capacity: 8,
    description: 'Kabin intim modern yang sangat tepat untuk brainstorming tim startup, wawancara kerja intensif, atau telekonferensi luar negeri.',
    isPopular: false
  },
  {
    id: 'ws-8',
    name: 'Kopi Kenangan Workspace Suite',
    location: 'Senopati, Jakarta Selatan',
    city: 'Jakarta Selatan',
    type: 'Private Room',
    pricePerHour: 55000,
    rating: 4.7,
    ratingCount: 74,
    imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
    facilities: ['Meja Kerja Luas', 'Lampu Belajar Elit', 'Layanan Barista Langsung', 'Lokasi Asri', 'Kunci Digital'],
    capacity: 3,
    description: 'Suite privasi eksklusif yang tenang di kawasan Senopati, memadukan aroma biji kopi pilihan langsung dengan fokus kerja tak tergoyahkan.',
    isPopular: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Amanda Reza',
    role: 'Freelancer UI/UX Designer',
    company: 'Fiverr Pro',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    feedback: 'Open Office Space membantu saya menemukan tempat kerja yang nyaman tanpa harus menyewa kantor sendiri atau berlangganan coworking space mahal bulanan. Sangat fleksibel!',
    rating: 5,
    category: 'User'
  },
  {
    id: 't-2',
    name: 'Kevin Chandra',
    role: 'Co-Founder & CEO',
    company: 'TechVibe Creative Studio',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    feedback: 'Tim remote kami sering berpindah lokasi meeting. Melalui We Work, kami selalu bisa memesan meeting room premium secara instan dengan harga terjangkau di berbagai daerah Jakarta.',
    rating: 5,
    category: 'User'
  },
  {
    id: 't-3',
    name: 'Budi Santoso',
    role: 'Owner & General Manager',
    company: 'Kopi Ruang Kerja',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    feedback: 'Lantai 2 kami yang tadinya sepi di hari kerja sekarang terisi penuh oleh remote worker. Sistem profit sharing dari We Work sangat transparan dan mendatangkan trafik pelanggan kopi baru.',
    rating: 5,
    category: 'Mitra'
  },
  {
    id: 't-4',
    name: 'Siti Sarah',
    role: 'Mahasiswa S2 Arsitektur',
    company: 'Institut Teknologi Bandung',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    feedback: 'Mengerjakan tesis di rumah bikin jenuh. Melalui platform ini, saya beralih mencari wifi kencang di coffee shop bandung dengan biaya terjangkau. Dapat kopi gratis lagi!',
    rating: 4,
    category: 'User'
  },
  {
    id: 't-5',
    name: 'Hendra WIjaya',
    role: 'Pemilik Franchise Lounge',
    company: 'Veranda Creative Space',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    feedback: 'Awalnya ragu memasarkan lounge kami yang kosong di siang hari. Sekarang berkat We Work pendapatan bersih bulanan kami naik hingga 35% tanpa biaya pemasaran ekstra.',
    rating: 5,
    category: 'Mitra'
  }
];

export const EVENTS: CommunityEvent[] = [
  {
    id: 'ev-1',
    title: 'Pitching to Local VCs: Startup Seminar',
    category: 'Seminar Startup',
    date: '12 Juni 2026',
    time: '14:00 - 17:00 WIB',
    location: 'Nusantara Executive Boardroom, Jkt',
    description: 'Belajar taktik jitu melakukan presentasi ide bisnis kepada pemegang modal ventura lokal bersama pakar startup industri.',
    speaker: 'Almira Putri (Partner at Nusantara Ventures)',
    spotsLeft: 4
  },
  {
    id: 'ev-2',
    title: 'Gathering: Freelancer Up-Skilling di Era AI',
    category: 'Gathering',
    date: '18 Juni 2026',
    time: '16:00 - 19:00 WIB',
    location: 'Veranda Creative Lounge, Bandung',
    description: 'Saling bertukar wawasan tentang monetisasi keahlian kreatif menggunakan AI tools modern bersama sesama klan desainer & penulis.',
    speaker: 'Gilang Ramadhan (Creative Director, ex-Gojek)',
    spotsLeft: 12
  },
  {
    id: 'ev-3',
    title: 'UI Express Mastery: Workshop Design System',
    category: 'Workshop',
    date: '25 Juni 2026',
    time: '10:00 - 15:00 WIB',
    location: 'The Library Coffee, Surabaya',
    description: 'Workshop hands-on merancang Design System berskalabilitas global menggunakan figma token modern.',
    speaker: 'Yuri Gagarin (Lead UI/UX at Tokopedia)',
    spotsLeft: 6
  },
  {
    id: 'ev-4',
    title: 'B2B Founder Business Networking Coffee',
    category: 'Networking',
    date: '02 Juli 2026',
    time: '18:30 - 21:00 WIB',
    location: 'Kopi Kenangan Suite, Senopati',
    description: 'Acara kasual mempertemukan founders, co-founders, CTOs, dan pelaku UMKM digital untuk mengeksplorasi potensi sinergi bisnis.',
    speaker: 'Moderated by We Work Community Executives',
    spotsLeft: 8
  }
];

export const FAQS = [
  {
    question: 'Bagaimana cara melakukan booking?',
    answer: 'Cari workspace yang Anda inginkan di halaman pencarian kami. Klik tombol "Pesan Sekarang" pada kartu tempat, isi detail pemesanan seperti nama, jam sewa, durasi, dan selesaikan transaksi simulasi pembayaran. Tiket masuk digital Anda akan langsung diterbitkan!'
  },
  {
    question: 'Bagaimana sistem sharing profit bekerja?',
    answer: 'Sebagai pemilik tempat (Mitra), Anda mendaftarkan ruangan kosong Anda (area coffee shop, ruang rapat, dsb.). Untuk setiap transaksi pemesanan yang sukses diproses melalui platform We Work, kami memberikan persentase profit sharing bersih sebesar 75% untuk Mitra dan 25% untuk biaya operasional platform.'
  },
  {
    question: 'Apakah saya bisa menjadi mitra?',
    answer: 'Tentu saja! Jika Anda adalah pemilik coffee shop, restoran, lounge, hotel, ruko kosong, atau ruang komersial lainnya yang memiliki akses colokan, meja layak, AC, dan koneksi WiFi yang stabil, Anda dipersilakan mendaftar secara gratis lewat tombol "Daftar Menjadi Mitra".'
  },
  {
    question: 'Fasilitas apa saja yang tersedia?',
    answer: 'Setiap mitra wajib menyediakan fasilitas standar minimal berupa: WiFi berkecepatan tinggi, stopkontak listrik per kursi, sirkulasi udara baik (AC), serta akses air minum higienis. Beberapa mitra premium juga memberikan gratis minuman (Kopi/Teh), ruangan kedap suara, proyektor, hingga papan tulis.'
  }
];
