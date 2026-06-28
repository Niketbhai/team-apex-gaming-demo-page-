/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  Award, 
  ShoppingBag, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Upload, 
  Sparkles,
  RefreshCw,
  FolderOpen,
  Send,
  Eye,
  TrendingUp,
  Package,
  Layers,
  Settings
} from 'lucide-react';
import { 
  Player, 
  Tournament, 
  Match, 
  NewsArticle, 
  MediaItem, 
  Product, 
  Sponsor, 
  RecruitmentApplication, 
  Order, 
  AdminRole, 
  GameCategory, 
  NewsCategory, 
  ProductCategory 
} from '../types';

interface AdminDashboardViewProps {
  currentRole: AdminRole;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  tournaments: Tournament[];
  setTournaments: React.Dispatch<React.SetStateAction<Tournament[]>>;
  matches: Match[];
  setMatches: React.Dispatch<React.SetStateAction<Match[]>>;
  news: NewsArticle[];
  setNews: React.Dispatch<React.SetStateAction<NewsArticle[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  applications: RecruitmentApplication[];
  setApplications: React.Dispatch<React.SetStateAction<RecruitmentApplication[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export default function AdminDashboardView({
  currentRole,
  players,
  setPlayers,
  tournaments,
  setTournaments,
  matches,
  setMatches,
  news,
  setNews,
  products,
  setProducts,
  applications,
  setApplications,
  orders,
  setOrders
}: AdminDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'Rosters' | 'News' | 'Recruit' | 'Orders' | 'CMS'>('Rosters');

  // ------------------ PLAYER STATE & FORMS ------------------
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);
  const [pIgn, setPIgn] = useState('');
  const [pRealName, setPRealName] = useState('');
  const [pCountry, setPCountry] = useState('India');
  const [pRole, setPRole] = useState('');
  const [pGame, setPGame] = useState<GameCategory>('VALORANT');
  const [pPhoto, setPPhoto] = useState('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&h=300&q=80');
  const [pBanner, setPBanner] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&h=300&q=80');

  const handleAddPlayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlayer: Player = {
      id: `PLY-${Math.floor(100 + Math.random() * 900)}`,
      ign: pIgn,
      realName: pRealName,
      country: pCountry,
      role: pRole,
      game: pGame,
      photo: pPhoto,
      banner: pBanner,
      joinDate: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short' }),
      statistics: { kdRatio: 1.25, matchesPlayed: 140, winRate: '60%' },
      achievements: ['Representing Apex Division'],
      socials: { twitter: 'https://twitter.com' }
    };

    const updated = [newPlayer, ...players];
    setPlayers(updated);
    localStorage.setItem('teamapex_players', JSON.stringify(updated));

    // Reset Form
    setPIgn('');
    setPRealName('');
    setPRole('');
    setIsAddingPlayer(false);
  };

  const handleDeletePlayer = (id: string) => {
    const updated = players.filter(p => p.id !== id);
    setPlayers(updated);
    localStorage.setItem('teamapex_players', JSON.stringify(updated));
  };

  // ------------------ ARTICLE DRAFT STATE & FORMS ------------------
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [artTitle, setArtTitle] = useState('');
  const [artCategory, setArtCategory] = useState<NewsCategory>('Team News');
  const [artSummary, setArtSummary] = useState('');
  const [artContent, setArtContent] = useState('');
  const [artImage, setArtImage] = useState('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&h=350&q=80');

  const handleAddArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newArticle: NewsArticle = {
      id: `ART-${Math.floor(100 + Math.random() * 900)}`,
      title: artTitle,
      category: artCategory,
      summary: artSummary,
      content: artContent,
      image: artImage,
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      author: 'Apex Operations',
      authorRole: currentRole,
      isDraft: false
    };

    const updated = [newArticle, ...news];
    setNews(updated);
    localStorage.setItem('teamapex_news', JSON.stringify(updated));

    // Reset Form
    setArtTitle('');
    setArtSummary('');
    setArtContent('');
    setIsAddingArticle(false);
  };

  const handleDeleteArticle = (id: string) => {
    const updated = news.filter(n => n.id !== id);
    setNews(updated);
    localStorage.setItem('teamapex_news', JSON.stringify(updated));
  };

  // ------------------ RECRUIT DECISIONS ------------------
  const handleUpdateAppStatus = (id: string, nextStatus: 'Applied' | 'Screening' | 'Trial' | 'Decision') => {
    const updated = applications.map(app => 
      app.id === id ? { ...app, status: nextStatus } : app
    );
    setApplications(updated);
    localStorage.setItem('teamapex_applications', JSON.stringify(updated));
  };

  const handleDeleteApp = (id: string) => {
    const updated = applications.filter(app => app.id !== id);
    setApplications(updated);
    localStorage.setItem('teamapex_applications', JSON.stringify(updated));
  };

  // ------------------ ORDERS SHIPMENT TRACKING ------------------
  const handleUpdateOrderStatus = (id: string, status: 'Placed' | 'Processing' | 'Shipped' | 'Delivered') => {
    const updated = orders.map(ord => 
      ord.id === id ? { ...ord, orderStatus: status } : ord
    );
    setOrders(updated);
    localStorage.setItem('teamapex_orders', JSON.stringify(updated));
  };

  // ------------------ CMS SECTION CONFIGURATION (DRAG & DROP CMS SIMULATOR) ------------------
  const [cmsSections, setCmsSections] = useState([
    { id: '1', name: 'Latest Scrim Standings', visible: true, rank: 1 },
    { id: '2', name: 'Live Video Broadcasts', visible: true, rank: 2 },
    { id: '3', name: 'Product Spotlights', visible: true, rank: 3 },
    { id: '4', name: 'Sponsorship Carousel', visible: true, rank: 4 }
  ]);

  const handleToggleCMSSection = (id: string) => {
    setCmsSections(cmsSections.map(s => 
      s.id === id ? { ...s, visible: !s.visible } : s
    ));
  };

  const handleRankCMSSection = (idx: number, delta: number) => {
    const updated = [...cmsSections];
    const targetIdx = idx + delta;
    if (targetIdx < 0 || targetIdx >= updated.length) return;

    // Swap ranks
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    setCmsSections(updated);
  };

  // Safeguards Helper
  const hasAccess = (allowed: AdminRole[]) => {
    return allowed.includes(currentRole);
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-28" id="admin-dashboard-view">
      
      {/* Dashboard Top Banner */}
      <div className="glassmorphism p-6 sm:p-8 rounded-3xl border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden" id="admin-banner">
        <div className="absolute top-0 right-0 w-32 h-32 bg-apex-orange/10 rounded-full blur-[40px] pointer-events-none"></div>

        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-apex-orange/10 border border-apex-orange/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-8 h-8 text-apex-orange" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-bold">LEGION DIRECTIVE CENTRAL</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
              ADMIN CONTROL PANEL
            </h1>
            <p className="text-gray-400 text-xs mt-0.5">
              Current Simulated Credentials: <span className="text-white font-bold uppercase">{currentRole}</span>
            </p>
          </div>
        </div>

        {/* Short info */}
        <div className="text-center sm:text-right shrink-0">
          <span className="block font-mono text-[9px] text-gray-500 uppercase">OFFLINE SYNCHRONIZATION</span>
          <span className="block font-display font-bold text-xs text-emerald-400 mt-1 uppercase">LOCALSTORAGE SECURED</span>
        </div>
      </div>

      {/* Navigation Sub-menu */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-2 font-mono text-xs" id="admin-submenu">
        {[
          { id: 'Rosters', label: 'ROSTER SQUAD BUILDER', access: ['Super Admin', 'Manager', 'Coach'] },
          { id: 'News', label: 'NEWS & CMS EDITOR', access: ['Super Admin', 'Content Manager'] },
          { id: 'Recruit', label: 'SCOUT APPLICATIONS LOGS', access: ['Super Admin', 'Manager', 'Coach'] },
          { id: 'Orders', label: 'SHOP ORDERS MONITOR', access: ['Super Admin', 'Manager'] },
          { id: 'CMS', label: 'DRAG & DROP CMS SIMULATOR', access: ['Super Admin'] }
        ].map((tab) => {
          const permitted = hasAccess(tab.access as AdminRole[]);
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (permitted) setActiveTab(tab.id as any);
              }}
              disabled={!permitted}
              className={`px-4 py-2 rounded font-bold transition-all relative ${
                !permitted 
                  ? 'opacity-30 cursor-not-allowed text-gray-600'
                  : activeTab === tab.id
                  ? 'bg-apex-orange text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{tab.label}</span>
              {!permitted && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[7px] px-1 py-0.5 rounded-full font-black">
                  LOCKED
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ------------------ TAB 1: ROSTER SQUAD BUILDER ------------------ */}
      {activeTab === 'Rosters' && (
        <div className="space-y-6" id="admin-roster-tab">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h2 className="font-display font-black text-lg text-white uppercase tracking-tight">
              ROSTER RECONSTRUCTION
            </h2>
            <button
              onClick={() => setIsAddingPlayer(!isAddingPlayer)}
              className="flex items-center gap-1 px-3 py-1.5 bg-apex-orange text-white font-display font-bold text-[10px] uppercase rounded"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>DRAFT PLAYER</span>
            </button>
          </div>

          {/* Add player form overlay inline */}
          {isAddingPlayer && (
            <form onSubmit={handleAddPlayerSubmit} className="glassmorphism p-6 rounded-2xl border-white/10 space-y-4 max-w-xl text-xs">
              <h3 className="font-display font-black text-white text-sm uppercase border-b border-white/5 pb-2">
                DRAFT ATHLETE PROFILE SHEETS
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-gray-500 font-mono">PLAYER IGN (IN-GAME NAME)</label>
                  <input
                    type="text"
                    required
                    value={pIgn}
                    onChange={(e) => setPIgn(e.target.value)}
                    placeholder="EX: MORTAL"
                    className="bg-cyber-card border border-white/10 rounded px-2.5 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/80 w-full uppercase font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-gray-500 font-mono">REAL NAME</label>
                  <input
                    type="text"
                    required
                    value={pRealName}
                    onChange={(e) => setPRealName(e.target.value)}
                    placeholder="EX: NAMAN MATHUR"
                    className="bg-cyber-card border border-white/10 rounded px-2.5 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/80 w-full uppercase font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono">
                <div className="space-y-1">
                  <label className="block text-gray-500">DIVISION DISCIPLINE</label>
                  <select
                    value={pGame}
                    onChange={(e) => setPGame(e.target.value as any)}
                    className="bg-cyber-card border border-white/10 rounded px-2.5 py-2 text-white focus:outline-none focus:border-apex-orange/80 w-full uppercase"
                  >
                    <option value="VALORANT">VALORANT</option>
                    <option value="BGMI">BGMI (BATTLEGROUNDS INDIA)</option>
                    <option value="FREE FIRE MAX">FREE FIRE MAX</option>
                    <option value="APEX LEGENDS">APEX LEGENDS</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-gray-500">TACTICAL ROLE</label>
                  <input
                    type="text"
                    required
                    value={pRole}
                    onChange={(e) => setPRole(e.target.value)}
                    placeholder="EX: DUALIST / ENTRY SQUAD"
                    className="bg-cyber-card border border-white/10 rounded px-2.5 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/80 w-full uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="submit"
                  className="py-2.5 rounded bg-apex-orange text-white font-display font-bold uppercase text-[10px]"
                >
                  SAVE DRAFT CONTRACT
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingPlayer(false)}
                  className="py-2.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 font-display font-bold uppercase text-[10px]"
                >
                  DISCARD
                </button>
              </div>
            </form>
          )}

          {/* Player roster list tables */}
          <div className="glassmorphism rounded-2xl border-white/5 overflow-hidden">
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="border-b border-white/10 text-gray-500 font-mono">
                  <th className="py-3 px-4 uppercase text-[9px]">Athlete</th>
                  <th className="py-3 px-4 uppercase text-[9px]">Game Division</th>
                  <th className="py-3 px-4 uppercase text-[9px]">Squad Role</th>
                  <th className="py-3 px-4 uppercase text-[9px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {players.map((p) => (
                  <tr key={p.id}>
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <img src={p.photo} alt={p.ign} className="w-9 h-9 rounded object-cover border border-white/10" referrerPolicy="no-referrer" />
                      <div>
                        <span className="block font-display font-black text-sm text-white uppercase tracking-wide leading-none">{p.ign}</span>
                        <span className="block text-[10px] text-gray-500 pt-0.5">{p.realName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono uppercase text-apex-orange font-bold">{p.game}</td>
                    <td className="py-3.5 px-4 font-display text-[10px] uppercase text-gray-400">{p.role}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDeletePlayer(p.id)}
                        className="p-1.5 rounded hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors"
                        title="Revoke active contract"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ------------------ TAB 2: NEWS & CMS EDITOR ------------------ */}
      {activeTab === 'News' && (
        <div className="space-y-6" id="admin-news-tab">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h2 className="font-display font-black text-lg text-white uppercase tracking-tight">
              HQ JOURNAL WRITER
            </h2>
            <button
              onClick={() => setIsAddingArticle(!isAddingArticle)}
              className="flex items-center gap-1 px-3 py-1.5 bg-apex-orange text-white font-display font-bold text-[10px] uppercase rounded"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>COMPOSE ARTICLE</span>
            </button>
          </div>

          {/* Add Article Form */}
          {isAddingArticle && (
            <form onSubmit={handleAddArticleSubmit} className="glassmorphism p-6 rounded-2xl border-white/10 space-y-4 max-w-2xl text-xs">
              <h3 className="font-display font-black text-white text-sm uppercase border-b border-white/5 pb-2">
                WRITE NEW JOURNAL SHEET
              </h3>

              <div className="space-y-1">
                <label className="block text-gray-500 font-mono">ARTICLE TITLE</label>
                <input
                  type="text"
                  required
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                  placeholder="EX: APEX DIVISION DOMINATES VALORANT REGIONAL CUP GRANDS"
                  className="bg-cyber-card border border-white/10 rounded px-2.5 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/80 w-full uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-gray-500 font-mono">FEED CATEGORY</label>
                  <select
                    value={artCategory}
                    onChange={(e) => setArtCategory(e.target.value as any)}
                    className="bg-cyber-card border border-white/10 rounded px-2.5 py-2 text-white focus:outline-none focus:border-apex-orange/80 w-full uppercase font-mono"
                  >
                    <option value="Team News">Team News</option>
                    <option value="Tournament News">Tournament News</option>
                    <option value="Transfer News">Transfer News</option>
                    <option value="Announcement">Announcement</option>
                    <option value="Community Update">Community Update</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-gray-500 font-mono">THUMBNAIL PHOTO LINK</label>
                  <input
                    type="url"
                    required
                    value={artImage}
                    onChange={(e) => setArtImage(e.target.value)}
                    className="bg-cyber-card border border-white/10 rounded px-2.5 py-2 text-white focus:outline-none focus:border-apex-orange/80 w-full font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-gray-500 font-mono">SUMMARY PREVIEW</label>
                <input
                  type="text"
                  required
                  value={artSummary}
                  onChange={(e) => setArtSummary(e.target.value)}
                  placeholder="Enter a brief 1-sentence synopsis to overlay card grids..."
                  className="bg-cyber-card border border-white/10 rounded px-2.5 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/80 w-full"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-gray-500 font-mono">COMPLETE CONTENT</label>
                <textarea
                  rows={5}
                  required
                  value={artContent}
                  onChange={(e) => setArtContent(e.target.value)}
                  placeholder="Write the detailed blog coverage or team memo here..."
                  className="bg-cyber-card border border-white/10 rounded px-2.5 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/80 w-full"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="submit"
                  className="py-2.5 rounded bg-apex-orange text-white font-display font-bold uppercase text-[10px]"
                >
                  BROADCAST JOURNAL PUBLISH
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingArticle(false)}
                  className="py-2.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 font-display font-bold uppercase text-[10px]"
                >
                  DISCARD DRAFT
                </button>
              </div>
            </form>
          )}

          {/* Articles list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.map((n) => (
              <div key={n.id} className="glassmorphism p-5 rounded-2xl border-white/5 flex gap-4 items-start justify-between">
                <div className="flex gap-3">
                  <img src={n.image} alt={n.title} className="w-14 h-14 rounded object-cover border border-white/10 shrink-0" referrerPolicy="no-referrer" />
                  <div className="space-y-1">
                    <span className="bg-apex-orange/15 text-apex-orange border border-apex-orange/20 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded uppercase">
                      {n.category}
                    </span>
                    <h4 className="font-display font-bold text-xs text-white uppercase line-clamp-1">{n.title}</h4>
                    <span className="block font-mono text-[9px] text-gray-500">WRITTEN BY: {n.author} ON {n.date}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteArticle(n.id)}
                  className="p-1.5 rounded hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------ TAB 3: SCOUT APPLICATIONS LOGS ------------------ */}
      {activeTab === 'Recruit' && (
        <div className="space-y-6" id="admin-recruit-tab">
          <div className="border-b border-white/5 pb-3">
            <h2 className="font-display font-black text-lg text-white uppercase tracking-tight">
              SCOUTING CANDIDATE LOGS
            </h2>
          </div>

          <div className="space-y-4">
            {applications.length === 0 ? (
              <div className="py-12 text-center text-gray-500 text-xs">
                No active candidate sheets logged currently.
              </div>
            ) : (
              applications.map((app) => (
                <div key={app.id} className="glassmorphism p-6 rounded-2xl border-white/5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-3">
                    <div>
                      <span className="bg-apex-orange/10 text-apex-orange border border-apex-orange/20 text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold">
                        {app.roleApplied}
                      </span>
                      <h4 className="font-display font-black text-base text-white uppercase tracking-wide pt-1">
                        {app.name} (AGE {app.age})
                      </h4>
                      <span className="block font-mono text-[10px] text-gray-500 mt-0.5">DISCORD COORDINATES: {app.discordId} • DATE SUBMITTED: {app.submittedAt}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-gray-500 uppercase">UPDATE SCOUT DISPOSITION:</span>
                      <select
                        value={app.status}
                        onChange={(e) => handleUpdateAppStatus(app.id, e.target.value as any)}
                        className="bg-cyber-card border border-white/10 rounded px-2 py-1 text-[10px] text-white focus:outline-none focus:border-apex-orange/80 uppercase font-mono"
                      >
                        <option value="Applied">Applied</option>
                        <option value="Screening">Screening</option>
                        <option value="Trial">Trial Scheduled</option>
                        <option value="Decision">Final Decision</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-gray-300">
                    <p className="font-sans leading-relaxed">
                      <strong>Applicant Motivation Cover Letter:</strong><br />
                      "{app.introduction}"
                    </p>
                    <div className="flex flex-wrap gap-4 font-mono text-[10px] pt-1">
                      {app.achievementsLink && (
                        <a href={app.achievementsLink} target="_blank" rel="noopener noreferrer" className="text-apex-orange hover:underline">
                          🔗 LIQUIDPEDIA / ACHIEVEMENTS SHEETS
                        </a>
                      )}
                      {app.portfolioLink && (
                        <a href={app.portfolioLink} target="_blank" rel="noopener noreferrer" className="text-apex-orange hover:underline">
                          🔗 WORK PORTFOLIO CLIPS
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ------------------ TAB 4: SHOP ORDERS MONITOR ------------------ */}
      {activeTab === 'Orders' && (
        <div className="space-y-6" id="admin-orders-tab">
          <div className="border-b border-white/5 pb-3">
            <h2 className="font-display font-black text-lg text-white uppercase tracking-tight">
              GEAR LOGS & INVENTORY MONITOR
            </h2>
          </div>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="py-12 text-center text-gray-500 text-xs">
                No store purchases or orders recorded yet. Place an order in the Merchandise tab to see it sync here!
              </div>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="glassmorphism p-6 rounded-2xl border-white/5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-3">
                    <div>
                      <h4 className="font-display font-black text-base text-white uppercase tracking-wide">
                        ORDER {ord.id}
                      </h4>
                      <span className="block font-mono text-[10px] text-gray-500 mt-0.5">CUSTOMER: {ord.customerDetails.name} ({ord.customerDetails.email}) • DATE PLACED: {new Date(ord.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-gray-500 uppercase">UPDATE SHIPMENT STATE:</span>
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any)}
                        className="bg-cyber-card border border-white/10 rounded px-2 py-1 text-[10px] text-white focus:outline-none focus:border-apex-orange/80 uppercase font-mono"
                      >
                        <option value="Placed">Placed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  {/* Order particulars details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-300">
                    <div className="space-y-1 font-mono">
                      <strong className="block text-gray-500 text-[10px] uppercase">DELIVERY ADDRESS</strong>
                      <span>{ord.customerDetails.address}, {ord.customerDetails.city} - {ord.customerDetails.pincode}</span>
                      <span className="block">PHONE: {ord.customerDetails.phone}</span>
                    </div>

                    <div className="space-y-1 font-mono">
                      <strong className="block text-gray-500 text-[10px] uppercase">PURCHASE ITEMS LIST</strong>
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{item.product.name} (QTY {item.quantity}) - Size {item.selectedSize || 'N/A'}</span>
                          <span className="text-white font-bold">₹{item.product.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="flex justify-between border-t border-white/5 pt-1 text-white font-bold text-sm">
                        <span>NET TOTAL INVOICED</span>
                        <span className="text-apex-orange">₹{ord.total}</span>
                      </div>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ------------------ TAB 5: DRAG & DROP CMS SIMULATOR ------------------ */}
      {activeTab === 'CMS' && (
        <div className="space-y-6" id="admin-cms-tab">
          <div className="border-b border-white/5 pb-3">
            <h2 className="font-display font-black text-lg text-white uppercase tracking-tight">
              DRAG & DROP CMS SECTIONS CONFIGURATION
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              Toggle sections visibility or adjust ranking weights. Changes synchronize live to the public dashboard modules.
            </p>
          </div>

          <div className="space-y-4">
            {cmsSections.map((sec, idx) => (
              <div 
                key={sec.id}
                className="glassmorphism p-5 rounded-2xl border-white/5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  
                  {/* Sorting Rank Buttons */}
                  <div className="flex flex-col gap-1 shrink-0 font-mono text-[9px] text-gray-500">
                    <button 
                      type="button"
                      onClick={() => handleRankCMSSection(idx, -1)}
                      className="px-2 py-1 bg-white/5 rounded text-white hover:bg-apex-orange transition-colors"
                      disabled={idx === 0}
                    >
                      ▲
                    </button>
                    <span className="text-center font-bold">POS {idx + 1}</span>
                    <button 
                      type="button"
                      onClick={() => handleRankCMSSection(idx, 1)}
                      className="px-2 py-1 bg-white/5 rounded text-white hover:bg-apex-orange transition-colors"
                      disabled={idx === cmsSections.length - 1}
                    >
                      ▼
                    </button>
                  </div>

                  <div>
                    <h4 className="font-display font-black text-base text-white uppercase tracking-wide">
                      {sec.name}
                    </h4>
                    <span className="block font-mono text-[9px] text-gray-500 uppercase mt-0.5">SECTION RANKING INTENSITY: {idx + 1}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                    sec.visible ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {sec.visible ? 'ACTIVE' : 'MUTED'}
                  </span>
                  
                  <button
                    onClick={() => handleToggleCMSSection(sec.id)}
                    className={`px-3 py-1.5 rounded font-mono text-[10px] font-bold uppercase transition-colors ${
                      sec.visible
                        ? 'bg-red-500/15 text-red-400 hover:bg-red-500/20 border border-red-500/20'
                        : 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
                    }`}
                  >
                    {sec.visible ? 'MUTED VISIBILITY' : 'ACTIVATE DISPLAY'}
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
