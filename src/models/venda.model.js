import { ObjectId } from 'mongodb';
import { obterBanco } from '../config/database.js';
function colecao() {
  return obterBanco().collection('tarefas');
}

export async function listarVendas() {
  return colecao().find().toArray();
}
export async function criarVenda(produto) {
  const resultado = await colecao().insertOne(produto);
  return resultado.insertedId;
}
  const resultado = await colecao().deleteOne({ _id: new ObjectId(id) });
  return resultado.deletedCount > 0;
