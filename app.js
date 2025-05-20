// app.js
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

const permisosRoutes = require('./routes/permisosRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const usersRoutes = require('./routes/usersRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/permisos', permisosRoutes);
app.use('/roles', rolesRoutes);
app.use('/users', usersRoutes);

app.get('/', (req, res) => res.redirect('/users'));

app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
