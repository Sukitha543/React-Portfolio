import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEducation = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'education')); // Connects to Firestore Connection

      const educationData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setEducation(educationData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }

  };
  // This will fetch all projects from the 'projects' collection in Firestore
  useEffect(() => {
    fetchEducation();
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
      <h2 className="text-white text-3xl font-bold mb-8">Education</h2>

      <div className="flex flex-col space-y-6">
        {education.map((edu, index) => (
          <div
            key={index}
            className="bg-black border border-[#B89C62] rounded-xl p-5 flex flex-col md:flex-row items-start gap-6 hover:shadow-lg hover:shadow-[#B89C62]/20 transition-all"
          >
            <div className="w-25 h-25 shrink-0 bg-white rounded-lg overflow-hidden border border-gray-600 shadow-inner flex items-center justify-center p-1">
              <img src={edu.logoContent} alt={`${edu.school} logo`} className="w-full h-full object-contain" />
            </div>

            <div className="flex flex-col space-y-2">
              <div className="text-gray-300 text-sm md:text-base font-bold">
                <span className="text-white font-bold"></span> {edu.school}
              </div>
              <div className="text-gray-300 text-sm md:text-base">
                <span className="text-white font-bold"></span> {edu.education}
              </div>
              <div className="text-gray-300 text-sm md:text-base">
                <span className="text-white font-bold"></span> {edu.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
