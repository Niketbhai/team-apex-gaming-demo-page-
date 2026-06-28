/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Play, 
  Calendar, 
  Trophy, 
  Users, 
  ArrowRight, 
  Activity, 
  Tv, 
  Sparkles, 
  TrendingUp, 
  Quote, 
  ChevronRight, 
  Heart,
  Share2,
  ExternalLink,
  Target
} from 'lucide-react';
import { Player, Tournament, Match, NewsArticle, Product, Sponsor } from '../types';

interface HomeViewProps {
  players: Player[];
  tournaments: Tournament[];
  matches: Match[];
  news: NewsArticle[];
  products: Product[];
  sponsors: Sponsor[];
  onNavigate: (tabId: string) => void;
  onSelectPlayer: (player: Player) => void;
  onSelectNews: (article: NewsArticle) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export default function HomeView({
  players,
  tournaments,
  matches,
  news,
  products,
  sponsors,
  onNavigate,
  onSelectPlayer,
  onSelectNews,
  onAddToCart
}: HomeViewProps) {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [hoveredFeatured, setHoveredFeatured] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Get live / upcoming matches
  const liveMatch = matches.find(m => m.status === 'Live');
  const upcomingMatches = matches.filter(m => m.status === 'Upcoming').slice(0, 2);
  const featuredNews = news.slice(0, 3);
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 3);
  
  // Highlight some elite players
  const featuredPlayers = players.slice(0, 4);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-24 pb-20" id="home-view">
      
      {/* 1. HERO SECTION WITH DYNAMIC GRAPHICS */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20" id="hero-sec">
        
        {/* Futuristic Cyberpunk Cyber-Grid background */}
        <div className="absolute inset-0 bg-cyber-dark cyber-grid z-0"></div>
        
        {/* Radial Orange glowing core background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-apex-orange/15 to-transparent rounded-full blur-[120px] pointer-events-none z-0"></div>

        {/* Dynamic moving matrix particles simulation */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-60 z-0"></div>

        {/* Diagonal slashing styling lines */}
        <div className="absolute -left-10 top-0 bottom-0 w-32 bg-apex-orange/5 -skew-x-12 transform pointer-events-none"></div>
        <div className="absolute -right-10 top-0 bottom-0 w-48 bg-white/5 -skew-x-12 transform pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8" id="hero-content">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-apex-orange/10 border border-apex-orange/30 text-apex-orange text-xs font-mono tracking-widest uppercase animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE FUTURE OF INDIAN ESPORTS</span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-none uppercase">
            JOIN THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-apex-orange to-white text-glow">
              APEX LEGACY
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed font-sans">
            We are Team Apex Gaming. A community of championship athletes, creators, and tier-one fans pushing boundaries across battlegrounds. Witness our legacy, support our rosters, and buy elite merchandise.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('recruitment')}
              className="w-full sm:w-auto px-8 py-4 rounded bg-apex-orange text-white font-display font-black tracking-wider text-sm border-glow hover:bg-apex-orange/90 transition-all transform hover:scale-[1.03] active:scale-[0.98] skew-x-6"
              id="hero-join-btn"
            >
              <div className="-skew-x-6">JOIN THE LEGACY</div>
            </button>
            <button
              onClick={() => setShowVideoModal(true)}
              className="w-full sm:w-auto px-8 py-4 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white font-display font-black tracking-wider text-sm transition-all flex items-center justify-center gap-2 transform active:scale-[0.98] skew-x-6"
              id="hero-watch-btn"
            >
              <div className="-skew-x-6 flex items-center gap-2">
                <Play className="w-4 h-4 text-apex-orange fill-apex-orange" />
                <span>WATCH HIGHLIGHTS</span>
              </div>
            </button>
          </div>

          {/* Quick Stats Grid under Hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-16" id="hero-quick-stats">
            {[
              { label: 'ACTIVE ROSTERS', val: '6 SQUADS' },
              { label: 'LAN CHAMPIONSHIPS', val: '14 TROPHIES' },
              { label: 'COMMUNITY FANS', val: '12M+' },
              { label: 'CURRENT WIN STREAK', val: '8 MATCHES' }
            ].map((st, idx) => (
              <div key={idx} className="glassmorphism p-4 rounded text-center border-white/5">
                <span className="block font-display font-black text-white text-base sm:text-xl tracking-tight text-glow">{st.val}</span>
                <span className="block font-mono text-[9px] text-gray-400 tracking-widest mt-1">{st.label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Video simulation modal */}
        {showVideoModal && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
            <div className="relative w-full max-w-4xl aspect-video bg-cyber-dark border border-apex-orange/30 rounded overflow-hidden">
              <button 
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/75 hover:bg-apex-orange hover:text-white transition-colors text-gray-400"
              >
                ✕
              </button>
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Team Apex Highlights"
                allow="autoplay; encrypted-media"
                referrerPolicy="no-referrer"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </section>

      {/* 2. LIVE TICKER / MATCH CENTER SPOTLIGHT */}
      {liveMatch && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="live-match-sec">
          <div className="relative rounded overflow-hidden bg-gradient-to-r from-red-950/40 via-cyber-dark to-cyber-dark border-2 border-red-500/40 p-6 md:p-8 border-glow">
            
            <div className="absolute top-0 right-0 bg-red-600 text-white font-mono text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-bl animate-pulse flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>LIVE MATCH</span>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              
              <div className="space-y-2">
                <span className="font-mono text-xs text-red-400 font-bold tracking-widest uppercase">
                  {liveMatch.tournamentName}
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                  Apex Predators vs {liveMatch.opponent}
                </h3>
                <p className="text-gray-400 text-sm max-w-md">
                  We are battling in {liveMatch.game} maps. Support our athletes live by tuning into the streams!
                </p>
              </div>

              {/* Scoreboard widget */}
              <div className="flex items-center gap-6 sm:gap-12 bg-black/40 px-6 py-4 rounded-xl border border-white/5 shrink-0">
                <div className="text-center">
                  <span className="block font-mono text-[9px] text-gray-400 tracking-wider">TEAM APEX</span>
                  <span className="font-display font-black text-3xl sm:text-4xl text-apex-orange text-glow">
                    {liveMatch.liveScore?.apexScore}
                  </span>
                </div>
                
                <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-gray-400 text-xs font-mono font-bold uppercase">
                  {liveMatch.liveScore?.mapName || 'VS'}
                </div>

                <div className="text-center">
                  <span className="block font-mono text-[9px] text-gray-400 tracking-wider">{liveMatch.opponent}</span>
                  <span className="font-display font-black text-3xl sm:text-4xl text-white">
                    {liveMatch.liveScore?.opponentScore}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto">
                <button
                  onClick={() => onNavigate('matches')}
                  className="w-full lg:w-auto px-6 py-3 rounded bg-red-600 hover:bg-red-700 text-white font-display font-black tracking-wider text-xs transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <Tv className="w-4 h-4" />
                  <span>WATCH MATCH STREAM</span>
                </button>
              </div>

            </div>

            {liveMatch.liveScore?.statusText && (
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-gray-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-emerald-400 font-bold">STATUS:</span>
                <span>{liveMatch.liveScore.statusText}</span>
              </div>
            )}

          </div>
        </section>
      )}

      {/* 3. LATEST NEWS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="latest-news-sec">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">INSIDE THE HQ</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase mt-1">
              LATEST NEWS & ARTICLES
            </h2>
          </div>
          <button 
            onClick={() => onNavigate('news')}
            className="group flex items-center gap-1 text-sm font-display font-black text-apex-orange hover:text-white transition-colors"
          >
            <span>VIEW ALL NEWS</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="news-grid-home">
          {featuredNews.map((article) => (
            <article 
              key={article.id} 
              onClick={() => onSelectNews(article)}
              className="glassmorphism rounded overflow-hidden flex flex-col group cursor-pointer border-white/5 hover:border-apex-orange/30 transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-cyber-dark/85 backdrop-blur-md border border-apex-orange/30 text-apex-orange text-[10px] font-mono font-bold px-2.5 py-1 uppercase rounded tracking-widest">
                  {article.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2">
                  <span className="block font-mono text-[10px] text-gray-500">{article.date}</span>
                  <h3 className="font-display font-black text-lg text-white group-hover:text-apex-orange transition-colors line-clamp-2 uppercase tracking-tight">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[11px] font-mono">
                  <span className="text-gray-400 font-bold">{article.author}</span>
                  <span className="text-apex-orange flex items-center gap-1 group-hover:underline">
                    READ FULL ARTICLE <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. UPCOMING MATCHES & RESULTS SUMMARY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="matches-sec-home">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Upcoming Matches Column */}
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">PREPARE THE STREAM</span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase mt-1">
                UPCOMING COMBATS
              </h3>
            </div>

            <div className="space-y-4">
              {upcomingMatches.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-sm border border-dashed border-white/15 rounded">
                  No upcoming scheduled matches recorded.
                </div>
              ) : (
                upcomingMatches.map((m) => (
                  <div key={m.id} className="glassmorphism p-5 rounded border-white/5 flex items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-apex-orange/10 text-apex-orange border border-apex-orange/25 text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                          {m.game}
                        </span>
                        <span className="font-mono text-[10px] text-gray-400">{m.tournamentName}</span>
                      </div>
                      <h4 className="font-display font-black text-base text-white uppercase tracking-tight">
                        Apex vs {m.opponent}
                      </h4>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="block font-mono text-xs text-apex-orange font-bold">
                        {new Date(m.schedule).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="block font-mono text-[10px] text-gray-400">
                        {new Date(m.schedule).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              )}

              <button
                onClick={() => onNavigate('matches')}
                className="w-full py-3.5 rounded border border-white/10 hover:border-apex-orange/30 text-white font-display font-black tracking-wider text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>ENTER MATCH CENTER</span>
                <ArrowRight className="w-4 h-4 text-apex-orange" />
              </button>
            </div>
          </div>

          {/* Tournament Results Column */}
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">VICTORY MARGINS</span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase mt-1">
                TOURNAMENT RANKINGS
              </h3>
            </div>

            <div className="space-y-4">
              {tournaments.slice(0, 2).map((t) => (
                <div key={t.id} className="glassmorphism p-5 rounded border-white/5 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={t.logo} alt={t.name} className="w-10 h-10 rounded object-cover border border-white/10" referrerPolicy="no-referrer" />
                      <div>
                        <h4 className="font-display font-bold text-sm text-white line-clamp-1 uppercase">{t.name}</h4>
                        <span className="font-mono text-[10px] text-gray-400">{t.game} • {t.prizePool}</span>
                      </div>
                    </div>

                    <div className="bg-apex-orange/10 border border-apex-orange/30 text-apex-orange px-3 py-1.5 rounded text-center shrink-0">
                      <span className="block font-mono text-[9px] text-gray-400 leading-none">RANK</span>
                      <span className="font-display font-black text-lg text-glow leading-none pt-0.5">#{t.teamRanking}</span>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => onNavigate('tournaments')}
                className="w-full py-3.5 rounded border border-white/10 hover:border-apex-orange/30 text-white font-display font-black tracking-wider text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>VIEW TOURNEY STANDINGS</span>
                <ArrowRight className="w-4 h-4 text-apex-orange" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. FEATURED READINESS - ACTIVE ROSTER / PLAYERS DISPLAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="featured-rosters-sec">
        <div className="text-center space-y-4 mb-16">
          <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">ELITE RECON UNIT</span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            FEATURED ATHLETES
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-xs sm:text-sm">
            Meet the professional franchise stars representing Team Apex Gaming across battle arenas. Click profiles to inspect detailed lifetime statistics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="rosters-home-grid">
          {featuredPlayers.map((p) => (
            <div 
              key={p.id}
              onClick={() => onSelectPlayer(p)}
              onMouseEnter={() => setHoveredFeatured(p.id)}
              onMouseLeave={() => setHoveredFeatured(null)}
              className="glassmorphism rounded overflow-hidden cursor-pointer border-white/5 hover:border-apex-orange/40 transition-all duration-300 relative group"
            >
              {/* Card visual banner overlay */}
              <div className="h-28 bg-cover bg-center relative" style={{ backgroundImage: `url(${p.banner})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent"></div>
              </div>

              {/* Player Avatar */}
              <div className="px-6 pb-6 relative -mt-14 flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-apex-orange relative bg-cyber-dark">
                  <img 
                    src={p.photo} 
                    alt={p.ign} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-1">
                  <span className="bg-apex-orange/10 text-apex-orange border border-apex-orange/20 text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold">
                    {p.game}
                  </span>
                  <h3 className="font-display font-black text-xl text-white tracking-tight group-hover:text-apex-orange transition-colors uppercase pt-1">
                    {p.ign}
                  </h3>
                  <span className="block font-sans text-xs text-gray-400 leading-none">{p.realName}</span>
                </div>

                {/* Micro statistics */}
                <div className="grid grid-cols-2 gap-2 w-full pt-2 text-center">
                  <div className="bg-white/5 border border-white/5 p-2 rounded">
                    <span className="block font-mono text-[8px] text-gray-500">ROLE</span>
                    <span className="block font-display font-bold text-[10px] text-white uppercase line-clamp-1">{p.role}</span>
                  </div>
                  <div className="bg-white/5 border border-white/5 p-2 rounded">
                    <span className="block font-mono text-[8px] text-gray-500">K/D RATIO</span>
                    <span className="block font-display font-black text-xs text-apex-orange text-glow">{p.statistics.kdRatio || p.statistics.kdRatio || '1.2'}</span>
                  </div>
                </div>

                <span className="font-mono text-[9px] text-apex-orange group-hover:underline flex items-center gap-1 pt-2">
                  INSPECT PROFILE <ChevronRight className="w-3 h-3" />
                </span>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TROPHY ROOM / TEAM STATISTICS BENTO BOX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="trophy-room-sec">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main big block */}
          <div className="lg:col-span-2 glassmorphism p-8 rounded border-white/5 flex flex-col justify-between space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-apex-orange/5 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="space-y-2">
              <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">HALL OF HEROES</span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
                TROPHY SHOWCASE & DOMINATION
              </h3>
              <p className="text-gray-400 text-sm max-w-xl">
                We have battled through severe regional formats, rising to claims of title championships across international and local LAN circuits. Every victory represents severe training hours.
              </p>
            </div>

            {/* Simulated Trophies Display */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'BGIS 2024 CHAMPIONS', detail: 'Battlegrounds Mobile India Series • ₹1.2Cr Prize Pool', date: '2024' },
                { title: 'SKY CHANGER 5.0 GOLD', detail: 'Skyesports Championship • LAN Finals Bangalore', date: '2025' },
                { title: 'VCSA split 1 winner', detail: 'Valorant South Asian Challengers Cup', date: '2024' }
              ].map((tr, idx) => (
                <div key={idx} className="bg-white/5 border border-white/15 p-5 rounded relative group hover:border-apex-orange/30 transition-all">
                  <div className="absolute top-3 right-3 text-[10px] font-mono text-gray-500 font-bold">{tr.date}</div>
                  <Trophy className="w-8 h-8 text-apex-orange mb-4 animate-bounce" style={{ animationDuration: `${2.5 + idx}s` }} />
                  <h4 className="font-display font-black text-xs text-white tracking-wider uppercase leading-snug">{tr.title}</h4>
                  <p className="font-sans text-[10px] text-gray-400 mt-1.5 leading-snug">{tr.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Team Stats Side block */}
          <div className="glassmorphism p-8 rounded border-white/5 flex flex-col justify-between space-y-6">
            <div>
              <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">METRIC INDEX</span>
              <h3 className="font-display font-black text-2xl text-white tracking-tight uppercase mt-1">
                TEAM STATISTICS
              </h3>
            </div>

            <div className="space-y-4 font-mono text-xs text-gray-300">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-gray-500 uppercase">Total LAN Tournaments</span>
                <span className="font-bold text-white">45 Events</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-gray-500 uppercase">Podium Finishes</span>
                <span className="font-bold text-apex-orange text-glow">32 Times</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-gray-500 uppercase">Bo5 Win Rate</span>
                <span className="font-bold text-white">74.2%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-gray-500 uppercase">Clutch Map Conversions</span>
                <span className="font-bold text-white">82.1%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-gray-500 uppercase">Total Cash Earnings</span>
                <span className="font-bold text-white text-glow">₹4,20,00,000+</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('about')}
              className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded font-display font-black tracking-wider text-xs text-white transition-colors"
            >
              LEARN ABOUT OUR ORG
            </button>
          </div>

        </div>
      </section>

      {/* 7. FOUNDER MESSAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="founder-msg-sec">
        <div className="glassmorphism rounded-3xl overflow-hidden border-white/5 grid grid-cols-1 lg:grid-cols-5 relative">
          
          <div className="lg:col-span-2 relative aspect-[4/3] lg:aspect-auto">
            <img 
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=800&q=80" 
              alt="Raj Vardhan" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-cyber-dark via-transparent to-transparent"></div>
            
            {/* Tag overlay */}
            <div className="absolute bottom-6 left-6 z-10 space-y-1">
              <h4 className="font-display font-black text-white text-lg tracking-tight uppercase leading-none">Raj Vardhan</h4>
              <span className="block font-mono text-[9px] text-apex-orange tracking-widest uppercase font-bold leading-none">FOUNDER & CEO</span>
            </div>
          </div>

          <div className="lg:col-span-3 p-8 sm:p-12 md:p-16 flex flex-col justify-center space-y-6 relative">
            <Quote className="w-16 h-16 text-apex-orange/15 absolute top-8 right-8 pointer-events-none" />
            
            <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">FOUNDERS PROMISE</span>
            <h3 className="font-display font-black text-3xl text-white tracking-tight uppercase">
              "WE ARE NOT JUST A SQUAD. WE ARE AN EMPIRE IN TRANSITION."
            </h3>

            <div className="space-y-4 text-gray-300 text-xs sm:text-sm leading-relaxed font-sans">
              <p>
                When we launched Team Apex Gaming in early 2021, competitive gaming in India was at a massive structural fork. We saw immense local raw mechanical firepower, but lacking the bootcamp resources, mental coaches, and analytical backing necessary to secure medals overseas.
              </p>
              <p>
                We built this franchise to supply that bridge. The Apex Fortress houses state-of-the-art visual telemetry setups, physical trainers, and nutritional guidance. We guarantee our athletes are optimized mentally and physically. For our fan legion, we promises to produce world-class clothing and interactive tournaments. We are here to stay, and we are here to conquer.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-gray-500 font-mono">
              <div>
                <span className="block text-gray-400 font-bold">CO-FOUNDER</span>
                <span className="text-[11px] uppercase">Yashwardhan Mathur</span>
              </div>
              <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
              <div>
                <span className="block text-gray-400 font-bold">ESTABLISHED</span>
                <span className="text-[11px] uppercase">January 15, 2021</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. MERCHANDISE SPOTLIGHT PROMOTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="merch-prom-sec">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">APEX GEAR LAB</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase mt-1">
              OFFICIAL TEAM APEX ARMOR
            </h2>
          </div>
          <button 
            onClick={() => onNavigate('store')}
            className="group flex items-center gap-1 text-sm font-display font-black text-apex-orange hover:text-white transition-colors"
          >
            <span>ENTER MERCH STORE</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="merch-prom-grid">
          {featuredProducts.map((p) => (
            <div 
              key={p.id}
              onClick={() => onNavigate('store')}
              className="glassmorphism rounded overflow-hidden flex flex-col group cursor-pointer border-white/5 hover:border-apex-orange/30 transition-all duration-300 relative"
            >
              <div className="aspect-[4/5] bg-cyber-dark overflow-hidden relative">
                <img 
                  src={p.image} 
                  alt={p.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Sale label */}
                {p.originalPrice && (
                  <span className="absolute top-4 left-4 bg-apex-orange text-white text-[9px] font-black px-2 py-1 uppercase tracking-widest rounded">
                    PRO GEAR
                  </span>
                )}
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-gray-500 uppercase">{p.category}</span>
                  <h3 className="font-display font-black text-base text-white group-hover:text-apex-orange transition-colors uppercase tracking-tight">
                    {p.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2 font-mono">
                    <span className="text-white font-bold text-sm">₹{p.price}</span>
                    {p.originalPrice && (
                      <span className="text-gray-500 line-through text-xs">₹{p.originalPrice}</span>
                    )}
                  </div>
                  
                  <span className="font-mono text-[10px] text-apex-orange group-hover:underline flex items-center gap-1">
                    BUY ARMOR <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. SPONSORS GRID WALL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-white/5" id="sponsors-home-sec">
        <div className="text-center space-y-2 mb-12">
          <span className="font-mono text-[10px] text-gray-500 tracking-[0.3em] uppercase">POWERED BY GLOBAL ALLIANCES</span>
          <h3 className="font-display font-black text-xl text-white tracking-wider uppercase">EXCLUSIVE PARTNERS</h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {sponsors.map((s) => (
            <div 
              key={s.id}
              onClick={() => onNavigate('sponsors')}
              className="glassmorphism p-6 rounded flex flex-col items-center justify-center text-center group cursor-pointer border-white/5 hover:border-apex-orange/30 transition-all duration-300"
            >
              <img 
                src={s.logo} 
                alt={s.name} 
                className="w-14 h-14 rounded-full object-cover mb-4 border border-white/10 group-hover:border-apex-orange/50 transition-colors"
                referrerPolicy="no-referrer"
              />
              <h4 className="font-display font-black text-xs text-white uppercase tracking-wider group-hover:text-apex-orange transition-colors leading-none">
                {s.name}
              </h4>
              <span className="font-mono text-[9px] text-gray-500 tracking-wider mt-1.5 uppercase leading-none">
                {s.category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 10. SOCIAL MEDIA CORNER / SHARE EMBED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10" id="socials-corner-sec">
        <div className="glassmorphism rounded-2xl p-8 sm:p-12 border-white/5 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-apex-orange/5 rounded-full blur-[90px] pointer-events-none"></div>

          <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">APEX LEGION UNIT</span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase max-w-xl mx-auto">
            REPRESENT THE APEX EMBLEM WORLDWIDE
          </h2>
          <p className="max-w-xl mx-auto text-gray-400 text-xs sm:text-sm leading-relaxed">
            Invite your squad to follow our matches. Share the Team Apex Gaming platform link across WhatsApp, Discord, or Twitter!
          </p>

          <div className="flex justify-center pt-2">
            <button
              onClick={handleShare}
              className="px-6 py-3 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white font-display font-black text-xs tracking-wider transition-all flex items-center gap-2"
              id="share-platform-btn"
            >
              <Share2 className="w-4 h-4 text-apex-orange" />
              <span>{copiedLink ? 'LINK COPIED TO CLIPBOARD!' : 'SHARE TEAM APEX PLATFORM'}</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
