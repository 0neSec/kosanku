'use client';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('USER'); // Default to USER role
  const router = useRouter();

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        setIsLoggedIn(true);
        setUsername(userData.name || userData.email || 'Pengguna');
        setUserRole(userData.role || 'USER'); // Set user role
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle profile menu
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Handle logout
  const handleLogout = () => {
    // Remove user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Update state
    setIsLoggedIn(false);
    setUsername('');
    setUserRole('USER');
    
    // Redirect to home or login page
    router.push('/login');
  };

  return (
    <nav className="bg-white text-gray-800 py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          <Image 
            src="/images/download.jpg" 
            alt="Kosan Logo" 
            width={40} 
            height={40} 
          />
          Griya Amaliyah
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-6">
          <Link href="#" className="hover:text-blue-500 transition-colors">Beranda</Link>
          <Link href="#" className="hover:text-blue-500 transition-colors">Kamar</Link>
          <Link href="#" className="hover:text-blue-500 transition-colors">Fasilitas</Link>
          <Link href="#" className="hover:text-blue-500 transition-colors">Kontak</Link>
        </div>

        {/* Right Side - Auth Buttons/Profile */}
        <div className="flex items-center space-x-4">
          {/* Conditional Rendering based on Login State */}
          {isLoggedIn ? (
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center">
                <span className="mr-2 text-sm">Hai, {username}</span>
                <div className="relative">
                  <button 
                    onClick={toggleProfileMenu}
                    className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center"
                  >
                    {username.charAt(0).toUpperCase()}
                  </button>
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                      <div className="py-1">
                        <Link 
                          href="/profile" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          Profil
                        </Link>
                        {/* Conditionally render Dashboard link based on role */}
                        {userRole === 'ADMIN' && (
                          <Link 
                            href="/dashboard" 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileMenuOpen(false)}
                          >
                            Dashboard Admin
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Keluar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </nav>
  );
};