
import React from 'react';

interface AcademicCapIconProps {
  className?: string;
}
const AcademicCapIcon: React.FC<AcademicCapIconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.25c4.25 0 8.224-1.684 11.25-4.686a48.62 48.62 0 0 1-11.48 3.527c-.81-.098-1.564-.23-2.257-.427m-11.962 0A60.436 60.436 0 0 0 12 10.147m0 0A48.617 48.617 0 0 1 12 2.25c2.689 0 5.156.901 7.137 2.389m0-2.389a23.85 23.85 0 0 0-4.354-1.109A48.617 48.617 0 0 0 12 2.25c-2.689 0-5.156.901-7.137 2.389m7.137 0a23.85 23.85 0 0 1 4.354 1.109m-4.354-1.109a23.85 23.85 0 0 0-4.354 1.109m0 0A48.617 48.617 0 0 0 12 10.147m0 0a60.436 60.436 0 0 1-7.738-1.892M12 10.147a60.438 60.438 0 0 0 7.738-1.892" />
  </svg>
);
export default AcademicCapIcon;
