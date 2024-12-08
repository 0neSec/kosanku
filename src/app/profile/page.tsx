"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { Edit } from "lucide-react";
import { UserInput } from "@/types/users";
import { toast } from "sonner"; // Assuming you're using sonner for notifications

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserInput | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<UserInput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch user profile from API
        const response = await fetch('/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUserData(data.user);
        setEditedData(data.user);
      } catch (error) {
        console.error('Error fetching user profile', error);
        toast.error('Gagal memuat profil. Silakan login kembali.');
        router.push('/login');
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile();
    } else {
      // Redirect to login if no token
      router.push('/login');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData(prev => prev ? ({
      ...prev,
      [name]: value
    }) : null);
  };

  const handleSaveProfile = async () => {
    if (!editedData) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${userData?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: editedData.name,
          email: editedData.email,
          noWa: editedData.noWa,
          desa: editedData.desa,
          kecamatan: editedData.kecamatan,
          kabupaten: editedData.kabupaten
        })
      });

      const result = await response.json();

      if (response.ok) {
        // Update local state and storage
        setUserData(result.user);
        localStorage.setItem('user', JSON.stringify(result.user));
        
        toast.success('Profil berhasil diperbarui');
        setIsEditing(false);
      } else {
        toast.error(result.message || 'Gagal memperbarui profil');
      }
    } catch (error) {
      console.error('Error updating profile', error);
      toast.error('Terjadi kesalahan saat memperbarui profil');
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-indigo-600 p-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-indigo-400 rounded-full flex items-center justify-center text-white text-4xl mr-6">
                {userData.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
                <p className="text-indigo-100">{userData.email}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="text-white hover:bg-indigo-700 p-2 rounded-full transition-colors"
            >
              {isEditing ? 'Batal' : <Edit size={24} />}
            </button>
          </div>

          <div className="p-6">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    name="name"
                    value={editedData?.name || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editedData?.email || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Nomor Telepon</label>
                  <input
                    type="tel"
                    name="noWa"
                    value={editedData?.noWa || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Masukkan nomor telepon"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Desa</label>
                  <input
                    type="text"
                    name="desa"
                    value={editedData?.desa || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Masukkan nama desa"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Kecamatan</label>
                  <input
                    type="text"
                    name="kecamatan"
                    value={editedData?.kecamatan || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Masukkan nama kecamatan"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Kabupaten</label>
                  <input
                    type="text"
                    name="kabupaten"
                    value={editedData?.kabupaten || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Masukkan nama kabupaten"
                  />
                </div>
                <button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Nomor Telepon</label>
                  <p className="text-gray-600">{userData.noWa || 'Belum diatur'}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Desa</label>
                  <p className="text-gray-600">{userData.desa || 'Belum diatur'}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Kecamatan</label>
                  <p className="text-gray-600">{userData.kecamatan || 'Belum diatur'}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Kabupaten</label>
                  <p className="text-gray-600">{userData.kabupaten || 'Belum diatur'}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Role</label>
                  <p className="text-gray-600">{userData.role || 'Belum diatur'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}