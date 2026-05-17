import React, { useState, useRef, useEffect } from 'react';
import { useWindowStore } from '@/store/useWindowStore';

export default function Terminal() {
  const [history, setHistory] = useState([
    { cmd: '', output: 'Welcome to DhrubaOS Terminal v1.0' },
    { cmd: '', output: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const openWindow = useWindowStore(state => state.openWindow);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(newIdx);
      setInput(cmdHistory[newIdx] ?? '');
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(newIdx);
      setInput(newIdx === -1 ? '' : cmdHistory[newIdx] ?? '');
      return;
    }
    if (e.key !== 'Enter') return;

    const cmd = input.trim().toLowerCase();
    let output = '';

    if (cmd) {
      setCmdHistory(prev => [cmd, ...prev]);
      setHistoryIdx(-1);
    }

    switch (cmd) {
      case 'help':
        output = 'Commands: help | whoami | skills | projects | contact | date | clear\nopen <app>  — opens an app (safari, projects, resume, contact, notes, terminal, gallery, calculator)';
        break;
      case 'whoami':
        output = 'Dhruba Raj Chaudhary — Digital Architect & Full Stack Developer\nBased in: Kathmandu, Nepal 🇳🇵 (L/LON: 27.7°N 85.3°E)\n\nBio: I engineer seamless, high-performance web and mobile experiences.\nBridging the gap between flawless aesthetics and uncompromising technical architecture.\nStatus: Systems Online | Uptime: 99.9%';
        break;
      case 'skills':
        output = '[ CORE COMPETENCIES ]\n• Frontend Engineering : React, Next.js, TypeScript, Tailwind CSS, Framer Motion\n• Backend Architecture : Node.js, Express, PostgreSQL, MongoDB, Prisma, Redis\n• Mobile Development   : Flutter, Dart, Firebase, SQLite\n• UI/UX Interaction    : Figma, Design Systems, Prototyping\n• Tooling & DevOps     : Git, Vercel, REST APIs, Microservices';
        break;
      case 'projects':
        output = '[ SYSTEM ARCHIVES - SELECTED WORKS ]\n1. Trust Nepal Escrow  (2024) - Automated escrow system (Flutter, Firebase, Node.js)\n2. Focusflow           (2023) - Distraction-free task ecosystem (Dart, SQLite, Bloc)\n3. Confess Nepal       (2024) - Anonymous social platform (Next.js, PostgreSQL)\n4. Job Portal          (2024) - High-performance recruitment platform (Next.js, Prisma)\n5. Veg Typing          (2023) - Advanced transliteration engine (TypeScript, i18n)\n6. Loksewa Tayari      (2024) - Public Service exam prep platform (Flutter, Laravel, MySQL)\n\n* Type "open safari" to view full case studies.';
        break;
      case 'contact':
        output = 'Email : dhrubarajchaudhary498@gmail.com\nGitHub: github.com/iamdhruba\nLinkedIn: linkedin.com/in/saydhruba';
        break;
      case 'date':
        output = new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'open safari':
      case 'open projects':
      case 'open resume':
      case 'open contact':
      case 'open notes':
      case 'open terminal':
      case 'open gallery':
      case 'open calculator': {
        const appId = cmd.split(' ')[1] === 'gallery' ? 'skills' : cmd.split(' ')[1];
        openWindow(appId as any);
        output = `Opening ${cmd.split(' ')[1]}...`;
        break;
      }
      case '':
        break;
      default:
        output = `command not found: ${cmd}\nType "help" for available commands.`;
    }

    setHistory(prev => [...prev, { cmd, output }]);
    setInput('');
  };

  return (
    <div
      ref={terminalRef}
      className="h-full w-full overflow-y-auto bg-[#0d0d0d] p-4 font-mono text-sm text-green-400 hide-scrollbar cursor-text"
      onClick={() => document.getElementById('term-input')?.focus()}
    >
      {history.map((h, i) => (
        <div key={i} className="mb-1">
          {h.cmd && (
            <div className="flex">
              <span className="text-blue-400 mr-2 select-none">dhruba@macbook ~ %</span>
              <span className="text-white">{h.cmd}</span>
            </div>
          )}
          {h.output && <div className="text-green-400/80 whitespace-pre-wrap ml-0 mt-0.5">{h.output}</div>}
        </div>
      ))}
      <div className="flex items-center">
        <span className="text-blue-400 mr-2 select-none">dhruba@macbook ~ %</span>
        <input
          id="term-input"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent outline-none text-white caret-green-400"
          autoComplete="off"
          spellCheck={false}
          autoFocus
        />
      </div>
    </div>
  );
}
