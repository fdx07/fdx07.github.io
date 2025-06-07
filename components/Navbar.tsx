import React, { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import MenuIcon from './icons/MenuIcon';
import CloseIcon from './icons/CloseIcon';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <nav className="bg-background-800/90 backdrop-blur-md shadow-lg sticky top-0 z-50"> {/* bg-white/90 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-brand-text hover:opacity-80 transition-colors"> {/* text-dark-blue */}
              Faisal Durbaa
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            {NAV_LINKS.map((link) => (
              <RouterNavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-core text-text-on-primary' // bg-dark-blue text-white
                      : 'text-brand-text hover:bg-brand-core hover:text-text-on-primary' // text-navy hover:bg-dark-blue hover:text-white
                  }`
                }
              >
                {link.name}
              </RouterNavLink>
            ))}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-brand-text hover:text-brand-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-core p-2 rounded-md" // text-navy hover:text-dark-blue, ring-dark-blue
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-background-800 p-2 space-y-1 sm:px-3 shadow-xl z-40"> {/* bg-white */}
          {NAV_LINKS.map((link) => (
            <RouterNavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)} // Close menu on link click
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-core text-text-on-primary' // bg-dark-blue text-white
                    : 'text-brand-text hover:bg-brand-core hover:text-text-on-primary'// text-navy hover:bg-dark-blue hover:text-white
                }`
              }
            >
              {link.name}
            </RouterNavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;