// controllers/permisosController.js
const Permiso = require('../models/permiso');

module.exports = {
  index(req, res) {
    Permiso.getAll((err, permisos) => {
      if (err) return res.send('Error al listar permisos');
      res.render('permisos/index', { permisos });
    });
  },

  showForm(req, res) {
    res.render('permisos/new', { error: null });
  },

  create(req, res) {
    const { nombre } = req.body;
    Permiso.create(nombre, err => {
      if (err) {
        return res.render('permisos/new', { error: 'El nombre ya existe o es inválido' });
      }
      res.redirect('/permisos');
    });
  },

  editForm(req, res) {
    Permiso.getById(req.params.id, (err, permiso) => {
      if (err || !permiso) return res.send('Permiso no encontrado');
      res.render('permisos/edit', { permiso, error: null });
    });
  },

  update(req, res) {
    const { nombre } = req.body;
    Permiso.update(req.params.id, nombre, err => {
      if (err) {
        Permiso.getById(req.params.id, (_, permiso) => {
          return res.render('permisos/edit', { permiso, error: 'Nombre repetido o inválido' });
        });
      } else {
        res.redirect('/permisos');
      }
    });
  },

  delete(req, res) {
    Permiso.delete(req.params.id, err => {
      if (err) return res.send('Error al eliminar');
      res.redirect('/permisos');
    });
  }
};
