# Gestión de Permisos por Rol (Node.js + Express + SQLite + EJS)

## 📌 Descripción

Este proyecto implementa un sistema de gestión de **usuarios, roles y permisos**. Permite asignar permisos a roles, ver los permisos que tiene cada usuario según su rol, y gestionar el acceso a funcionalidades.

---

## 🛠 Tecnologías utilizadas

- Node.js
- Express
- SQLite3
- EJS (motor de vistas)
- Method-override (para usar PUT/DELETE en formularios)

---

## 🧱 Estructura principal del proyecto

/controllers → Lógica de negocio
/models → Acceso a base de datos
/routes → Rutas Express
/views → Vistas EJS
/public → Estilos CSS (opcional)
app.js → Configuración principal del servidor
database.sqlite → Base de datos SQLite

---

## ✅ Funcionalidades

### 🔐 ABM de Permisos

- Crear, listar, editar y eliminar permisos
- Validación de nombres duplicados

### 👥 ABM de Roles

- Crear, editar y mostrar roles
- Asignar permisos a cada rol desde checkboxes

### 👤 ABM de Usuarios

- Crear usuarios y asignarles un rol
- Ver los permisos que tiene un usuario desde su rol

### 🔒 Middleware (bonus)

- Verifica si el usuario tiene un permiso antes de acceder a una ruta protegida (opcional)

---

## 🔑 Permisos creados

- `crear_usuario`
- `editar_usuario`
- `eliminar_usuario`

---

## 🔗 Asignación de permisos a roles

Desde la vista de edición de un rol (`/roles/:id/edit`) se pueden marcar/desmarcar los permisos mediante checkboxes. Al guardar, se actualiza la tabla intermedia `rol_permiso`.

---

## 🔍 Visualización desde usuario

En la vista `/users/:id` se muestran todos los permisos del usuario según el rol que tenga asignado. Esto se consulta a través de la tabla `rol_permiso`.

---

## 🚀 Cómo ejecutar el proyecto

```bash
# Instalar dependencias
npm install

# Inicializar base de datos (una vez)
node models/init.js

# (Opcional) Insertar datos de prueba
node models/seed.js

# Ejecutar servidor
node app.js
```
