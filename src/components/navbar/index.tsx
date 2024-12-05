'use client';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Effect to handle dark mode class on html element
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-black text-gray-800 dark:text-white py-4 px-6 shadow-md transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          <Image 
            src="/images/download.jpg" 
            alt="Kosan Logo" 
            width={40} 
            height={40} 
            className="dark:invert"
          />
          Griya Amaliyah
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-6">
          <Link href="#" className="hover:text-blue-500 dark:hover:text-[#3498db] transition-colors">Beranda</Link>
          <Link href="#" className="hover:text-blue-500 dark:hover:text-[#3498db] transition-colors">Kamar</Link>
          <Link href="#" className="hover:text-blue-500 dark:hover:text-[#3498db] transition-colors">Fasilitas</Link>
          <Link href="#" className="hover:text-blue-500 dark:hover:text-[#3498db] transition-colors">Kontak</Link>
        </div>

        {/* Right Side - Dark Mode and Auth Buttons */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden md:block"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* Login and Register Buttons - Desktop */}
          <div className="hidden md:flex space-x-4">
            <Link 
              href="/login" 
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 md:hidden bg-white dark:bg-black shadow-lg z-50">
            <div className="flex flex-col space-y-4 p-4">
              <Link 
                href="#" 
                className="hover:text-blue-500 dark:hover:text-[#3498db] transition-colors"
                onClick={toggleMobileMenu}
              >
                Beranda
              </Link>
              <Link 
                href="#" 
                className="hover:text-blue-500 dark:hover:text-[#3498db] transition-colors"
                onClick={toggleMobileMenu}
              >
                Kamar
              </Link>
              <Link 
                href="#" 
                className="hover:text-blue-500 dark:hover:text-[#3498db] transition-colors"
                onClick={toggleMobileMenu}
              >
                Fasilitas
              </Link>
              <Link 
                href="#" 
                className="hover:text-blue-500 dark:hover:text-[#3498db] transition-colors"
                onClick={toggleMobileMenu}
              >
                Kontak
              </Link>

              {/* Mobile Login and Register Buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-center border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="px-4 py-2 text-center bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Register
                </Link>
              </div>

              {/* Mobile Dark Mode Toggle */}
              <button 
                onClick={toggleDarkMode}
                className="mt-4 w-full p-2 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="mr-2">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};