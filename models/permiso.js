// models/permiso.js
const db = require('./db');

module.exports = {
  getAll(callback) {
    db.all('SELECT * FROM permisos', callback);
  },

  create(nombre, callback) {
    db.run('INSERT INTO permisos (nombre) VALUES (?)', [nombre], callback);
  },

  getById(id, callback) {
    db.get('SELECT * FROM permisos WHERE id = ?', [id], callback);
  },

  update(id, nombre, callback) {
    db.run('UPDATE permisos SET nombre = ? WHERE id = ?', [nombre, id], callback);
  },

  delete(id, callback) {
    db.run('DELETE FROM permisos WHERE id = ?', [id], callback);
  }
};
