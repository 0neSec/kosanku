"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { 
  Home, 
  User, 
  CreditCard, 
  Settings, 
  LogOut, 
  BookOpen, 
  DollarSign, 
  FileText 
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState('beranda');
  const [userData, setUserData] = useState<any>(null);

  // Simulating user data retrieval (you'd typically get this from context or API)
  React.useEffect(() => {
    const userStored = localStorage.getItem('user');
    if (userStored) {
      try {
        const parsedUser = JSON.parse(userStored);
        setUserData(parsedUser);
      } catch (error) {
        console.error('Error parsing user data', error);
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login page
    router.push('/login');
  };

  const SidebarMenuItem = ({ 
    icon: Icon, 
    label, 
    menuKey, 
    onClick 
  }: { 
    icon: React.ElementType, 
    label: string, 
    menuKey: string, 
    onClick?: () => void 
  }) => (
    <button
      onClick={() => {
        setActiveMenu(menuKey);
        onClick && onClick();
      }}
      className={`
        flex items-center w-full p-3 rounded-lg transition-colors duration-200
        ${activeMenu === menuKey 
          ? 'bg-indigo-100 text-indigo-700' 
          : 'hover:bg-gray-100 text-gray-700'}
      `}
    >
      <Icon className="mr-3" size={20} />
      <span>{label}</span>
    </button>
  );

  const DashboardContent = () => {
    switch(activeMenu) {
      case 'beranda':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
              Selamat Datang, {userData?.name || 'Pengguna'}!
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">Total Pembayaran</h2>
                <p className="text-2xl font-bold text-green-600">Rp 500.000</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">Status Kosan</h2>
                <p className="text-xl">Aktif</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">Sisa Tagihan</h2>
                <p className="text-2xl font-bold text-red-600">Rp 250.000</p>
              </div>
            </div>
          </div>
        );
      case 'profil':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Profil Pengguna</h1>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                  {userData?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{userData?.name}</h2>
                  <p className="text-gray-600">{userData?.email}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Nomor Telepon</label>
                  <p>{userData?.phone || 'Belum diatur'}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Alamat</label>
                  <p>{userData?.address || 'Belum diatur'}</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'pembayaran':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Riwayat Pembayaran</h1>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Bulan</th>
                    <th className="p-3 text-left">Jumlah</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3">Desember 2023</td>
                    <td className="p-3">Rp 500.000</td>
                    <td className="p-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Lunas
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3">November 2023</td>
                    <td className="p-3">Rp 500.000</td>
                    <td className="p-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Lunas
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return <div>Konten belum tersedia</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg h-screen p-4 fixed left-0 top-16">
          <nav className="space-y-2">
            <SidebarMenuItem 
              icon={Home} 
              label="Beranda" 
              menuKey="beranda" 
            />
            <SidebarMenuItem 
              icon={User} 
              label="Profil" 
              menuKey="profil" 
            />
            <SidebarMenuItem 
              icon={DollarSign} 
              label="Pembayaran" 
              menuKey="pembayaran" 
            />
            <SidebarMenuItem 
              icon={FileText} 
              label="Kontrak" 
              menuKey="kontrak" 
            />
            <SidebarMenuItem 
              icon={Settings} 
              label="Pengaturan" 
              menuKey="pengaturan" 
            />
            <SidebarMenuItem 
              icon={LogOut} 
              label="Keluar" 
              menuKey="logout"
              onClick={handleLogout}
            />
          </nav>
        </div>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-4 mt-16">
          <DashboardContent />
        </main>
      </div>

    </div>
  );
}