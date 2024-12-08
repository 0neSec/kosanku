"use client";

import { useState, useEffect } from 'react';

export function UnauthorizedModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Cek cookie unauthorized_access
    const unauthorizedAccess = document.cookie
      .split('; ')
      .find(row => row.startsWith('unauthorized_access='));

    if (unauthorizedAccess) {
      setIsOpen(true);
      
      // Hapus cookie
      document.cookie = 'unauthorized_access=; path=/; max-age=0';
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
    >
      <div 
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          maxWidth: '400px',
          width: '90%'
        }}
      >
        <h2 style={{ color: 'red', marginBottom: '15px' }}>Akses Ditolak</h2>
        <p style={{ marginBottom: '15px' }}>
          Anda tidak memiliki izin untuk mengakses halaman admin.
        </p>
        <button 
          onClick={handleClose}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Tutup
        </button>
      </div>
    </div>
  );
}