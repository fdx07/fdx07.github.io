
import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, PERSONAL_PHOTO_URL } from '../constants.ts';

interface HomeNavLinkProps {
  to: string;
  label: string;
  // bgColor and hoverBgColor props are removed as styles are now more specific
}

const HomeNavLink: React.FC<HomeNavLinkProps> = ({ to, label }) => (
  <Link
    to={to}
    className={`
      flex items-center justify-center text-lg md:text-xl font-semibold text-text-on-primary 
      p-6 rounded-lg shadow-lg 
      transform transition-all duration-100 
      bg-transparent border-2 border-white 
      hover:scale-105 hover:bg-brand-core
    `}
    aria-label={`Navigate to ${label}`}
  >
    {label}
  </Link>
);

const HomePage: React.FC = () => {
  const homeNavLinks = NAV_LINKS.filter(link => link.path !== '/'); // Exclude Home itself

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center text-brand-text p-2 sm:p-4 pt-8 md:pt-12 bg-cover bg-center bg-no-repeat bg-fixed relative opacity-0 animate-fadeIn"
      style={{ backgroundImage: "url('../public/bg.png')", animationDelay: '0.1s' }}
      aria-label="Homepage with background image"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

      <header className="text-center mb-8 md:mb-12 relative z-10"> {/* Reduced margin bottom */}
        <img
          src={PERSONAL_PHOTO_URL}
          alt="Personal"
          className="w-48 h-48 md:w-64 md:h-64 rounded-full mx-auto mb-4 shadow-2xl border-4 border-white" // Increased photo size, reduced margin bottom, changed border to white for contrast
        />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1.5">Faisal Durbaa</h1> {/* Reduced text size & margin bottom, changed text to white */}
        <p className="text-base sm:text-lg text-white opacity-90 max-w-2xl mx-auto"> {/* Reduced text size, changed text to white and adjusted opacity */}
          Welcome! This is a central place for my academic projects, technical insights, and professional journey.
        </p>
      </header>

      <main className="w-full max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"> {/* Reduced gap */}
          {homeNavLinks.map(link => (
            <HomeNavLink key={link.name} to={link.path} label={link.name} />
          ))}
        </div>
      </main>
      
      <footer className="mt-8 md:mt-12 text-center text-white opacity-80 text-sm relative z-10"> {/* Reduced margin top, changed text to white and adjusted opacity */}
        <p>&copy; {new Date().getFullYear()} Faisal Durbaa. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
