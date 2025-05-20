// routes/permisosRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/permisosController');

router.get('/', controller.index);
router.get('/new', controller.showForm);
router.post('/', controller.create);
router.get('/:id/edit', controller.editForm);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
