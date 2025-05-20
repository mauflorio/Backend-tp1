// routes/rolesRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/rolesController');

router.get('/', controller.index);
router.get('/new', controller.showForm);
router.post('/', controller.create);
router.get('/:id/edit', controller.editForm);
router.put('/:id', controller.update);
router.get('/:id', controller.show);

module.exports = router;
