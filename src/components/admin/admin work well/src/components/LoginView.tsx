import React, { useState } from 'react';
import { Coffee, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from './lib/supabase'; // Menghubungkan konfigurasi Supabase Anda

interface LoginViewProps {
  onLoginSuccess: (admin: { name: string; email: string }) => void;
  admins?: { name: string; email: string; passwordHash: string }[]; // Dibuat opsional agar tidak merusak props App.tsx lama
}

export default function LoginView({ onLoginSuccess, admins }: LoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(false); // Reset loader state awal
    
    // Trigger awal animasi loading premium Anda
    setIsLoading(true);

    try {
      // 🔐 Eksekusi login langsung ke database Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (authError) {
        // Terjemahan pesan error agar tetap rapi sesuai UI Anda
        if (authError.message === 'Invalid login credentials') {
          setError('Email atau kata sandi admin salah. Silakan coba lagi.');
        } else {
          setError(authError.message);
        }
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // Mengambil nama dari user_metadata Supabase atau fallback menggunakan teks email sebelum '@'
        const adminName = data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'Admin';
        
        onLoginSuccess({
          name: adminName,
          email: data.user.email || '',
        });
      }
    } catch (err) {
      setError('Terjadi kendala koneksi ke server. Silakan coba beberapa saat lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="login-container" className="min-h-screen bg-[#F5F1EB] flex flex-col justify-center items-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md bg-white rounded-2xl border border-[#E8E8E8] shadow-sm p-8"
      >
        {/* Brand identity */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#8B5E3C] p-3 rounded-2xl text-white mb-3 shadow-md">
            <Coffee className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#333333] tracking-tight text-center">Open Office</h2>
          <p className="text-[11px] text-[#8C8C8C] font-bold tracking-widest uppercase mt-1">Admin Command Center</p>
          <div className="h-[2px] w-12 bg-[#8B5E3C] mt-4" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-medium text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Email input group */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#333333] uppercase tracking-wider">
              Email Administrasi
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-[#8C8C8C]" />
              <input
                id="login-email"
                type="email"
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cth: admin@openoffice.space"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F5] border border-[#E8E8E8] rounded-lg text-xs text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] focus:border-[#8B5E3C] focus:bg-white transition-all font-medium disabled:opacity-60"
              />
            </div>
          </div>

          {/* Password input group */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#333333] uppercase tracking-wider">
              Kata Sandi / PIN
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-[#8C8C8C]" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                className="w-full pl-10 pr-10 py-2.5 bg-[#FAF9F5] border border-[#E8E8E8] rounded-lg text-xs text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C] focus:border-[#8B5E3C] focus:bg-white transition-all font-medium disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-[#8C8C8C] hover:text-[#333333] transition-colors"
                id="toggle-password-btn"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 bg-[#8B5E3C] hover:bg-[#724a2f] disabled:opacity-75 disabled:cursor-not-allowed text-white font-semibold rounded-lg text-xs tracking-wider uppercase transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-1.5">
                <svg className="animate-spin -ml-1 mr-2 h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menghubungkan Sesi...
              </span>
            ) : (
              'Masuk Sistem'
            )}
          </button>
        </form>
      </motion.div>

      <span className="mt-4 text-[10px] text-[#8C8C8C] font-mono select-none">
        Open Office v2.4 &bull; Multi-Admin Access Secure
      </span>
    </div>
  );
}