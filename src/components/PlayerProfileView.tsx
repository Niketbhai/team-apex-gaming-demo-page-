/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Trophy, 
  Calendar, 
  Play, 
  Activity, 
  Image as ImageIcon, 
  Youtube, 
  Twitter, 
  Instagram, 
  Award, 
  MapPin, 
  Flame,
  ShieldAlert,
  Gamepad2
} from 'lucide-react';
import { Player } from '../types';

interface PlayerProfileViewProps {
  player: Player;
  onBack: () => void;
}

export default function PlayerProfileView({ player, onBack }: PlayerProfileViewProps) {
  const [isPlayingHighlight, setIsPlayingHighlight] = useState(false);

  // Mock secondary photo gallery
  const gallery = [
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&h=260&q=80',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&h=260&q=80',
    'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?auto=format&fit=crop&w=400&h=260&q=80'
  ];

  // Mock team history
  const history = [
    { year: '2021 - 2022', team: 'Entity Gaming', role: 'Main Assaulter', event: 'First tier-1 transition, BGIS semi-finalist.' },
    { year: '2022 - 2023', team: 'S8UL / Team Soul', role: 'Main Assaulter', event: 'Won BMPS Season 1, top fragger.' },
    { year: '2023 - Present', team: 'Team Apex Gaming', role: player.role, event: 'Joined as core asset. Won BGIS 2024, multiple MVP titles.' }
  ];

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-28" id="player-profile-view">
      
      {/* Return button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-display font-black text-apex-orange hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO ROSTERS</span>
      </button>

      {/* 1. HERO HEADER WITH FLOATING IMAGE */}
      <div className="glassmorphism rounded-3xl overflow-hidden border-white/5 relative" id="profile-hero">
        
        {/* Background Banner */}
        <div 
          className="h-48 sm:h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${player.banner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent"></div>
        </div>

        {/* Floating Player Meta */}
        <div className="p-6 sm:p-10 relative -mt-20 sm:-mt-24 flex flex-col md:flex-row gap-6 items-center md:items-end">
          
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-4 border-apex-orange relative bg-cyber-dark shadow-2xl shrink-0">
            <img 
              src={player.photo} 
              alt={player.ign} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-2 text-center md:text-left flex-grow">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="bg-apex-orange text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                {player.game}
              </span>
              <span className="bg-white/10 text-gray-300 text-[10px] font-mono px-2.5 py-0.5 rounded uppercase tracking-wider border border-white/5">
                {player.role}
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-none">
              {player.ign}
            </h1>
            
            <p className="font-sans text-sm text-gray-400">
              Real Name: <span className="text-white font-medium">{player.realName}</span> • From: <span className="text-white font-medium">{player.country}</span>
            </p>
          </div>

          {/* Core Player Social handles */}
          <div className="flex items-center gap-3 shrink-0 py-2">
            {player.socials?.instagram && (
              <a href={player.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-apex-orange/15 hover:text-apex-orange border border-white/5 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {player.socials?.twitter && (
              <a href={player.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-apex-orange/15 hover:text-apex-orange border border-white/5 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {player.socials?.youtube && (
              <a href={player.socials.youtube} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-apex-orange/15 hover:text-apex-orange border border-white/5 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            )}
          </div>

        </div>
      </div>

      {/* 2. STATS OVERVIEW BENTO BOX */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6" id="profile-stats-grid">
        
        <div className="glassmorphism p-6 rounded-2xl border-white/5 text-center flex flex-col justify-center space-y-1 relative">
          <Flame className="w-8 h-8 text-apex-orange mx-auto mb-2 animate-pulse" />
          <span className="block font-display font-black text-3xl text-white tracking-tight text-glow">
            {player.statistics.kdRatio || 'N/A'}
          </span>
          <span className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">LIFETIME K/D RATIO</span>
        </div>

        <div className="glassmorphism p-6 rounded-2xl border-white/5 text-center flex flex-col justify-center space-y-1">
          <Activity className="w-8 h-8 text-apex-orange mx-auto mb-2" />
          <span className="block font-display font-black text-3xl text-white tracking-tight text-glow">
            {player.statistics.matchesPlayed || '450'}
          </span>
          <span className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">MATCHES COMPLETED</span>
        </div>

        <div className="glassmorphism p-6 rounded-2xl border-white/5 text-center flex flex-col justify-center space-y-1">
          <Trophy className="w-8 h-8 text-apex-orange mx-auto mb-2" />
          <span className="block font-display font-black text-3xl text-white tracking-tight text-glow">
            {player.statistics.mvpTitles || player.statistics.winRate || '14'}
          </span>
          <span className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">MVP TITLES SECURED</span>
        </div>

        <div className="glassmorphism p-6 rounded-2xl border-white/5 text-center flex flex-col justify-center space-y-1">
          <Gamepad2 className="w-8 h-8 text-apex-orange mx-auto mb-2" />
          <span className="block font-display font-black text-3xl text-white tracking-tight text-glow">
            {player.statistics.winRate || '65%'}
          </span>
          <span className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">ROUND WIN RATE</span>
        </div>

      </div>

      {/* 3. MULTI-COLUMN CAREER PROFILE & HIGHLIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Career Timeline Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Timeline and History */}
          <div className="glassmorphism p-6 sm:p-8 rounded-2xl border-white/5 space-y-6">
            <h3 className="font-display font-black text-xl text-white tracking-tight uppercase border-b border-white/10 pb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-apex-orange" />
              <span>CAREER HISTORY & TRANSFERS</span>
            </h3>

            <div className="relative border-l-2 border-white/10 pl-6 space-y-8 ml-2">
              {history.map((h, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-cyber-dark border border-apex-orange group-hover:bg-apex-orange transition-colors"></div>
                  <div className="space-y-1">
                    <span className="block font-mono text-[10px] text-apex-orange font-bold">{h.year}</span>
                    <h4 className="font-display font-black text-sm text-white uppercase tracking-wide">
                      {h.team}
                    </h4>
                    <span className="block font-mono text-[10px] text-gray-500">AS: {h.role}</span>
                    <p className="text-gray-400 text-xs leading-relaxed font-sans pt-1">
                      {h.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards Rack */}
          <div className="glassmorphism p-6 sm:p-8 rounded-2xl border-white/5 space-y-6">
            <h3 className="font-display font-black text-xl text-white tracking-tight uppercase border-b border-white/10 pb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-apex-orange" />
              <span>PLAYER CABINET RECOGNITIONS</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {player.achievements.map((ac, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded flex items-start gap-3 hover:border-apex-orange/30 transition-colors">
                  <Trophy className="w-5 h-5 text-apex-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-xs text-white uppercase line-clamp-2 leading-tight">
                      {ac}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Highlights Video Box & Photo Gallery Column */}
        <div className="space-y-8">
          
          {/* Highlights Video Frame */}
          <div className="glassmorphism p-6 rounded-2xl border-white/5 space-y-4">
            <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
              HIGHLIGHT CLIPS
            </h3>
            
            <div className="aspect-video bg-black rounded-xl overflow-hidden border border-white/10 relative group">
              {isPlayingHighlight ? (
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title={`${player.ign} highlight`}
                  allow="autoplay; encrypted-media"
                  referrerPolicy="no-referrer"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <img src={player.banner} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-500" alt="Video preview" referrerPolicy="no-referrer" />
                  <button 
                    onClick={() => setIsPlayingHighlight(true)}
                    className="p-3 rounded-full bg-apex-orange hover:bg-apex-orange/95 text-white shadow-lg border-glow transform hover:scale-110 transition-transform relative z-10"
                  >
                    <Play className="w-6 h-6 fill-white" />
                  </button>
                  <span className="block text-xs font-display font-black text-white uppercase tracking-wider mt-3 relative z-10">
                    PLAY 2026 INSANE PLAYS
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Photo gallery */}
          <div className="glassmorphism p-6 rounded-2xl border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                BOOTCAMP SNAPSHOTS
              </h3>
              <ImageIcon className="w-4 h-4 text-apex-orange" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {gallery.map((img, idx) => (
                <div key={idx} className="aspect-square rounded overflow-hidden border border-white/10 bg-cyber-dark relative group cursor-zoom-in">
                  <img 
                    src={img} 
                    alt="Player snapshot" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
