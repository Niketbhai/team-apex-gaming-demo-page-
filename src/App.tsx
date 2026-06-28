/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import RostersView from './components/RostersView';
import PlayerProfileView from './components/PlayerProfileView';
import TournamentsView from './components/TournamentsView';
import MatchCenterView from './components/MatchCenterView';
import NewsView from './components/NewsView';
import MediaView from './components/MediaView';
import StoreView from './components/StoreView';
import SponsorsView from './components/SponsorsView';
import RecruitmentView from './components/RecruitmentView';
import ContactView from './components/ContactView';
import AdminDashboardView from './components/AdminDashboardView';

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
  CartItem, 
  AdminRole 
} from './types';

import { 
  INITIAL_PLAYERS, 
  INITIAL_TOURNAMENTS, 
  INITIAL_MATCHES, 
  INITIAL_NEWS, 
  INITIAL_MEDIA, 
  INITIAL_PRODUCTS, 
  INITIAL_SPONSORS, 
  INITIAL_APPLICATIONS, 
  getLocalStorageData 
} from './mockData';

import { ShoppingBag, Trash2, Minus, Plus, X, ChevronRight, Lock } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [currentRole, setCurrentRole] = useState<AdminRole | 'Fan'>('Fan');

  // Core synchronized persistent database states
  const [players, setPlayers] = useState<Player[]>(() => getLocalStorageData('teamapex_players', INITIAL_PLAYERS));
  const [tournaments, setTournaments] = useState<Tournament[]>(() => getLocalStorageData('teamapex_tournaments', INITIAL_TOURNAMENTS));
  const [matches, setMatches] = useState<Match[]>(() => getLocalStorageData('teamapex_matches', INITIAL_MATCHES));
  const [news, setNews] = useState<NewsArticle[]>(() => getLocalStorageData('teamapex_news', INITIAL_NEWS));
  const [products, setProducts] = useState<Product[]>(() => getLocalStorageData('teamapex_products', INITIAL_PRODUCTS));
  const [applications, setApplications] = useState<RecruitmentApplication[]>(() => getLocalStorageData('teamapex_applications', INITIAL_APPLICATIONS));
  const [orders, setOrders] = useState<Order[]>(() => getLocalStorageData('teamapex_orders', []));
  const [media, setMedia] = useState<MediaItem[]>(() => getLocalStorageData('teamapex_media', INITIAL_MEDIA));

  // Cart side drawer states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Scroll to top on page switches
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentTab, selectedPlayer, selectedNews]);

  const handleSelectPlayer = (player: Player) => {
    setSelectedPlayer(player);
    setCurrentTab('player-profile');
  };

  const handleSelectNews = (article: NewsArticle) => {
    setSelectedNews(article);
    setCurrentTab('news-detail');
  };

  const handleUpdateQuantity = (idx: number, delta: number) => {
    const updated = [...cart];
    updated[idx].quantity += delta;
    if (updated[idx].quantity <= 0) {
      updated.splice(idx, 1);
    }
    setCart(updated);
  };

  const handleRemoveFromCart = (idx: number) => {
    const updated = [...cart];
    updated.splice(idx, 1);
    setCart(updated);
  };

  const handleAddToCart = (product: Product, size: string) => {
    const updated = [...cart];
    const existingIdx = updated.findIndex(item => item.product.id === product.id && item.selectedSize === size);
    if (existingIdx > -1) {
      updated[existingIdx].quantity += 1;
    } else {
      updated.push({ product, quantity: 1, selectedSize: size });
    }
    setCart(updated);
    setIsCartOpen(true);
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-[#08080C] text-white min-h-screen font-sans antialiased selection:bg-apex-orange selection:text-white" id="root-viewport">
      
      {/* 1. Glassmorphic Navigation Bar */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          setSelectedPlayer(null);
          setSelectedNews(null);
        }}
        cartCount={totalCartCount}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
        currentRole={currentRole}
        setCurrentRole={(role) => {
          setCurrentRole(role);
          // If changed to fan, close admin pages
          if (role === 'Fan' && currentTab === 'admin') {
            setCurrentTab('home');
          }
        }}
        onOpenAdmin={() => setCurrentTab('admin')}
      />

      {/* 2. Primary Page Router Stage */}
      <main className="min-h-[80vh]">
        {currentTab === 'home' && (
          <HomeView 
            matches={matches} 
            news={news} 
            players={players} 
            sponsors={INITIAL_SPONSORS} 
            products={products}
            tournaments={tournaments}
            onNavigate={setCurrentTab}
            onSelectPlayer={handleSelectPlayer}
            onSelectNews={handleSelectNews}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentTab === 'about' && (
          <AboutView />
        )}

        {currentTab === 'rosters' && (
          <RostersView 
            players={players} 
            onSelectPlayer={handleSelectPlayer}
            currentRole={currentRole}
            onOpenAdmin={() => setCurrentTab('admin')}
          />
        )}

        {currentTab === 'player-profile' && selectedPlayer && (
          <PlayerProfileView 
            player={selectedPlayer} 
            onBack={() => {
              setCurrentTab('rosters');
              setSelectedPlayer(null);
            }} 
          />
        )}

        {currentTab === 'tournaments' && (
          <TournamentsView 
            tournaments={tournaments} 
            currentRole={currentRole}
            onOpenAdmin={() => setCurrentTab('admin')}
          />
        )}

        {currentTab === 'matches' && (
          <MatchCenterView 
            matches={matches} 
            currentRole={currentRole}
            onOpenAdmin={() => setCurrentTab('admin')}
          />
        )}

        {currentTab === 'news' && (
          <NewsView 
            news={news} 
            onSelectNews={handleSelectNews}
            currentRole={currentRole}
            onOpenAdmin={() => setCurrentTab('admin')}
          />
        )}

        {/* Detailed Expandable News Overlay page view */}
        {currentTab === 'news-detail' && selectedNews && (
          <div className="space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-28">
            <button 
              onClick={() => {
                setCurrentTab('news');
                setSelectedNews(null);
              }}
              className="flex items-center gap-2 text-sm font-display font-black text-apex-orange hover:text-white transition-colors"
            >
              <span>← BACK TO NEWS AGGREGATOR</span>
            </button>

            <div className="glassmorphism p-6 sm:p-10 rounded-3xl border-white/5 space-y-8">
              <div className="space-y-3">
                <span className="bg-apex-orange/10 text-apex-orange border border-apex-orange/20 text-[9px] font-mono px-2.5 py-1 rounded uppercase font-bold">
                  {selectedNews.category}
                </span>
                <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-tight pt-1">
                  {selectedNews.title}
                </h1>
                <p className="text-gray-500 font-mono text-xs">
                  WRITTEN BY: {selectedNews.author} ({selectedNews.authorRole}) • PUBLISHED: {selectedNews.date}
                </p>
              </div>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 relative">
                <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>

              <div className="text-gray-300 text-sm leading-relaxed space-y-4 font-sans whitespace-pre-wrap pt-4">
                {selectedNews.content}
              </div>
            </div>
          </div>
        )}

        {currentTab === 'media' && (
          <MediaView 
            media={media} 
            currentRole={currentRole}
            onOpenAdmin={() => setCurrentTab('admin')}
          />
        )}

        {currentTab === 'store' && (
          <StoreView 
            products={products}
            cart={cart}
            setCart={setCart}
            orders={orders}
            setOrders={setOrders}
            currentRole={currentRole}
            onOpenAdmin={() => setCurrentTab('admin')}
          />
        )}

        {currentTab === 'sponsors' && (
          <SponsorsView sponsors={INITIAL_SPONSORS} currentRole={currentRole} />
        )}

        {currentTab === 'recruitment' && (
          <RecruitmentView 
            applications={applications} 
            setApplications={setApplications}
            currentRole={currentRole}
            onOpenAdmin={() => setCurrentTab('admin')}
          />
        )}

        {currentTab === 'contact' && (
          <ContactView />
        )}

        {currentTab === 'admin' && currentRole !== 'Fan' && (
          <AdminDashboardView 
            currentRole={currentRole as AdminRole}
            players={players}
            setPlayers={setPlayers}
            tournaments={tournaments}
            setTournaments={setTournaments}
            matches={matches}
            setMatches={setMatches}
            news={news}
            setNews={setNews}
            products={products}
            setProducts={setProducts}
            applications={applications}
            setApplications={setApplications}
            orders={orders}
            setOrders={setOrders}
          />
        )}
      </main>

      {/* 3. Global Premium Footer */}
      <Footer setCurrentTab={setCurrentTab} />

      {/* 4. Fully Operational Cart Slide-Over Drawer Panel */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex justify-end backdrop-blur-md">
          <div className="w-full max-w-md bg-cyber-dark border-l border-apex-orange/30 p-6 flex flex-col justify-between h-full shadow-2xl relative">
            
            {/* Close */}
            <button 
              onClick={() => setIsCartOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-apex-orange text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6 flex-grow overflow-y-auto pr-1">
              
              {/* Drawer Header */}
              <div className="border-b border-white/5 pb-4">
                <h3 className="font-display font-black text-xl text-white uppercase tracking-tight flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-apex-orange" />
                  <span>SQUAD GEAR BAG ({totalCartCount})</span>
                </h3>
              </div>

              {/* Cart Items list */}
              {cart.length === 0 ? (
                <div className="py-24 text-center space-y-4">
                  <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto" />
                  <h4 className="font-display font-black text-sm text-white uppercase">GEAR BAG EMPTY</h4>
                  <p className="text-gray-500 text-xs max-w-xs mx-auto">
                    You haven't added any professional jersey models or mechanical mousepads to your active inventory.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCurrentTab('store');
                    }}
                    className="px-4 py-2 bg-apex-orange text-white text-xs font-display font-bold rounded"
                  >
                    Scout Catalog Gear
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={item.product.image} alt={item.product.name} className="w-12 h-15 rounded object-cover border border-white/10" referrerPolicy="no-referrer" />
                        <div className="space-y-1">
                          <h4 className="font-display font-bold text-xs text-white uppercase line-clamp-1">{item.product.name}</h4>
                          <span className="block font-mono text-[9px] text-gray-500">
                            {item.selectedSize ? `SIZE: ${item.selectedSize} ` : ''}
                            {item.selectedColor ? `| CLR: ${item.selectedColor}` : ''}
                          </span>
                          <span className="block font-mono text-xs font-bold text-apex-orange">₹{item.product.price}</span>
                        </div>
                      </div>

                      {/* Quantities control */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded font-mono text-xs">
                          <button onClick={() => handleUpdateQuantity(idx, -1)} className="p-1 rounded hover:bg-white/15 text-gray-400 hover:text-white">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-1 text-white">{item.quantity}</span>
                          <button onClick={() => handleUpdateQuantity(idx, 1)} className="p-1 rounded hover:bg-white/15 text-gray-400 hover:text-white">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button 
                          onClick={() => handleRemoveFromCart(idx)}
                          className="text-[10px] font-mono text-red-400 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>REMOVE</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Checkouts summary and button */}
            {cart.length > 0 && (
              <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="flex justify-between font-mono text-xs text-gray-400">
                  <span>SUBTOTAL MERCHANDISE:</span>
                  <span className="text-white font-bold">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between font-mono text-xs text-gray-400">
                  <span>PACKING & SECURE SHIPPING:</span>
                  <span className="text-emerald-400 font-bold">FREE</span>
                </div>
                <div className="flex justify-between font-display font-black text-sm text-white pt-2 border-t border-white/5">
                  <span>NET TOTAL:</span>
                  <span className="text-apex-orange text-glow">₹{cartSubtotal}</span>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentTab('store');
                    // Store component has deep step triggers
                  }}
                  className="w-full py-4 rounded-xl bg-apex-orange hover:bg-apex-orange/95 text-white font-display font-black tracking-wider text-xs border-glow flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>CHECKOUT NOW</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
