/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  Check, 
  Map, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface FAQ {
  q: string;
  a: string;
}

export default function ContactView() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [conName, setConName] = useState('');
  const [conEmail, setConEmail] = useState('');
  const [conType, setConType] = useState('Sponsorship');
  const [conMessage, setConMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const faqs: FAQ[] = [
    {
      q: 'HOW CAN I APPLY TO JOIN THE TEAM APEX ACTIVE ROSTERS?',
      a: 'We evaluate recruitment drafts continually. Head over to our dedicated RECRUITMENT tab on this website, choose an open opening, and submit your Discord coordinate, Liquidpedia, or gameplay clips. Our scout manager will update your file status on the live tracker panel.'
    },
    {
      q: 'WHERE IS THE OFFICIAL TEAM APEX HQ BOOTCAMP LOCATED?',
      a: 'Our central hyper-bootcamp is located in Pune, Maharashtra. It is a state-of-the-art, 12,000 sq ft esports training camp housing high-spec gaming rigs, analytical pods, fitness gyms, and psychotherapy units.'
    },
    {
      q: 'WHO DO I CONTACT FOR CORPORATE SPONSORSHIPS OR ADVERTISING?',
      a: 'For business collaborations, partner activations, or content integrations, select "Sponsorships Inquiry" in our contact sheets on this page or email us directly at partners@apex.gg. Our venture team will respond with a corporate brochure within 24 hours.'
    },
    {
      q: 'DOES TEAM APEX OFFER ACADEMY PROGRAMS FOR YOUTH PLAYERS?',
      a: 'Yes, our Esports Academy program scout runs quarterly trials. Follow our NEWS tab and Discord announcements for register links and tournament brackets.'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setConName('');
    setConEmail('');
    setConMessage('');
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-28" id="contact-view">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6 text-center space-y-4 max-w-2xl mx-auto">
        <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">THE INTEL DECK</span>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
          CONTACT US
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm">
          Get in touch with our operations desk, explore corporate sponsorship opportunities, or seek support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Coordinates & Offices */}
        <div className="space-y-6">
          
          <div className="glassmorphism p-6 rounded-2xl border-white/5 space-y-6">
            <h3 className="font-display font-black text-base text-white uppercase tracking-tight border-b border-white/5 pb-3">
              OPERATIONS DESK
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-apex-orange shrink-0" />
                <div>
                  <span className="block font-mono text-[9px] text-gray-500 uppercase">PUNE HQ & BOOTCAMP</span>
                  <span className="block font-sans font-bold text-white pt-0.5">Viman Nagar Sector 3, Pune, MH, India</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-apex-orange shrink-0" />
                <div>
                  <span className="block font-mono text-[9px] text-gray-500 uppercase">BUSINESS & PARTNERS</span>
                  <span className="block font-mono font-bold text-white pt-0.5">partners@teamapex.gg</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-apex-orange shrink-0" />
                <div>
                  <span className="block font-mono text-[9px] text-gray-500 uppercase">TELEPHONE SWITCHBOARD</span>
                  <span className="block font-mono font-bold text-white pt-0.5">+91 20 4567 8910</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Simulated Google Map */}
          <div className="glassmorphism p-4 rounded-2xl border-white/5 space-y-3 relative overflow-hidden" id="simulated-map">
            <span className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">SIMULATED GEOLOCATION</span>
            
            <div className="aspect-[4/3] bg-cyber-dark rounded-xl relative overflow-hidden border border-white/10 flex flex-col justify-between p-4">
              {/* Map grid design elements */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              
              <div className="relative z-10 flex items-center justify-between">
                <span className="bg-apex-orange/10 border border-apex-orange/30 text-apex-orange text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                  APEX PUNE COMPLEX
                </span>
                <Map className="w-4 h-4 text-gray-500" />
              </div>

              {/* Glowing pin mark */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-apex-orange animate-ping absolute"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-apex-orange border-2 border-white relative"></div>
                <span className="text-[10px] font-display font-black text-white uppercase tracking-wider mt-2 bg-cyber-dark/95 border border-white/15 px-2 py-0.5 rounded shadow">
                  18.5679° N, 73.9143° E
                </span>
              </div>

              <span className="relative z-10 text-[9px] font-mono text-gray-500 uppercase tracking-widest text-center mt-2 block">
                PUNE ESCORTS BOOTCAMP CENTRE
              </span>
            </div>
          </div>

        </div>

        {/* Center/Right Column: Contact Form & FAQ */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Contact sheet form */}
          <div className="glassmorphism p-6 sm:p-8 rounded-2xl border-white/5 space-y-6">
            <h3 className="font-display font-black text-lg text-white uppercase tracking-tight flex items-center gap-2 border-b border-white/5 pb-3">
              <Mail className="w-5 h-5 text-apex-orange" />
              <span>TRANSMIT COMMUNICATIONS</span>
            </h3>

            {isSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-xs flex items-center gap-2 animate-pulse">
                <Check className="w-5 h-5" />
                <div>
                  <span className="font-bold uppercase block">Transmission Successful!</span>
                  <span>Our executive managers will reply to your registered coordinate within 24 business hours.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs sm:text-sm font-sans">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={conName}
                    onChange={(e) => setConName(e.target.value)}
                    placeholder="EX: NAMAN MATHUR"
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/70 w-full font-mono uppercase"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">Email Coordinate</label>
                  <input
                    type="email"
                    required
                    value={conEmail}
                    onChange={(e) => setConEmail(e.target.value)}
                    placeholder="EX: APEX@GMAIL.COM"
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/70 w-full font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1 font-mono">
                <label className="block text-[9px] text-gray-500 tracking-wider uppercase">Inquiry Division</label>
                <select
                  value={conType}
                  onChange={(e) => setConType(e.target.value)}
                  className="bg-cyber-card border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-apex-orange/70 w-full font-mono uppercase"
                >
                  <option value="Sponsorship">SPONSORSHIPS & CO-BRANDING</option>
                  <option value="Press">MEDIA & COMMUNICATIONS PRESS</option>
                  <option value="Fan">FAN CONCERNS & MERCHANDISE SHOP</option>
                  <option value="General">GENERAL MANAGEMENT DESK</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">Detailed Message Context</label>
                <textarea
                  rows={4}
                  required
                  value={conMessage}
                  onChange={(e) => setConMessage(e.target.value)}
                  placeholder="Enter context details for our venture team..."
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/70 w-full font-mono"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-apex-orange hover:bg-apex-orange/95 text-white font-display font-black tracking-wider text-xs border-glow flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>SEND DIRECT MESSAGE WIRE</span>
              </button>

            </form>
          </div>

          {/* Interactive FAQ list */}
          <div className="glassmorphism p-6 sm:p-8 rounded-2xl border-white/5 space-y-6">
            <h3 className="font-display font-black text-lg text-white uppercase tracking-tight flex items-center gap-2 border-b border-white/5 pb-3">
              <HelpCircle className="w-5 h-5 text-apex-orange" />
              <span>FREQUENT REPLIES (FAQ)</span>
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="bg-white/5 border border-white/5 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-display font-bold text-xs text-white uppercase tracking-wide leading-snug">
                      {faq.q}
                    </span>
                    {openFAQ === idx ? (
                      <ChevronUp className="w-4 h-4 text-apex-orange shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500 shrink-0 ml-2" />
                    )}
                  </button>

                  {openFAQ === idx && (
                    <div className="px-4 pb-4 font-sans text-xs text-gray-400 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
