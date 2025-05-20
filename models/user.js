// models/user.js
const db = require('./db');

module.exports = {
  getAll(callback) {
    db.all(`
      SELECT users.id, users.nombre, roles.nombre AS rol
      FROM users
      LEFT JOIN roles ON users.rol_id = roles.id
    `, callback);
  },

  getById(id, callback) {
    db.get(`
      SELECT users.id, users.nombre, users.rol_id, roles.nombre AS rol
      FROM users
      LEFT JOIN roles ON users.rol_id = roles.id
      WHERE users.id = ?
    `, [id], callback);
  },

  create(nombre, rol_id, callback) {
    db.run('INSERT INTO users (nombre, rol_id) VALUES (?, ?)', [nombre, rol_id], callback);
  },

  getPermisos(id, callback) {
    db.all(`
      SELECT p.nombre
      FROM permisos p
      JOIN rol_permiso rp ON rp.permiso_id = p.id
      JOIN users u ON u.rol_id = rp.rol_id
      WHERE u.id = ?
    `, [id], callback);
  }
};
