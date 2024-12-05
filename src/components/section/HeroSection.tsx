import Image from "next/image";
import Link from "next/link";

export const HeroSection = ({ 
  title = "Selamat Datang di KosKu", 
  description = "Tempat tinggal nyaman dan strategis untuk mahasiswa dan pekerja. Kami menyediakan lingkungan aman, bersih, dan kondusif dengan berbagai pilihan kamar.",
  primaryButtonText = "Lihat Kamar",
  primaryButtonLink = "#",
  secondaryButtonText = "Hubungi Kami", 
  secondaryButtonLink = "#",
}) => {
    return (
      <main className="flex-grow container mx-auto px-6 py-12 shadow-md">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-6 text-[#2c3e50] dark:text-white">{title}</h1>
            <p className="text-[#34495e] dark:text-gray-300 mb-6">
              {description}
            </p>
            <div className="flex gap-4">
              <Link 
                href={primaryButtonLink}
                className="bg-[#3498db] text-white px-6 py-3 rounded-full hover:bg-[#2980b9] transition-colors"
              >
                {primaryButtonText}
              </Link>
              <Link 
                href={secondaryButtonLink}
                className="border border-[#3498db] text-[#3498db] px-6 py-3 rounded-full hover:bg-[#3498db] hover:text-white transition-colors"
              >
                {secondaryButtonText}
              </Link>
            </div>
          </div>
          <div>
            <Image 
              src="/images/download.jpg" 
              alt="Kosan Illustration" 
              width={500} 
              height={400} 
              className="w-full h-auto"
            />
          </div>
        </div>
      </main>
    );
  };