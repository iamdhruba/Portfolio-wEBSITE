import React, { useState } from 'react';
import { useOSStore } from '@/store/useOSStore';
import { WallpaperID } from '@/types/os';
import { User, Image, Monitor, Settings, CheckCircle2, Upload, Plus } from 'lucide-react';

const WALLPAPERS: { id: WallpaperID; label: string; preview: string }[] = [
  { id: 'ventura-day', label: 'Ventura Day', preview: '/wallpapers/ventura-day.jpg' },
  { id: 'ventura-night', label: 'Ventura Night', preview: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=400' },
  { id: 'sonoma-day', label: 'Sonoma Day', preview: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=400' },
  { id: 'sonoma-night', label: 'Sonoma Night', preview: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=400' },
  { id: 'abstract-blue', label: 'Abstract Blue', preview: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400' },
];

type Tab = 'profile' | 'wallpaper';

export default function SettingsApp() {
  const { user, setUser, wallpaper, setWallpaper } = useOSStore();
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ profilePic: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWallpaperUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWallpaper(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isCustomWallpaper = !WALLPAPERS.some(wp => wp.id === wallpaper);

  return (
    <div className="flex h-full w-full bg-[#1c1c1e] text-white font-sans">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/5 bg-[#2c2c2e]/50 backdrop-blur-xl p-4 flex flex-col space-y-1">
        <div className="px-3 pb-4">
          <h1 className="text-xl font-bold tracking-tight">Settings</h1>
        </div>
        
        <div className="pt-2 pb-2 px-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Personalization</div>
        
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all group ${
            activeTab === 'profile' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-white/5 text-white/70'
          }`}
        >
          <User size={18} className={activeTab === 'profile' ? 'text-white' : 'group-hover:text-blue-400 transition-colors'} />
          <span className="text-[13px] font-medium">Profile Info</span>
        </button>

        <button 
          onClick={() => setActiveTab('wallpaper')}
          className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all group ${
            activeTab === 'wallpaper' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-white/5 text-white/70'
          }`}
        >
          <Monitor size={18} className={activeTab === 'wallpaper' ? 'text-white' : 'group-hover:text-purple-400 transition-colors'} />
          <span className="text-[13px] font-medium">Wallpaper</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-10 space-y-16 hide-scrollbar">
        
        {activeTab === 'profile' && (
          <section className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Profile & Identity</h2>
              <div className="fd text-[10px] uppercase tracking-widest text-white/30 px-3 py-1 border border-white/10 rounded-full">v4.2.0 Stable</div>
            </div>
            
            <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl p-10 shadow-2xl">
              <div className="flex flex-col @md:flex-row items-center @md:items-start gap-12">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <label htmlFor="profile-upload" className="relative block w-32 h-32 rounded-3xl overflow-hidden ring-1 ring-white/20 shadow-2xl transition-transform group-hover:scale-105 duration-500 cursor-pointer">
                    <img 
                      src={user.profilePic} 
                      alt="Profile" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all backdrop-blur-sm">
                      <Upload size={24} className="mb-1 text-white" />
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white">Upload New</span>
                    </div>
                    <input 
                      id="profile-upload"
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>

                <div className="flex-1 w-full space-y-8">
                  <div className="grid grid-cols-1 @lg:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-1">Display Name</label>
                      <input 
                        type="text" 
                        value={user.name}
                        onChange={(e) => setUser({ name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500/50 rounded-2xl px-5 py-3.5 text-sm outline-none transition-all placeholder:text-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-1">Professional Title</label>
                      <input 
                        type="text" 
                        value={user.description}
                        onChange={(e) => setUser({ description: e.target.value })}
                        placeholder="e.g. Senior Software Engineer"
                        className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500/50 rounded-2xl px-5 py-3.5 text-sm outline-none transition-all placeholder:text-white/10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-1">Profile Image URL</label>
                    <div className="relative group">
                      <input 
                        type="text" 
                        value={user.profilePic}
                        onChange={(e) => setUser({ profilePic: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500/50 rounded-2xl px-5 py-3.5 pl-12 text-xs font-mono outline-none transition-all placeholder:text-white/10"
                      />
                      <Image size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <p className="text-[10px] text-white/20 ml-1">You can either upload a file above or paste a direct image link here.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'wallpaper' && (
          <section className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Desktop Wallpaper</h2>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-widest cursor-pointer transition-all">
                  <Plus size={14} />
                  Upload Custom
                  <input type="file" className="hidden" accept="image/*" onChange={handleWallpaperUpload} />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 gap-6">
              {/* Custom Wallpaper Preview (if active) */}
              {isCustomWallpaper && (
                <div className="group relative aspect-[16/10] rounded-2xl overflow-hidden border-2 border-blue-500 shadow-2xl shadow-blue-500/20 scale-[0.98]">
                  <img src={wallpaper} alt="Custom Wallpaper" className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-2.5 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Custom Image</span>
                      <CheckCircle2 size={14} className="text-blue-400" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <div className="bg-blue-500 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-lg">Current</div>
                  </div>
                </div>
              )}

              {WALLPAPERS.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => setWallpaper(wp.id)}
                  className={`group relative aspect-[16/10] rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
                    wallpaper === wp.id 
                      ? 'border-blue-500 shadow-2xl shadow-blue-500/20 scale-[0.98]' 
                      : 'border-transparent hover:border-white/20'
                  }`}
                >
                  <img 
                    src={wp.preview} 
                    alt={wp.label} 
                    className={`w-full h-full object-cover transition-transform duration-1000 ${
                      wallpaper === wp.id ? 'scale-100' : 'scale-110 group-hover:scale-100'
                    }`} 
                  />
                  
                  <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${
                    wallpaper === wp.id ? 'opacity-0' : 'opacity-20 group-hover:opacity-0'
                  }`} />

                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-2.5 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">{wp.label}</span>
                      {wallpaper === wp.id && <CheckCircle2 size={14} className="text-blue-400" />}
                    </div>
                  </div>

                  {wallpaper === wp.id && (
                    <div className="absolute top-3 left-3">
                      <div className="bg-blue-500 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-lg">Current</div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
