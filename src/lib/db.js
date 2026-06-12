import { promises as fs } from 'fs';
import path from 'path';

// Define database path relative to workspace root
const DB_PATH = path.join(process.cwd(), 'src/data/db.json');

// MongoDB client caching to prevent database connection leak
let cachedClient = null;

async function getMongoClient() {
  if (cachedClient) return cachedClient;

  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  try {
    const { MongoClient } = await import('mongodb');
    const client = new MongoClient(uri);
    await client.connect();
    cachedClient = client;
    return client;
  } catch (err) {
    console.error('Failed to connect to MongoDB client:', err);
    return null;
  }
}

async function getMongoCollection() {
  const client = await getMongoClient();
  if (!client) return null;
  const db = client.db(process.env.MONGODB_DB_NAME || 'chef_akanksha');
  return db.collection('site_data');
}

/**
 * Reads the database.
 * Auto-selects MongoDB Atlas if MONGODB_URI is configured, falls back to local file otherwise.
 */
export async function readDB() {
  try {
    const collection = await getMongoCollection();
    if (collection) {
      const doc = await collection.findOne({ _id: 'db_root' });
      if (doc) {
        return {
          blogs: doc.blogs || [],
          messages: doc.messages || []
        };
      }
      // Auto-initialize MongoDB with local JSON data if collection is empty
      const localData = await readLocalDB();
      await collection.insertOne({ _id: 'db_root', ...localData });
      return localData;
    }
  } catch (error) {
    console.error('MongoDB read error, falling back to local file:', error);
  }
  return readLocalDB();
}

async function readLocalDB() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Return empty default structure if file not found or corrupted
    return { blogs: [], messages: [] };
  }
}

/**
 * Writes data to the database.
 * Auto-selects MongoDB Atlas if MONGODB_URI is configured, falls back to local file otherwise.
 */
export async function writeDB(data) {
  try {
    const collection = await getMongoCollection();
    if (collection) {
      await collection.updateOne(
        { _id: 'db_root' },
        { $set: { blogs: data.blogs || [], messages: data.messages || [] } },
        { upsert: true }
      );
      return true;
    }
  } catch (error) {
    console.error('MongoDB write error, falling back to local file:', error);
  }
  return writeLocalDB(data);
}

async function writeLocalDB(data) {
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
