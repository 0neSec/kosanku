import crypto from 'crypto';

export async function hashPassword(password: string): Promise<string> {
  // Generate a random salt
  const salt = crypto.randomBytes(16).toString('hex');
  
  // Use PBKDF2 (Password-Based Key Derivation Function 2) for secure hashing
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) {
        reject(err);
        return;
      }
      
      // Combine salt and hashed password
      const hash = `${salt}:${derivedKey.toString('hex')}`;
      resolve(hash);
    });
  });
}

export async function verifyPassword(inputPassword: string, storedHash: string): Promise<boolean> {
  // Split the stored hash into salt and hash
  const [salt, originalHash] = storedHash.split(':');
  
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(inputPassword, salt, 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) {
        reject(err);
        return;
      }
      
      // Compare the derived key with the original hash
      resolve(derivedKey.toString('hex') === originalHash);
    });
  });
}