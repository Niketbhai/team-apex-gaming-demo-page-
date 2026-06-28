/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Gamepad2, 
  ShoppingCart, 
  Menu, 
  X, 
  ShieldAlert, 
  Sparkles, 
  Crown, 
  UserCheck 
} from 'lucide-react';
import { AdminRole } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  toggleCart: () => void;
  currentRole: AdminRole | 'Fan';
  setCurrentRole: (role: AdminRole | 'Fan') => void;
  onOpenAdmin: () => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  cartCount,
  toggleCart,
  currentRole,
  setCurrentRole,
  onOpenAdmin
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const menuItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'rosters', label: 'ROSTERS' },
    { id: 'tournaments', label: 'TOURNAMENTS' },
    { id: 'matches', label: 'MATCH CENTER' },
    { id: 'news', label: 'NEWS' },
    { id: 'media', label: 'MEDIA' },
    { id: 'store', label: 'STORE' },
    { id: 'sponsors', label: 'SPONSORS' },
    { id: 'recruitment', label: 'JOIN US' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const roles: (AdminRole | 'Fan')[] = ['Fan', 'Super Admin', 'Manager', 'Coach', 'Content Manager'];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Super Admin': return <Crown className="w-3.5 h-3.5 text-red-500" />;
      case 'Manager': return <Crown className="w-3.5 h-3.5 text-amber-500" />;
      case 'Coach': return <Sparkles className="w-3.5 h-3.5 text-blue-500" />;
      case 'Content Manager': return <Sparkles className="w-3.5 h-3.5 text-green-500" />;
      default: return <UserCheck className="w-3.5 h-3.5 text-gray-400" />;
    }
  };

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-white/10" id="main-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabClick('home')} id="nav-logo">
            <div className="bg-apex-orange p-1.5 rounded skew-x-12 flex items-center justify-center border-glow">
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2" id="nav-desktop-links">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`px-3 py-2 rounded font-display font-medium text-xs tracking-wider transition-all duration-300 relative ${
                  currentTab === item.id 
                    ? 'text-apex-orange bg-white/5 font-bold border-b-2 border-apex-orange rounded-none' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                id={`tab-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-2 sm:gap-4" id="nav-actions">
            
            {/* Role Switcher (Simulating roles) */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all text-xs font-mono"
                title="Select simulation role"
                id="role-switch-btn"
              >
                {getRoleIcon(currentRole)}
                <span className="hidden md:inline">{currentRole}</span>
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-cyber-dark/95 border border-apex-orange/30 rounded shadow-xl py-1 z-50 backdrop-blur-md">
                  <div className="px-3 py-1.5 border-b border-white/10 font-mono text-[10px] text-gray-400">
                    SIMULATE USER ROLE:
                  </div>
                  {roles.map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setCurrentRole(r);
                        setShowRoleDropdown(false);
                      }}
                      className={`flex items-center gap-2 w-full text-left px-3 py-2 text-xs font-mono transition-colors hover:bg-apex-orange/10 ${
                        currentRole === r ? 'text-apex-orange font-bold bg-apex-orange/5' : 'text-gray-300'
                      }`}
                    >
                      {getRoleIcon(r)}
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Console Shortcut */}
            {currentRole !== 'Fan' && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1 px-3 py-1.5 rounded bg-apex-orange text-white text-xs font-display font-black tracking-wider border-glow hover:bg-apex-orange/90 transition-all skew-x-6"
                id="admin-panel-trigger"
              >
                <div className="-skew-x-6 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>DASHBOARD</span>
                </div>
              </button>
            )}

            {/* Shopping Cart Trigger */}
            <button
              onClick={toggleCart}
              className="p-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all relative"
              id="cart-trigger"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-apex-orange text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-cyber-dark animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white"
              id="mobile-menu-trigger"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-cyber-dark/95 border-b border-white/15 py-4 px-4 flex flex-col gap-2 z-50 max-h-[80vh] overflow-y-auto backdrop-blur-lg">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded font-display font-semibold text-sm tracking-wider transition-all ${
                currentTab === item.id 
                  ? 'text-apex-orange bg-apex-orange/10 font-black border-l-4 border-apex-orange' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
