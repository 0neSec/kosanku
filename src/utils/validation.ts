import { UserUpdateInput } from "@/types/users";

// utils/validation.ts
export function validateUserInput(data: any) {
    const { name, email, password, noWa } = data;
    if (!name || !email || !password || !noWa) {
      throw new Error('Missing required fields');
    }
  }
  export function validateUserUpdateInput(data: UserUpdateInput) {
    // Basic validation
    if (data.email && !isValidEmail(data.email)) {
      throw new Error('Invalid email format');
    }
  
    if (data.noWa && !isValidPhoneNumber(data.noWa)) {
      throw new Error('Invalid phone number');
    }
  }
  
  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function isValidPhoneNumber(phone: string): boolean {
    // Indonesian phone number validation
    const phoneRegex = /^(\+62|0)[0-9]{9,14}$/;
    return phoneRegex.test(phone);
  }