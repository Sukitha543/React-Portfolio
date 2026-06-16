import React from 'react';
import { Server, Smartphone } from 'lucide-react';

const MainContent = () => {
  return (
    <div className="flex-1 bg-[#111111] border border-[#B89C62] rounded-xl p-8 lg:p-10 shadow-lg shadow-black/50">
      
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold mb-6">About</h2>
        <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
          I am a <span className="font-bold text-white">passionate tech enthusiast</span> with a deep interest in <span className="font-bold text-white">Web and App Development</span>. Currently, I am pursuing a B.Tech in Information Technology at CSPIT, CHARUSAT, and am gaining valuable experience as an <span className="font-bold text-white">SDE Intern at IBM</span>. I possess expertise in <span className="font-bold text-white">Flutter Development, UI/UX Design, React.js, and Tailwind CSS</span> for web development, as well as <span className="font-bold text-white">Node.js and Express.js</span> for robust backend solutions.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
          Noteworthy Achievement of my career is ranking in <span className="font-bold text-white">Top 10 Teams at hackathon</span> hosted by <span className="font-bold text-white">IEEE</span> SB at DAIICT, Gandhinagar. As UI/UX Designer my several apps and websites designs are currently in used in production.
        </p>
        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
          Additionally, I have did internship as Flutter Developer, UI/UX Designer and Java Developer. This diverse experience has provided me with a holistic <span className="font-bold text-white">understanding on front-end and back-end technologies, as well as user experience</span>, allowing me to make meaningful contributions across various facets of technology projects.
        </p>
      </div>

      <div>
        <h3 className="text-white text-2xl font-bold mb-6">What I Do</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Card 1 */}
          <div className="bg-[#1A1A1A] rounded-xl p-5 border border-gray-800 flex flex-col md:flex-row gap-4 items-center md:items-start hover:border-[#B89C62] transition-colors group">
            <div className="w-24 h-24 shrink-0 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
              <Server size={40} />
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Back-End Development</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Skilled in <span className="font-bold text-gray-300">Node.js, Express.js, Java</span> I build scalable backend systems and efficient server-side solutions using databases like <span className="font-bold text-gray-300">MongoDB</span> and <span className="font-bold text-gray-300">MySQL</span> for dynamic applications.
              </p>
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="bg-[#1A1A1A] rounded-xl p-5 border border-gray-800 flex flex-col md:flex-row gap-4 items-center md:items-start hover:border-[#B89C62] transition-colors group">
            <div className="w-24 h-24 shrink-0 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
              <Smartphone size={40} />
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Flutter App Development</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Proficient in <span className="font-bold text-gray-300">Flutter and Firebase</span>, I build cross-platform, high-performance mobile apps with real-time data and seamless backend integration.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MainContent;
