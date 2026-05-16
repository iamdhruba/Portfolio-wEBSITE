import React from 'react';
import { useOSStore } from '@/store/useOSStore';

export default function ResumeApp() {
  const user = useOSStore((state) => state.user);

  return (
    <div className="flex h-full w-full flex-col bg-[#050505] font-sans">
      {/* High-End Toolbar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-white/5 p-3 backdrop-blur-xl px-6">
        <div className="flex items-center space-x-3">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">resume.pdf</span>
        </div>
        <button 
          onClick={() => window.print()}
          className="rounded-full bg-purple-600 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-purple-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        >
          Download PDF
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-neutral-100 hide-scrollbar resume-print-area">
        {/* Resume Paper Form */}
        <div className="mx-auto max-w-[800px] bg-white p-8 md:p-12 shadow-2xl text-black">
          
          {/* Header */}
          <div className="text-center mb-8 border-b pb-8">
            <h1 className="text-4xl font-bold mb-1">{user.name}</h1>
            <p className="text-gray-600 mb-2 font-medium">{user.description}</p>
            <p className="text-[13px] text-gray-500">
              dhrubarajchaudhary498@gmail.com | Kathmandu, Nepal | linkedin.com/in/dhruba-raj-chaudhary-bb7b392ba | github.com/iamdhruba
            </p>
          </div>

          {/* Personal Statement */}
          <div className="mb-5">
            <h2 className="text-[14px] font-bold text-gray-500 uppercase tracking-wider mb-2">Personal Statement</h2>
            <p className="text-[13px] leading-relaxed">
              Motivated full-stack developer with hands-on experience in modern web and mobile technologies, including React, Next.js, Node.js, and Flutter. Proficient in building secure, scalable applications and designing premium user interfaces. Bring strong analytical skills, problem-solving capabilities, and a passion for leveraging technical expertise to deliver impactful software solutions.
            </p>
          </div>

          {/* Education */}
          <div className="mb-5">
            <h2 className="text-[14px] font-bold text-gray-500 uppercase tracking-wider mb-2">Education</h2>
            <div className="flex justify-between items-baseline">
              <h3 className="text-[15px] font-bold">Tribhuvan University</h3>
              <span className="text-[13px]">2020 – 2024</span>
            </div>
            <p className="text-[13px] uppercase mt-1">Bachelor in Computer Science and Information Technology (BSc. CSIT)</p>
            <p className="text-[13px] mt-1 italic text-gray-600">Ambikeshwari Campus</p>
            <p className="text-[13px] mt-1">
              RELEVANT COURSEWORK: Software Engineering, Web Technologies, Database Systems, Data Structures & Algorithms, Network Security.
            </p>
          </div>

          {/* Experience */}
          <div className="mb-5">
            <h2 className="text-[14px] font-bold text-gray-500 uppercase tracking-wider mb-2">Experience</h2>
            <div className="flex justify-between items-baseline">
              <h3 className="text-[15px] font-bold">Freelance Full Stack Developer</h3>
              <span className="text-[13px]">2022 – Present</span>
            </div>
            <ul className="list-disc list-outside ml-4 mt-2 text-[13px] space-y-1">
              <li>Architected and deployed end-to-end web and mobile applications for diverse clients.</li>
              <li>Integrated secure payment gateways (eSewa) and real-time communication protocols (Socket.io).</li>
              <li>Optimized application performance, achieving significant reductions in load times and resource usage.</li>
            </ul>
          </div>

          {/* Projects */}
          <div className="mb-5">
            <h2 className="text-[14px] font-bold text-gray-500 uppercase tracking-wider mb-2">Projects</h2>
            <ul className="list-disc list-outside ml-4 text-[13px] space-y-3">
              <li>
                <strong>Trust Nepal Escrow (Flutter, Node.js, eSewa):</strong> A sophisticated P2P escrow platform for secure transactions in Nepal. Features automated mediation, local payment integration, and real-time chat.
              </li>
              <li>
                <strong>macOS Portfolio OS (Next.js, Framer Motion):</strong> A high-fidelity, interactive operating system experience. Implements complex window management, spatial animations, and a responsive application registry.
              </li>
              <li>
                <strong>Focusflow (Flutter, Clean Architecture):</strong> Advanced productivity and focus management ecosystem helping users optimize cognitive load using Pomodoro techniques and task-boxing.
              </li>
              <li>
                <strong>Confess Nepal (Flutter, Node.js, Socket.io):</strong> A real-time anonymous social confession platform featuring community moderation and sentiment-based interaction.
              </li>
              <li>
                <strong>Job Portal (React, MongoDB, Docker):</strong> Full-stack recruitment engine with employer dashboards, automated candidate management, and real-time communication tools.
              </li>
              <li>
                <strong>Veg Typing (React, Vite):</strong> High-performance utility for practicing Nepali typing with real-time accuracy tracking and WPM analytics.
              </li>
            </ul>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-[14px] font-bold text-gray-500 uppercase tracking-wider mb-2">Technical Skills</h2>
            <div className="grid grid-cols-2 gap-y-2 text-[13px]">
              <div><span className="font-bold">Languages:</span> JavaScript (ES6+), TypeScript, Dart, HTML5, CSS3</div>
              <div><span className="font-bold">Frameworks/Libraries:</span> React, Next.js, Flutter, Node.js, Express, Tailwind CSS</div>
              <div><span className="font-bold">Databases:</span> MongoDB, PostgreSQL, Firebase, SQLite</div>
              <div><span className="font-bold">Tools/Others:</span> Git, Docker, REST APIs, Socket.io, eSewa SDK</div>
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          html, body {
            width: 210mm !important;
            height: auto !important;
            overflow: visible !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }
          body * {
            visibility: hidden;
          }
          .resume-print-area, .resume-print-area * {
            visibility: visible;
          }
          .resume-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm !important;
            min-height: 297mm;
            padding: 15mm !important;
            margin: 0 !important;
            background: white !important;
            box-sizing: border-box !important;
            box-shadow: none !important;
          }
          .hide-scrollbar {
            overflow: visible !important;
          }
        }
      `}</style>
    </div>
  );
}
