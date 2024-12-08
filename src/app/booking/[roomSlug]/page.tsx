'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { roomsData } from '@/data/rooms/index';

// Helper function to format price consistently
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Helper function to create URL-friendly slug
const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

// Mock room availability data (in a real app, this would come from backend)
const roomAvailability = [
  { roomNumber: '101', isAvailable: true },
  { roomNumber: '102', isAvailable: false },
  { roomNumber: '103', isAvailable: true },
  { roomNumber: '104', isAvailable: true },
  { roomNumber: '105', isAvailable: false },
  { roomNumber: '106', isAvailable: true },
  { roomNumber: '107', isAvailable: true },
  { roomNumber: '108', isAvailable: true },
  { roomNumber: '109', isAvailable: true },
  { roomNumber: '110', isAvailable: true },
];

const BookingDetailPage = () => {
  const params = useParams();
  const roomSlug = params?.roomSlug as string;

  // Find room by slug
  const room = roomsData.find(r => createSlug(r.name) === roomSlug);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    additionalNotes: '',
    selectedRoomNumber: ''
  });

  // Errors state
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = {...prevErrors};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    // Phone number validation (Indonesian phone number format)
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Nomor telepon tidak valid';
    }

    // Name validation
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Nama harus diisi minimal 2 karakter';
    }

    // Date validation
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const today = new Date();

    if (!formData.checkIn) {
      newErrors.checkIn = 'Tanggal check-in harus dipilih';
    } else if (checkInDate < today) {
      newErrors.checkIn = 'Tanggal check-in tidak boleh di masa lalu';
    }

    if (!formData.checkOut) {
      newErrors.checkOut = 'Tanggal check-out harus dipilih';
    } else if (checkOutDate <= checkInDate) {
      newErrors.checkOut = 'Tanggal check-out harus setelah tanggal check-in';
    }

    // Room number validation
    if (!formData.selectedRoomNumber) {
      newErrors.selectedRoomNumber = 'Silakan pilih nomor kamar';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate booking details
  const calculateBookingDetails = () => {
    if (!formData.checkIn || !formData.checkOut || !room) return null;

    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const dailyRate = room.price / 30; // Assuming monthly price, prorated to daily
    const totalPrice = dailyRate * diffDays;

    return {
      nights: diffDays,
      totalPrice: formatPrice(totalPrice)
    };
  };

  // Handle room number selection
  const handleRoomNumberSelect = (roomNumber: string) => {
    setFormData(prevData => ({
      ...prevData,
      selectedRoomNumber: roomNumber
    }));

    // Clear room number error
    if (errors.selectedRoomNumber) {
      setErrors(prevErrors => {
        const newErrors = {...prevErrors};
        delete newErrors.selectedRoomNumber;
        return newErrors;
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform validation
    if (!validateForm()) {
      return;
    }

    // Here you would typically send the booking data to a backend
    console.log('Booking Submitted:', {
      ...formData,
      roomNumber: room?.roomNumber,
      roomName: room?.name
    });

    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      additionalNotes: '',
      selectedRoomNumber: ''
    });

    alert(`Booking for ${room?.name} (${formData.selectedRoomNumber}) has been submitted!`);
  };

  if (!room) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-red-500">Kamar Tidak Ditemukan</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-6 text-[#2c3e50] dark:text-white">
              {room.name}
            </h1>

            <Image
              src={room.imageUrl}
              alt={room.name}
              width={500}
              height={400}
              className="w-full rounded-lg mb-6 shadow-lg"
            />

            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-gray-800 dark:text-gray-200">
              <div className="mb-2">
                <strong>Nomor Kamar:</strong> {room.roomNumber}
              </div>
              <div className="mb-2">
                <strong>Harga:</strong> {formatPrice(room.price)} / bulan
              </div>
              <div className="mb-2">
                <strong>Ukuran:</strong> {room.size}
              </div>
              <div className="mb-2">
                <strong>Tipe Kamar Mandi:</strong> {room.bathroomType === 'dalam' ? 'Dalam' : 'Luar'}
              </div>
              <div>
                <strong>Fasilitas:</strong>
                <ul className="list-disc list-inside text-sm">
                  {room.facilities.map((facility, index) => (
                    <li key={index}>{facility}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6 text-[#2c3e50] dark:text-white">
              Formulir Pemesanan
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Booking Summary */}
              {formData.checkIn && formData.checkOut && room && (
                <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-4 text-blue-800 dark:text-blue-200">
                  <h4 className="font-semibold mb-2">Ringkasan Booking</h4>
                  <p>Durasi: {calculateBookingDetails()?.nights} Malam</p>
                  <p>Total Harga: {calculateBookingDetails()?.totalPrice}</p>
                </div>
              )}

              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                  placeholder="Masukkan nama lengkap"
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-sm mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  placeholder="Masukkan alamat email"
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Input */}
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.phone ? 'border-red-500' : ''
                  }`}
                  placeholder="Masukkan nomor telepon"
                />
                {errors.phone && (
                  <p id="phone-error" className="text-red-500 text-sm mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Date Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="checkIn" className="block mb-2 text-sm font-medium">
                    Tanggal Check-In
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.checkIn}
                    aria-describedby={errors.checkIn ? "checkIn-error" : undefined}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      errors.checkIn ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.checkIn && (
                    <p id="checkIn-error" className="text-red-500 text-sm mt-1">
                      {errors.checkIn}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="checkOut" className="block mb-2 text-sm font-medium">
                    Tanggal Check-Out
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.checkOut}
                    aria-describedby={errors.checkOut ? "checkOut-error" : undefined}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      errors.checkOut ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.checkOut && (
                    <p id="checkOut-error" className="text-red-500 text-sm mt-1">
                      {errors.checkOut}
                    </p>
                  )}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label htmlFor="additionalNotes" className="block mb-2 text-sm font-medium">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Tambahkan catatan atau permintaan khusus"
                ></textarea>
              </div>

              {/* Room Selection */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4 text-[#2c3e50] dark:text:white]">
                  Pilih Nomor Kamar
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {[...Array(10)].map((_, index) => {
                    const roomNumber = `${room.roomNumber.slice(0, -2)}${index + 1}`;
                    const availability = roomAvailability.find(r => r.roomNumber === roomNumber);
                    
                    return (
                      <button
                        key={roomNumber}
                        type="button"
                        onClick={() => availability?.isAvailable && handleRoomNumberSelect(roomNumber)}
                        disabled={!availability?.isAvailable}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          formData.selectedRoomNumber === roomNumber
                            ? 'bg-[#3498db] text-white'
                            : availability?.isAvailable
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 cursor-not-allowed opacity-50'
                        }`}
                      >
                        {index + 1}
                        {!availability?.isAvailable && <span className="ml-1 text-xs">(Booked)</span>}
                      </button>
                    );
                  })}
                </div>
                {errors.selectedRoomNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.selectedRoomNumber}
                  </p>
                )}
                {formData.selectedRoomNumber && (
                  <p className="mt-2 text-sm text-green-600">
                    Anda memilih Kamar No. {formData.selectedRoomNumber}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-[#3498db] text-white px-4 py-3 rounded-full hover:bg-[#2980b9] transition-colors disabled:opacity-50"
                  disabled={Object.keys(errors).length > 0}
                >
                  Pesan Sekarang - {formData.selectedRoomNumber || 'Pilih Nomor Kamar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingDetailPage;