'use client';
import React from 'react';

const kosanTypes = [
  {
    title: "Kamar Mandi Luar",
    features: [
      "Berbagi kamar mandi",
      "Lokasi strategis",
      "Furnitur dasar",
      "Lingkungan aman"
    ],
    priceRange: "Rp 250.000 - Rp 300.000"
  },
  {
    title: "Kamar Mandi Dalam",
    features: [
      "Kamar mandi dalam",
      "Area pribadi",
      "Furnitur lengkap",
      "Akses mudah"
    ],
    priceRange: "Rp 300.000 - Rp 350.000"
  }
];

const choosingCriteria = [
  {
    icon: "📍",
    title: "Lokasi",
    description: "Dekat dengan kampus, masjid, dan fasilitas umum. Akses mudah dan lingkungan aman."
  },
  {
    icon: "🚿",
    title: "Fasilitas Kamar Mandi",
    description: "Pilih sesuai kebutuhan privasi dan budget Anda."
  },
  {
    icon: "💰",
    title: "Biaya",
    description: "Pilihan harga fleksibel, sistem pembayaran mudah, dan nilai manfaat yang tinggi."
  }
];

export const KosanGuideComponent = () => {
  return (
    <div className="container mx-auto px-4 py-12 dark:bg-[#121212] dark:text-white">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#2c3e50] dark:text-white">
        Panduan Kosan Griya Amaliyah
      </h1>

      {/* Kosan Types Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-8 text-[#2c3e50] dark:text-white">
          Pilihan Tipe Kosan
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {kosanTypes.map((type) => (
            <div 
              key={type.title}
              className={`
                p-6 rounded-lg shadow-lg transition-all duration-300
                bg-white dark:bg-gray-800 
                hover:bg-blue-50 dark:hover:bg-blue-900 
                hover:scale-105 hover:shadow-xl
              `}
            >
              <h3 className="text-2xl font-semibold mb-4 text-[#3498db]">
                {type.title}
              </h3>
              <div className="mb-4">
                <strong>Fasilitas:</strong>
                <ul className="list-disc list-inside">
                  {type.features.map(feature => (
                    <li key={feature} className="text-gray-700 dark:text-gray-400">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="font-bold text-green-600 dark:text-green-400">
                Rentang Harga: {type.priceRange}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Choosing Criteria Section */}
      <section>
        <h2 className="text-3xl font-semibold text-center mb-8 text-[#2c3e50] dark:text-white">
          Pertimbangan Memilih Kosan
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {choosingCriteria.map((criteria) => (
            <div 
              key={criteria.title}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-5xl mb-4 text-center">{criteria.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-center text-[#3498db]">
                {criteria.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {criteria.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};