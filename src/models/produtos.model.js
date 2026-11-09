import { ObjectId } from 'mongodb';
import { obterBanco } from '../config/database.js';

// Atalho para a coleção "tarefas". Cada documento dela é uma tarefa.
function colecao() {
  return obterBanco().collection('tarefas');
}

export async function listarProdutos() {
  // mongosh: db.tarefas.find()
  return colecao().find().toArray();
}

export async function obterProdutoId(id) {
  // ObjectId.isValid confere o formato antes da consulta. Um id inválido retorna null em vez de gerar erro.
  if (!ObjectId.isValid(id)) {
    return null;
  }
  // mongosh: db.tarefas.findOne({ _id: ObjectId("65f1c2a9e4b0a1b2c3d4e5f6") })
  return colecao().findOne({ _id: new ObjectId(id) });
}

export async function criarProduto(produto) {
  // mongosh: db.produtos.insertOne({ titulo: "Estudar", concluida: false })
  const resultado = await colecao().insertOne(produto);
  return resultado.insertedId;
}

// O service decide quais campos podem ser alterados. Esta função só repassa esses campos.
export async function atualizarProduto(id, campos) {
  if (!ObjectId.isValid(id)) {
    return false;
  }
  // mongosh: db.produtos.updateOne({ _id: ObjectId("65f1c2a9e4b0a1b2c3d4e5f6") }, { $set: { concluida: true } })
  const resultado = await colecao().updateOne({ _id: new ObjectId(id) }, { $set: campos });
  return resultado.matchedCount > 0;
}

export async function deletarProduto(id) {
  if (!ObjectId.isValid(id)) {
    return false;
  }
  // mongosh: db.tarefas.deleteOne({ _id: ObjectId("65f1c2a9e4b0a1b2c3d4e5f6") })
  const resultado = await colecao().deleteOne({ _id: new ObjectId(id) });
  return resultado.deletedCount > 0;
}