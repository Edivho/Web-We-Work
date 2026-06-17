import React, { useState } from 'react';
import { 
  Coins, 
  Briefcase, 
  Bell, 
  Mail, 
  CheckCircle, 
  Lock, 
  Plus,
  Users,
  ShieldAlert
} from 'lucide-react';

interface AdminUser {
  name: string;
  email: string;
  passwordHash: string;
}

interface SettingsProps {
  commission: number;
  onCommissionChange: (val: number) => void;
  admins: AdminUser[];
  onAddAdmin: (newAdmin: AdminUser) => void;
}

export default function SettingsView({ 
  commission, 
  onCommissionChange, 
  admins, 
  onAddAdmin 
}: SettingsProps) {
  const [businessName, setBusinessName] = useState('Open Office Space Indonesia, Inc.');
  const [supportEmail, setSupportEmail] = useState('admin-support@openoffice.space');
  const [payoutCycle, setPayoutCycle] = useState('Net-15 Siklus Bulanan');
  
  // Notification options
  const [notifyApprove, setNotifyApprove] = useState(true);
  const [notifyLargePrice, setNotifyLargePrice] = useState(true);
  const [notifyDailyGMV, setNotifyDailyGMV] = useState(false);

  // Forms and banner states
  const [saveBanner, setSaveBanner] = useState(false);
  const [bannerText, setBannerText] = useState('');

  // Add new admin state
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [addAdminError, setAddAdminError] = useState('');

  const handleApplySettings = (e: React.FormEvent) => {
    e.preventDefault();
    setBannerText('Pengaturan sistem administrasi berhasil diperbarui dan disimpan.');
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 3500);
  };

  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setAddAdminError('');

    if (!newAdminName.trim() || !newAdminEmail.trim() || !newAdminPassword.trim()) {
      setAddAdminError('Semua kolom admin baru wajib diisi.');
      return;
    }

    // Check duplicate email
    if (admins.find(adm => adm.email.toLowerCase() === newAdminEmail.trim().toLowerCase())) {
      setAddAdminError('Email admin ini sudah terdaftar sebelumnya.');
      return;
    }

    onAddAdmin({
      name: newAdminName.trim(),
      email: newAdminEmail.trim().toLowerCase(),
      passwordHash: newAdminPassword,
    });

    setBannerText(`Admin baru "${newAdminName}" berhasil dibuat dalam database.`);
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 3500);

    // Reset fields
    setNewAdminName('');
    setNewAdminEmail('');
    setNewAdminPassword('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Toast Save confirmation indicator */}
      {saveBanner && (
        <div className="p-3 bg-emerald-600 text-[#F5F1EB] rounded-xl border border-emerald-700 shadow-lg text-xs font-mono font-medium flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4.5 h-4.5 text-white" />
            <span>{bannerText}</span>
          </div>
          <span className="text-[9px] bg-emerald-700 px-2 py-0.5 rounded-sm font-bold">BERHASIL</span>
        </div>
      )}

      {/* Corporate Settings Config Cards */}
      <div className="space-y-6">
        
        {/* SECTION 1: Commission Percentage Setup */}
        <div className="bg-white rounded-xl border border-[#E8E8E8] p-5 shadow-3xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E8E8E8] pb-3">
            <Coins className="w-5 h-5 text-[#8B5E3C]" />
            <div>
              <h3 className="text-sm font-bold text-[#333333] font-sans">Model Persentase Komisi Platform</h3>
              <p className="text-xs text-[#8C8C8C]">Tentukan potongan komisi flat dari nilai kotor setiap pemesanan ruangan</p>
            </div>
          </div>

          <div className="space-y-4 pt-1 text-xs">
            {/* Dynamic Commissioner Percentage Control */}
            <div className="bg-[#F5F1EB] p-4 rounded-xl border border-[#D5CECE] space-y-3">
              <div className="flex justify-between items-baseline font-mono text-xs font-semibold">
                <span className="text-stone-600">Rasio Potongan Komisi Platform</span>
                <span className="text-lg font-bold text-[#8B5E3C] font-sans">{commission}.0% Potongan</span>
              </div>

              {/* Slider widget */}
              <input 
                type="range" 
                min="5" 
                max="45" 
                step="1"
                value={commission}
                onChange={(e) => onCommissionChange(parseInt(e.target.value) || 20)}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#8B5E3C]"
              />

              <div className="flex justify-between text-[10px] text-[#8C8C8C] font-mono">
                <span>5% (Fokus Mitra)</span>
                <span>20% (Default standar)</span>
                <span>45% (Fokus Platform)</span>
              </div>
            </div>

            <div className="p-3 bg-[#F5F1EB]/30 border border-[#E8E8E8] rounded-lg text-[#8C8C8C] leading-relaxed text-[11px] font-sans">
              <p className="font-semibold text-[#8B5E3C] mb-0.5">ℹ️ Catatan Sistem</p>
              Mengubah parameter ini akan mengevaluasi pembagian bagian mitra dan bagi hasil komisi platform secara real-time di seluruh layar <strong className="text-[#8B5E3C]">Bagi Hasil Komisi</strong>.
            </div>
          </div>
        </div>

        {/* SECTION 2: General Corporate Details */}
        <form onSubmit={handleApplySettings} className="bg-white rounded-xl border border-[#E8E8E8] p-5 shadow-3xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E8E8E8] pb-3">
            <Briefcase className="w-5 h-5 text-[#8B5E3C]" />
            <div>
              <h3 className="text-sm font-bold text-[#333333] font-sans">Profil Bisnis & Kontak Legal</h3>
              <p className="text-xs text-[#8C8C8C]">Kelola entitas hukum, email invoice, dan sistem kontak penagihan utama</p>
            </div>
          </div>

          <div className="space-y-4 pt-1 text-xs font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-stone-500 uppercase font-mono tracking-wider text-[9px] font-bold">Nama Entitas Hukum Terdaftar</label>
                <input 
                  type="text" 
                  value={businessName} 
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E8E8E8] bg-[#FAFAF9] rounded-lg text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] text-xs font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-stone-500 uppercase font-mono tracking-wider text-[9px] font-bold">Email Kontak Administrasi</label>
                <input 
                  type="email" 
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E8E8E8] bg-[#FAFAF9] rounded-lg text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-stone-500 uppercase font-mono tracking-wider text-[9px] font-bold">Siklus Pembayaran Mitra</label>
                <select 
                  value={payoutCycle}
                  onChange={(e) => setPayoutCycle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E8E8E8] bg-[#FAFAF9] rounded-lg text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] text-xs font-medium cursor-pointer"
                >
                  <option value="Net-15 Siklus Bulanan">Net-15 Siklus Bulanan</option>
                  <option value="Net-30 Siklus Standar">Net-30 Siklus Standar</option>
                  <option value="Mingguan Langsung (Direct Wire)">Mingguan Langsung (Direct Wire)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-stone-500 uppercase font-mono tracking-wider text-[9px] font-bold">NPWP / Nomor Pokok Wajib Pajak Perusahaan</label>
                <input 
                  type="text" 
                  disabled
                  value="NPWP-01.884.291.9-021.000"
                  className="w-full px-3 py-2 border border-[#E8E8E8] bg-stone-100 text-stone-400 rounded-lg font-mono text-[11px] cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2 bg-[#8B5E3C] hover:opacity-95 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Simpan Profil Bisnis
              </button>
            </div>
          </div>
        </form>

        {/* SECTION 3: Notification Threshold Alerts */}
        <div className="bg-white rounded-xl border border-[#E8E8E8] p-5 shadow-3xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E8E8E8] pb-2">
            <Bell className="w-5 h-5 text-[#8B5E3C]" />
            <div>
              <h3 className="text-sm font-bold text-[#333333] font-sans">Notifikasi & Peringatan Otomatis</h3>
              <p className="text-xs text-[#8C8C8C]">Konfigurasi integrasi email otomatis untuk check-in dan invoice masuk</p>
            </div>
          </div>

          <div className="space-y-3 pt-1 text-xs">
            {/* Toggle 1 */}
            <label className="flex items-center justify-between p-2.5 bg-[#FAF9F5] border border-[#E8E8E8] rounded-lg cursor-pointer hover:bg-[#F5F1EB]/50 transition-colors">
              <div className="space-y-0.5">
                <span className="font-semibold text-[#333333]">Notifikasi pendaftaran mitra baru</span>
                <p className="text-[10px] text-[#8C8C8C]">Beri tahu admin utama di sistem ketika ada kedai kopi baru yang mendaftar</p>
              </div>
              <input 
                type="checkbox" 
                checked={notifyApprove}
                onChange={() => setNotifyApprove(!notifyApprove)}
                className="w-4 h-4 text-[#8B5E3C] focus:ring-[#8B5E3C] border-stone-300 rounded-sm"
              />
            </label>

            {/* Toggle 2 */}
            <label className="flex items-center justify-between p-2.5 bg-[#FAF9F5] border border-[#E8E8E8] rounded-lg cursor-pointer hover:bg-[#F5F1EB]/50 transition-colors">
              <div className="space-y-0.5">
                <span className="font-semibold text-[#333333]">Perlindungan reservasi bernilai tinggi</span>
                <p className="text-[10px] text-[#8C8C8C]">Membutuhkan konfirmasi admin manual untuk transaksi di atas Rp 1.500.000</p>
              </div>
              <input 
                type="checkbox" 
                checked={notifyLargePrice}
                onChange={() => setNotifyLargePrice(!notifyLargePrice)}
                className="w-4 h-4 text-[#8B5E3C] focus:ring-[#8B5E3C] border-stone-300 rounded-sm"
              />
            </label>

            {/* Toggle 3 */}
            <label className="flex items-center justify-between p-2.5 bg-[#FAF9F5] border border-[#E8E8E8] rounded-lg cursor-pointer hover:bg-[#F5F1EB]/50 transition-colors">
              <div className="space-y-0.5">
                <span className="font-semibold text-[#333333]">Laporan analisis laba rugi harian</span>
                <p className="text-[10px] text-[#8C8C8C]">Kirim rangkuman PDF mutasi saldo harian otomatis ke email pendiri</p>
              </div>
              <input 
                type="checkbox" 
                checked={notifyDailyGMV}
                onChange={() => setNotifyDailyGMV(!notifyDailyGMV)}
                className="w-4 h-4 text-[#8B5E3C] focus:ring-[#8B5E3C] border-stone-300 rounded-sm"
              />
            </label>
          </div>
        </div>

        {/* SECTION 4: ADD NEW ADMIN USER INTEGRATION */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Add Admin Form */}
          <div className="bg-white rounded-xl border border-[#E8E8E8] p-5 shadow-3xs space-y-4 md:col-span-2">
            <div className="flex items-center gap-2 border-b border-[#E8E8E8] pb-3">
              <Plus className="w-5 h-5 text-[#8B5E3C]" />
              <div>
                <h3 className="text-sm font-bold text-[#333333] font-sans">Daftarkan Admin Baru</h3>
                <p className="text-[11px] text-[#8C8C8C]">Siap untuk integrasi database relasional</p>
              </div>
            </div>

            <form onSubmit={handleCreateAdmin} className="space-y-3 pt-1 text-xs">
              {addAdminError && (
                <div className="p-2 bg-red-50 border border-red-200 text-red-650 rounded-lg text-[10px] font-semibold text-center">
                  {addAdminError}
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-[#8C8C8C] uppercase font-mono tracking-wider text-[8px] font-bold">Nama Lengkap Admin</label>
                <input 
                  type="text" 
                  required
                  placeholder="cth: Budi Setiawan"
                  value={newAdminName}
                  onChange={(e) => setNewAdminName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E8E8E8] bg-[#FAFAF9] rounded-lg text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[#8C8C8C] uppercase font-mono tracking-wider text-[8px] font-bold">Alamat Email Terdaftar</label>
                <input 
                  type="email" 
                  required
                  placeholder="budi@openoffice.space"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E8E8E8] bg-[#FAFAF9] rounded-lg text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[#8C8C8C] uppercase font-mono tracking-wider text-[8px] font-bold">Kata Sandi / PIN</label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-[#8C8C8C]" />
                  <input 
                    type="password" 
                    required
                    placeholder="Masukkan kata sandi"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-[#E8E8E8] bg-[#FAFAF9] rounded-lg text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-center px-4 py-2 bg-[#8B5E3C] hover:opacity-95 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Daftarkan Admin
              </button>
            </form>
          </div>

          {/* Existings Admins List */}
          <div className="bg-white rounded-xl border border-[#E8E8E8] p-5 shadow-3xs space-y-4 md:col-span-3">
            <div className="flex items-center gap-2 border-b border-[#E8E8E8] pb-3">
              <Users className="w-5 h-5 text-[#8B5E3C]" />
              <div>
                <h3 className="text-sm font-bold text-[#333333] font-sans">Daftar Administrator Aktif</h3>
                <p className="text-xs text-[#8C8C8C]">Daftar pemegang otoritas sistem lokal</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="border-b border-[#E8E8E8] text-[#8C8C8C] text-[10px] font-mono uppercase tracking-wider pb-2">
                    <th className="pb-2 font-medium">Nama Admin</th>
                    <th className="pb-2 font-medium">Email</th>
                    <th className="pb-2 font-medium text-right">Otoritas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F1EB]">
                  {admins.map((adm, idx) => (
                    <tr key={idx} className="hover:bg-[#F5F1EB]/30 transition-colors text-xs text-[#333333]">
                      <td className="py-2.5 font-semibold text-[#8B5E3C]">{adm.name}</td>
                      <td className="py-2.5 font-mono text-[#8C8C8C]">{adm.email}</td>
                      <td className="py-2.5 text-right">
                        <span className="px-2 py-0.5 bg-[#FAF9F5] border border-[#E8E8E8] text-[9px] font-bold text-[#333333] rounded-md uppercase">
                          {idx === 0 ? 'Utama / super' : 'Lokal / staff'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 p-3 bg-stone-50 border border-[#E8E8E8] rounded-lg text-[10px] text-[#8C8C8C] leading-normal flex gap-2">
                <ShieldAlert className="w-4.5 h-4.5 text-[#8B5E3C] shrink-0" />
                <span>
                  Admin baru yang Anda daftarkan di atas akan langsung aktif di tingkat klien untuk login. Sistem ini disiapkan untuk siap dimigrasikan ke endpoint database relasional SQL / Firebase.
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
