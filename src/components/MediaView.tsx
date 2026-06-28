/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Play, 
  Image as ImageIcon, 
  Tv, 
  Gamepad2, 
  Search, 
  X, 
  ThumbsUp, 
  Eye,
  Settings,
  Flame
} from 'lucide-react';
import { MediaItem, GameCategory, AdminRole } from '../types';

interface MediaViewProps {
  media: MediaItem[];
  currentRole: AdminRole | 'Fan';
  onOpenAdmin: () => void;
}

export default function MediaView({
  media,
  currentRole,
  onOpenAdmin
}: MediaViewProps) {
  const [selectedType, setSelectedType] = useState<'All' | 'photo' | 'video' | 'highlight' | 'short'>('All');
  const [selectedGame, setSelectedGame] = useState<'All' | GameCategory>('All');
  const [activeMediaUrl, setActiveMediaUrl] = useState<string | null>(null);
  const [activeMediaTitle, setActiveMediaTitle] = useState<string>('');

  const filteredMedia = media.filter(item => {
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesGame = selectedGame === 'All' || item.gameCategory === selectedGame;
    return matchesType && matchesGame;
  });

  const handleOpenMedia = (item: MediaItem) => {
    if (item.type === 'photo') {
      setActiveMediaUrl(item.url);
    } else {
      setActiveMediaUrl(item.url);
    }
    setActiveMediaTitle(item.title);
  };

  const isVideoOrClip = (type: string) => {
    return type === 'video' || type === 'highlight' || type === 'short';
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-28" id="media-view">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">THE STUDIO VAULT</span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mt-1">
            MEDIA ARCHIVE
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mt-1">
            Browse our bootcamp wallpapers, insane match clutches, and short vertical reels.
          </p>
        </div>

        {/* Admin Shortcut */}
        {currentRole !== 'Fan' && (
          <button 
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-4 py-2 bg-apex-orange/10 border border-apex-orange/30 text-apex-orange hover:bg-apex-orange hover:text-white transition-all text-xs font-mono rounded"
          >
            <Settings className="w-4 h-4" />
            <span>MANAGE MEDIA ASSETS</span>
          </button>
        )}
      </div>

      {/* Media Type & Game Filtering bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6" id="media-filters-row">
        
        {/* Media type tabs */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {[
            { id: 'All', label: 'ALL MEDIA' },
            { id: 'video', label: 'VIDEOS' },
            { id: 'photo', label: 'WALLPAPERS' },
            { id: 'highlight', label: 'CLUTCHES' },
            { id: 'short', label: 'SHORTS' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id as any)}
              className={`px-3 py-1.5 rounded font-bold uppercase transition-colors ${
                selectedType === tab.id
                  ? 'bg-apex-orange text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Game filter dropdown */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-gray-500 uppercase">SORT GAME:</span>
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value as any)}
            className="bg-cyber-card border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-apex-orange/80 uppercase font-mono"
          >
            <option value="All">All Games</option>
            <option value="BGMI">BGMI</option>
            <option value="VALORANT">VALORANT</option>
            <option value="FREE FIRE MAX">FREE FIRE MAX</option>
            <option value="APEX LEGENDS">APEX LEGENDS</option>
          </select>
        </div>

      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="media-gallery-grid">
        {filteredMedia.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-500 text-sm glassmorphism rounded-xl border-dashed">
            No clips or wallpapers logged under this criteria.
          </div>
        ) : (
          filteredMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenMedia(item)}
              className="glassmorphism rounded-2xl overflow-hidden cursor-pointer border-white/5 hover:border-apex-orange/40 transition-all duration-300 relative group flex flex-col justify-between"
            >
              {/* Media Thumbnail */}
              <div className="aspect-[16/10] overflow-hidden relative bg-black shrink-0">
                <img 
                  src={item.thumbnailUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Play Button Overlay for videos */}
                {isVideoOrClip(item.type) && (
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/5 flex items-center justify-center transition-all">
                    <div className="w-12 h-12 rounded-full bg-apex-orange text-white flex items-center justify-center border-glow transform scale-90 group-hover:scale-100 transition-all">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Photo Icon Overlay for photos */}
                {item.type === 'photo' && (
                  <div className="absolute top-4 right-4 p-2 rounded-lg bg-cyber-dark/85 backdrop-blur-md border border-white/10 text-gray-400 group-hover:text-apex-orange transition-colors">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                )}

                {/* Duration Tag */}
                {item.duration && (
                  <span className="absolute bottom-3 right-3 bg-black/75 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold text-gray-300">
                    {item.duration}
                  </span>
                )}
              </div>

              {/* Media Meta Info */}
              <div className="p-5 flex flex-col justify-between flex-grow space-y-3">
                <div className="space-y-1">
                  <span className="bg-white/5 text-gray-400 border border-white/10 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded uppercase">
                    {item.gameCategory || 'TEAM APEX'}
                  </span>
                  <h3 className="font-display font-black text-sm text-white group-hover:text-apex-orange transition-colors line-clamp-2 uppercase tracking-tight pt-1">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-white/5 text-[10px] font-mono text-gray-500">
                  {item.views !== undefined && (
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{item.views.toLocaleString()} VIEWS</span>
                    </span>
                  )}
                  {item.likes !== undefined && (
                    <span className="flex items-center gap-1 text-apex-orange">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{item.likes.toLocaleString()} CLAPS</span>
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Media Lightbox modal popup */}
      {activeMediaUrl && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-cyber-dark border border-apex-orange/30 rounded overflow-hidden shadow-2xl">
            <button 
              onClick={() => setActiveMediaUrl(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/75 hover:bg-apex-orange hover:text-white transition-colors text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Check if video url or image url */}
            {activeMediaUrl.includes('embed') || activeMediaUrl.includes('youtube') ? (
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src={`${activeMediaUrl}?autoplay=1`}
                  title={activeMediaTitle}
                  allow="autoplay; encrypted-media"
                  referrerPolicy="no-referrer"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="p-2 flex flex-col">
                <img 
                  src={activeMediaUrl} 
                  alt={activeMediaTitle} 
                  className="w-full max-h-[75vh] object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 space-y-1">
                  <h4 className="font-display font-black text-white uppercase tracking-tight text-sm">
                    {activeMediaTitle}
                  </h4>
                  <p className="font-mono text-[9px] text-gray-500">
                    TEAM APEX OFFICIALLY LICENSED WALLPAPER
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
