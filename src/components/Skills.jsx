import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


const Skills = () => {
  const [skillsList, setSkillsList] = useState([]);
  const [toolsList, setToolsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [skillsSnapshot, toolsSnapshot] = await Promise.all([
        getDocs(collection(db, "skill")),
        getDocs(collection(db, "tool"))
      ]);

      const skillsData = skillsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const toolsData = toolsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setSkillsList(skillsData);
      setToolsList(toolsData);

    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  const IconBox = ({ item }) => (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1A1A1A] border border-gray-800 rounded-xl flex items-center justify-center hover:border-[#B89C62] hover:shadow-lg hover:shadow-[#B89C62]/20 transition-all cursor-pointer overflow-hidden p-2">
        <img src={item.icon} alt={item.name} className="w-full h-full object-contain rounded-md" />
      </div>
      <span className="text-gray-300 text-xs sm:text-sm font-medium text-center leading-tight">{item.name}</span>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-[#B89C62] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#111111] border border-[#B89C62] rounded-xl p-5 sm:p-8 lg:p-10 shadow-lg shadow-black/50 overflow-y-auto">

      <div className="mb-12">
        <h2 className="text-white text-3xl font-bold mb-6 sm:mb-8">Skills</h2>
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-y-6 gap-x-2 sm:gap-6 justify-items-center">
          {skillsList.map((skill, index) => (
            <IconBox key={index} item={skill} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white text-3xl font-bold mb-6 sm:mb-8">Tools & Software</h3>
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-y-6 gap-x-2 sm:gap-6 justify-items-center">
          {toolsList.map((tool, index) => (
            <IconBox key={index} item={tool} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Skills;
