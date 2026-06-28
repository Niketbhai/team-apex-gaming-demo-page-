/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  Activity, 
  Award, 
  Calendar, 
  TrendingUp, 
  Play, 
  Pause, 
  RefreshCw,
  Clock,
  Target,
  Gamepad2
} from 'lucide-react';
import { Match, AdminRole } from '../types';

interface MatchCenterViewProps {
  matches: Match[];
  currentRole: AdminRole | 'Fan';
  onOpenAdmin: () => void;
}

const LIVE_TICKER_EVENTS = [
  "Scrims Warmup Complete. Players entering lobby.",
  "Map veto: Bind chosen by Team Apex, Ascent chosen by Velocity Gaming.",
  "Pistol Round starts! NeonViper gets a double-tap on Jett.",
  "Apex wins round 1. Flawless execution on A-site hold.",
  "Velocity Gaming answers with eco-buy. Score 1 - 1.",
  "NeonViper secures a Sheriff triple kill! Round 3 to Apex.",
  "Spike planted on B-site. Reaper defuses with 0.12 seconds remaining!",
  "Thrifty Round! Team Apex takes down heavy operators.",
  "Half-time switch. Score 7 - 5 in favor of Team Apex.",
  "Second half pistol starts. Velocity Gaming secures clean retake.",
  "NeonViper buys Operator. High-mid pick recorded.",
  "Spectacular headshot by ApexMortal on the flank!",
  "Spike planted by Velocity. Team Apex initiates a 3v4 retake...",
  "Clutch! NeonViper secures the 1v2 clutch and defuses spike!"
];

export default function MatchCenterView({
  matches,
  currentRole,
  onOpenAdmin
}: MatchCenterViewProps) {
  const [selectedTab, setSelectedTab] = useState<'Live' | 'Upcoming' | 'Past'>('Live');
  const [liveMatch, setLiveMatch] = useState<Match | null>(null);
  const [isTicking, setIsTicking] = useState(true);
  const [eventIndex, setEventIndex] = useState(0);

  // Initialize live match from matches list
  useEffect(() => {
    const live = matches.find(m => m.status === 'Live');
    if (live) {
      setLiveMatch(JSON.parse(JSON.stringify(live))); // Clone
    }
  }, [matches]);

  // Simulate real-time live score updates
  useEffect(() => {
    if (!liveMatch || !isTicking) return;

    const interval = setInterval(() => {
      setLiveMatch(prev => {
        if (!prev || !prev.liveScore) return prev;

        const next = { ...prev };
        const score = { ...next.liveScore };

        // Periodically tick rounds or score
        const rand = Math.random();
        if (rand < 0.25) {
          // Apex scores
          score.apexScore += 1;
          score.roundNumber = (score.roundNumber || 0) + 1;
          if (score.kills !== undefined) score.kills += Math.floor(Math.random() * 3) + 1;
          score.statusText = `Round ${score.roundNumber}: Team Apex wins. Tactical retake complete!`;
        } else if (rand < 0.5) {
          // Opponent scores
          score.opponentScore += 1;
          score.roundNumber = (score.roundNumber || 0) + 1;
          if (score.deaths !== undefined) score.deaths += Math.floor(Math.random() * 2) + 1;
          score.statusText = `Round ${score.roundNumber}: ${prev.opponent} secures site entry. Spike detonated.`;
        } else if (rand < 0.7) {
          // Just update status events
          const nextEvent = LIVE_TICKER_EVENTS[eventIndex % LIVE_TICKER_EVENTS.length];
          score.statusText = nextEvent;
          setEventIndex(i => i + 1);
        }

        // Limit the game to Bo24 (Valorant standard first to 13)
        if (score.apexScore >= 13 || score.opponentScore >= 13) {
          score.statusText = `Match Finished. Final Score ${score.apexScore} - ${score.opponentScore}.`;
          setIsTicking(false);
        }

        next.liveScore = score;
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [liveMatch, isTicking, eventIndex]);

  const upcomingMatches = matches.filter(m => m.status === 'Upcoming');
  const pastMatches = matches.filter(m => m.status === 'Past');

  const handleResetLiveSimulation = () => {
    const originalLive = matches.find(m => m.status === 'Live');
    if (originalLive) {
      setLiveMatch(JSON.parse(JSON.stringify(originalLive)));
      setIsTicking(true);
      setEventIndex(0);
    }
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-28" id="match-center-view">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">REAL-TIME TELEMETRY</span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mt-1">
            MATCH CENTER
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mt-1">
            Track active campaigns, watch live simulated statistics, and review historic victory data.
          </p>
        </div>

        {/* Tab filters */}
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1.5 rounded-lg font-mono text-xs">
          {(['Live', 'Upcoming', 'Past'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-md font-bold transition-all uppercase ${
                selectedTab === tab
                  ? 'bg-apex-orange text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 1. LIVE TAB VIEW */}
      {selectedTab === 'Live' && (
        <div className="space-y-8" id="live-tab-content">
          {liveMatch ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Scoreboard, Stream & ticker */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Main live board */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-red-950/30 via-cyber-dark to-cyber-dark border-2 border-red-500/30 p-6 sm:p-8 border-glow space-y-8">
                  
                  {/* Status tags */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 bg-red-600 text-white font-mono text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider animate-pulse">
                      <Activity className="w-3 h-3" />
                      <span>LIVE CAMPAIGN</span>
                    </span>

                    <span className="font-mono text-[10px] text-gray-400">
                      {liveMatch.tournamentName}
                    </span>
                  </div>

                  {/* Versus Score Grid */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-6">
                    
                    {/* Team Apex info */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                      <div className="bg-apex-orange p-3 rounded-2xl skew-x-12 shrink-0 border-glow flex items-center justify-center w-14 h-14">
                        <Gamepad2 className="w-8 h-8 text-white -skew-x-12" />
                      </div>
                      <div>
                        <h3 className="font-display font-black text-xl text-white uppercase tracking-tight">TEAM APEX</h3>
                        <span className="font-mono text-[10px] text-gray-400 uppercase">PREDATORS</span>
                      </div>
                    </div>

                    {/* Scorers core */}
                    <div className="flex items-center gap-6 bg-black/40 px-6 py-3 rounded-2xl border border-white/5 mx-2">
                      <span className="font-display font-black text-5xl text-apex-orange text-glow">
                        {liveMatch.liveScore?.apexScore}
                      </span>
                      <span className="font-mono text-xs text-gray-500 font-bold">VS</span>
                      <span className="font-display font-black text-5xl text-white">
                        {liveMatch.liveScore?.opponentScore}
                      </span>
                    </div>

                    {/* Opponent Info */}
                    <div className="flex flex-col sm:flex-row-reverse items-center gap-4 text-center sm:text-right">
                      <img src={liveMatch.opponentLogo} alt={liveMatch.opponent} className="w-14 h-14 rounded-2xl object-cover border border-white/10 shrink-0" referrerPolicy="no-referrer" />
                      <div>
                        <h3 className="font-display font-black text-xl text-white uppercase tracking-tight">{liveMatch.opponent}</h3>
                        <span className="font-mono text-[10px] text-gray-400 uppercase">OPPOSITION</span>
                      </div>
                    </div>

                  </div>

                  {/* Map Venue */}
                  <div className="text-center">
                    <span className="inline-block px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono font-bold text-gray-400 uppercase">
                      MAP VENUE: {liveMatch.liveScore?.mapName || 'SUMMONERS RIFF'}
                    </span>
                  </div>

                  {/* Simulator controller and live log ticker */}
                  <div className="pt-6 border-t border-white/5 space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">TACTICAL SHIFT TICKER</h4>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsTicking(!isTicking)}
                          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all font-mono text-[10px] flex items-center gap-1"
                        >
                          {isTicking ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          <span>{isTicking ? 'PAUSE TICKER' : 'RESUME TICKER'}</span>
                        </button>
                        <button
                          onClick={handleResetLiveSimulation}
                          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all font-mono text-[10px] flex items-center gap-1"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>RESET</span>
                        </button>
                      </div>
                    </div>

                    {/* Live log list */}
                    <div className="bg-black/40 border border-white/5 p-4 rounded-xl min-h-[4.5rem] flex items-center gap-3">
                      <Clock className="w-5 h-5 text-red-500 shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
                      <p className="text-gray-300 font-mono text-xs leading-relaxed animate-pulse">
                        {liveMatch.liveScore?.statusText}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Simulated Youtube stream frame */}
                <div className="glassmorphism p-5 rounded-2xl border-white/5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="font-display font-black text-base text-white uppercase tracking-tight flex items-center gap-2">
                      <Tv className="w-4 h-4 text-apex-orange" />
                      <span>OFFICIAL TELECAST BROADCRAFT</span>
                    </h3>
                    <span className="text-emerald-400 font-mono text-[10px] font-bold uppercase animate-pulse flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>LAN HIGH BITRATE STREAM</span>
                    </span>
                  </div>

                  <div className="aspect-video bg-black rounded-xl overflow-hidden border border-white/15">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="Apex live stream"
                      allow="autoplay; encrypted-media"
                      referrerPolicy="no-referrer"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>

              </div>

              {/* Side column: Active MVP & telemetry stats */}
              <div className="space-y-6">
                
                {/* MVP card */}
                {liveMatch.mvp && (
                  <div className="glassmorphism rounded-2xl overflow-hidden border-white/5 flex flex-col justify-between">
                    <div className="p-5 border-b border-white/5">
                      <h3 className="font-display font-black text-sm text-white uppercase tracking-wider flex items-center gap-2">
                        <Award className="w-4 h-4 text-apex-orange" />
                        <span>MATCH MVP CONTENDER</span>
                      </h3>
                    </div>

                    <div className="p-5 flex flex-col items-center text-center space-y-4">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-apex-orange relative bg-cyber-dark shrink-0">
                        <img src={liveMatch.mvp.photo} alt={liveMatch.mvp.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="font-display font-black text-lg text-white uppercase leading-none">{liveMatch.mvp.name}</h4>
                        <span className="block font-mono text-[9px] text-apex-orange uppercase tracking-widest font-bold">ACTIVE ASSAULTER</span>
                      </div>

                      <div className="w-full bg-white/5 border border-white/5 p-3 rounded-lg text-center font-mono text-xs">
                        <span className="block text-gray-500 uppercase text-[8px] tracking-wider mb-1">REAL-TIME DAMAGE & INDEX</span>
                        <span className="font-bold text-white uppercase">{liveMatch.mvp.stats}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Team Stats */}
                {liveMatch.statistics && (
                  <div className="glassmorphism p-6 rounded-2xl border-white/5 space-y-4">
                    <h3 className="font-display font-black text-sm text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-3">
                      <Target className="w-4 h-4 text-apex-orange" />
                      <span>TEAM SQUAD INDEX</span>
                    </h3>

                    <div className="space-y-4 font-mono text-xs text-gray-300">
                      <div className="flex justify-between py-1.5 border-b border-white/5">
                        <span className="text-gray-500 uppercase text-[10px]">TOTAL FRAGS KILLS</span>
                        <span className="font-bold text-white">{liveMatch.liveScore?.kills || liveMatch.statistics.kills} Kills</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-white/5">
                        <span className="text-gray-500 uppercase text-[10px]">TEAM SQUAD DEATHS</span>
                        <span className="font-bold text-white">{liveMatch.liveScore?.deaths || liveMatch.statistics.deaths} Deaths</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-white/5">
                        <span className="text-gray-500 uppercase text-[10px]">TEAM SQUAD ASSISTS</span>
                        <span className="font-bold text-white">{liveMatch.statistics.assists} Assists</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-white/5">
                        <span className="text-gray-500 uppercase text-[10px]">CRITICAL HIT ACCURACY</span>
                        <span className="font-bold text-apex-orange text-glow">{liveMatch.statistics.accuracy || '68%'}</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>
          ) : (
            <div className="py-20 text-center text-gray-500 text-sm glassmorphism rounded-xl">
              No active live campaign recorded at this hour. Toggle "Upcoming" or "Past" tabs above.
            </div>
          )}
        </div>
      )}

      {/* 2. UPCOMING TAB VIEW */}
      {selectedTab === 'Upcoming' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="upcoming-tab-content">
          {upcomingMatches.length === 0 ? (
            <div className="md:col-span-2 py-20 text-center text-gray-500 text-sm glassmorphism rounded-xl">
              No upcoming matches recorded. Check back later!
            </div>
          ) : (
            upcomingMatches.map((m) => (
              <div key={m.id} className="glassmorphism p-6 rounded-2xl border-white/5 flex flex-col justify-between space-y-6 hover:border-apex-orange/30 transition-all">
                
                <div className="flex items-center justify-between">
                  <span className="bg-apex-orange/15 text-apex-orange border border-apex-orange/20 text-[9px] font-mono font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                    {m.game}
                  </span>
                  <span className="font-mono text-[9px] text-gray-500 uppercase">{m.tournamentName}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="text-center sm:text-left">
                    <h4 className="font-display font-black text-xl text-white uppercase tracking-tight">TEAM APEX</h4>
                    <span className="font-mono text-[9px] text-gray-500 uppercase">PREDATORS</span>
                  </div>

                  <div className="px-4 py-2 bg-white/5 rounded border border-white/10 text-xs font-mono font-bold text-gray-400 shrink-0">
                    VS
                  </div>

                  <div className="text-center sm:text-right flex items-center gap-3">
                    <div className="text-center sm:text-right">
                      <h4 className="font-display font-black text-xl text-white uppercase tracking-tight">{m.opponent}</h4>
                      <span className="font-mono text-[9px] text-gray-500 uppercase">OPPOSITION</span>
                    </div>
                    {m.opponentLogo && (
                      <img src={m.opponentLogo} alt={m.opponent} className="w-10 h-10 rounded-xl object-cover border border-white/10 hidden sm:block" referrerPolicy="no-referrer" />
                    )}
                  </div>
                </div>

                {/* Schedule details */}
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 text-xs">
                  <Calendar className="w-5 h-5 text-apex-orange shrink-0" />
                  <div className="font-mono text-[11px] text-gray-300">
                    <span>LAUNCH SCHEDULE: </span>
                    <span className="text-white font-bold">
                      {new Date(m.schedule).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span> AT </span>
                    <span className="text-white font-bold">
                      {new Date(m.schedule).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      )}

      {/* 3. PAST TAB VIEW */}
      {selectedTab === 'Past' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="past-tab-content">
          {pastMatches.length === 0 ? (
            <div className="md:col-span-2 py-20 text-center text-gray-500 text-sm glassmorphism rounded-xl">
              No historic matches recorded.
            </div>
          ) : (
            pastMatches.map((m) => (
              <div key={m.id} className="glassmorphism p-6 rounded-2xl border-white/5 flex flex-col justify-between space-y-6 hover:border-apex-orange/30 transition-all">
                
                <div className="flex items-center justify-between">
                  <span className="bg-gray-500/10 text-gray-400 border border-white/10 text-[9px] font-mono font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                    {m.game}
                  </span>
                  <span className="font-mono text-[9px] text-gray-500 uppercase">{m.tournamentName}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="text-left">
                    <h4 className="font-display font-black text-lg text-white uppercase tracking-tight">TEAM APEX</h4>
                    <span className="font-mono text-[9px] text-gray-500 uppercase text-emerald-400 font-bold">CHAMPIONS</span>
                  </div>

                  <div className="px-4 py-1.5 bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold rounded">
                    WIN
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <div className="text-right">
                      <h4 className="font-display font-black text-lg text-white uppercase tracking-tight">{m.opponent}</h4>
                      <span className="font-mono text-[9px] text-gray-500 uppercase">RUNNER-UP</span>
                    </div>
                    {m.opponentLogo && (
                      <img src={m.opponentLogo} alt={m.opponent} className="w-10 h-10 rounded-xl object-cover border border-white/10 hidden sm:block" referrerPolicy="no-referrer" />
                    )}
                  </div>
                </div>

                {/* MVP spotlight */}
                {m.mvp && (
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center gap-3 text-xs">
                    <Award className="w-5 h-5 text-apex-orange shrink-0 animate-bounce" />
                    <div className="font-mono text-[10px]">
                      <span className="text-gray-500">STAGE MVP: </span>
                      <span className="text-white font-bold uppercase">{m.mvp.name}</span>
                      <span className="text-gray-400"> ({m.mvp.stats})</span>
                    </div>
                  </div>
                )}

              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}
