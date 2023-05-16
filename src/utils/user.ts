import { compare } from 'bcrypt';

/**
 * @EdwardLTC
 * @description Compare password with hash
 * @param password  the password want to compare
 * @param hash the password has been hashed
 * @returns Promise<boolean> true if match, false if not match, throw error if error
 */
export const ComparePassword = (password: string, hash: string) => {
  return new Promise((resolve, reject) => {
    compare(password, hash, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};
