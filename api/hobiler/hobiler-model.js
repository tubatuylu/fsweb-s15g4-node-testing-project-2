const db = require('../../data/db-config');

function getAll() {
  return db('hobiler');
}

function getById(id) {
  return db('hobiler').where({ id }).first();
}

function create(hobi) {
  return db('hobiler')
    .insert(hobi)
    .then((ids) => getById(ids[0]));
}

function update(id, changes) {
  return db('hobiler')
    .where({ id })
    .update(changes)
    .then(() => getById(id));
}

function remove(id) {
  return db('hobiler').where({ id }).del();
}

module.exports = { getAll, getById, create, update, remove };
