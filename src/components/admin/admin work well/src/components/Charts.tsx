import React, { useState, useMemo } from 'react';
import { CITY_DISTRIBUTION } from '../data';
import { MonthlyData } from '../types';

interface HoveredPoint {
  index: number;
  data: any;
  x: number;
  y: number;
}

// 1. Dynamic Interactive Line Chart for Revenue Trends (Last 12 Months)
interface RevenueChartProps {
  data: MonthlyData[];
}

export function RevenueTrendLineChart({ data }: RevenueChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<HoveredPoint | null>(null);

  // SVG dimensions
  const width = 600;
  const height = 240;
  const paddingLeft = 70; // extra space for larger IDR Rupiah millions format
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  // Compute boundary values
  const maxVal = useMemo(() => {
    const vals = data.map(d => d.revenue);
    return Math.max(...vals) * 1.1; // Add 10% breathing room
  }, [data]);

  const minVal = 0;

  // Map each data point to svg space
  const points = useMemo(() => {
    const usableWidth = width - paddingLeft - paddingRight;
    const usableHeight = height - paddingTop - paddingBottom;
    
    return data.map((d, i) => {
      const x = paddingLeft + (i / (data.length - 1)) * usableWidth;
      const y = paddingTop + usableHeight - ((d.revenue - minVal) / (maxVal - minVal)) * usableHeight;
      return { x, y, data: d, index: i };
    });
  }, [data, maxVal]);

  // Construct SVG Path
  const linePath = useMemo(() => {
    if (points.length === 0) return '';
    return points.reduce((acc, p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      // Use smooth curves
      const prev = points[i - 1];
      const cx1 = prev.x + (p.x - prev.x) / 2;
      const cy1 = prev.y;
      const cx2 = prev.x + (p.x - prev.x) / 2;
      const cy2 = p.y;
      return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.x} ${p.y}`;
    }, '');
  }, [points]);

  // Construct Closing Area Path
  const areaPath = useMemo(() => {
    if (points.length === 0) return '';
    const lastPoint = points[points.length - 1];
    const firstPoint = points[0];
    const baselineY = height - paddingBottom;
    return `${linePath} L ${lastPoint.x} ${baselineY} L ${firstPoint.x} ${baselineY} Z`;
  }, [linePath, points, height]);

  // Handle Mouse interaction
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const svgX = (clientX / rect.width) * width;

    // Find closest point
    let closest = points[0];
    let minDist = Math.abs(points[0].x - svgX);
    
    for (let i = 1; i < points.length; i++) {
      const dist = Math.abs(points[i].x - svgX);
      if (dist < minDist) {
        minDist = dist;
        closest = points[i];
      }
    }

    setHoveredPoint({
      index: closest.index,
      data: closest.data,
      x: closest.x,
      y: closest.y
    });
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  // Generate Y-axis guide values
  const yTicks = [0, maxVal * 0.25, maxVal * 0.5, maxVal * 0.75, maxVal];

  return (
    <div className="relative w-full bg-white rounded-xl border border-[#E8E8E8] p-5 shadow-3xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-mono font-medium tracking-wider text-[#8C8C8C] uppercase">Pertumbuhan Platform Bulanan</span>
          <h3 className="text-base font-bold text-[#333333] font-sans">Tren Pendapatan (12 Bulan Terakhir)</h3>
        </div>
        {hoveredPoint ? (
          <div className="text-right">
            <span className="text-xs text-[#8C8C8C] font-mono">{hoveredPoint.data.month}</span>
            <p className="text-sm font-semibold text-[#8B5E3C]">{formatCurrency(hoveredPoint.data.revenue)}</p>
          </div>
        ) : (
          <div className="text-right">
            <span className="text-xs text-[#8C8C8C] font-mono">Puncak Saat Ini</span>
            <p className="text-sm font-semibold text-[#8B5E3C]">{formatCurrency(data[data.length - 1].revenue)}</p>
          </div>
        )}
      </div>

      <div className="relative overflow-visible w-full">
        {/* Main Chart Drawing */}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5E3C" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#8B5E3C" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A0714F" />
              <stop offset="50%" stopColor="#8B5E3C" />
              <stop offset="100%" stopColor="#6E4424" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {yTicks.map((tick, i) => {
            const y = paddingTop + (height - paddingTop - paddingBottom) - (tick / maxVal) * (height - paddingTop - paddingBottom);
            return (
              <g key={i}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#F1EFEA"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-stone-400 text-[9px] font-mono"
                >
                  {formatCurrency(tick)}
                </text>
              </g>
            );
          })}

          {/* Colored Area */}
          <path d={areaPath} fill="url(#areaGrad)" />

          {/* Core Smoothed Line */}
          <path
            d={linePath}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth={2.5}
            strokeLinecap="round"
          />

          {/* Hover guidelines */}
          {hoveredPoint && (
            <g>
              {/* Vertical guideline */}
              <line
                x1={hoveredPoint.x}
                y1={paddingTop}
                x2={hoveredPoint.x}
                y2={height - paddingBottom}
                stroke="#8B5E3C"
                strokeWidth={1}
                strokeOpacity={0.4}
                strokeDasharray="2 2"
              />
              {/* Intersection circle outer */}
              <circle
                cx={hoveredPoint.x}
                cy={hoveredPoint.y}
                r={6}
                fill="#8B5E3C"
                fillOpacity={0.25}
              />
              {/* Intersection circle inner */}
              <circle
                cx={hoveredPoint.x}
                cy={hoveredPoint.y}
                r={3}
                fill="#8B5E3C"
                stroke="#FFFFFF"
                strokeWidth={1}
              />
            </g>
          )}

          {/* X Axis Months labels */}
          {data.map((d, i) => {
            const x = paddingLeft + (i / (data.length - 1)) * (width - paddingLeft - paddingRight);
            const isFirstOrLastOrHovered = i === 0 || i === data.length - 1 || (hoveredPoint && hoveredPoint.index === i);
            return (
              <text
                key={i}
                x={x}
                y={height - paddingBottom + 18}
                textAnchor="middle"
                className={`text-[9px] font-mono transition-colors duration-150 ${isFirstOrLastOrHovered ? 'fill-stone-600 font-medium' : 'fill-stone-300'}`}
              >
                {d.month}
              </text>
            );
          })}
        </svg>

        {/* Hover Floating Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute z-10 p-3 bg-[#333333] text-[#F5F1EB] rounded-lg shadow-lg pointer-events-none text-xs border border-stone-700 font-sans"
            style={{
              left: `${Math.min(
                Math.max(hoveredPoint.x * 1.5 - 70, 10),
                500
              )}px`,
              top: `${Math.max(hoveredPoint.y - 80, 0)}px`,
            }}
          >
            <p className="font-semibold text-white text-xs border-b border-stone-750 pb-1 mb-1 font-display">
              Ringkasan {hoveredPoint.data.month}
            </p>
            <div className="space-y-0.5 font-mono text-[10px]">
              <div className="flex justify-between gap-6">
                <span className="text-stone-400">Total Pemesanan:</span>
                <span className="text-amber-100 font-medium">{hoveredPoint.data.bookings}</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-stone-400">Pendapatan Kotor:</span>
                <span className="text-stone-100 font-semibold">{formatCurrency(hoveredPoint.data.revenue)}</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-stone-400">Pembagian Mitra:</span>
                <span className="text-stone-100">{formatCurrency(hoveredPoint.data.partnerPayout)}</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-stone-400">Komisi Platform:</span>
                <span className="text-amber-200 font-semibold">{formatCurrency(hoveredPoint.data.platformCommission)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// 2. Interactive Column Bar Chart for Booking Density
export function BookingTrendBarChart({ data }: { data: MonthlyData[] }) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const width = 600;
  const height = 240;
  const paddingLeft = 45;
  const paddingRight = 10;
  const paddingTop = 20;
  const paddingBottom = 40;

  const maxVal = useMemo(() => {
    return Math.max(...data.map(d => d.bookings)) * 1.05;
  }, [data]);

  const usableWidth = width - paddingLeft - paddingRight;
  const usableHeight = height - paddingTop - paddingBottom;

  const barWidth = useMemo(() => {
    return (usableWidth / data.length) * 0.65;
  }, [data.length, usableWidth]);

  return (
    <div className="w-full bg-white rounded-xl border border-[#E8E8E8] p-5 shadow-3xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-mono font-medium tracking-wider text-[#8C8C8C] uppercase">Metrik Kapasitas Sistem</span>
          <h3 className="text-base font-bold text-[#333333] font-sans">Volume Pemesanan Bulanan</h3>
        </div>
        <div className="text-xs font-mono text-stone-500 bg-stone-55 px-2.5 py-1 rounded-md border border-[#E8E8E8]">
          Total 12m: <span className="font-semibold text-stone-700">{data.reduce((acc, d) => acc + d.bookings, 0).toLocaleString('id-ID')}</span>
        </div>
      </div>

      <div className="relative overflow-visible">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const val = Math.round(maxVal * ratio);
            const y = paddingTop + usableHeight * (1 - ratio);
            return (
              <g key={i}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#F1EFEA"
                  strokeWidth={1}
                />
                <text
                  x={paddingLeft - 6}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-stone-400 text-[10px] font-mono"
                >
                  {val.toLocaleString('id-ID')}
                </text>
              </g>
            );
          })}

          {/* Columns */}
          {data.map((d, i) => {
            const x = paddingLeft + (i / data.length) * usableWidth + (usableWidth / data.length - barWidth) / 2;
            const barHeight = (d.bookings / maxVal) * usableHeight;
            const y = height - paddingBottom - barHeight;

            const isHovered = hoveredBar === i;

            return (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Column background hover glow */}
                <rect
                  x={x - 4}
                  y={paddingTop}
                  width={barWidth + 8}
                  height={usableHeight}
                  fill={isHovered ? 'rgba(139, 94, 60, 0.04)' : 'transparent'}
                  rx={4}
                />

                {/* Main Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={Math.max(barHeight, 2)}
                  fill={isHovered ? '#8B5E3C' : '#CBA081'}
                  className="transition-all duration-200"
                  rx={3}
                />

                {/* Value on Top when Hovered */}
                {isHovered && (
                  <g>
                    <rect
                      x={x + barWidth / 2 - 25}
                      y={y - 24}
                      width={50}
                      height={18}
                      fill="#333333"
                      rx={3}
                    />
                    <text
                      x={x + barWidth / 2}
                      y={y - 12}
                      textAnchor="middle"
                      className="fill-white text-[9px] font-mono font-medium"
                    >
                      {d.bookings}
                    </text>
                    <path
                      d={`M ${x + barWidth / 2 - 3} ${y - 6} h 6 L ${x + barWidth / 2} ${y - 3} Z`}
                      fill="#333333"
                    />
                  </g>
                )}

                {/* X Axis */}
                <text
                  x={x + barWidth / 2}
                  y={height - paddingBottom + 18}
                  textAnchor="middle"
                  className={`text-[9px] font-mono transition-colors ${isHovered ? 'fill-stone-700 font-medium' : 'fill-stone-300'}`}
                >
                  {d.month.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}


// 3. Hourly Workspace Peak Booking Times Vertical Chart
export function HourlyBookingDistributionChart({ data }: { data: { hour: string; count: number }[] }) {
  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div className="bg-white rounded-xl border border-[#E8E8E8] p-5 shadow-3xs h-full">
      <div className="mb-4">
        <span className="text-xs font-mono font-medium tracking-wider text-[#8C8C8C] uppercase">Operasional Lapangan</span>
        <h3 className="text-base font-bold text-[#333333] font-sans">Analisis Jam Terpopuler (Beban Puncak)</h3>
      </div>
      <div className="space-y-3.5">
        {data.map((item, i) => {
          const ratio = item.count / maxCount;
          return (
            <div key={i} className="flex items-center gap-3">
              <span className="w-20 text-[11px] font-mono text-stone-500 text-right">{item.hour}</span>
              <div className="flex-1 bg-stone-100 h-2.5 rounded-full overflow-hidden relative">
                <div
                  className="bg-[#8B5E3C] h-full rounded-full transition-all duration-500"
                  style={{ width: `${ratio * 100}%` }}
                />
              </div>
              <span className="w-12 text-[11px] font-mono font-medium text-stone-600 text-left">
                {item.count} <span className="text-[9px] text-stone-400 font-light">pesan</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// 4. City Geography Distribution breakdown card list
export function LocationAnalyticsChart() {
  return (
    <div className="bg-white rounded-xl border border-[#E8E8E8] p-5 shadow-3xs h-full">
      <div className="mb-4">
        <span className="text-xs font-mono font-medium tracking-wider text-[#8C8C8C] uppercase">Strategi Pengembangan</span>
        <h3 className="text-base font-bold text-[#333333] font-sans">Distribusi Pemesanan Kota Operasional</h3>
      </div>
      
      {/* City breakdown */}
      <div className="space-y-4">
        {CITY_DISTRIBUTION.map((city, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs" style={{ backgroundColor: city.color }} />
                <span className="font-semibold text-stone-800">{city.city}</span>
              </div>
              <div className="font-mono text-stone-500">
                <span className="font-bold text-stone-700">{city.bookings.toLocaleString('id-ID')}</span> pesanan ({city.percentage}%)
              </div>
            </div>
            
            {/* Custom styled progress bars */}
            <div className="w-full bg-[#F5F1EB] h-2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${city.percentage}%`,
                  backgroundColor: city.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-[#FAF9F5] rounded-lg border border-[#E8E8E8] text-xs text-stone-600 leading-relaxed">
        <p className="font-semibold text-[#8B5E3C] mb-1">💡 Wawasan Wilayah Operasional</p>
        <p><strong>Jakarta</strong> terus mendominasi pesanan coworking harian nasional dengan menyumbang hampir setengah dari transaksi total. <strong>Bandung</strong> mencatat rekor pertumbuhan regional tercepat kuartal ini.</p>
      </div>
    </div>
  );
}
