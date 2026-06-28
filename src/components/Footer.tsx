/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Gamepad2, 
  Send, 
  Twitter, 
  Instagram, 
  Youtube, 
  MapPin, 
  Mail, 
  Phone, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-cyber-dark text-gray-400 border-t border-white/10 mt-20 relative" id="main-footer">
      
      {/* Decorative top orange line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-apex-orange to-transparent opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" id="footer-grid">
          
          {/* Brand Info */}
          <div className="space-y-6" id="footer-col-brand">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('home')}>
              <div className="bg-apex-orange p-1.5 rounded skew-x-12 flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white -skew-x-12" />
              </div>
              <div>
                <span className="font-display font-black text-xl tracking-wider text-white">
                  TEAM <span className="text-apex-orange text-glow">APEX</span>
                </span>
                <span className="block font-mono text-[9px] tracking-[0.25em] text-gray-400 leading-none">
                  GAMING
                </span>
              </div>
            </div>
            
            <p className="text-sm leading-relaxed text-gray-400">
              India's premier futuristic esports organization. Competing at the absolute highest tier across Valorant, BGMI, Free Fire Max, and Apex Legends. Redefining regional gaming lifestyle.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white/5 hover:bg-apex-orange/10 hover:text-apex-orange border border-white/5 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white/5 hover:bg-apex-orange/10 hover:text-apex-orange border border-white/5 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white/5 hover:bg-apex-orange/10 hover:text-apex-orange border border-white/5 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-6" id="footer-col-links">
            <h4 className="font-display font-black text-white text-xs tracking-widest uppercase border-l-2 border-apex-orange pl-3">
              ORGANIZATION
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              {[
                { label: 'About Team', tab: 'about' },
                { label: 'Esports Rosters', tab: 'rosters' },
                { label: 'Match Center', tab: 'matches' },
                { label: 'Tournaments', tab: 'tournaments' },
                { label: 'Media Highlights', tab: 'media' },
                { label: 'Recruitment Hub', tab: 'recruitment' }
              ].map((link, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => setCurrentTab(link.tab)}
                    className="hover:text-apex-orange transition-colors flex items-center gap-1 group text-left"
                  >
                    <ArrowUpRight className="w-3 h-3 text-apex-orange opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6" id="footer-col-contact">
            <h4 className="font-display font-black text-white text-xs tracking-widest uppercase border-l-2 border-apex-orange pl-3">
              HEADQUARTERS
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-apex-orange shrink-0 mt-0.5" />
                <span>The Apex Fortress, Landmark Heights, Bandra West, Mumbai, Maharashtra 400050</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-apex-orange shrink-0" />
                <a href="mailto:contact@teamapexgaming.com" className="hover:text-apex-orange transition-colors">
                  contact@teamapexgaming.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-apex-orange shrink-0" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="space-y-6" id="footer-col-newsletter">
            <h4 className="font-display font-black text-white text-xs tracking-widest uppercase border-l-2 border-apex-orange pl-3">
              APEX NEWSLETTER
            </h4>
            <p className="text-sm">
              Subscribe to get exclusive early drops, tournament updates, merchandise discounts, and bootcamp invites.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-apex-orange/80 w-full font-mono"
              />
              <button
                type="submit"
                className="bg-apex-orange text-white px-4 py-2 rounded font-display font-black hover:bg-apex-orange/90 transition-all flex items-center justify-center border-glow"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            
            {subscribed && (
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Subscribed! Welcome to the Apex Legion.</span>
              </div>
            )}
          </div>

        </div>

        {/* Brand partners logos ticker */}
        <div className="border-t border-b border-white/10 py-8 my-12" id="footer-partners-ticker">
          <div className="text-center font-mono text-[9px] tracking-[0.3em] uppercase text-gray-500 mb-4">
            Official Brand Partners & Gear Sponsors
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50 grayscale hover:opacity-75 transition-all">
            <span className="font-display font-black text-lg text-white tracking-widest">INTEL</span>
            <span className="font-display font-black text-lg text-white tracking-widest">MONSTER ENERGY</span>
            <span className="font-display font-black text-lg text-white tracking-widest">LOGITECH G</span>
            <span className="font-display font-black text-lg text-white tracking-widest">RED BULL</span>
            <span className="font-display font-black text-lg text-white tracking-widest">DISCORD</span>
          </div>
        </div>

        {/* Legal Disclaimer / Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-500 font-mono" id="footer-legal">
          <div>
            &copy; 2026 TEAM APEX GAMING PVT. LTD. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <a href="#terms" className="hover:text-apex-orange transition-colors">TERMS OF SERVICE</a>
            <a href="#privacy" className="hover:text-apex-orange transition-colors">PRIVACY POLICY</a>
            <a href="#fan" className="hover:text-apex-orange transition-colors">FAN CONDUCT</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
