/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, 
  Send, 
  Sparkles, 
  Check, 
  MapPin, 
  Calendar, 
  Clock, 
  Search, 
  ChevronRight, 
  Award,
  BookOpen,
  Briefcase,
  Settings
} from 'lucide-react';
import { RecruitmentApplication, GameCategory, AdminRole } from '../types';

interface RecruitmentViewProps {
  applications: RecruitmentApplication[];
  setApplications: React.Dispatch<React.SetStateAction<RecruitmentApplication[]>>;
  currentRole: AdminRole | 'Fan';
  onOpenAdmin: () => void;
}

interface OpenRole {
  title: string;
  category: 'Competitive' | 'Operations' | 'Creative';
  requirements: string[];
  description: string;
}

export default function RecruitmentView({
  applications,
  setApplications,
  currentRole,
  onOpenAdmin
}: RecruitmentViewProps) {
  const [selectedRole, setSelectedRole] = useState<string>('VALORANT PRO PLAYER');
  const [applicantName, setApplicantName] = useState('');
  const [applicantAge, setApplicantAge] = useState('');
  const [applicantGame, setApplicantGame] = useState<GameCategory>('VALORANT');
  const [applicantDiscord, setApplicantDiscord] = useState('');
  const [applicantAchievements, setApplicantAchievements] = useState('');
  const [applicantPortfolio, setApplicantPortfolio] = useState('');
  const [applicantCoverLetter, setApplicantCoverLetter] = useState('');

  const [trackedApplication, setTrackedApplication] = useState<RecruitmentApplication | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  const openRoles: OpenRole[] = [
    {
      title: 'VALORANT PRO PLAYER',
      category: 'Competitive',
      requirements: ['Radiant peak rank in current act', 'Previous LAN or tier-2 cup appearances', 'Willingness to relocate to Pune Bootcamp'],
      description: 'Join our primary Valorant division competing in regional Challenger cups. Salary and medical packages included.'
    },
    {
      title: 'BGMI SQUAD LEADER (IGL)',
      category: 'Competitive',
      requirements: ['Proven tier-1 leadership profile', 'Calm comms under intensive zones', 'Expert scrim review habits'],
      description: 'Direct our battlegrounds division in rotation setups and macro zone strategies.'
    },
    {
      title: 'ESPORTS GRAPHIC DESIGNER',
      category: 'Creative',
      requirements: ['Expert in Photoshop / Blender', 'Deep familiarity with cyberpunk / grid graphics styles', 'Fast turnaround for match posters'],
      description: 'Develop premium game day posters, rosters announcements templates, and merchandise promotional graphics.'
    },
    {
      title: 'SQUAD ANALYST & OBSERVER',
      category: 'Operations',
      requirements: ['Strong understanding of recoil curves and heat-maps', 'Ability to compile spreadsheets after scrim logs', 'Excellent coaching communication'],
      description: 'Review match telemetry and observer feeds to formulate counter-tactical playbooks for upcoming tournaments.'
    }
  ];

  const handleApplyFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newApp: RecruitmentApplication = {
      id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
      name: applicantName,
      age: parseInt(applicantAge) || 18,
      game: applicantGame,
      roleApplied: selectedRole,
      achievementsLink: applicantAchievements,
      portfolioLink: applicantPortfolio,
      discordId: applicantDiscord,
      status: 'Applied',
      submittedAt: new Date().toLocaleDateString(),
      introduction: applicantCoverLetter,
      createdAt: new Date().toISOString()
    };

    const updated = [newApp, ...applications];
    setApplications(updated);
    localStorage.setItem('teamapex_applications', JSON.stringify(updated));

    // Save for status tracking
    setTrackedApplication(newApp);
    setSuccessMsg(true);

    // Reset forms
    setApplicantName('');
    setApplicantAge('');
    setApplicantDiscord('');
    setApplicantAchievements('');
    setApplicantPortfolio('');
    setApplicantCoverLetter('');
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-28" id="recruitment-view">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">THE DRAFT STATION</span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mt-1">
            RECRUITMENT & SCOUTING
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mt-1">
            Think you have what it takes to join the Apex family? Review our open roles or draft an open-spec application below.
          </p>
        </div>

        {/* Admin Shortcut */}
        {currentRole !== 'Fan' && (
          <button 
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-4 py-2 bg-apex-orange/10 border border-apex-orange/30 text-apex-orange hover:bg-apex-orange hover:text-white transition-all text-xs font-mono rounded"
          >
            <Settings className="w-4 h-4" />
            <span>SCOUT APPLICATIONS LOGS</span>
          </button>
        )}
      </div>

      {/* Grid split: Open Positions & Status Tracker vs Form */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Side: Roles catalog & Active status tracker */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Roles Catalog */}
          <div className="glassmorphism p-6 rounded-2xl border-white/5 space-y-4">
            <h3 className="font-display font-black text-sm text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-3">
              <Briefcase className="w-4.5 h-4.5 text-apex-orange" />
              <span>ACTIVE OPENINGS</span>
            </h3>

            <div className="space-y-3">
              {openRoles.map((role) => (
                <div 
                  key={role.title}
                  onClick={() => {
                    setSelectedRole(role.title);
                    if (role.title.includes('VALORANT')) setApplicantGame('VALORANT');
                    if (role.title.includes('BGMI')) setApplicantGame('BGMI');
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                    selectedRole === role.title
                      ? 'bg-apex-orange/10 border-apex-orange/40 shadow-lg shadow-apex-orange/5'
                      : 'bg-cyber-card border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-display font-bold text-xs text-white uppercase">{role.title}</h4>
                    <span className="font-mono text-[8px] text-gray-500 uppercase">{role.category}</span>
                  </div>

                  <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-2">
                    {role.description}
                  </p>

                  {/* Requirements List tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {role.requirements.slice(0, 2).map((req, idx) => (
                      <span key={idx} className="bg-white/5 border border-white/10 text-[8px] font-mono text-gray-400 px-1.5 py-0.5 rounded uppercase">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submitted application Tracking dashboard */}
          {trackedApplication && (
            <div className="glassmorphism p-6 rounded-2xl border-emerald-500/20 bg-emerald-500/5 space-y-6" id="applicant-tracking-dashboard">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <Check className="w-4.5 h-4.5 text-emerald-400" />
                <h3 className="font-display font-black text-sm text-white uppercase tracking-wider">
                  FILE STATUS MONITOR
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">APPLICANT REFERENCE:</span>
                    <span className="text-white font-bold">{trackedApplication.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ROLE SUBMISSION:</span>
                    <span className="text-apex-orange text-glow font-bold uppercase">{trackedApplication.roleApplied}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">LATEST RECRUITMENT DECISION:</span>
                    <span className="text-white font-bold uppercase">{trackedApplication.status}</span>
                  </div>
                </div>

                {/* Status bar tracker steps */}
                <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[9px] relative pt-2">
                  {[
                    { label: 'APPLIED', isDone: true },
                    { label: 'SCREENING', isDone: false },
                    { label: 'TRIAL', isDone: false },
                    { label: 'DECISION', isDone: false }
                  ].map((st, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mx-auto ${
                        st.isDone ? 'bg-apex-orange border-apex-orange text-white' : 'bg-cyber-dark border-white/10 text-gray-500'
                      }`}>
                        {idx + 1}
                      </div>
                      <span className={`block font-bold ${st.isDone ? 'text-apex-orange' : 'text-gray-500'}`}>{st.label}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Right Side: Apply Form */}
        <div className="lg:col-span-3">
          <div className="glassmorphism p-6 sm:p-8 rounded-2xl border-white/5 space-y-6">
            <h3 className="font-display font-black text-lg text-white uppercase tracking-tight flex items-center gap-2 border-b border-white/5 pb-3">
              <Award className="w-5 h-5 text-apex-orange" />
              <span>APPLICATION DRAFT SHEETS</span>
            </h3>

            {successMsg && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-xs flex items-center gap-2 animate-pulse">
                <Check className="w-5 h-5" />
                <div>
                  <span className="font-bold uppercase block">Draft Sheets Broadcast Successful!</span>
                  <span>Our scouting managers have registered your reference application. Check status dashboard on the left sidebar.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleApplyFormSubmit} className="space-y-4 text-xs sm:text-sm">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="EX: NAMAN MATHUR"
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/70 w-full font-mono uppercase"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">Discord ID COORDINATE</label>
                  <input
                    type="text"
                    required
                    value={applicantDiscord}
                    onChange={(e) => setApplicantDiscord(e.target.value)}
                    placeholder="EX: ApexMortal#1234"
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/70 w-full font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                <div className="space-y-1">
                  <label className="block text-[9px] text-gray-500 tracking-wider uppercase">Age</label>
                  <input
                    type="number"
                    required
                    value={applicantAge}
                    onChange={(e) => setApplicantAge(e.target.value)}
                    placeholder="EX: 19"
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/70 w-full"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-[9px] text-gray-500 tracking-wider uppercase">Game Division</label>
                  <select
                    value={applicantGame}
                    onChange={(e) => setApplicantGame(e.target.value as any)}
                    className="bg-cyber-card border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-apex-orange/70 w-full font-mono uppercase"
                  >
                    <option value="VALORANT">VALORANT</option>
                    <option value="BGMI">BGMI (BATTLEGROUNDS MOBILE INDIA)</option>
                    <option value="FREE FIRE MAX">FREE FIRE MAX</option>
                    <option value="APEX LEGENDS">APEX LEGENDS</option>
                    <option value="CS2">COUNTER STRIKE 2</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">Achievements and Placement Links</label>
                <input
                  type="url"
                  required
                  value={applicantAchievements}
                  onChange={(e) => setApplicantAchievements(e.target.value)}
                  placeholder="EX: Liquidpedia, VLR.gg profile or YouTube highlight URL"
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/70 w-full font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">Portfolio / Highlight Reels link (Optional)</label>
                <input
                  type="url"
                  value={applicantPortfolio}
                  onChange={(e) => setApplicantPortfolio(e.target.value)}
                  placeholder="EX: Behance, Artstation or Drive showcase"
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/70 w-full font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">Biography Introduction / Cover Letter</label>
                <textarea
                  rows={4}
                  required
                  value={applicantCoverLetter}
                  onChange={(e) => setApplicantCoverLetter(e.target.value)}
                  placeholder="Tell us about your competitive credentials, training loops, and why you fit Team Apex Gaming..."
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/70 w-full font-mono"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-apex-orange hover:bg-apex-orange/95 text-white font-display font-black tracking-wider text-xs border-glow flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>SUBMIT DRAFT CONTRACT APPLICATION</span>
              </button>

            </form>

          </div>
        </div>

      </div>

    </div>
  );
}
