import { useState, useMemo } from 'react';
import { Search, MapPin, Users, Sparkles, SlidersHorizontal, RefreshCw, Star, ArrowUpRight } from 'lucide-react';
import { Workspace } from '../../types';
import { WORKSPACES } from '../../data';

interface SearchWorkspaceProps {
  onSelectWorkspace: (workspace: Workspace) => void;
}

export default function SearchWorkspace({ onSelectWorkspace }: SearchWorkspaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedCity, setSelectedCity] = useState<string>('Semua');
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [showOnlyPopular, setShowOnlyPopular] = useState(false);

  // Core categories requested by user
  const categories = ['Semua', 'Coffee Shop', 'Lounge', 'Meeting Room', 'Private Room'];
  const cities = ['Semua', 'Jakarta Selatan', 'Jakarta Pusat', 'Bandung', 'Surabaya', 'Bali'];

  // Pure filtering logic
  const filteredWorkspaces = useMemo(() => {
    return WORKSPACES.filter((ws) => {
      // 1. Text Search matching name, location, facilities
      const textMatch =
        ws.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ws.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ws.facilities.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

      // 2. Category Filter
      const categoryMatch = activeCategory === 'Semua' || ws.type === activeCategory;

      // 3. City Filter
      const cityMatch = selectedCity === 'Semua' || ws.city === selectedCity;

      // 4. Max Price Filter
      const priceMatch = ws.pricePerHour <= maxPrice;

      // 5. Popular only
      const popularMatch = !showOnlyPopular || ws.isPopular === true;

      return textMatch && categoryMatch && cityMatch && priceMatch && popularMatch;
    });
  }, [searchQuery, activeCategory, selectedCity, maxPrice, showOnlyPopular]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('Semua');
    setSelectedCity('Semua');
    setMaxPrice(200000);
    setShowOnlyPopular(false);
  };

  return (
    <section id="cari-workspace" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold px-3 py-1 bg-coffee-brown/10 text-coffee-brown rounded-full font-mono uppercase">
            Directory Booking Real-Time
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-gray font-display mt-3 tracking-tight">
            Cari Workspace Terdekat
          </h2>
          <p className="text-dark-gray/70 mt-3 text-sm sm:text-base">
            Gunakan filter cerdas di bawah untuk menemukan area kerja ternyaman Anda. Pesan satuan per jam langsung tanpa ribet tagihan bulanan.
          </p>
        </div>

        {/* Dynamic Interactive Filter Box Panel */}
        <div className="bg-warm-beige/35 rounded-2xl border border-warm-beige p-5 sm:p-6 mb-10 shadow-sm space-y-4">
          
          {/* Row 1: Searchbar text & Location Dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-dark-gray/40">
                <Search className="w-5 h-5" />
              </span>
              <input
                id="search-input-field"
                type="text"
                placeholder="Cari workspace, meeting room, atau lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm pl-11 pr-4 py-3 bg-white border border-warm-beige/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-coffee-brown/30 focus:border-coffee-brown text-dark-gray shadow-sm"
              />
            </div>

            {/* City Dropdown */}
            <div className="md:col-span-4 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-dark-gray/40">
                <MapPin className="w-4 h-4 text-coffee-brown" />
              </span>
              <select
                id="search-city-dropdown"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full text-sm pl-9 pr-3 py-3 bg-white border border-warm-beige/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-coffee-brown/30 focus:border-coffee-brown text-dark-gray shadow-sm cursor-pointer"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city === 'Semua' ? 'Semua Kota' : city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Category Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            {/* Category selection */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-coffee-brown text-white shadow-sm shadow-coffee-brown/15'
                      : 'bg-white border border-warm-beige text-dark-gray/80 hover:bg-warm-beige/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Advanced Filters Trigger Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-dark-gray/80">
              {/* Popular Switch */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showOnlyPopular}
                  onChange={(e) => setShowOnlyPopular(e.target.checked)}
                  className="w-4 h-4 accent-coffee-brown rounded border-warm-beige"
                />
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-coffee-brown text-coffee-brown" /> Terpopuler
                </span>
              </label>

              {/* Price Slide indicator */}
              <div className="flex items-center gap-2">
                <span>Harga Max:</span>
                <span className="font-mono text-coffee-brown font-bold">
                  Rp {maxPrice.toLocaleString('id-ID')}
                </span>
                <input
                  type="range"
                  min="20000"
                  max="200000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-24 accentuate-coffee-brown accent-coffee-brown"
                />
              </div>

              {/* Clear Filter button */}
              {(searchQuery || activeCategory !== 'Semua' || selectedCity !== 'Semua' || maxPrice < 200000 || showOnlyPopular) && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-coffee-brown hover:text-coffee-dark bg-white border border-warm-beige px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3 animate-spin" /> Reset Filter
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Workspace Cards Output Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredWorkspaces.length > 0 ? (
            filteredWorkspaces.map((ws) => (
              <div
                key={ws.id}
                className="group bg-white rounded-2xl border border-warm-beige overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                {/* Photo Header */}
                <div className="relative aspect-[3/2] overflow-hidden bg-warm-beige flex-shrink-0">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={ws.imageUrl}
                    alt={ws.name}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Pill Tag */}
                  <span className="absolute top-3 left-3 text-[10px] font-extrabold tracking-wide uppercase px-2.5 py-1 bg-white/95 backdrop-blur-md text-coffee-brown rounded-md shadow-sm">
                    {ws.type}
                  </span>

                  {/* Rating Overlay */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 bg-brand-charcoal/80 backdrop-blur-sm text-white rounded-md text-[10px] font-mono font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{ws.rating.toFixed(1)}</span>
                    <span className="text-white/60">({ws.ratingCount})</span>
                  </div>

                  {/* Small popular spark badge */}
                  {ws.isPopular && (
                    <div className="absolute top-3 right-3 bg-coffee-brown text-white p-1 rounded-lg shadow" title="Ruang Paling Populer dan Direkomendasikan">
                      <Sparkles className="w-3.5 h-3.5 fill-current text-white" />
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5 flex-1">
                    {/* Location mini */}
                    <div className="flex items-center gap-1 text-[11px] text-dark-gray/60 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-coffee-light flex-shrink-0" />
                      <span className="truncate">{ws.location}</span>
                    </div>

                    {/* Cafe Name */}
                    <h3 className="text-base font-bold text-dark-gray font-display leading-snug group-hover:text-coffee-brown transition-colors">
                      {ws.name}
                    </h3>

                    {/* Mini details list */}
                    <div className="flex items-center gap-1 text-[10px] text-dark-gray/50 pb-2 border-b border-warm-beige/60">
                      <Users className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Kapasitas Meja: <strong className="text-dark-gray/80">s/d {ws.capacity} Orang</strong></span>
                    </div>

                    {/* Mini Facilities checklist tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {ws.facilities.slice(0, 3).map((fac, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 bg-warm-beige/40 border border-warm-beige text-dark-gray/70 rounded-md font-medium"
                        >
                          {fac}
                        </span>
                      ))}
                      {ws.facilities.length > 3 && (
                        <span className="text-[9px] px-1.5 py-0.5 text-dark-gray/50 font-bold">
                          +{ws.facilities.length - 3} lainnya
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="pt-4 mt-4 border-t border-warm-beige/80 flex items-center justify-between flex-shrink-0">
                    <div>
                      <p className="text-[10px] text-dark-gray/50 font-bold uppercase tracking-wider">Tarif Sewa</p>
                      <p className="font-mono text-sm font-bold text-coffee-brown">
                        Rp {ws.pricePerHour.toLocaleString('id-ID')}
                        <span className="text-[10px] text-dark-gray/60 font-normal">/jam</span>
                      </p>
                    </div>

                    {/* Booking button */}
                    <button
                      onClick={() => onSelectWorkspace(ws)}
                      className="px-3.5 py-2 bg-coffee-brown hover:bg-coffee-dark text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer hover:shadow"
                    >
                      Pesan <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            ))
          ) : (
            /* No Results fallback state */
            <div className="col-span-full py-16 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-warm-beige/60 text-coffee-brown mb-2">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <p className="text-dark-gray font-bold font-display">Ruangan Tidak Ditemukan</p>
              <p className="text-xs text-dark-gray/65 max-w-sm mx-auto">
                Maaf, tidak ada workspace yang cocok dengan kuery pencarian Anda saat ini. Cobalah menyetel ulang saringan filter Anda.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 border border-coffee-brown hover:bg-warm-beige/30 text-coffee-brown font-semibold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Tampilkan Semua Workspace
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
