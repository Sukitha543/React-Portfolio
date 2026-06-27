import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Smartphone, Mail, MapPin, Calendar, LayoutGrid } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaGithub, FaFigma } from 'react-icons/fa';

const Sidebar = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const docRef = doc(db, "profile", "personalInfo");

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="w-10 h-10 border-4 border-[#B89C62] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#111111] border border-[#B89C62] rounded-xl flex flex-col items-center pt-24 pb-8 px-6 mt-16 w-full max-w-sm mx-auto shadow-lg shadow-black/50">

      {/* Avatar overlapping top */}
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl overflow-hidden border border-[#B89C62] shadow-xl">
        <img src={profile.profilePic} alt="name" className="w-full h-full object-cover" />
      </div>

      <h2 className="text-white text-2xl font-bold mb-2">{profile.name}</h2>
      <div className="bg-[#2A2A2A] text-gray-300 text-sm py-1 px-4 rounded-md mb-6 border border-gray-600">
        {profile.title}
      </div>

      <div className="flex space-x-3 mb-8">
        <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-transparent border border-gray-700 rounded-md hover:border-[#B89C62] hover:text-[#B89C62] text-gray-400 transition-colors">
          <FaInstagram size={20} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-transparent border border-[#0077b5] rounded-md hover:border-[#B89C62] hover:text-[#B89C62] text-[#0077b5] transition-colors">
          <FaLinkedin size={20} />
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-transparent border border-gray-400 rounded-md hover:border-[#B89C62] hover:text-[#B89C62] text-gray-200 transition-colors">
          <FaGithub size={20} />
        </a>
      </div>

      <div className="w-full bg-[#1A1A1A] rounded-xl p-5 mb-8 flex flex-col space-y-4">
        <div className="flex items-center space-x-4 border-b border-gray-800 pb-3">
          <div className="bg-black p-2 rounded-md shadow-inner text-gray-400">
            <Smartphone size={18} />
          </div>
          <span className="text-gray-300 text-sm">{profile.phone}</span>
        </div>

        <div className="flex items-center space-x-4 border-b border-gray-800 pb-3">
          <div className="bg-black p-2 rounded-md shadow-inner text-gray-400">
            <Mail size={18} />
          </div>
          <span className="text-gray-300 text-sm">{profile.email}</span>
        </div>

        <div className="flex items-center space-x-4 border-b border-gray-800 pb-3">
          <div className="bg-black p-2 rounded-md shadow-inner text-gray-400">
            <MapPin size={18} />
          </div>
          <span className="text-gray-300 text-sm">{profile.location}</span>
        </div>
      </div>

      <button className="bg-[#B89C62] hover:bg-[#d4b97a] text-black font-bold py-3 px-8 rounded-lg w-full transition-colors">
        <a href={profile.resume} target="_blank" rel="noopener noreferrer">View Resume</a>
      </button>

    </div>
  );
};

export default Sidebar;
