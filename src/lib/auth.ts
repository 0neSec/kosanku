import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

// Ensure you have a secure secret key - ideally from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function generateToken(user: User): string {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    }, 
    JWT_SECRET, 
    { 
      expiresIn: '1d' 
    }
  );
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function getTokenPayload(token: string) {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  
  return `${salt}:${hash}`;
}

export function verifyPassword(storedPassword: string, providedPassword: string): boolean {
  const [salt, originalHash] = storedPassword.split(':');
  const hash = crypto
    .pbkdf2Sync(providedPassword, salt, 1000, 64, 'sha512')
    .toString('hex');
  
  return hash === originalHash;
}