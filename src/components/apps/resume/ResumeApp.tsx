import React from 'react';

export default function ResumeApp() {
  return (
    <div className="flex h-full w-full flex-col bg-[#050505] font-sans">
      {/* High-End Toolbar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-white/5 p-3 backdrop-blur-xl px-6">
        <div className="flex items-center space-x-3">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">resume.pdf</span>
        </div>
        <a 
          href="/resume.pdf"
          download="resume.pdf"
          className="rounded-full bg-purple-600 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-purple-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        >
          Download PDF
        </a>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-neutral-100 hide-scrollbar">
        {/* Resume Paper Form */}
        <div className="mx-auto max-w-[800px] bg-white p-8 md:p-12 shadow-2xl text-black">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8 border-b pb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0 bg-gray-50">
              <img src="/image/pp.jpeg" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold mb-1">Dhruba Raj Chaudhary</h1>
              <p className="text-gray-600 mb-2 font-medium">Full Stack Developer</p>
              <p className="text-[13px] text-gray-500 max-w-md">
                dhrubarajchaudhary498@gmail.com | Kathmandu, Nepal | linkedin.com/in/dhruba-raj-chaudhary-bb7b392ba | github.com/iamdhruba
              </p>
            </div>
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
              <h3 className="font-bold text-[14px]">Tribhuvan University, <span className="font-normal">Kathmandu, Nepal</span></h3>
              <span className="text-[13px]">2020 – 2024</span>
            </div>
            <p className="text-[13px] uppercase mt-1">Bachelor in Computer Science and Information Technology (BSc. CSIT)</p>
            <p className="text-[13px] mt-1 italic text-gray-600">Ambikeshwari Campus</p>
            <p className="text-[13px] mt-1">
              RELEVANT COURSEWORK: Software Engineering, Web Technologies, Database Systems, Data Structures & Algorithms, Network Security.
            </p>
          </div>

          {/* Work Experience */}
          <div className="mb-5">
            <h2 className="text-[14px] font-bold text-gray-500 uppercase tracking-wider mb-2">Work Experience</h2>
            
            <div className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-[14px]">Freelance Full Stack Developer</h3>
                <span className="text-[13px]">2022 – Present</span>
              </div>
              <p className="text-[13px] italic mb-1 text-gray-600">Kathmandu, Nepal</p>
              <ul className="list-disc list-outside ml-4 text-[13px] space-y-1">
                <li>Architected and deployed the Trust Nepal Escrow mobile platform using Flutter and Firebase, achieving 99.9% uptime.</li>
                <li>Developed a robust administrative dashboard for real-time transaction monitoring and dispute resolution.</li>
                <li>Engineered high-performance web solutions using Next.js 14+ and Tailwind CSS, focusing on accessibility and Core Web Vitals.</li>
                <li>Integrated secure payment gateways and multi-factor authentication systems for various client applications.</li>
              </ul>
            </div>
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

          {/* Languages & Technologies */}
          <div>
            <h2 className="text-[14px] font-bold text-gray-500 uppercase tracking-wider mb-2">Languages & Technologies</h2>
            <ul className="list-disc list-outside ml-4 text-[13px] space-y-1">
              <li><strong>Languages:</strong> JavaScript, TypeScript, Dart, HTML, CSS, SQL</li>
              <li><strong>Technologies:</strong> React, Next.js, Node.js, Express, Flutter, MongoDB, Firebase, Tailwind CSS, Git</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
