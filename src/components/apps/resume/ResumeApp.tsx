import React from 'react';

export default function ResumeApp() {
  return (
    <div className="flex h-full w-full flex-col bg-[#050505] font-sans">
      {/* High-End Toolbar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-white/5 p-3 backdrop-blur-xl px-6">
        <div className="flex items-center space-x-3">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Dhruba_CV_2024.pdf</span>
        </div>
        <button 
          onClick={() => window.print()}
          className="rounded-full bg-purple-600 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-purple-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        >
          Print PDF
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-neutral-100 hide-scrollbar">
        {/* Resume Paper Form */}
        <div className="mx-auto max-w-[800px] bg-white p-8 md:p-12 shadow-2xl text-black">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-1">Dhruba Raj Chaudhary</h1>
            <p className="text-gray-600 mb-2">Full Stack Developer</p>
            <p className="text-[13px]">
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
              <h3 className="font-bold text-[14px]">Tribhuvan University, <span className="font-normal">Kathmandu, Nepal</span></h3>
              <span className="text-[13px]">2020 – 2024</span>
            </div>
            <p className="text-[13px] uppercase mt-1">Bachelor in Computer Science and Information Technology (BSc. CSIT)</p>
            <p className="text-[13px] mt-1 italic text-gray-600">Patan Multiple Campus</p>
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
                <strong>Escrow Nepal (Flutter, Firebase):</strong> A secure, intermediary payment platform designed for P2P transactions. Features automated verification, real-time balance tracking, and end-to-end encryption.
              </li>
              <li>
                <strong>macOS Portfolio OS (Next.js, Framer Motion):</strong> A high-fidelity, interactive operating system experience built with React. Implements complex window management logic, spatial animations, and a responsive application registry.
              </li>
              <li>
                <strong>Global Job Portal (Next.js, Prisma, PostgreSQL):</strong> A scalable employment platform with intelligent applicant matching, automated resume parsing, and employer analytics dashboard.
              </li>
              <li>
                <strong>Himalayan Travel (React, GSAP):</strong> An immersive, animation-heavy travel discovery engine featuring 3D parallax effects and high-resolution media optimization.
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
