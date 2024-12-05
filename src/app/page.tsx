import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { HeroSection } from "@/components/section/HeroSection";
import { KosanGuideComponent } from "@/components/section/about/aboute";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#121212] text-gray-900 dark:text-white">
      <Navbar/>
      <HeroSection 
        title="Temukan Kos Impian Anda"
        description="Kami menyediakan berbagai pilihan kos berkualitas dengan lokasi strategis dan fasilitas lengkap. Nyaman, aman, dan terjangkau!"
        primaryButtonText="Jelajahi Kamar"
        primaryButtonLink="/rooms"
        secondaryButtonText="Kontak Kami"
        secondaryButtonLink="/contact"
      />
      <KosanGuideComponent/>
      <Footer/>
    </div>
  );
}