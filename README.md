<h1 align="center">Subite Project</h1>
<p align="center">
  <img src="https://img.freepik.com/premium-vector/online-taxi-ordering-service-banner-design-yellow-cab-driving-through-smartphone-screen-display_148087-187.jpg" alt="Descripción de la imagen">
</p>


## Descripción
El proyecto consiste en el desarrollo de un backend robusto y escalable para una aplicación web y móvil. Este backend proporciona una interfaz de programación de aplicaciones (API) segura y eficiente que permite la interacción entre el frontend de la aplicación y la base de datos.

### Características Principales

El backend ofrece las siguientes características principales:

- **Autenticación y Autorización**: Utiliza JWT para gestionar la autenticación de usuarios y controlar el acceso a los recursos.
- **CRUD Operations**: Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en los datos de la aplicación.
- **Seguridad**: Implementa prácticas de seguridad como el cifrado de contraseñas y la validación de datos para proteger la integridad de los datos.
- **Escalabilidad**: Diseñado para ser escalable y capaz de manejar un gran volumen de solicitudes de manera eficiente.
- **Gestión de Errores**: Implementa un manejo robusto de errores para garantizar la estabilidad y confiabilidad del sistema.

### Objetivos

El objetivo principal del proyecto es proporcionar un backend confiable y seguro que satisfaga las necesidades funcionales y de rendimiento de la aplicación web y móvil. Además, se busca garantizar la mantenibilidad y escalabilidad del sistema a medida que crece y evoluciona con el tiempo.

## Tecnologías Utilizadas
- **dotenv**: 16.4.4
- **express**: 4.18.2
- **pg**: 8.11.3
- **pg-hstore**: 2.3.4
- **sequelize**: 6.37.1
- **sequelize-cli**: 6.6.2
- **@types/express**: 4.17.21
- **@types/module-alias**: 2.0.4
- **@types/node**: 20.11.22
- **ts-standard**: 12.0.2
- **typescript**: 5.3.3
- **@types/bcrypt**: 5.0.2
- **bcrypt**: 5.1.1
- **cors**: 2.8.5
- **module-alias**: 2.2.3
- **morgan**: 1.10.0
- **sequelize-typescript**: 2.1.6

## Configuración
Para que el proyecto funcione correctamente, debes crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

- **PORT**: Puerto del servidor
- **PGUSER**: Usuario de PostgreSQL
- **PGPASSWORD**: Contraseña de PostgreSQL
- **PGDATABASE**: Nombre de la base de datos en PostgreSQL
- **PGHOST**: Host de la base de datos
- **PGPORT**: Puerto de la base de datos
- **PGCONN**: Tipo de conexión a usar (dev: postgres)
- **NODE_ENV:** Tipo de funcionamiento de la DB (`developer`: hara funcionar en modo `force: true`)

## Instalación
1. Clona este repositorio.
2. Ejecuta `npm install` para instalar las dependencias.
3. Crear tu base de datos en PostgreSQL
4. Ejecuta el comando `npm run dev`

## Uso
- Recuerda que para hacer importaciones debes usar ES6 (import/export)
- En caso de desarrollar una funcionalidad: </br>
Primero debes pararte en la rama develop y hacer pull, luego crear una nueva rama con `git checkout -b feature/jira-code-[description]`</br>
*ej: feature/IT-77-get-customers*
- en caso de estar arreglando un bug:</br>
Usar el siguiente formato `git checkout -b fix/jira-code-[description]`</br>
*ej: fix/IT-77-get-customers*


## Contribución (sujeto a cambios)
1. Haz un Git Clone del proyecto.
2. Crea una rama para tu función: `git checkout -b feature/nueva-funcion`.
3. Realiza tus cambios y haz commit: `git commit -m 'Agrega nueva función'`.
4. Haz push a la rama: `git push origin feature/nueva-funcion`.
5. Abre un Pull Request.

## Estado del proyecto
<div align="center">
    <img alt="Static Badge" src="https://img.shields.io/badge/Estado%20-%20En%20desarrollo%20-%20green?color=yellow">
    <a href="https://img.shields.io/badge/Versión-1.0.0-blue"><img src="https://img.shields.io/badge/Versión-1.0.0-blue" alt="Versión del Proyecto"></a>
    <img src="https://img.shields.io/badge/Estado%20-%20Beta%20-%20orange" alt="Beta">
    <img src="https://img.shields.io/badge/Estado%20-%20Estable%20-%20brightgreen" alt="Estable">

</div>


