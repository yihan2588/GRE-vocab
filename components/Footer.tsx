
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 p-4 mt-auto">
      <div className="container mx-auto text-center text-sm text-slate-400">
        © {new Date().getFullYear()} GRE Vocabulary Mastery. Learn smarter.
      </div>
    </footer>
  );
};

export default Footer;
