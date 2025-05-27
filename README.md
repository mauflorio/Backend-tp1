# Backend-tp1
This project implements a web management system for **users, roles, and permissions** developed with Node.js, Express, and SQLite. 

# 🖥️ Backend-tp1
# 🔐 Gestión de Permisos por Rol (Node.js + Express + SQLite + EJS)

## 📌 Descripción

Este proyecto implementa un sistema web de gestión de **usuarios, roles y permisos** desarrollado con Node.js, Express y SQLite. 
Permite asignar permisos a roles, administrar usuarios, ver los permisos que tiene cada usuario según su rol, y gestionar el acceso a funcionalidades.

---

## 🛠 Tecnologías utilizadas

- **Backend:** Node.js con Express 🚀
- **Base de Datos:** SQLite3 🗄️
- **Motor de Vistas:** EJS 📄
- **Method-override:** para usar PUT/DELETE en formularios ⚡
- **Frontend:** HTML, CSS, JavaScript 🎨

---

## ⚙️ Instalación y Configuración

### 📋 Pre requisitos

- Node.js (versión 14 o superior) ✅
- npm (Node Package Manager) 📦

---

## 🔧 Pasos de instalación

1. **Clonar el repositorio:** 📂
```bash
git clone https://github.com/mauflorio/Backend-tp1
cd tp-backend
```

2. **Instalar dependencias:** 📥
```bash
npm install
```

3. **Inicializar la base de datos:** 🗃️
```bash
node models/init.js
```

4. **Ejecutar la aplicación:** 🚀
```bash
npm start
```

5. **Abrir el navegador en:** 🌐 `http://localhost:3000`

---

## 🧱 Estructura principal del proyecto

- 📁 `/controllers` → Lógica de negocio
- 📁 `/models` → Acceso a base de datos
- 📁 `/routes` → Rutas Express
- 📁 `/views` → Vistas EJS
- 📁 `/public` → Estilos CSS (opcional)
- 📄 `app.js` → Configuración principal del servidor
- 🗄️ `database.sqlite` → Base de datos SQLite

---

## ✅ Funcionalidades

### 🔐 ABM de Permisos

- ➕ Crear, listar, editar y eliminar permisos
- ⚠️ Validación de nombres duplicados

### 👥 ABM de Roles

- 🔧 Crear, editar y mostrar roles
- ☑️ Asignar permisos a cada rol desde checkboxes

### 👤 ABM de Usuarios

- 👨‍💼 Crear usuarios y asignarles un rol
- 👀 Ver los permisos que tiene un usuario desde su rol

### 🔒 Middleware (bonus)

- 🛡️ Verifica si el usuario tiene un permiso antes de acceder a una ruta protegida (opcional)

---

## 🔑 Permisos creados

- 🆕 `crear_usuario` - Permite crear nuevos usuarios en el sistema
- ✏️ `editar_usuario` - Permite modificar información de usuarios existentes
- ❌ `eliminar_usuario` - Permite eliminar usuarios del sistema
- 👁️ `ver_usuarios` - Permite visualizar la lista de usuarios
- ⚙️ `gestionar_roles` - Permite crear, editar y eliminar roles
- 🔗 `asignar_permisos` - Permite asignar permisos a roles
- 📊 `ver_reportes` - Permite acceder a reportes del sistema
- 🔧 `configurar_sistema` - Permite acceder a configuraciones avanzadas

---

## 🔗 Asignación de permisos a roles

Desde la vista de edición de un rol (`/roles/:id/edit`) se pueden marcar/desmarcar los permisos mediante checkboxes ☑️. Al guardar, se actualiza la tabla intermedia `rol_permiso`. 💾

---

## 🔍 Visualización desde usuario

En la vista `/users/:id` se muestran todos los permisos del usuario según el rol que tenga asignado. Esto se consulta a través de la tabla `rol_permiso`. 🔎

- **Formato:** "Permisos asignados: crear_usuario, editar_usuario, ver_reportes" 📝

### 👤 Desde la Vista de Usuario (`/usuarios/:id`) 

1. 🎯 Se muestran los permisos que tiene el usuario a través de su rol
2. 🏷️ Incluye el nombre del rol y todos sus permisos asociados
3. 🔄 Consulta con JOIN entre las tablas usuarios, roles, rol_permiso y permisos

---

## 🗄️ Estructura de Base de Datos

### 🏗️ **Tablas Principales**

```sql
-- Tabla de permisos
CREATE TABLE permisos (
    id INTEGER PRIMARY KEY,
    nombre TEXT UNIQUE NOT NULL
);

-- Tabla de relación rol-permiso (many-to-many)
CREATE TABLE rol_permiso (
    rol_id INTEGER,
    permiso_id INTEGER,
    PRIMARY KEY (rol_id, permiso_id),
    FOREIGN KEY (rol_id) REFERENCES roles(id),
    FOREIGN KEY (permiso_id) REFERENCES permisos(id)
);
```

### 🔗 **Relaciones**

- usuarios ← (1:N) → roles 👥
- roles ← (N:M) → permisos (través de rol_permiso) 🔐

---

## 🛡️ **Middleware de Control de Acceso**

### ⚙️ **Implementación**
El sistema incluye un middleware de autenticación y autorización:

```javascript
// middleware/authMiddleware.js
const checkPermission = (requiredPermission) => {
    return async (req, res, next) => {
        // Verificar si el usuario tiene el permiso requerido
        // Si no lo tiene, mostrar mensaje de acceso denegado
    };
};
```

### 🚦 **Uso en Rutas Protegidas**

```javascript
// Ejemplo de protección de ruta
router.post('/usuarios', checkPermission('crear_usuario'), usuariosController.create);
```

--- 

## ⚠️ Manejo de Errores

- ✅ **Validación de datos:** Nombres únicos en permisos y roles
- 🔧 **Errores de base de datos:** Try-catch en todas las operaciones
- 💬 **Mensajes informativos:** Feedback claro al usuario
- 🚫 **Páginas de error:** 404 y 500 personalizadas

---

## 📜 Scripts Disponibles

```bash
# 🚀 Iniciar servidor en modo producción
npm start  

# 🔧 Iniciar servidor en modo desarrollo        
npm run dev 

# 🗃️ Inicializar base de datos con datos de prueba       
npm run init-db

# 🧪 Ejecutar tests (si están configurados)    
npm test           
```

---

## 🛣️ **Rutas de la API**

### 👤 **Usuarios**

- `GET /usuarios` - 📋 Listar usuarios
- `GET /usuarios/new` - 📝 Formulario nuevo usuario
- `POST /usuarios` - ➕ Crear usuario
- `GET /usuarios/:id` - 👁️ Ver usuario
- `GET /usuarios/:id/edit` - ✏️ Formulario editar usuario
- `PUT /usuarios/:id` - 🔄 Actualizar usuario
- `DELETE /usuarios/:id` - ❌ Eliminar usuario

### 👥 **Roles**

- `GET /roles` - 📋 Listar roles
- `GET /roles/new` - 📝 Formulario nuevo rol
- `POST /roles` - ➕ Crear rol
- `GET /roles/:id` - 👁️ Ver rol con permisos
- `GET /roles/:id/edit` - ✏️ Formulario editar rol (con checkboxes de permisos)
- `PUT /roles/:id` - 🔄 Actualizar rol y permisos
- `DELETE /roles/:id` - ❌ Eliminar rol

### 🔐 **Permisos**

- `GET /permisos` - 📋 Listar permisos
- `GET /permisos/new` - 📝 Formulario nuevo permiso
- `POST /permisos` - ➕ Crear permiso
- `GET /permisos/:id/edit` - ✏️ Formulario editar permiso
- `PUT /permisos/:id` - 🔄 Actualizar permiso
- `DELETE /permisos/:id` - ❌ Eliminar permiso

---

## 📸 Capturas de Pantalla

### 🔐 **ABM de Permisos**

- 📋 Lista de permisos con opciones CRUD
- 📝 Formulario de creación/edición
- ⚠️ Validación de nombres únicos

### ☑️ **Asignación de Permisos a Roles**

- ✏️ Vista de edición de rol con checkboxes
- ✅ Permisos seleccionados y guardado exitoso
- 📝 Lista de permisos asignados en vista de detalle

### 👤 **Permisos desde Vista de Usuario**

- 👨‍💼 Usuario con rol y permisos asociados
- ℹ️ Información clara de qué puede hacer el usuario

---

## 🚀 Cómo ejecutar el proyecto

```bash
# 📦 Instalar dependencias
npm install

# 🗃️ Inicializar base de datos (una vez)
node models/init.js

# 🌱 (Opcional) Insertar datos de prueba
node models/seed.js

# 🚀 Ejecutar servidor
node app.js
```

---

## 👨‍💻 Autores
**Mauro Florio** 🧑‍💼, **Iñaki Zarate** 👨‍💻

- 🐙 GitHub: [@mauflorio](https://github.com/mauflorio), [@inakizarate25](https://github.com/inakizarate25)

---

## 📄 Licencia
Este proyecto fue desarrollado como trabajo práctico para la materia de Backend. 🎓

---

*📅 Última actualización: Mayo 2025*
