import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
  const projectList = [
    {
      title: 'Resto Mania (Flutter)',
      subtitle: '',
      link: '#',
      github: '#',
      description: 'A comprehensive restaurant management mobile application built with Flutter, featuring real-time menu updates and order tracking.',
      color: 'bg-orange-200',
    },
    {
      title: 'Furniture Website ( React + PHP )',
      subtitle: '',
      link: '#',
      github: '#',
      description: 'An elegant e-commerce platform for furniture, integrating a React frontend with a robust PHP backend for inventory management.',
      color: 'bg-slate-500',
    },
    {
      title: 'Case Study E - Learning Website',
      subtitle: '',
      link: '#',
      github: '#',
      description: 'A detailed UI/UX case study and prototype for a modern e-learning platform, focusing on user engagement and accessibility.',
      color: 'bg-purple-200',
    },
    {
      title: 'Responsive Design Demo (Figma)',
      subtitle: '',
      link: '#',
      github: '#',
      description: 'A collection of highly responsive UI components designed in Figma, ready to be handed off to developers.',
      color: 'bg-gray-300',
    },
    {
      title: 'Industri Metrics - Android App',
      subtitle: '',
      link: '#',
      github: '#',
      description: 'An industrial metrics tracking application providing real-time analytics and data visualization for factory floors.',
      color: 'bg-blue-600',
    },
    {
      title: 'Wallpaper App - Android App',
      subtitle: '',
      link: '#',
      github: '#',
      description: 'A vibrant wallpaper application allowing users to browse, download, and set high-resolution wallpapers directly from their device.',
      color: 'bg-gray-400',
    },
  ];

  return (
    <div className="flex-1 bg-[#111111] border border-[#B89C62] rounded-xl p-8 lg:p-10 shadow-lg shadow-black/50">
      <h2 className="text-white text-3xl font-bold mb-8">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectList.map((project, index) => (
          <div
            key={index}
            className="group relative bg-[#1A1A1A] border border-gray-800 hover:border-[#B89C62] rounded-xl p-4 transition-all overflow-hidden flex flex-col"
          >
            {/* Image Placeholder */}
            <div className={`w-full h-48 rounded-lg mb-4 flex items-center justify-center shadow-inner ${project.color}`}>
              {/* Replace this div with an actual <img> tag when you have the assets */}
              <span className="text-black/50 font-bold text-lg uppercase px-4 text-center">
                {project.title} Image
              </span>
            </div>

            {/* Details */}
            <div className="flex justify-between items-start mt-auto">
              <div>
                <h3 className="text-white font-bold text-lg leading-tight mb-1">{project.title}</h3>
                {project.subtitle && (
                  <a href={project.link} className="text-[#B89C62] text-xs hover:underline">
                    {project.subtitle}
                  </a>
                )}
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
