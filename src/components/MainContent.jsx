import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Smartphone } from 'lucide-react';
import { BiDesktop } from 'react-icons/bi';

const iconMap = {
  desktop: <BiDesktop size={40} />,
  smartphone: <Smartphone size={40} />
};

const MainContent = () => {
  const [about, setAbout] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const aboutRef = doc(db, "about", "content");

      const [aboutSnap, servicesSnap] = await Promise.all([
        getDoc(aboutRef),
        getDocs(collection(db, "services"))
      ]);

      if (aboutSnap.exists()) {
        setAbout(aboutSnap.data());
      }

      const servicesData = servicesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setServices(servicesData);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-[#B89C62] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="flex-1 bg-[#111111] border border-[#B89C62] rounded-xl p-8 lg:p-10 shadow-lg shadow-black/50">

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold mb-6">About</h2>
        <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
          {about?.paragraph1}
        </p>
        <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
          {about?.paragraph2}
        </p>
      </div>

      <div>
        <h3 className="text-white text-2xl font-bold mb-6">What I Do</h3>
        {/* Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#1A1A1A] rounded-xl p-5 border border-gray-800 flex flex-col md:flex-row gap-4 items-center md:items-start hover:border-[#B89C62] transition-colors group"
            >
              <div className="w-24 h-24 shrink-0 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">

                {/* Icon goes here */}
                {iconMap[service.icon]}

              </div>

              <div>
                <h4 className="text-white font-bold mb-2">
                  {service.title}
                </h4>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>



  );
};

export default MainContent;
