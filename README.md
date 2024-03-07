# Cohorte 16 - Equipo 122 - Turno noche - ReactNative (App para bares y restaurantes)

Usuarios: empleados (camareros, encargados, gerentes..)

Realizaremos el diseño de una aplicación para bares y restaurantes donde el usuario será el empleado y tendrá distintas funciones dependiendo de su rol. Creamos esta app con el fin de acelerar el proceso de las órdenes, mejorar los tiempos de espera de los clientes y la experiencia del usuario.

Sabemos que el camarero siempre toma sus pedidos de memoria, en un papel o utiliza la misma pantalla que el resto de sus compañeros y eso puede resultar en pérdida de tiempo, conflictos a la hora de utilizar la pantalla y hasta pérdida de clientes. Por eso con esta app lograremos que el usuario pueda generar una órden desde cualquier parte del restaurate/bar así como también otras funcionalidades.

---

## LINKS DE DEPLOY

front / back

## INTEGRANTES

### FrontEnd
- [Francisco Garcia Matar](https://github.com/fgarciamatar)
- [Sol Calderón](https://github.com/sol1217)
- [Edson Aju](https://github.com/DarkEdson) 
- [Jhon Castillo]() 

### BackEnd
- [Carlos Tuñon](https://github.com/cartudev)
- [Jhon Castillo](https://github.com/jhonccastilloa)

### UX/UI
- [Florencia Parodi](https://github.com/florenciaParodi)
- [Christopher Peralta](https://github.com/ChristopherPeralta)

### TL
- Daniela Romero

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

***

### **¿Cómo nos organizamos con el equipo?**

Primero creamos un prototipo de baja fidelidad en excalidraw con participación de todo el equipo para entender de que se trataba la app. Luego creamos un Trello grupal donde teníamos tareas según el rol. A su vez en UX/UI se creaba el prototipo de media fidelidad mientras el backend generaba la BDD.
Una vez terminado el prototipo de media fidelidad, frontend comenzó con el esqueleto y funcionalidades. Por último finalizamos el prototipo de alta fidelidad y los devs llevaron todos los estilos hacia la app.

Nos organizamos con las semanas y recomendaciones de No country en cuanto al tiempo de entrega y los sprints.

Construimos un MVP.

**Funcionalidades:**
- Registro
- Logueo
- Ver perfil de camarero, 
- Ver la pantalla de salón (mesas)
- Ver la pantalla de menú
- Ver la pantalla de pedido realizado

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
