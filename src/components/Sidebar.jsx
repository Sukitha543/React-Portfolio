import React from 'react';
import hero from '../assets/hero.png';
import { Smartphone, Mail, MapPin, Calendar, LayoutGrid } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaGithub, FaFigma } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="relative bg-[#111111] border border-[#B89C62] rounded-xl flex flex-col items-center pt-24 pb-8 px-6 mt-16 w-full max-w-sm mx-auto shadow-lg shadow-black/50">

      {/* Avatar overlapping top */}
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl overflow-hidden border border-[#B89C62] shadow-xl">
        <img src={hero} alt="name" className="w-full h-full object-cover" />
      </div>

      <h2 className="text-white text-2xl font-bold mb-2">Sukitha Hettimudalige</h2>
      <div className="bg-[#2A2A2A] text-gray-300 text-sm py-1 px-4 rounded-md mb-6 border border-gray-600">
        BEng (Hons) Software Engineering
      </div>

      <div className="flex space-x-3 mb-8">
        <a href="#" className="p-2 bg-transparent border border-gray-700 rounded-md hover:border-[#B89C62] hover:text-[#B89C62] text-gray-400 transition-colors">
          <FaInstagram size={20} />
        </a>
        <a href="#" className="p-2 bg-transparent border border-[#0077b5] rounded-md hover:border-[#B89C62] hover:text-[#B89C62] text-[#0077b5] transition-colors">
          <FaLinkedin size={20} />
        </a>
        <a href="#" className="p-2 bg-transparent border border-gray-400 rounded-md hover:border-[#B89C62] hover:text-[#B89C62] text-gray-200 transition-colors">
          <FaGithub size={20} />
        </a>
      </div>

      <div className="w-full bg-[#1A1A1A] rounded-xl p-5 mb-8 flex flex-col space-y-4">
        <div className="flex items-center space-x-4 border-b border-gray-800 pb-3">
          <div className="bg-black p-2 rounded-md shadow-inner text-gray-400">
            <Smartphone size={18} />
          </div>
          <span className="text-gray-300 text-sm">+94 752323543</span>
        </div>

        <div className="flex items-center space-x-4 border-b border-gray-800 pb-3">
          <div className="bg-black p-2 rounded-md shadow-inner text-gray-400">
            <Mail size={18} />
          </div>
          <span className="text-gray-300 text-sm">sukithachathuranga@gmail.com</span>
        </div>

        <div className="flex items-center space-x-4 border-b border-gray-800 pb-3">
          <div className="bg-black p-2 rounded-md shadow-inner text-gray-400">
            <MapPin size={18} />
          </div>
          <span className="text-gray-300 text-sm">Colombo, Sri Lanka</span>
        </div>
      </div>

      <button className="bg-[#B89C62] hover:bg-[#d4b97a] text-black font-bold py-3 px-8 rounded-lg w-full transition-colors">
        View Resume
      </button>

    </div>
  );
};

export default Sidebar;
