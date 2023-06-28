# Frontend - Team Belbin 

## Requisitos previos

-    Para poder ejecutar el backend en local, se deberá tener instalado en la máquina NPM y Node ( Últimas versiones )
-    Es imprescindible tener el Backend levantado para poder hacer funcionar el frontend

## Setup

-   Install dependencies with `yarn`
-   Config your environment with `yarn dev`
-   Create a `.env` file following the `.env.example` structure.


## Login en la aplicación (Ejecución en local)
-   Asegurarse que la configuración está correcta : 
    - src/api/config.js
    - Comprueba que la baseURL es la deseada
    - Ejecución local : *VITE_API_URL* - http://localhost:4000/api
    - Ejecución Heroku : *HEROKU_API_URL* - https://team-belbin-be-ddaf06167808.herokuapp.com/api

-   Para poder acceder a la aplicación, puede registrarse o entrar con alguno de los usuarios ya creados : 

`` http://127.0.0.1:5173/api/auth/login ``

`` usuario : v.mesa@gmail.com
   pass : 123456
 ``


## Funciones disponibles

- *Login en la aplicación*

- *Registro en la aplicación*

- *Crear datos y eliminarlos*
    1. Conocimientos
    2. Roles
    3. Tecnologías

- *Crear perfiles, eliminarlos y editarlos*

- *Crear miembros, eliminarlos y editarlos*

- *Crear equipos, eliminarlos y editarlos*




