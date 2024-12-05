import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black text-gray-800 dark:text-white py-12 border-t dark:border-gray-800">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">KosKu</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Solusi tempat tinggal nyaman untuk mahasiswa dan pekerja.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Tautan Cepat</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-blue-500 dark:hover:text-[#3498db]">Beranda</Link></li>
            <li><Link href="#" className="hover:text-blue-500 dark:hover:text-[#3498db]">Kamar</Link></li>
            <li><Link href="#" className="hover:text-blue-500 dark:hover:text-[#3498db]">Fasilitas</Link></li>
            <li><Link href="#" className="hover:text-blue-500 dark:hover:text-[#3498db]">Kontak</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-4">Kontak</h4>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>📞 +62 123 4567 890</li>
            <li>✉️ info@kosku.com</li>
            <li>📍 Jakarta, Indonesia</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-4">Ikuti Kami</h4>
          <div className="flex space-x-4">
            <Link href="#" className="text-2xl hover:text-blue-500 dark:hover:text-[#3498db]">🔗</Link>
            <Link href="#" className="text-2xl hover:text-blue-500 dark:hover:text-[#3498db]">📷</Link>
            <Link href="#" className="text-2xl hover:text-blue-500 dark:hover:text-[#3498db]">🐦</Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 pt-6 border-t dark:border-gray-800 text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} KosKu. All Rights Reserved.
      </div>
    </footer>
  );
}