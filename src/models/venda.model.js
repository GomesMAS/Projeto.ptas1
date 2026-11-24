import { ObjectId } from 'mongodb';
import { getDb } from '../config/database.js';

const collection = () => getDb().collection('vendas');

export async function inserir(doc) {
  const res = await collection().insertOne(doc);
  return { _id: res.insertedId, ...doc };
}

export async function buscarTodas() {
  return await collection().find({}).toArray();
}

export async function buscarPorId(id) {
  if (!ObjectId.isValid(id)) return null;
  return await collection().findOne({ _id: new ObjectId(id) });
}

export async function atualizar(id, dados) {
  if (!ObjectId.isValid(id)) return null;
  return await collection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: dados },
    { returnDocument: 'after' }
  );
}

export async function remover(id) {
  if (!ObjectId.isValid(id)) return null;
  return await collection().findOneAndDelete({ _id: new ObjectId(id) });
}

export default { inserir, buscarTodas, buscarPorId, atualizar, remover };