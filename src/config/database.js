import 'dotenv/config';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.MONGO_DB_NAME || 'projeto_ptas1';
const client = new MongoClient(uri);
let db;

export async function connectDatabase() {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
  }
  return db;
}

export function getDb() {
  if (!db) {
    throw new Error('Banco de dados não conectado.');
  }
  return db;
}

export default { connectDatabase, getDb };