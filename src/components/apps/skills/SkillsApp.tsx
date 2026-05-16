'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Images, Folders, Heart, Clock, Map, Video,
  MonitorPlay, Users, Trash2, FolderPlus,
  Activity, Plus, Minus, Search, MoreHorizontal,
  Share, Info, LayoutGrid, X, ChevronLeft, ChevronRight,
  Download, ZoomIn
} from 'lucide-react';

type Photo = {
  id: number;
  src: string;
  label: string;
  category: 'library' | 'screenshots' | 'videos' | 'people';
  date: string;
  liked: boolean;
};

const ALL_PHOTOS: Photo[] = [
  { id: 1,  src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80', label: 'Coding Setup',   category: 'library',     date: '2025-10-01', liked: false },
  { id: 2,  src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', label: 'Code Editor',    category: 'screenshots', date: '2025-10-02', liked: true  },
  { id: 3,  src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', label: 'Laptop Work',   category: 'library',     date: '2025-10-03', liked: false },
  { id: 4,  src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', label: 'Data Analysis',  category: 'library',     date: '2025-10-04', liked: true  },
  { id: 5,  src: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&q=80', label: 'Developer',     category: 'people',      date: '2025-10-05', liked: false },
  { id: 6,  src: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80', label: 'Terminal',       category: 'screenshots', date: '2025-10-06', liked: false },

  { id: 8,  src: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=800&q=80', label: 'Typewriter',    category: 'library',     date: '2025-10-08', liked: false },
  { id: 9,  src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80', label: 'Matrix',        category: 'library',     date: '2025-10-09', liked: false },
  { id: 10, src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', label: 'Circuit',       category: 'library',     date: '2025-10-10', liked: true  },
  { id: 11, src: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=80', label: 'Old Mac',        category: 'library',     date: '2025-10-11', liked: false },
  { id: 12, src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80', label: 'Nepal',          category: 'library',     date: '2025-10-12', liked: true  },
  { id: 13, src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80', label: 'Macbook',       category: 'library',     date: '2025-10-13', liked: false },
  { id: 14, src: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80', label: 'Desktop Setup', category: 'screenshots', date: '2025-10-14', liked: false },
  { id: 15, src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80', label: 'Dark Laptop',   category: 'library',     date: '2025-10-15', liked: true  },
  { id: 16, src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80', label: 'Code',          category: 'screenshots', date: '2025-10-16', liked: false },
];

type SidebarSection = 'library' | 'collections' | 'favorites' | 'recently-saved' | 'map' | 'videos' | 'screenshots' | 'people' | 'trash' | 'shared-albums' | 'activity';
type SortMode = 'date-desc' | 'date-asc' | 'name-asc' | 'name-desc';

export default function SkillsApp() {
  const [photos, setPhotos] = useState<Photo[]>(ALL_PHOTOS);
  const [active, setActive] = useState<SidebarSection>('library');
  const [zoom, setZoom] = useState(4); // cols
  const [showZoomHint, setShowZoomHint] = useState(false);
  const [viewMode, setViewMode] = useState<'years' | 'months' | 'all'>('all');
  const [sort, setSort] = useState<SortMode>('date-desc');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortMenuPos, setSortMenuPos] = useState({ top: 0, right: 0 });
  const sortBtnRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const pinchStartDist = useRef<number | null>(null);
  const pinchStartZoom = useRef<number>(4);
  const zoomHintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showShare, setShowShare] = useState(false);

  // Show zoom hint briefly on change
  const flashZoomHint = useCallback(() => {
    setShowZoomHint(true);
    if (zoomHintTimer.current) clearTimeout(zoomHintTimer.current);
    zoomHintTimer.current = setTimeout(() => setShowZoomHint(false), 1200);
  }, []);

  // Trackpad pinch: Ctrl + wheel — must use native listener (passive:false) to call preventDefault
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      setZoom(prev => {
        const next = e.deltaY > 0
          ? Math.min(prev + 1, 8)  // pinch out → more cols
          : Math.max(prev - 1, 1); // pinch in  → fewer cols
        if (next !== prev) flashZoomHint();
        return next;
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [flashZoomHint]);

  // Cleanup zoom hint timer on unmount
  useEffect(() => () => {
    if (zoomHintTimer.current) clearTimeout(zoomHintTimer.current);
  }, []);

  // Touch pinch helpers
  const getTouchDist = (e: React.TouchEvent) => {
    const [t1, t2] = [e.touches[0], e.touches[1]];
    return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
  };

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      pinchStartDist.current = getTouchDist(e);
      pinchStartZoom.current = zoom;
    }
  }, [zoom]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 2 || pinchStartDist.current === null) return;
    e.preventDefault();
    const currentDist = getTouchDist(e);
    const ratio = pinchStartDist.current / currentDist;
    // ratio > 1 = pinch out (zoom out = more cols), ratio < 1 = pinch in (fewer cols)
    const newZoom = Math.round(Math.min(Math.max(pinchStartZoom.current * ratio, 1), 8));
    setZoom(prev => {
      if (prev !== newZoom) flashZoomHint();
      return newZoom;
    });
  }, [flashZoomHint]);

  const handleTouchEnd = useCallback(() => {
    pinchStartDist.current = null;
  }, []);

  // Derived filtered list
  const filtered = React.useMemo(() => {
    let list = [...photos];
    // Section filter
    if (active === 'favorites') list = list.filter(p => p.liked);
    else if (active === 'screenshots') list = list.filter(p => p.category === 'screenshots');
    else if (active === 'videos') list = list.filter(p => p.category === 'videos');
    else if (active === 'people') list = list.filter(p => p.category === 'people');
    else if (active === 'trash') list = [];
    else if (active === 'recently-saved') list = list.slice(-5).reverse();
    // Search
    if (searchQuery) list = list.filter(p => p.label.toLowerCase().includes(searchQuery.toLowerCase()));
    // Sort
    list.sort((a, b) => {
      if (sort === 'date-desc') return b.date.localeCompare(a.date);
      if (sort === 'date-asc')  return a.date.localeCompare(b.date);
      if (sort === 'name-asc')  return a.label.localeCompare(b.label);
      if (sort === 'name-desc') return b.label.localeCompare(a.label);
      return 0;
    });
    return list;
  }, [photos, active, searchQuery, sort]);

  const toggleLike = (id: number) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked } : p));
  };

  const lightboxPhoto = photos.find(p => p.id === lightbox) ?? null;
  const lightboxIndex = filtered.findIndex(p => p.id === lightbox);
  const prevPhoto = () => { if (lightboxIndex > 0) setLightbox(filtered[lightboxIndex - 1].id); };
  const nextPhoto = () => { if (lightboxIndex < filtered.length - 1) setLightbox(filtered[lightboxIndex + 1].id); };

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'Escape')     setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, lightboxIndex, filtered]);

  const sidebarSections: { id: SidebarSection; label: string; icon: any; group?: string }[] = [
    { id: 'library',       label: 'Library',         icon: Images },
    { id: 'collections',   label: 'Collections',     icon: Folders },
    { id: 'favorites',     label: 'Favorites',       icon: Heart,       group: 'Pinned' },
    { id: 'recently-saved',label: 'Recently Saved',  icon: Clock,       group: 'Pinned' },
    { id: 'map',           label: 'Map',             icon: Map,         group: 'Pinned' },
    { id: 'videos',        label: 'Videos',          icon: Video,       group: 'Pinned' },
    { id: 'screenshots',   label: 'Screenshots',     icon: MonitorPlay, group: 'Pinned' },
    { id: 'people',        label: 'People & Pets',   icon: Users,       group: 'Pinned' },
    { id: 'trash',         label: 'Recently Deleted',icon: Trash2,      group: 'Pinned' },
    { id: 'shared-albums', label: 'Shared Albums',   icon: FolderPlus,  group: 'Sharing' },
    { id: 'activity',      label: 'Activity',        icon: Activity,    group: 'Sharing' },
  ];

  const sidebarGroups = ['', 'Pinned', 'Sharing'];

  const sectionTitle: Record<SidebarSection, string> = {
    'library': 'Library', 'collections': 'Collections', 'favorites': 'Favorites',
    'recently-saved': 'Recently Saved', 'map': 'Map', 'videos': 'Videos',
    'screenshots': 'Screenshots', 'people': 'People & Pets', 'trash': 'Recently Deleted',
    'shared-albums': 'Shared Albums', 'activity': 'Activity',
  };

  return (
    <div className="flex h-full w-full bg-[#1e1e1e] text-white font-sans overflow-hidden select-none">

      {/* ── Left Sidebar ── */}
      <div className="w-[220px] bg-[#282828] border-r border-black/30 flex flex-col pt-3 pb-2 overflow-y-auto hide-scrollbar flex-shrink-0">
        {sidebarGroups.map(group => {
          const items = sidebarSections.filter(s => (s.group ?? '') === group);
          return (
            <div key={group} className="mb-1">
              {group && <h3 className="px-5 text-[10px] font-semibold text-white/40 uppercase tracking-wider mt-3 mb-1">{group}</h3>}
              {items.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={`w-full flex items-center space-x-2 px-3 py-1.5 rounded-md mx-1 text-[13px] transition-colors ${active === id ? 'bg-blue-500 text-white' : 'text-white/75 hover:bg-white/10'}`}
                  style={{ width: 'calc(100% - 8px)' }}
                >
                  <Icon size={15} className={active === id ? 'text-white' : 'text-blue-400'} />
                  <span className="font-medium truncate">{label}</span>
                  {id === 'favorites' && <span className="ml-auto text-[10px] opacity-50">{photos.filter(p=>p.liked).length}</span>}
                </button>
              ))}
            </div>
          );
        })}
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ── Toolbar ── */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#1e1e1e]/90 backdrop-blur border-b border-black/30 gap-4">
          <div>
            <h1 className="text-[15px] font-bold leading-tight">{sectionTitle[active]}</h1>
            <p className="text-[10px] text-white/40">{filtered.length} photo{filtered.length !== 1 ? 's' : ''}</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Zoom */}
            <div className="flex items-center bg-white/10 rounded-md overflow-hidden">
              <button onClick={() => setZoom(z => Math.min(z + 1, 8))} className="px-2 py-1 hover:bg-white/10 transition-colors border-r border-white/10" title="Zoom out"><Minus size={12} /></button>
              <button onClick={() => setZoom(z => Math.max(z - 1, 1))} className="px-2 py-1 hover:bg-white/10 transition-colors" title="Zoom in"><Plus size={12} /></button>
            </div>

            {/* View mode */}
            <div className="flex space-x-0.5 bg-white/5 p-0.5 rounded-md border border-white/10 text-[11px]">
              {(['years','months','all'] as const).map(m => (
                <button key={m} onClick={() => setViewMode(m)}
                  className={`px-2.5 py-1 rounded transition-colors capitalize ${viewMode === m ? 'bg-white/20' : 'text-white/60 hover:text-white'}`}>
                  {m === 'all' ? 'All Photos' : m.charAt(0).toUpperCase()+m.slice(1)}
                </button>
              ))}
            </div>

            {/* Sort dropdown — fixed position to escape overflow-hidden */}
            <div className="relative">
              <button
                ref={sortBtnRef}
                onClick={() => {
                  const rect = sortBtnRef.current?.getBoundingClientRect();
                  if (rect) {
                    setSortMenuPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
                  }
                  setShowSortMenu(s => !s);
                }}
                className="flex items-center space-x-1.5 bg-white/10 border border-white/10 text-white text-[11px] rounded-md px-2.5 py-1 hover:bg-white/20 transition-colors"
              >
                <span>{{ 'date-desc': 'Newest First', 'date-asc': 'Oldest First', 'name-asc': 'Name A–Z', 'name-desc': 'Name Z–A' }[sort]}</span>
                <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-3 text-white/60">
              <button onClick={() => setShowSearch(s => !s)} className={`hover:text-white transition-colors ${showSearch ? 'text-blue-400' : ''}`} title="Search"><Search size={15} /></button>
              <button onClick={() => setShowInfo(s => !s)} className={`hover:text-white transition-colors ${showInfo ? 'text-blue-400' : ''}`} title="Info"><Info size={15} /></button>
              <button onClick={() => setShowShare(s => !s)} className="hover:text-white transition-colors" title="Share"><Share size={15} /></button>
              <button className="hover:text-white transition-colors" title="Grid"><LayoutGrid size={15} /></button>
              <button className="hover:text-white transition-colors" title="More"><MoreHorizontal size={15} /></button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="px-4 py-2 bg-[#252525] border-b border-black/20 overflow-hidden">
              <div className="flex items-center bg-white/10 rounded-lg px-3 py-1.5 space-x-2">
                <Search size={13} className="text-white/40" />
                <input autoFocus type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search photos..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-white/30" />
                {searchQuery && <button onClick={() => setSearchQuery('')}><X size={12} className="text-white/40 hover:text-white"/></button>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info panel */}
        <AnimatePresence>
          {showInfo && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="px-4 py-2 bg-[#252525] border-b border-black/20 text-xs text-white/50 flex items-center space-x-6">
              <span>📁 {filtered.length} items</span>
              <span>❤️ {photos.filter(p=>p.liked).length} favorites</span>
              <span>📸 {ALL_PHOTOS.length} total photos</span>
              <span>🗓 Last: Oct 16, 2025</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Share panel */}
        <AnimatePresence>
          {showShare && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="px-4 py-2 bg-[#252525] border-b border-black/20 text-xs text-white/60 flex items-center space-x-3">
              <span className="text-white/40">Share via:</span>
              {['✉️ Email','💬 Messages','🐦 Twitter','📋 Copy Link'].map(s => (
                <button key={s} className="bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-md transition-colors">{s}</button>
              ))}
              <button onClick={() => setShowShare(false)} className="ml-auto hover:text-white"><X size={12} /></button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Photo Grid ── */}
        <div
          ref={gridRef}
          className="flex-1 overflow-y-auto p-3 hide-scrollbar relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'pan-y' }}
        >
          {/* Zoom level indicator */}
          <AnimatePresence>
            {showZoomHint && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.15 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full pointer-events-none flex items-center space-x-1.5"
              >
                <LayoutGrid size={12} />
                <span>{zoom} {zoom === 1 ? 'column' : 'columns'}</span>
              </motion.div>
            )}
          </AnimatePresence>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/30 space-y-3">
              <Images size={48} />
              <p className="text-sm font-medium">No Photos</p>
              {active === 'trash' && <p className="text-xs">Recently deleted items appear here</p>}
              {active === 'favorites' && <p className="text-xs">Photos you heart will appear here</p>}
            </div>
          ) : (
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${zoom}, minmax(0, 1fr))` }}>
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  className="group relative overflow-hidden rounded-md bg-white/5 cursor-pointer"
                  style={{ aspectRatio: '4/3' }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: Math.min(i * 0.03, 0.3), duration: 0.25 }}
                >
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onClick={() => setLightbox(photo.id)}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" onClick={() => setLightbox(photo.id)} />

                  {/* Like button */}
                  <button
                    onClick={e => { e.stopPropagation(); toggleLike(photo.id); }}
                    className={`absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200
                      ${photo.liked ? 'opacity-100 bg-black/40' : 'opacity-0 group-hover:opacity-100 bg-black/40'}`}
                    title={photo.liked ? 'Unlike' : 'Like'}
                  >
                    <Heart size={11} className={photo.liked ? 'fill-red-500 text-red-500' : 'text-white'} />
                  </button>

                  {/* Zoom in button */}
                  <button
                    onClick={e => { e.stopPropagation(); setLightbox(photo.id); }}
                    className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                    title="View full"
                  >
                    <ZoomIn size={10} className="text-white" />
                  </button>

                  {/* Label on hover */}
                  {zoom <= 4 && (
                    <div className="absolute bottom-0 left-0 right-0 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-[10px] text-white font-semibold truncate">{photo.label}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Sort Dropdown Portal (fixed, escapes overflow-hidden) ── */}
      <AnimatePresence>
        {showSortMenu && (
          <>
            <div className="fixed inset-0 z-[9998]" onClick={() => setShowSortMenu(false)} />
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.12 }}
              style={{ top: sortMenuPos.top, right: sortMenuPos.right }}
              className="fixed z-[9999] bg-[#2a2a2a] border border-white/10 rounded-lg shadow-2xl overflow-hidden min-w-[140px]"
            >
              {([
                ['date-desc', 'Newest First'],
                ['date-asc',  'Oldest First'],
                ['name-asc',  'Name A–Z'],
                ['name-desc', 'Name Z–A'],
              ] as [SortMode, string][]).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => { setSort(value); setShowSortMenu(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-[12px] transition-colors text-left
                    ${sort === value ? 'text-blue-400 bg-white/5' : 'text-white/80 hover:bg-white/10'}`}
                >
                  {label}
                  {sort === value && (
                    <svg className="w-3 h-3 ml-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && lightboxPhoto && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/95 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Lightbox toolbar */}
            <div className="flex items-center justify-between px-6 py-3 bg-black/60 backdrop-blur-xl flex-shrink-0">
              <button onClick={() => setLightbox(null)} className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
                <X size={18} />
                <span className="text-sm">Close</span>
              </button>

              <div className="flex items-center space-x-1 text-white/50 text-sm">
                <span>{lightboxIndex + 1}</span>
                <span>/</span>
                <span>{filtered.length}</span>
                <span className="ml-2 text-white/70 font-medium">{lightboxPhoto.label}</span>
              </div>

              <div className="flex items-center space-x-4 text-white/70">
                <button
                  onClick={() => toggleLike(lightboxPhoto.id)}
                  className={`hover:text-white transition-colors ${lightboxPhoto.liked ? 'text-red-400' : ''}`}
                  title="Favorite"
                >
                  <Heart size={18} className={lightboxPhoto.liked ? 'fill-red-400' : ''} />
                </button>
                <a href={lightboxPhoto.src} download target="_blank" rel="noopener noreferrer"
                  className="hover:text-white transition-colors" title="Download">
                  <Download size={18} />
                </a>
                <button className="hover:text-white transition-colors" title="Share">
                  <Share size={18} />
                </button>
                <button className="hover:text-white transition-colors" title="Info">
                  <Info size={18} />
                </button>
                <button className="hover:text-white transition-colors" title="More">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>

            {/* Image area */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden">
              {/* Prev */}
              {lightboxIndex > 0 && (
                <button onClick={prevPhoto}
                  className="absolute left-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white transition-all">
                  <ChevronLeft size={22} />
                </button>
              )}

              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxPhoto.id}
                  src={lightboxPhoto.src}
                  alt={lightboxPhoto.label}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  style={{ maxHeight: 'calc(100vh - 140px)' }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>

              {/* Next */}
              {lightboxIndex < filtered.length - 1 && (
                <button onClick={nextPhoto}
                  className="absolute right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white transition-all">
                  <ChevronRight size={22} />
                </button>
              )}
            </div>

            {/* Thumbnail strip */}
            <div className="flex items-center justify-center space-x-1.5 px-4 py-2 bg-black/60 backdrop-blur-xl overflow-x-auto flex-shrink-0">
              {filtered.map(p => (
                <button key={p.id} onClick={() => setLightbox(p.id)}
                  className={`flex-shrink-0 w-12 h-9 rounded overflow-hidden border-2 transition-all ${p.id === lightbox ? 'border-white' : 'border-transparent opacity-50 hover:opacity-80'}`}>
                  <img src={p.src} alt={p.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
