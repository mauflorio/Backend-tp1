// models/rol.js
const db = require('./db');

module.exports = {
  getAll(callback) {
    db.all('SELECT * FROM roles', callback);
  },

  getById(id, callback) {
    db.get('SELECT * FROM roles WHERE id = ?', [id], callback);
  },

  create(nombre, callback) {
    db.run('INSERT INTO roles (nombre) VALUES (?)', [nombre], callback);
  },

  update(id, nombre, callback) {
    db.run('UPDATE roles SET nombre = ? WHERE id = ?', [nombre, id], callback);
  },

  delete(id, callback) {
    db.run('DELETE FROM roles WHERE id = ?', [id], callback);
  },

  getPermisos(id, callback) {
    db.all(`
      SELECT p.id, p.nombre
      FROM permisos p
      JOIN rol_permiso rp ON rp.permiso_id = p.id
      WHERE rp.rol_id = ?
    `, [id], callback);
  },

  updatePermisos(rol_id, permisos, callback) {
    db.serialize(() => {
      db.run('DELETE FROM rol_permiso WHERE rol_id = ?', [rol_id], err => {
        if (err) return callback(err);

        const stmt = db.prepare('INSERT INTO rol_permiso (rol_id, permiso_id) VALUES (?, ?)');
        permisos.forEach(permiso_id => {
          stmt.run(rol_id, permiso_id);
        });
        stmt.finalize(callback);
      });
    });
  }
};
