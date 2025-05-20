// controllers/rolesController.js
const Rol = require('../models/rol');
const Permiso = require('../models/permiso');

module.exports = {
  index(req, res) {
    Rol.getAll((err, roles) => {
      if (err) return res.send('Error al listar roles');
      res.render('roles/index', { roles });
    });
  },

  showForm(req, res) {
    res.render('roles/new', { error: null });
  },

  create(req, res) {
    const { nombre } = req.body;
    Rol.create(nombre, err => {
      if (err) return res.render('roles/new', { error: 'Nombre repetido o inválido' });
      res.redirect('/roles');
    });
  },

  editForm(req, res) {
    Rol.getById(req.params.id, (err, rol) => {
      if (err || !rol) return res.send('Rol no encontrado');

      Permiso.getAll((err, permisos) => {
        if (err) return res.send('Error cargando permisos');

        Rol.getPermisos(rol.id, (err, asignados) => {
          const idsAsignados = asignados.map(p => p.id.toString());
          res.render('roles/edit', { rol, permisos, idsAsignados, error: null });
        });
      });
    });
  },

  update(req, res) {
    const { nombre, permisos } = req.body;
    const permisosArray = Array.isArray(permisos) ? permisos : (permisos ? [permisos] : []);

    Rol.update(req.params.id, nombre, err => {
      if (err) return res.send('Error actualizando nombre');

      Rol.updatePermisos(req.params.id, permisosArray, err => {
        if (err) return res.send('Error actualizando permisos');
        res.redirect('/roles');
      });
    });
  },

  show(req, res) {
    Rol.getById(req.params.id, (err, rol) => {
      if (err || !rol) return res.send('Rol no encontrado');

      Rol.getPermisos(req.params.id, (err, permisos) => {
        res.render('roles/show', { rol, permisos });
      });
    });
  }
};
