/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Twitter, 
  Instagram, 
  Youtube, 
  Trophy, 
  User, 
  Calendar, 
  Globe, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Settings
} from 'lucide-react';
import { Player, GameCategory, AdminRole } from '../types';

interface RostersViewProps {
  players: Player[];
  onSelectPlayer: (player: Player) => void;
  currentRole: AdminRole | 'Fan';
  onOpenAdmin: () => void;
}

export default function RostersView({
  players,
  onSelectPlayer,
  currentRole,
  onOpenAdmin
}: RostersViewProps) {
  const games: GameCategory[] = ['BGMI', 'VALORANT', 'FREE FIRE MAX', 'APEX LEGENDS', 'CS2', 'COD MOBILE'];
  const [selectedGame, setSelectedGame] = useState<GameCategory>('BGMI');

  const filteredPlayers = players.filter(p => p.game === selectedGame);

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-28" id="rosters-view">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">THE APEX ARMORY</span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mt-1">
            PROFESSIONAL ROSTERS
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mt-1">
            Explore our elite active gaming squads trained in tactical systems to conquer regional LAN circuits.
          </p>
        </div>

        {/* Admin Shortcuts */}
        {currentRole !== 'Fan' && (
          <button 
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-4 py-2 bg-apex-orange/10 border border-apex-orange/30 text-apex-orange hover:bg-apex-orange hover:text-white transition-all text-xs font-mono rounded"
          >
            <Settings className="w-4 h-4" />
            <span>MANAGE ROSTERS IN DASHBOARD</span>
          </button>
        )}
      </div>

      {/* Game Categories Tab bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-2" id="roster-tabs">
        {games.map((g) => {
          const count = players.filter(p => p.game === g).length;
          return (
            <button
              key={g}
              onClick={() => setSelectedGame(g)}
              className={`px-4 py-2.5 rounded font-display font-black text-xs tracking-wider transition-all relative ${
                selectedGame === g
                  ? 'bg-apex-orange text-white border-glow shadow-md shadow-apex-orange/10'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{g}</span>
              {count > 0 && (
                <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[9px] font-mono ${
                  selectedGame === g ? 'bg-white text-apex-orange' : 'bg-white/10 text-gray-300'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Roster Grid list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="players-list-grid">
        {filteredPlayers.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3 py-20 text-center space-y-4 glassmorphism rounded-xl border-dashed">
            <User className="w-12 h-12 text-gray-600 mx-auto" />
            <h3 className="font-display font-black text-lg text-white uppercase">ROSTER UNREPORTED</h3>
            <p className="text-gray-500 text-xs max-w-md mx-auto">
              We are currently scouting elite talent or finalized contracts for our {selectedGame} division. Check back shortly for updates.
            </p>
            {currentRole !== 'Fan' && (
              <button 
                onClick={onOpenAdmin}
                className="px-4 py-2 bg-apex-orange text-white text-xs font-display font-bold rounded"
              >
                Draft First Player
              </button>
            )}
          </div>
        ) : (
          filteredPlayers.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectPlayer(p)}
              className="glassmorphism rounded-2xl overflow-hidden cursor-pointer border-white/5 hover:border-apex-orange/40 transition-all duration-300 relative group flex flex-col justify-between"
            >
              {/* Dynamic decorative banner card bg */}
              <div 
                className="h-32 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${p.banner})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/45 to-transparent"></div>
              </div>

              {/* Player profile specs */}
              <div className="px-6 pb-6 relative -mt-16 flex-grow flex flex-col justify-between">
                <div>
                  
                  {/* Photo & Core specs */}
                  <div className="flex items-end gap-4 mb-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-apex-orange relative bg-cyber-dark shrink-0">
                      <img 
                        src={p.photo} 
                        alt={p.ign} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-1 pb-1">
                      <h2 className="font-display font-black text-2xl text-white tracking-tight group-hover:text-glow group-hover:text-apex-orange transition-colors uppercase leading-none">
                        {p.ign}
                      </h2>
                      <span className="block font-sans text-xs text-gray-400">{p.realName}</span>
                      <div className="flex items-center gap-1.5 font-mono text-[9px] text-gray-500">
                        <Globe className="w-3 h-3 text-apex-orange" />
                        <span>{p.country}</span>
                      </div>
                    </div>
                  </div>

                  {/* Role and Details */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white/5 border border-white/5 p-2 rounded">
                      <span className="block font-mono text-[8px] text-gray-500">TACTICAL ROLE</span>
                      <span className="block font-display font-bold text-[10px] text-white uppercase line-clamp-1 mt-0.5">{p.role}</span>
                    </div>
                    <div className="bg-white/5 border border-white/5 p-2 rounded">
                      <span className="block font-mono text-[8px] text-gray-500">JOIN DATE</span>
                      <span className="block font-mono text-[10px] text-white mt-0.5">{p.joinDate}</span>
                    </div>
                  </div>

                  {/* Core Statistics Progress bars */}
                  <div className="space-y-3 mb-6">
                    <h4 className="font-mono text-[9px] text-gray-500 tracking-widest uppercase">LIFETIME INDEX</h4>
                    
                    {p.game === 'VALORANT' ? (
                      <>
                        <div className="space-y-1">
                          <div className="flex justify-between font-mono text-[10px]">
                            <span className="text-gray-400">AVERAGE COMBAT SCORE</span>
                            <span className="text-white font-bold">{p.statistics.damagePerRound || 260} ADR</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-apex-orange rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between font-mono text-[10px]">
                            <span className="text-gray-400">K/D RATIO</span>
                            <span className="text-apex-orange font-bold text-glow">{p.statistics.kdRatio}</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-apex-orange rounded-full" style={{ width: `${(p.statistics.kdRatio || 1.2) * 50}%` }}></div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-1">
                          <div className="flex justify-between font-mono text-[10px]">
                            <span className="text-gray-400">FINISH RATIO (K/D)</span>
                            <span className="text-apex-orange font-bold text-glow">{p.statistics.kdRatio}</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-apex-orange rounded-full" style={{ width: `${(p.statistics.kdRatio || 1.2) * 15}%` }}></div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between font-mono text-[10px]">
                            <span className="text-gray-400">MATCHES PLAYED</span>
                            <span className="text-white font-bold">{p.statistics.matchesPlayed}</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-apex-orange rounded-full" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Highlights of achievements */}
                  {p.achievements && p.achievements.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <h4 className="font-mono text-[9px] text-gray-500 tracking-widest uppercase">TOP RECOGNITIONS</h4>
                      <ul className="space-y-1 text-[10px] text-gray-300">
                        {p.achievements.slice(0, 2).map((ac, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 line-clamp-1">
                            <Trophy className="w-3 h-3 text-apex-orange shrink-0" />
                            <span>{ac}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>

                {/* Card footer links and inspect */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                  
                  {/* Social Handles */}
                  <div className="flex items-center gap-2">
                    {p.socials?.instagram && (
                      <a 
                        href={p.socials.instagram} 
                        onClick={(e) => e.stopPropagation()} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-1.5 rounded hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {p.socials?.twitter && (
                      <a 
                        href={p.socials.twitter} 
                        onClick={(e) => e.stopPropagation()} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-1.5 rounded hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                      >
                        <Twitter className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {p.socials?.youtube && (
                      <a 
                        href={p.socials.youtube} 
                        onClick={(e) => e.stopPropagation()} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-1.5 rounded hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                      >
                        <Youtube className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Trigger inspect */}
                  <span className="font-mono text-[10px] text-apex-orange group-hover:underline flex items-center gap-1 font-bold">
                    FULL PROFILE <ArrowRight className="w-3 h-3" />
                  </span>

                </div>

              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
