'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';

// Room data type with bathroom type
const roomsData = [
  {
    id: 1,
    name: "Griya Amaliyah 1",
    price: 1500000,
    size: "3x4 m",
    facilities: ["AC", "Kasur", "Lemari", "Meja Belajar", "Kamar Mandi Dalam"],
    capacity: 1,
    imageUrl: "/room-standard.jpg",
    availability: true,
    bathroomType: "dalam", // Internal bathroom
  },
  {
    id: 2,
    name: "Griya Amaliyah 2",
    price: 2500000,
    size: "4x5 m",
    facilities: ["AC", "Kasur King Size", "Lemari Besar", "Meja Belajar"],
    capacity: 2,
    imageUrl: "/room-exclusive.jpg",
    availability: true,
    bathroomType: "luar", // External bathroom
  },
  {
    id: 3,
    name: "Griya Amaliyah 3",
    price: 3500000,
    size: "5x6 m",
    facilities: ["AC", "Kasur King Size", "Lemari Besar", "Meja Belajar"],
    capacity: 2,
    imageUrl: "/room-vip.jpg",
    availability: false,
    bathroomType: "luar", // External bathroom
  },
];

// Helper function to format price consistently
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const RoomsPage = () => {
  const [priceFilter, setPriceFilter] = useState('all');
  const [capacityFilter, setCapacityFilter] = useState('all');
  const [bathroomFilter, setBathroomFilter] = useState('all');

  const filteredRooms = roomsData.filter((room) => {
    const matchPrice =
      priceFilter === 'all' ||
      (priceFilter === 'low' && room.price <= 2000000) ||
      (priceFilter === 'medium' && room.price >= 2000000 && room.price < 3000000) ||
      (priceFilter === 'high' && room.price >= 3000000);

    const matchCapacity =
      capacityFilter === 'all' ||
      (capacityFilter === '1' && room.capacity === 1) ||
      (capacityFilter === '2' && room.capacity === 2);

    const matchBathroom = bathroomFilter === 'all' || room.bathroomType === bathroomFilter;

    return matchPrice && matchCapacity && matchBathroom;
  });

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-[#2c3e50] dark:text-white">Pilih Kamar Anda</h1>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div>
            <label htmlFor="price-filter" className="block mb-2 text-sm font-medium">
              Filter Harga
            </label>
            <select
              id="price-filter"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="all">Semua Harga</option>
              <option value="low">Di bawah 2 Juta</option>
              <option value="medium">2 - 3 Juta</option>
              <option value="high">Di atas 3 Juta</option>
            </select>
          </div>

          <div>
            <label htmlFor="capacity-filter" className="block mb-2 text-sm font-medium">
              Kapasitas Kamar
            </label>
            <select
              id="capacity-filter"
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="all">Semua Kapasitas</option>
              <option value="1">1 Orang</option>
              <option value="2">2 Orang</option>
            </select>
          </div>

          <div>
            <label htmlFor="bathroom-filter" className="block mb-2 text-sm font-medium">
              Tipe Kamar Mandi
            </label>
            <select
              id="bathroom-filter"
              value={bathroomFilter}
              onChange={(e) => setBathroomFilter(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="all">Semua Tipe</option>
              <option value="dalam">Dalam</option>
              <option value="luar">Luar</option>
            </select>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className={`border rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 ${
                !room.availability ? 'opacity-50' : ''
              }`}
            >
              <Image
                src={room.imageUrl}
                alt={room.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-[#2c3e50] dark:text-white">
                  {room.name}
                </h2>

                <div className="mb-2">
                  <strong>Harga:</strong> {formatPrice(room.price)} / bulan
                </div>

                <div className="mb-2">
                  <strong>Ukuran:</strong> {room.size}
                </div>

                <div className="mb-2">
                  <strong>Tipe Kamar Mandi:</strong> {room.bathroomType === 'dalam' ? 'Dalam' : 'Luar'}
                </div>

                <div className="mb-4">
                  <strong>Fasilitas:</strong>
                  <ul className="list-disc list-inside text-sm">
                    {room.facilities.map((facility, index) => (
                      <li key={index}>{facility}</li>
                    ))}
                  </ul>
                </div>

                {room.availability ? (
                  <Link
                    href={`/booking/${room.id}`}
                    className="block text-center bg-[#3498db] text-white px-4 py-2 rounded-full hover:bg-[#2980b9] transition-colors"
                  >
                    Pesan Sekarang
                  </Link>
                ) : (
                  <div className="text-red-500 text-center font-semibold">Kamar Tidak Tersedia</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-8 text-gray-500">Tidak ada kamar yang sesuai dengan filter Anda.</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RoomsPage;
