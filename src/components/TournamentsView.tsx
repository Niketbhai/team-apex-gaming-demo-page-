/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Trophy, 
  MapPin, 
  Calendar, 
  Award, 
  ChevronRight, 
  TrendingUp, 
  Star,
  Users,
  Search,
  Settings
} from 'lucide-react';
import { Tournament, GameCategory, AdminRole } from '../types';

interface TournamentsViewProps {
  tournaments: Tournament[];
  currentRole: AdminRole | 'Fan';
  onOpenAdmin: () => void;
}

export default function TournamentsView({
  tournaments,
  currentRole,
  onOpenAdmin
}: TournamentsViewProps) {
  const [filter, setFilter] = useState<'All' | 'Upcoming' | 'Ongoing' | 'Past'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(
    tournaments.length > 0 ? tournaments[0].id : null
  );

  const filteredTournaments = tournaments.filter(t => {
    const matchesFilter = filter === 'All' || t.status === filter;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.game.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const selectedTournament = tournaments.find(t => t.id === selectedTournamentId) || tournaments[0];

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-28" id="tournaments-view">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">THE COMBAT RING</span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mt-1">
            TOURNAMENTS HUB
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mt-1">
            Track our tournament standings, prize distributions, and competitive logs across local and global LAN events.
          </p>
        </div>

        {/* Admin Shortcut */}
        {currentRole !== 'Fan' && (
          <button 
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-4 py-2 bg-apex-orange/10 border border-apex-orange/30 text-apex-orange hover:bg-apex-orange hover:text-white transition-all text-xs font-mono rounded"
          >
            <Settings className="w-4 h-4" />
            <span>MANAGE TOURNAMENTS</span>
          </button>
        )}
      </div>

      {/* Main Content split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: Tournament list filtering and search */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* Search and Filters */}
          <div className="glassmorphism p-5 rounded-2xl border-white/5 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="SEARCH TOURNAMENT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-apex-orange/70 w-full font-mono uppercase"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(['All', 'Upcoming', 'Ongoing', 'Past'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFilter(opt)}
                  className={`px-3 py-1.5 rounded font-display font-bold text-[10px] tracking-wider uppercase transition-colors ${
                    filter === opt
                      ? 'bg-apex-orange text-white'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Tournament Scroll List */}
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {filteredTournaments.length === 0 ? (
              <div className="py-12 text-center text-gray-500 text-xs">
                No matching tournaments found.
              </div>
            ) : (
              filteredTournaments.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTournamentId(t.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                    selectedTournament?.id === t.id
                      ? 'bg-apex-orange/10 border-apex-orange/40 shadow-lg shadow-apex-orange/5'
                      : 'bg-cyber-card border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={t.logo} 
                      alt={t.name} 
                      className="w-10 h-10 rounded object-cover border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-0.5">
                      <span className="bg-white/5 text-gray-400 border border-white/10 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded uppercase">
                        {t.game}
                      </span>
                      <h4 className="font-display font-bold text-xs text-white line-clamp-1 uppercase pt-0.5">{t.name}</h4>
                      <span className="block font-mono text-[9px] text-gray-500">{t.schedule}</span>
                    </div>
                  </div>

                  <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded shrink-0 ${
                    t.status === 'Ongoing'
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse'
                      : t.status === 'Upcoming'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                  }`}>
                    {t.status}
                  </span>
                </div>
              ))
            )}
          </div>

        </div>

        {/* Right Columns: Active Standings & Results Detail board */}
        <div className="lg:col-span-2 space-y-6">
          {selectedTournament ? (
            <div className="space-y-6">
              
              {/* Tourney Meta Card */}
              <div className="glassmorphism p-6 sm:p-8 rounded-2xl border-white/5 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-apex-orange/5 rounded-full blur-[60px] pointer-events-none"></div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <img src={selectedTournament.logo} alt={selectedTournament.name} className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0" referrerPolicy="no-referrer" />
                    <div className="space-y-1">
                      <span className="bg-apex-orange/10 text-apex-orange border border-apex-orange/20 text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold">
                        {selectedTournament.game}
                      </span>
                      <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                        {selectedTournament.name}
                      </h2>
                    </div>
                  </div>

                  {/* Team Rank Badge */}
                  <div className="bg-apex-orange/15 border border-apex-orange/30 text-apex-orange px-4 py-2 rounded-xl text-center shrink-0">
                    <span className="block font-mono text-[9px] text-gray-500 leading-none">APEX POSITION</span>
                    <span className="font-display font-black text-2xl text-glow leading-none pt-1">
                      #{selectedTournament.teamRanking}
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {selectedTournament.description}
                </p>

                {/* Info Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-apex-orange" />
                    <div>
                      <span className="block font-mono text-[8px] text-gray-500">PRIZE POOL</span>
                      <span className="block font-display font-bold text-xs text-white uppercase">{selectedTournament.prizePool}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-apex-orange" />
                    <div>
                      <span className="block font-mono text-[8px] text-gray-500">VENUE / LOCATION</span>
                      <span className="block font-display font-bold text-xs text-white uppercase line-clamp-1">{selectedTournament.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-apex-orange" />
                    <div>
                      <span className="block font-mono text-[8px] text-gray-500">TIMELINE SCHEDULE</span>
                      <span className="block font-display font-bold text-xs text-white uppercase">{selectedTournament.schedule}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Standings Table Board */}
              {selectedTournament.standings && selectedTournament.standings.length > 0 && (
                <div className="glassmorphism p-6 rounded-2xl border-white/5 space-y-4">
                  <h3 className="font-display font-black text-lg text-white uppercase tracking-tight flex items-center gap-2 border-b border-white/5 pb-3">
                    <TrendingUp className="w-5 h-5 text-apex-orange" />
                    <span>GRAND STANDINGS BOARD</span>
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse font-sans text-xs">
                      <thead>
                        <tr className="border-b border-white/10 text-gray-500 font-mono">
                          <th className="py-2.5 px-3 uppercase text-[9px]">Rank</th>
                          <th className="py-2.5 px-3 uppercase text-[9px]">SQUAD / TEAM NAME</th>
                          <th className="py-2.5 px-3 uppercase text-[9px] text-center">Played</th>
                          <th className="py-2.5 px-3 uppercase text-[9px] text-center">Wins</th>
                          {selectedTournament.standings[0].kills !== undefined && (
                            <th className="py-2.5 px-3 uppercase text-[9px] text-center">Finish Kills</th>
                          )}
                          <th className="py-2.5 px-3 uppercase text-[9px] text-right">Points</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-gray-300">
                        {selectedTournament.standings.map((st) => (
                          <tr 
                            key={st.rank}
                            className={`${st.isApex ? 'bg-apex-orange/10 font-bold text-white' : ''}`}
                          >
                            <td className="py-3 px-3">
                              {st.rank === 1 ? (
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-black font-mono font-black text-[10px]">
                                  1
                                </span>
                              ) : (
                                <span className="font-mono text-[11px] font-bold pl-1.5">{st.rank}</span>
                              )}
                            </td>
                            <td className="py-3 px-3 flex items-center gap-1.5 font-display uppercase tracking-wide">
                              <span>{st.teamName}</span>
                              {st.isApex && <Star className="w-3.5 h-3.5 text-apex-orange fill-apex-orange shrink-0 animate-spin" style={{ animationDuration: '6s' }} />}
                            </td>
                            <td className="py-3 px-3 text-center font-mono">{st.played}</td>
                            <td className="py-3 px-3 text-center font-mono text-emerald-400 font-bold">{st.wins}</td>
                            {st.kills !== undefined && (
                              <td className="py-3 px-3 text-center font-mono">{st.kills}</td>
                            )}
                            <td className="py-3 px-3 text-right font-mono font-black text-sm text-apex-orange text-glow">
                              {st.points}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Match Results list */}
              {selectedTournament.results && selectedTournament.results.length > 0 && (
                <div className="glassmorphism p-6 rounded-2xl border-white/5 space-y-4">
                  <h3 className="font-display font-black text-lg text-white uppercase tracking-tight flex items-center gap-2 border-b border-white/5 pb-3">
                    <Award className="w-5 h-5 text-apex-orange" />
                    <span>APEX SQUAD MATCH LOGS</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedTournament.results.map((res, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between gap-4 hover:border-apex-orange/20 transition-all">
                        <div className="space-y-1">
                          <span className="block font-mono text-[8px] text-gray-500 uppercase">{res.roundName}</span>
                          <h4 className="font-display font-bold text-xs text-white uppercase leading-none">
                            vs {res.opponent}
                          </h4>
                          {res.mvp && (
                            <span className="block font-mono text-[9px] text-apex-orange pt-1">MVP: {res.mvp}</span>
                          )}
                        </div>

                        <div className="text-right shrink-0">
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold mb-1 ${
                            res.result === 'WIN' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                          }`}>
                            {res.result}
                          </span>
                          <span className="block font-mono text-xs font-black text-white">{res.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="py-32 text-center text-gray-500 text-sm">
              Please choose a tournament from the left scrollbar to inspect standings and results.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
