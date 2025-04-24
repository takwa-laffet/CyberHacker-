import React, { useState, useEffect } from "react";
import { Navbar } from "flowbite-react";
import { DarkThemeToggle } from "flowbite-react";

const Nav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check system theme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Function to handle theme changes
    const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        // System prefers dark mode
        document.documentElement.classList.add('dark');
      } else {
        // System prefers light mode
        document.documentElement.classList.remove('dark');
      }
    };

    // Initial check
    handleThemeChange(mediaQuery);

    // Listen for system theme changes
    mediaQuery.addEventListener('change', handleThemeChange);

    // Scroll handler
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Navbar 
    className={`fixed w-full transition-all duration-300 ${
      isScrolled 
        ? 'z-50 py-1 bg-white dark:bg-black shadow-lg md:bg-white md:dark:bg-black' 
        : 'z-50 py-4 bg-white dark:bg-black md:bg-transparent md:dark:bg-transparent'
    }`}
      fluid
    >
      <Navbar.Brand href="/">
        <img 
          src="./assets/images/hacker.png" 
          className={`mr-3 transition-all duration-300 ${
            isScrolled ? 'h-5 sm:h-7' : 'h-6 sm:h-9'
          }`} 
          alt="Logo" 
        />
        <span className={`self-center whitespace-nowrap font-bold dark:text-white transition-all duration-300 ${
          isScrolled ? 'text-lg' : 'text-2xl'
        }`}>
          CyberHacker
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <DarkThemeToggle />
       
       
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {['home', 'Events', 'about', 'CTF'].map((section) => (
          <button 
            key={section}
            onClick={() => scrollToSection(section)}
            className={`block pr-4 pl-3 border-b border-gray-100 text-gray-700 hover:bg-gray-50 font-bold dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white transition-all duration-300 ${
              isScrolled ? 'text-base text-3xl md:text-lg py-2' : 'text-3xl md:text-xl py-2.5'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;