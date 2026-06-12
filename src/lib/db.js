import { promises as fs } from 'fs';
import path from 'path';

// Define database path relative to workspace root
const DB_PATH = path.join(process.cwd(), 'src/data/db.json');

/**
 * Reads the database file.
 * Returns an object with 'blogs' and 'messages' arrays.
 */
export async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Return empty default structure if file not found or corrupted
    return { blogs: [], messages: [] };
  }
}

/**
 * Writes data to the database file atomically.
 */
export async function writeDB(data) {
  try {
    const dir = path.dirname(DB_PATH);
    await fs.mkdir(dir, { recursive: true });
    
    // Write to a temporary file first, then rename to ensure atomic write
    const tempPath = `${DB_PATH}.tmp`;
    await fs.writeFile(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    await fs.rename(tempPath, DB_PATH);
    return true;
  } catch (error) {
    console.error('Database write error:', error);
    throw error;
  }
}
