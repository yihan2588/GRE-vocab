
import React from 'react';
import AcademicCapIcon from './icons/AcademicCapIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800 p-4 shadow-md">
      <div className="container mx-auto flex items-center">
        <AcademicCapIcon className="w-8 h-8 text-cyan-400 mr-3" />
        <h1 className="text-2xl font-bold text-white">GRE Vocabulary Mastery</h1>
      </div>
    </header>
  );
};

export default Header;
