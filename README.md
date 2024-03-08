# Cohorte 16 - Equipo 122 - Turno noche - ReactNative (App para bares y restaurantes)

Usuarios: empleados (camareros, encargados, gerentes..)

Realizaremos el diseño de una aplicación para bares y restaurantes donde el usuario será el empleado y tendrá distintas funciones dependiendo de su rol. Creamos esta app con el fin de acelerar el proceso de las órdenes, mejorar los tiempos de espera de los clientes y la experiencia del usuario.

Sabemos que el camarero siempre toma sus pedidos de memoria, en un papel o utiliza la misma pantalla que el resto de sus compañeros y eso puede resultar en pérdida de tiempo, conflictos a la hora de utilizar la pantalla y hasta pérdida de clientes. Por eso con esta app lograremos que el usuario pueda generar una órden desde cualquier parte del restaurate/bar así como también otras funcionalidades.

---

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
- Daniela Betania Romero

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

Primero creamos un diseño de baja fidelidad en Excalidraw para tener en claro de que se trataba la app y definir nuestro MVP. Luego creamos sun diseño de media fidelidad en Figma y comenzamos a crear la BDD. Una vez que avanzamos sobre ese último diseño definimos logo, tonalidades y fuentes para la app, allí creamos el diseño de alta fidelidad y se comezó a trabajar en el front.
Una vez completo el MVP, avanzamos sobre funcionalidades extras y errores.

Tuvimos en cuenta las semanas organizadas por No-Country para cumplir con los tiempos de entrega.

**Funcionalidades para el MVP:**
- Registro
- Logueo
- Ver perfil camarero
- Ver salón
- Tomar pedido
- Eliminar producto del pedido
- Enviar pedido a cocina

***

## SPRINT 1
- **Figma / BDD / log in y salón sin funcionalidades :**
  Realizamos el diseño y prototipado en Figma desde "Aceptar términos y condiciones" hasta las últimas pantallas del "perfil camarero". También realizamos la BDD y las pantallas de log in y salón en el front sin funcionalidades.

## SPRINT 2
- **Perfil camarero (salón, comnanda) y perfil admin SIN funcionalidades :**
  Avanzamos en el perfil camarero y el perfil admin. Agregamos las mesas y botones necesarios a las pantallas y creamos el espacio para la comanda del pedido. También creamos el perfil admin que contiene más opciones para el usuario:
  - agregar/editar/eliminar produtos
  - agregar/editar/eliminar categorías
  - agregar/editar/eliminar perfiles (empleados)
  
## SPRINT 3
- **Funcionalidades :**
  Agregamos las funcionalidades a los distintos perfiles
  - camarero: log in con PIN, tomar pedido, eliminar productos del pedido, enviar comanda a la cocina, cancelar pedido, facturar orden.
  - admin: log in con PIN, ver salón y pedidos por mesa, CRUD de productos, categorias y perfiles, cancelar orden

## SPRINT 4
- **Estilos, errores y funcionalidades extras :**
  - Finalizamos con los estilos en el front
  - Creamos funcionalidades extras (mensaje en pedido, reportes, imprimir factura, perfil cocina para el chef)
  - resolvimos errores

***

¿Cómo veo en local el Front y el Back ?

**1ro:**
- copiar el repositorio con: git clone 

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
