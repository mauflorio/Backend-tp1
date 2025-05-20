// routes/usersRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

router.get('/', controller.index);
router.get('/new', controller.showForm);
router.post('/', controller.create);
router.get('/:id', controller.show);

module.exports = router;
