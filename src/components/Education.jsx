import React from 'react';

const Education = () => {
  const experiences = [
    {
      school: 'University of Staffordshire',
      education: 'BEng (Hons) Software Engineering',
      duration: '2024 - Present',
      logoContent: (
        <div className="w-16 h-16 shrink-0 bg-white rounded-lg flex items-center justify-center border border-gray-300 shadow-inner">
          <div className="text-blue-600 font-bold text-2xl font-logo">A</div>
        </div>
      ),
    },
    {
      school: 'CIMA',
      education: 'Completed BA2 and BA3 sucessfully',
      duration: '2022 - Present',
      logoContent: (
        <div className="w-16 h-16 shrink-0 bg-gray-500 rounded-lg flex items-center justify-center border border-gray-600 shadow-inner">
          <div className="text-black font-bold text-2xl font-logo">B</div>
        </div>
      ),
    },
    {
      school: 'Royal Institute International School',
      education: 'GCE Ordinary Level (2018) , GCE Advanced Level (2021) - Commerce',
      duration: '2006 - 2022',
      logoContent: (
        <div className="w-16 h-16 shrink-0 bg-gradient-to-br from-blue-900 to-gray-800 rounded-lg flex items-center justify-center border border-gray-700 shadow-inner">
          <div className="text-blue-300 font-bold text-2xl font-logo">C</div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 bg-[#111111] border border-[#B89C62] rounded-xl p-8 lg:p-10 shadow-lg shadow-black/50">
      <h2 className="text-white text-3xl font-bold mb-8">Education</h2>

      <div className="flex flex-col space-y-6">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="bg-black border border-[#B89C62] rounded-xl p-5 flex flex-col md:flex-row items-start gap-6 hover:shadow-lg hover:shadow-[#B89C62]/20 transition-all"
          >
            {exp.logoContent}

            <div className="flex flex-col space-y-2">
              <div className="text-gray-300 text-sm md:text-base">
                <span className="text-white font-bold"></span> {exp.school}
              </div>
              <div className="text-gray-300 text-sm md:text-base">
                <span className="text-white font-bold"></span> {exp.education}
              </div>
              <div className="text-gray-300 text-sm md:text-base">
                <span className="text-white font-bold"></span> {exp.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
