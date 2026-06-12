import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_chef_akanksha_token_key_12345';

/**
 * Signs a JWT token with the admin payload.
 */
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

/**
 * Verifies a JWT token. Returns the decoded payload or null if invalid.
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * Checks if the request contains a valid admin session cookie.
 */
export async function isAuthenticated() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    if (!token) return false;
    const decoded = verifyToken(token);
    return decoded && decoded.role === 'admin';
  } catch (error) {
    return false;
  }
}

