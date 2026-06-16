import React from 'react';

const Navbar = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="w-full py-6 px-8 flex justify-between items-center max-w-7xl mx-auto">
      <div className="text-[#B89C62] text-3xl font-logo tracking-widest">
        SUKI CHAN
      </div>
      <div className="hidden md:flex space-x-8 text-lg font-medium">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`transition-colors hover:text-[#B89C62] ${
              activeSection === item.id ? 'text-[#B89C62] font-bold' : 'text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
