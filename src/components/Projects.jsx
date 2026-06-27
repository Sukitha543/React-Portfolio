import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'projects')); // Connects to Firestore Connection

      const projectData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProjects(projectData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }

  };
  // This will fetch all projects from the 'projects' collection in Firestore
  useEffect(() => {
    fetchProjects();
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
      <h2 className="text-white text-3xl font-bold mb-8">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative bg-[#1A1A1A] border border-gray-800 hover:border-[#B89C62] rounded-xl p-4 transition-all overflow-hidden flex flex-col"
          >
            {/* Project Image */}
            <div className="w-full h-48 rounded-lg mb-4 overflow-hidden border border-gray-700">
              {project.imageUrl ? (
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <span className="text-gray-500 font-bold">No Image</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex justify-between items-start mt-auto">
              <div>
                <h3 className="text-white font-bold text-lg leading-tight mb-1">{project.title}</h3>
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-1 z-20"
                title="View GitHub Repository"
              >
                <FaGithub size={24} />
              </a>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center z-10">
              <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex space-x-4">
                <a
                  href={project.github}
                  className="bg-[#B89C62] text-black font-bold py-2 px-4 rounded-md hover:bg-[#d4b97a] transition-colors text-sm flex items-center gap-2"
                >
                  <FaGithub size={16} /> Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
