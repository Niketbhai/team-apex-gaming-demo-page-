/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Trophy, 
  Users, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Award, 
  Sparkles, 
  Target, 
  BookOpen 
} from 'lucide-react';
import { INITIAL_STORY } from '../mockData';

interface StaffMember {
  name: string;
  role: 'Founder' | 'Co-Founder' | 'Team Manager' | 'Coach' | 'Analyst';
  photo: string;
  bio: string;
  socials: { linkedin?: string; twitter?: string; instagram?: string };
}

export default function AboutView() {
  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);

  const staff: StaffMember[] = [
    {
      name: 'Raj "ApexKing" Vardhan',
      role: 'Founder',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=500&q=80',
      bio: 'Raj Vardhan is a gaming veteran and corporate technology venture investor with over a decade of experience across media rights, talent licensing, and tech bootcamps in South Asia. He oversees strategic partnerships and global funding models for Apex Gaming.',
      socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' }
    },
    {
      name: 'Yashwardhan Mathur',
      role: 'Co-Founder',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=500&q=80',
      bio: 'A former competitive gaming athlete with multiple national trophies under his belt, Yashwardhan manages operational camp bootcamps, roster transfers, game training utilities, and coach scouting programs.',
      socials: { twitter: 'https://twitter.com', instagram: 'https://instagram.com' }
    },
    {
      name: 'Rohan "Kratos" Singhal',
      role: 'Coach',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=500&q=80',
      bio: 'An elite strategist specializing in micro-coordination and tactical rotations. Rohan has coached tier-1 BGMI and Valorant rosters for over 5 years, boasting a 70%+ grand finals podium conversion rate.',
      socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' }
    },
    {
      name: 'Divya "Analytica" Nair',
      role: 'Analyst',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=500&q=80',
      bio: 'Divya oversees mathematical modeling and heat-map analyses of zone shifts and spray recoils. She converts raw telemetry data from competitive scrims into actionable roster playbooks.',
      socials: { linkedin: 'https://linkedin.com' }
    },
    {
      name: 'Karan "Vanguard" Saxena',
      role: 'Team Manager',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=500&q=80',
      bio: 'Karan handles daily schedules, tournament registrations, team transportation, bootcamps equipment upkeep, and psychological rehabilitation cycles for our professional athletes.',
      socials: { instagram: 'https://instagram.com' }
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy': return <Trophy className="w-8 h-8 text-apex-orange" />;
      case 'Users': return <Users className="w-8 h-8 text-apex-orange" />;
      case 'TrendingUp': return <TrendingUp className="w-8 h-8 text-apex-orange" />;
      case 'DollarSign': return <DollarSign className="w-8 h-8 text-apex-orange" />;
      default: return <Award className="w-8 h-8 text-apex-orange" />;
    }
  };

  return (
    <div className="space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-28" id="about-view">
      
      {/* Page Header */}
      <div className="text-center space-y-4" id="about-header">
        <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">WHO WE ARE</span>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
          OUR STORY & LEGACY
        </h1>
        <p className="max-w-2xl mx-auto text-gray-400 text-sm">
          A deep look into the historical rise of Team Apex Gaming. Engineered from raw passion into a modern electronic sports dynasty.
        </p>
      </div>

      {/* 1. ORGANIZATION STORY */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" id="story-block">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-apex-orange/10 border border-apex-orange/20 text-apex-orange text-xs font-mono font-bold uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ESTABLISHED {INITIAL_STORY.foundedDate}</span>
          </div>

          <h2 className="font-display font-black text-3xl text-white tracking-tight uppercase">
            CHAMPIONSHIP CULTURE, BUILT BY BELIEF
          </h2>

          <div className="space-y-4 text-gray-300 text-sm leading-relaxed font-sans">
            {INITIAL_STORY.storyContent.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Visual card showcasing bootcamps */}
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group" id="story-banner-card">
          <img 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&h=500&q=80" 
            alt="Apex Bootcamp"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/90 via-cyber-dark/40 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <div>
              <span className="block font-mono text-[9px] text-apex-orange tracking-widest font-bold">THE FORTRESS</span>
              <span className="block font-display font-black text-white text-base tracking-wider uppercase">PUNE HQ HYPER-BOOTCAMP</span>
            </div>
            <span className="text-[10px] font-mono text-gray-400">12,000 SQ FT</span>
          </div>
        </div>
      </section>

      {/* 2. VISION & MISSION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8" id="vision-mission-cards">
        
        {/* Vision */}
        <div className="glassmorphism p-8 rounded-2xl border-white/5 space-y-4 relative group hover:border-apex-orange/30 transition-all duration-300">
          <div className="bg-apex-orange/15 w-12 h-12 rounded-xl flex items-center justify-center border border-apex-orange/35">
            <Target className="w-6 h-6 text-apex-orange" />
          </div>
          <h3 className="font-display font-black text-xl text-white tracking-tight uppercase">OUR VISION</h3>
          <p className="text-gray-300 text-sm leading-relaxed font-sans">
            {INITIAL_STORY.vision}
          </p>
        </div>

        {/* Mission */}
        <div className="glassmorphism p-8 rounded-2xl border-white/5 space-y-4 relative group hover:border-apex-orange/30 transition-all duration-300">
          <div className="bg-apex-orange/15 w-12 h-12 rounded-xl flex items-center justify-center border border-apex-orange/35">
            <ShieldCheck className="w-6 h-6 text-apex-orange" />
          </div>
          <h3 className="font-display font-black text-xl text-white tracking-tight uppercase">OUR MISSION</h3>
          <p className="text-gray-300 text-sm leading-relaxed font-sans">
            {INITIAL_STORY.mission}
          </p>
        </div>

      </section>

      {/* 3. CORE ACHIEVEMENTS GRID */}
      <section className="space-y-10" id="achievements-section">
        <div className="border-b border-white/10 pb-4">
          <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">DOMINATING IN NUMBERS</span>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase mt-1">
            MAJOR ORGANIZATION MILESTONES
          </h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_STORY.achievements.map((ach, idx) => (
            <div key={idx} className="glassmorphism p-6 rounded-xl border-white/5 text-center space-y-3">
              <div className="flex justify-center">{getIcon(ach.icon)}</div>
              <div>
                <span className="block font-display font-black text-3xl text-white tracking-tight text-glow">{ach.count}</span>
                <span className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase mt-1">{ach.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE TIMELINE */}
      <section className="space-y-12" id="timeline-section">
        <div className="border-b border-white/10 pb-4">
          <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">THE RISE TO GLORY</span>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase mt-1">
            INTERACTIVE ANTHOLOGY
          </h3>
        </div>

        <div className="relative border-l-2 border-white/10 ml-4 md:ml-32 space-y-12" id="story-timeline">
          {INITIAL_STORY.timeline.map((tm, idx) => (
            <div key={idx} className="relative pl-8 group">
              
              {/* Year banner floating left on desktop */}
              <div className="hidden md:block absolute -left-32 top-1 font-display font-black text-2xl text-apex-orange text-glow">
                {tm.year}
              </div>

              {/* Bullet circle */}
              <div className="absolute -left-[9px] top-2.5 w-4 h-4 rounded-full bg-cyber-dark border-2 border-apex-orange group-hover:bg-apex-orange transition-colors duration-300"></div>

              {/* Body */}
              <div className="glassmorphism p-6 rounded-xl border-white/5 space-y-2 group-hover:border-apex-orange/20 transition-all duration-300">
                <span className="block md:hidden font-display font-black text-lg text-apex-orange text-glow mb-1">{tm.year}</span>
                <h4 className="font-display font-black text-base text-white uppercase tracking-wider">
                  {tm.event}
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {tm.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 5. MEET THE STAFF: FOUNDERS, COACHES & ANALYSTS */}
      <section className="space-y-12" id="leadership-section">
        <div className="border-b border-white/10 pb-4">
          <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">THE ARCHITECTS</span>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase mt-1">
            LEADERSHIP & OPERATIONS
          </h3>
        </div>

        {/* Founders Spotlight Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="founders-grid">
          {staff.filter(s => s.role === 'Founder' || s.role === 'Co-Founder').map((st, idx) => (
            <div key={idx} className="glassmorphism rounded-2xl overflow-hidden border-white/5 grid grid-cols-1 sm:grid-cols-5 hover:border-apex-orange/30 transition-all">
              <div className="sm:col-span-2 aspect-square sm:aspect-auto">
                <img 
                  src={st.photo} 
                  alt={st.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="sm:col-span-3 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="bg-apex-orange/10 text-apex-orange border border-apex-orange/20 text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold">
                    {st.role}
                  </span>
                  <h4 className="font-display font-black text-lg text-white uppercase tracking-tight leading-none pt-1">
                    {st.name}
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed font-sans line-clamp-4">
                    {st.bio}
                  </p>
                </div>

                {/* Social icons */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  {st.socials.linkedin && (
                    <a href={st.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {st.socials.twitter && (
                    <a href={st.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {st.socials.instagram && (
                    <a href={st.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support Staff (Coaches, Managers, Analysts) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" id="support-staff-grid">
          {staff.filter(s => s.role !== 'Founder' && s.role !== 'Co-Founder').map((st, idx) => (
            <div key={idx} className="glassmorphism p-6 rounded-xl border-white/5 flex flex-col justify-between space-y-6 hover:border-apex-orange/30 transition-all group">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img src={st.photo} alt={st.name} className="w-12 h-12 rounded-full object-cover border border-white/10 grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-display font-bold text-sm text-white uppercase tracking-tight">{st.name}</h4>
                    <span className="font-mono text-[9px] text-apex-orange uppercase tracking-wider">{st.role}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                  {st.bio}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                {st.socials.linkedin && (
                  <a href={st.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
                {st.socials.twitter && (
                  <a href={st.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                    <Twitter className="w-3.5 h-3.5" />
                  </a>
                )}
                {st.socials.instagram && (
                  <a href={st.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}
