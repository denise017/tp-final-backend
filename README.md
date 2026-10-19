# Midnight Books

Midnight Books es una libreria online de libros de terror que desarrolle como trabajo practico final de Backend.

La pagina permite consultar un catálogo de libros, registrarse, iniciar sesion, agregar libros al carrito y realizar pedidos

El proyecto cuenta con una API REST desarrollada con Node.js y Express, una base de datos MongoDB y un frontend realizado con React

## Enlaces

**Página web:** https://midnight-books.onrender.com

**API:** https://midnight-books.onrender.com/api

**Repositorio:** https://github.com/denise017/tp-final-backend

## Tecnologias utilizadas

- Backend: Node.js, Express y JavaScript
- Frontend: React, HTML y CSS
- Base de datos:MongoDB Atlas y Mongoose
- Autenticación: JWT y bcryptjs
- Seguridad: express-rate-limit y variables de entorno
- Herramientas: Postman, GitHub y Render para el despliegue

## Funcionalidades

- Registro e inicio de sesion de usuarios
- Autenticacion mediante JWT
- Catalogo de libros de terror
- Gestión de usuarios y libros
- Carrito de compras
- Creacion y gestion de pedidos
- Permisos de administrador
- Validacion de datos y manejo de errores
- Limite de solicitudes a la API

## Pruebas con Postman

Realice pruebas de los endpoints de manera local utilizando Postman para comprobar su funcionamiento.
Una vez publicado el proyecto en Render volvi a realizar pruebas desde Postman utilizando la API desplegada

**Autenticacion y usuarios**
- Registro de usuarios
- Inicio de sesion
- Consulta de usuarios
- Actualizacion de datos
- Eliminacion de usuarios

**Libros**
- Consulta del catalogo
- Consulta de libros por ID
- Creacion de libros
- Actualizacion de precios y datos
- Eliminacion de libros

**Carrito**
- Consulta del carrito
- Agregado de productos
- Actualización de cantidades
- Eliminacion de productos

**Pedidos**
- Creacion de pedidos
- Consulta de pedidos
- Actualizacion de pedidos
- Eliminacion de pedidos

Estas pruebas permitieron comprobar las operaciones CRUD y el funcionamiento de la autenticacion y las respuestas de la API
Tambien comprobe la integracion entre el frontend, el backend y MongoDB Atlas :

 - Registre un usuario desde Postman y despues inicie sesion con esa misma cuenta desde la pagina web
 - Desde la pagina agregue libros al carrito y realice un pedido
 - Luego consulte el carrito y los pedidos desde Postman y pude comprobar que los datos se habian guardado correctamente

## Instalacion y ejecucion

### 1. Clonar el repositorio

```bash
git clone https://github.com/denise017/tp-final-backend.git
cd tp-final-backend
```

### 2. Instalar dependencias del backend

```bash
npm install
```

### 3. Configurar variables de entorno

Crear el archivo `.env` en la raíz del proyecto y configurar las variables de MongoDB y JWT.

### 4. Iniciar el backend

```bash
npm run dev
```

### 5. Iniciar el frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

## Seguridad

Las contraseñas se cifran utilizando bcryptjs y la autenticación se realiza mediante JWT.

Se utiliza `express-rate-limit` para limitar las solicitudes:

- 100 solicitudes cada 15 minutos como límite general.
- 10 solicitudes cada 15 minutos para autenticación.

Tambein se implementaron validaciones de datos, manejo de errores y permisos de administrador
