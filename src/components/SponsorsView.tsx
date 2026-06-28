/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Award, 
  BarChart3, 
  TrendingUp, 
  Download, 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  Layers, 
  Zap, 
  Sparkles,
  Users,
  Settings
} from 'lucide-react';
import { Sponsor, AdminRole } from '../types';

interface SponsorsViewProps {
  sponsors: Sponsor[];
  currentRole: AdminRole | 'Fan';
}

export default function SponsorsView({ sponsors, currentRole }: SponsorsViewProps) {
  const [selectedBrandId, setSelectedBrandId] = useState<string>(sponsors[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExportingCSV, setIsExportingCSV] = useState(false);
  const [exportMessage, setExportMessage] = useState('');

  const LOCAL_METRICS: Record<string, { impressions: string; clicks: string; conversions: string }> = {
    s1: { impressions: '18,400,000', clicks: '4.15%', conversions: '5.2x' },
    s2: { impressions: '12,800,000', clicks: '3.20%', conversions: '4.5x' },
    s3: { impressions: '8,200,000', clicks: '2.85%', conversions: '3.8x' },
    s4: { impressions: '9,600,000', clicks: '3.40%', conversions: '4.1x' },
  };

  const currentBrandMetrics = LOCAL_METRICS[selectedBrandId] || { impressions: '4,250,000', clicks: '2.85%', conversions: '3.5x' };

  const filteredSponsors = sponsors.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedSponsor = sponsors.find(s => s.id === selectedBrandId) || sponsors[0];

  const handleExportCSVReport = () => {
    setIsExportingCSV(true);
    setExportMessage('');
    
    setTimeout(() => {
      setIsExportingCSV(false);
      setExportMessage(`COMPILING SUCCESSFUL. EXPORTED ${selectedSponsor.name.toUpperCase()}_Q2_ROI_REPORT.CSV TO LOCAL DOWNLOADS VAULT.`);
    }, 2000);
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-28" id="sponsors-view">
      
      {/* Page Header */}
      <div className="border-b border-white/10 pb-6 text-center space-y-4 max-w-2xl mx-auto">
        <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">THE COALITION</span>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
          OFFICIAL SPONSORS
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm">
          Team Apex is powered by global hardware engineers and software developers leading consumer technology and esports culture.
        </p>
      </div>

      {/* 1. SPONSOR CARD CAROUSEL / DIRECTORY */}
      <section className="space-y-8" id="sponsors-directory">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-3">
          <h3 className="font-display font-black text-xl text-white uppercase tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-apex-orange" />
            <span>OUR BRAND PATRONS</span>
          </h3>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="SEARCH SPONSORS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-[11px] text-white placeholder-gray-500 focus:outline-none focus:border-apex-orange/70 w-full font-mono uppercase"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSponsors.map((sp) => (
            <div
              key={sp.id}
              onClick={() => setSelectedBrandId(sp.id)}
              className={`glassmorphism p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 hover:border-apex-orange/30 group ${
                selectedBrandId === sp.id ? 'border-apex-orange/40 bg-apex-orange/5' : 'border-white/5'
              }`}
            >
              <div className="space-y-3">
                <span className={`inline-block text-[8px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                  sp.category === 'Title Sponsor'
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                    : sp.category === 'Elite Sponsor'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                }`}>
                  {sp.category}
                </span>

                <div className="h-10 flex items-center justify-start">
                  <img 
                    src={sp.logo} 
                    alt={sp.name} 
                    className="max-h-full max-w-[120px] object-contain filter brightness-100 grayscale group-hover:grayscale-0 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <p className="text-gray-400 text-xs leading-relaxed font-sans line-clamp-3">
                  {sp.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-bold">SINCE {sp.partnershipYear || '2024'}</span>
                <span className="font-mono text-[9px] text-apex-orange flex items-center gap-1 group-hover:underline font-bold">
                  ANALYZE METRICS <TrendingUp className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. DYNAMIC PARTNER TELEMETRY ROI DASHBOARD */}
      <section className="glassmorphism rounded-3xl overflow-hidden border-white/5 p-6 sm:p-10 space-y-8 relative" id="sponsors-roi-dashboard">
        <div className="absolute top-0 right-0 w-64 h-64 bg-apex-orange/5 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-mono text-xs text-gray-500 uppercase">PARTNER TELEMETRY PORTAL</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
              CAMPAIGN METRICS INTEGRATIONS
            </h2>
            <p className="text-gray-400 text-xs">
              Selecting brand: <span className="text-white font-bold">{selectedSponsor.name}</span>. Real-time impressions logs gathered across all digital interfaces.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-gray-500 uppercase">BRAND EXECUTIVE:</span>
            <select
              value={selectedBrandId}
              onChange={(e) => setSelectedBrandId(e.target.value)}
              className="bg-cyber-card border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-apex-orange/80 uppercase font-mono"
            >
              {sponsors.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Telemetry Numbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="sponsor-metrics-grid">
          
          <div className="bg-white/5 border border-white/5 p-6 rounded-2xl text-center space-y-1">
            <span className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">NET IMPRESSIONS</span>
            <span className="block font-display font-black text-3xl text-white tracking-tight text-glow">
              {currentBrandMetrics.impressions}
            </span>
            <span className="block text-[10px] text-emerald-400 font-mono font-bold">+14.2% QOQ</span>
          </div>

          <div className="bg-white/5 border border-white/5 p-6 rounded-2xl text-center space-y-1">
            <span className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">CLICK-THROUGH RATE</span>
            <span className="block font-display font-black text-3xl text-white tracking-tight text-glow">
              {currentBrandMetrics.clicks}
            </span>
            <span className="block text-[10px] text-emerald-400 font-mono font-bold">1.2% ABOVE BENCHMARK</span>
          </div>

          <div className="bg-white/5 border border-white/5 p-6 rounded-2xl text-center space-y-1">
            <span className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">ROI RATIO INDEX</span>
            <span className="block font-display font-black text-3xl text-white tracking-tight text-glow">
              {currentBrandMetrics.conversions}
            </span>
            <span className="block text-[10px] text-emerald-400 font-mono font-bold">OUTSTANDING EFFICIENCY</span>
          </div>

          <div className="bg-white/5 border border-white/5 p-6 rounded-2xl text-center space-y-1">
            <span className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">BRAND SENTIMENT SCORE</span>
            <span className="block font-display font-black text-3xl text-white tracking-tight text-glow">
              94 / 100
            </span>
            <span className="block text-[10px] text-apex-orange font-mono font-bold">AMAZING SYNERGY</span>
          </div>

        </div>

        {/* Graphical Representation simulation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
          
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">TRAFFIC CHANNELS DISTRIBUTION</h4>
            
            <div className="space-y-3 font-mono text-xs">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">YOUTUBE VIDEO INTEGRATIONS</span>
                  <span className="text-white">45%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-apex-orange" style={{ width: '45%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">JERSEY APPAREL BRANDING (LAN EVENTS)</span>
                  <span className="text-white">30%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-apex-orange" style={{ width: '30%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">DIGITAL WEBPAGE BANNERS & ACCENTS</span>
                  <span className="text-white">15%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-apex-orange" style={{ width: '15%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">COMMUNITY DISCORD AND WHATSAPP LOGS</span>
                  <span className="text-white">10%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-apex-orange" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/30 p-6 rounded-2xl border border-white/5 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-apex-orange/10 border border-apex-orange/20 text-apex-orange text-[9px] font-mono font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>AUDITED CONVERSIONS REPORT</span>
              </span>
              <h4 className="font-display font-black text-sm text-white uppercase tracking-tight">EXPORT MARKETING LOGS</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Compile a certified, spreadsheet-ready report of all web impressions, referral conversion queries, and click indices for board presentations.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleExportCSVReport}
                disabled={isExportingCSV}
                className="w-full py-3 rounded-lg bg-apex-orange hover:bg-apex-orange/95 text-white font-display font-black text-xs tracking-wider transition-colors flex items-center justify-center gap-2 border-glow"
              >
                {isExportingCSV ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                    <span>COMPILING SPONSOR LOGS...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD AUDITED CSV REPORT</span>
                  </>
                )}
              </button>
              
              {exportMessage && (
                <p className="text-[10px] text-emerald-400 font-mono font-bold text-center leading-normal animate-pulse">
                  {exportMessage}
                </p>
              )}
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}
