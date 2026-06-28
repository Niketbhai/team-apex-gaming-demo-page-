/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  User, 
  ArrowRight, 
  BookOpen, 
  Share2, 
  Sparkles,
  Settings,
  ChevronRight,
  Tv
} from 'lucide-react';
import { NewsArticle, NewsCategory, AdminRole } from '../types';

interface NewsViewProps {
  news: NewsArticle[];
  onSelectNews: (article: NewsArticle) => void;
  currentRole: AdminRole | 'Fan';
  onOpenAdmin: () => void;
}

export default function NewsView({
  news,
  onSelectNews,
  currentRole,
  onOpenAdmin
}: NewsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | NewsCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ('All' | NewsCategory)[] = [
    'All', 
    'Team News', 
    'Tournament News', 
    'Transfer News', 
    'Announcement', 
    'Community Update'
  ];

  const filteredNews = news.filter(article => {
    // Exclude drafts from public feed unless admin
    if (article.isDraft && currentRole === 'Fan') return false;

    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-28" id="news-view">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">THE HQ TRANSMISSION</span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mt-1">
            NEWS & ARTICLES
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mt-1">
            Stay updated with roster additions, LAN results, brand announcements, and community insights.
          </p>
        </div>

        {/* Admin Shortcut */}
        {currentRole !== 'Fan' && (
          <button 
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-4 py-2 bg-apex-orange/10 border border-apex-orange/30 text-apex-orange hover:bg-apex-orange hover:text-white transition-all text-xs font-mono rounded"
          >
            <Settings className="w-4 h-4" />
            <span>WRITE NEWS / ARTICLES</span>
          </button>
        )}
      </div>

      {/* Search and Categories Tag bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center" id="news-bar">
        
        {/* Search */}
        <div className="relative lg:col-span-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="SEARCH NEWS FEED..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-apex-orange/70 w-full font-mono uppercase"
          />
        </div>

        {/* Categories tags */}
        <div className="flex flex-wrap items-center gap-1.5 lg:col-span-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded font-display font-bold text-[10px] tracking-wider uppercase transition-all ${
                selectedCategory === cat
                  ? 'bg-apex-orange text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Main News grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="news-grid-list">
        {filteredNews.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-500 text-sm glassmorphism rounded-xl border-dashed">
            No matching articles or tournament journals found.
          </div>
        ) : (
          filteredNews.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectNews(article)}
              className="glassmorphism rounded-2xl overflow-hidden flex flex-col group cursor-pointer border-white/5 hover:border-apex-orange/30 transition-all duration-300 relative"
            >
              {/* Draft Label */}
              {article.isDraft && (
                <span className="absolute top-4 right-4 z-10 bg-amber-500 text-black text-[9px] font-mono font-black px-2 py-0.5 rounded uppercase tracking-wider">
                  DRAFT STATE
                </span>
              )}

              {/* Photo Preview */}
              <div className="aspect-[16/10] overflow-hidden relative bg-cyber-dark shrink-0">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-cyber-dark/85 backdrop-blur-md border border-apex-orange/30 text-apex-orange text-[9px] font-mono font-bold px-2.5 py-0.5 rounded uppercase tracking-widest leading-none">
                  {article.category}
                </span>
              </div>

              {/* Core Content */}
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3 font-mono text-[9px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-apex-orange" />
                      <span>{article.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{article.author}</span>
                    </span>
                  </div>

                  <h3 className="font-display font-black text-lg text-white group-hover:text-apex-orange transition-colors line-clamp-2 uppercase tracking-tight pt-1">
                    {article.title}
                  </h3>

                  <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                  <span className="font-mono text-[10px] text-gray-500 font-bold uppercase">{article.authorRole}</span>
                  <span className="font-mono text-[10px] text-apex-orange group-hover:underline flex items-center gap-1 font-bold shrink-0">
                    READ ARTICLE <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

              </div>
            </article>
          ))
        )}
      </div>

    </div>
  );
}
