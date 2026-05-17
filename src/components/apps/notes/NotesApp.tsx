'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

type Note = { id: string; title: string; content: string; date: string };

const STORAGE_KEY = 'dhruba-os-notes';

const defaultNotes: Note[] = [
  { id: '1', title: 'Ideas for Next Project', content: 'Ideas for Next Project\n\n1. Build an AI-powered code assistant app\n2. Integrate WebRTC for real-time video chat\n3. Learn Rust for WebAssembly performance optimizations.', date: 'May 16, 2026' },
  { id: '2', title: 'Shopping List', content: 'Shopping List\n\nMacBook Pro M3 Max\nKeychron Keyboard\nCoffee beans ☕', date: 'May 15, 2026' },
  { id: '3', title: 'React Performance Tips', content: 'React Performance Tips\n\n- Use useMemo and useCallback judiciously.\n- Avoid anonymous functions in props to prevent re-renders.\n- Implement code-splitting using React.lazy().', date: 'May 10, 2026' },
];

function loadNotes(): Note[] {
  if (typeof window === 'undefined') return defaultNotes;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultNotes;
  } catch {
    return defaultNotes;
  }
}

function saveNotes(notes: Note[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {}
}

export default function NotesApp() {
  const [notes, setNotes] = useState<Note[]>(defaultNotes);
  const [activeId, setActiveId] = useState<string>('1');
  const [search, setSearch] = useState('');
  const [loaded, setLoaded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load from localStorage on mount (client only)
  useEffect(() => {
    const loaded = loadNotes();
    setNotes(loaded);
    setActiveId(loaded[0]?.id ?? '');
    setLoaded(true);
  }, []);

  // Persist on every change
  useEffect(() => {
    if (loaded) saveNotes(notes);
  }, [notes, loaded]);

  const activeNote = notes.find(n => n.id === activeId);

  const updateContent = useCallback((value: string) => {
    setNotes(prev => prev.map(n =>
      n.id === activeId
        ? { ...n, content: value, title: value.split('\n')[0] || 'New Note', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
        : n
    ));
  }, [activeId]);

  const addNote = () => {
    const id = Date.now().toString();
    const newNote: Note = {
      id,
      title: 'New Note',
      content: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setNotes(prev => [newNote, ...prev]);
    setActiveId(id);
    setTimeout(() => textareaRef.current?.focus({ preventScroll: true }), 50);
  };

  const deleteNote = (id: string) => {
    setNotes(prev => {
      const next = prev.filter(n => n.id !== id);
      if (activeId === id) setActiveId(next[0]?.id ?? '');
      return next;
    });
  };

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  const preview = (content: string) => {
    const lines = content.split('\n').filter(l => l.trim());
    return lines[1] ?? 'No additional text';
  };

  return (
    <div className="flex h-full w-full bg-[#f5f5f0] font-sans text-gray-900 overflow-hidden">

      {/* ─── Left Sidebar ─── */}
      <div className="w-[220px] flex-shrink-0 bg-[#f0ede8] border-r border-gray-200 flex flex-col">
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Notes</span>
          <button
            onClick={addNote}
            className="w-6 h-6 rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors text-lg leading-none"
            title="New Note"
          >
            +
          </button>
        </div>

        {/* Search */}
        <div className="px-2 py-1.5 border-b border-gray-200">
          <div className="flex items-center bg-gray-200/70 rounded-md px-2 py-1 space-x-1">
            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent text-xs outline-none flex-1 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Note list */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.length === 0 && (
            <p className="text-xs text-gray-400 p-3">No notes found</p>
          )}
          {filteredNotes.map(note => (
            <div
              key={note.id}
              onClick={() => setActiveId(note.id)}
              className={`group cursor-pointer px-3 py-2.5 border-b border-gray-200/60 transition-colors ${activeId === note.id ? 'bg-[#ffd60a]/30 border-l-2 border-l-[#ffd60a]' : 'hover:bg-gray-200/50'}`}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-[13px] leading-tight truncate flex-1 pr-1">
                  {note.title || 'New Note'}
                </h3>
                <button
                  onClick={e => { e.stopPropagation(); deleteNote(note.id); }}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all text-xs ml-1 flex-shrink-0"
                  title="Delete"
                >✕</button>
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">{note.date}</p>
              <p className="text-[11px] text-gray-500 mt-0.5 truncate">{preview(note.content)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Editor ─── */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {activeNote ? (
          <>
            {/* Toolbar — matches Apple Notes */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-[#fafafa]">
              <div className="flex items-center space-x-1 text-gray-400">
                {/* Title */}
                <span className="text-sm font-medium text-gray-600 truncate max-w-[160px]">
                  {activeNote.title || 'New Note'}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                {/* Aa */}
                <button className="hover:text-gray-700 transition-colors" title="Format">
                  <span className="text-sm font-medium">Aa</span>
                </button>
                {/* Checklist */}
                <button className="hover:text-gray-700 transition-colors" title="Checklist">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                </button>
                {/* Table */}
                <button className="hover:text-gray-700 transition-colors" title="Table">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 6h18M3 14h18M3 18h18M10 3v18M14 3v18" /></svg>
                </button>
                {/* Attach */}
                <button className="hover:text-gray-700 transition-colors" title="Attach">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                </button>
                {/* Share */}
                <button className="hover:text-gray-700 transition-colors" title="Share">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                </button>
                {/* More */}
                <button className="hover:text-gray-700 transition-colors" title="More">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
                </button>
              </div>
            </div>

            {/* Text area — clean white like Apple Notes */}
            <textarea
              ref={textareaRef}
              key={activeId}
              value={activeNote.content}
              onChange={e => updateContent(e.target.value)}
              placeholder="Start writing..."
              className="flex-1 resize-none outline-none p-6 text-[14px] leading-[1.7] text-gray-800 bg-white placeholder:text-gray-300 font-sans"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
            />

            {/* Footer */}
            <div className="px-4 py-1.5 border-t border-gray-100 bg-[#fafafa]">
              <p className="text-[10px] text-gray-400 text-center">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'} &nbsp;·&nbsp; Auto-saved
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
            <svg className="w-16 h-16 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <p className="text-sm font-medium">No Note Selected</p>
            <button onClick={addNote} className="mt-3 text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors text-gray-600">
              New Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
