# Cohorte 16 - Equipo 138 - Turno noche - ReactNative (App para bares y restaurantes)

Usuarios: empleados (camareros, encargados, gerentes..)

Realizaremos el diseño de una aplicación para bares y restaurantes donde el usuario será el empleado y tendrá distintas funciones dependiendo de su rol. Creamos esta app con el fin de acelerar el proceso de las órdenes, mejorar los tiempos de espera de los clientes y la experiencia del usuario.

Sabemos que el camarero siempre toma sus pedidos de memoria, en un papel o utiliza la misma pantalla que el resto de sus compañeros y eso puede resultar en pérdida de tiempo, conflictos a la hora de utilizar la pantalla y hasta pérdida de clientes. Por eso con esta app lograremos que el usuario pueda generar una órden desde cualquier parte del restaurate/bar así como también otras funcionalidades.

---

## LINKS DE DEPLOY

front / back

## INTEGRANTES

https://github.com/DarkEdson
https://github.com/sol1217
https://github.com/cartudev (Carlos)

(francisco
https://github.com/jhonccastilloa
### FrontEnd
- [Francisco Garcia Matar (estilos y funcionalidades)] (https://github.com/fgarciamatar)
- Sol Calderón (estilos)
- Edson Aju (estilos y funcionalidades)
- Jhon Castillo (estilos y funcionalidades)

### BackEnd
- Carlos Tuñon
- Jhon Castillo

### UX/UI
- Florencia Parodi
- Christopher P-P

***
## TECNOLOGÍAS UTILIZADAS

### FRONTEND 
- React-Native
- Tamagui
- Redux
- Native Base

### BACKEND
- Node
- Express
- PostgreSQL
- ORM: Sequelize
***
## DEPENDENCIAS
- react-native
- reduxjs
- axios
- core-js
- flow
- git
- react
- babel
- eslint
- metro
- typescript
- tamagui
- jest
- prettier


### UX/UI
- Figma
***

### LINKS
- Trello
- Figma
***

### **Algunos ejemplos de pantallas**

- Bienvenida (términos y condiciones):

- Inicio de sesión o registro:

- Registro: se agregan validaciones y se le avisa al usuario por medio e carteles antes errores y ante registro exitoso.

- Recuperar contraseña: Se envía correo de recuperación

- Distintos perfiles:

- Pantalla de perfil camarero: Se visualizan mesa disponibles y mesas ocupadas, puede enviar a imprimir la órden, descargarla, enviarla por correo al cliente y cancelarla.

- Pantalla de perfil admin: Cuenta con PIN para ingresar y más funcionalidades que el camarero tales como: agrear categorías al menú, editar perfiles y descargar reportes.



### **¿Cómo nos organizamos con el equipo?**

Intentamos coordinar con nuestro UX/UI para contar con la información en Figma y con el grupo de BackEnd para tener los servicios a utilizar en las tareas de cada Sprint.

Creamos un MVP y dividimos las tareas en sprints (con duración de una semana):

**Funcionalidades para el MVP:**
- Registro
- Logueo
- Ver la pantalla de mercado, seleccionar/deseleccionar favoritos e ir a compra
- Ver la pantalla de compra
- Ver la pantalla de venta
- Ver la pantalla de billetera

## SPRINT 1 - Funcionalidades:
Crear el Footer, Header y Navbar

Pantalla de Login y Registro, la maquetación, sin la funcionalidad

Pantalla de mercado, por el momento se trae la inforamcion desde una API publica, para luego unir con el Back

Creacion de base de datos para login y registro

## SPRINT 2 - Funcionalidades:
Se ajusta tanto el login como el registro para poder conectar back y front

Se ajusta la pagina de market para traer la informacion de las monedas ya con el back y dejar la API

Se rediseña la tabla que muestra las monedas, apra poder reagruparlas por la información que muestra en columnas, siempre manteniendo mobile first, es responsive en todos los dispositivos.

Se pasa a un context tanto la informacion de login como las monedas, y se hacen los ajustes en la parte de login, los condiconales para mostrar o no el navbar dependiendo de si esta logueado o no. Tambien se ajusta como se muestra la moneda en la pagina de market.

Se crea un contexto para un estado general de carga, asi cuando se está realizando el llamado de datos, se pone la pantalla griseada y se ve una animación similar a la de Binance de las barras al cargar. Asi el usuario sabe que se esta haciendo una carga o busqueda.

## SPRINT 3 - Funcionalidades:
Se completa la funcionalidad para agregar o sacar monedas favoritas

Se continua con las paginas de compra y venta

Se agrega la pagina Not Found que redirige a market en el caso de ser un usuario ya loguedo.

## SPRINT 4 - Funcionalidades:
Se finalizan las paginas de compra y venta

Se ajustan los datos del suaurio para mostrarlos una vvez logueado

Se realiza la página de billetera
***

¿Cómo veo en local el Front y el Back ?

**1ro:**
- copiar el repositorio con: git clone https://github.com/No-Country/s10-03-t-node-nest-react-binance.git

external-server-miscellaneous-kiranshastry-lineal-color-kiranshastry

**2do:**
- Para el Back ir al repositorio server y ya dentro:

-> Instación de dependencias: $ npm install

-> Para correr la app:

En development: $ npm run start

(watch mode)

$ npm run start:dev
En modo produccion: $ npm run start:prod

-> Para los test:

(unit tests)

$ npm run test
(e2e tests)

$ npm run test:e2e
(test coverage)

$ npm run test:cov
web 3ro.: para el Front, ir al repositorio en client y ya dentro:
-> Instación de dependencias: $ npm install

-> Para correr la app:

En development: $ npm run dev

-> Para correr la app:

En development: $ npm run dev
