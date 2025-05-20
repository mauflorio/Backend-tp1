// controllers/usersController.js
const User = require('../models/user');
const Rol = require('../models/rol');

module.exports = {
  index(req, res) {
    User.getAll((err, users) => {
      if (err) return res.send('Error al listar usuarios');
      res.render('users/index', { users });
    });
  },

  showForm(req, res) {
    Rol.getAll((err, roles) => {
      if (err) return res.send('Error cargando roles');
      res.render('users/new', { roles, error: null });
    });
  },

  create(req, res) {
    const { nombre, rol_id } = req.body;
    User.create(nombre, rol_id, err => {
      if (err) return res.send('Error al crear usuario');
      res.redirect('/users');
    });
  },

  show(req, res) {
    User.getById(req.params.id, (err, user) => {
      if (err || !user) return res.send('Usuario no encontrado');

      User.getPermisos(user.id, (err, permisos) => {
        res.render('users/show', { user, permisos });
      });
    });
  }
};
