import { Router } from 'express';
import {
  forgotPassword,
  logIn,
  logInProfile,
  newPassword,
  signUp,
} from '../controllers';
import { protect } from '../middlewares';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth Endpoints
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *    tags: [Auth]
 *    summary: Ingreso a la app
 *    description: Endpoint para hacer login en la aplicacion
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/login"
 *    responses:
 *       '200':
 *         description: Inicio de sesión exitoso.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/loginResponse"
 *       '401':
 *         description: Credenciales incorrectas. Verifique su usuario y contraseña.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *
 */

router.post('/login', logIn);

/**
 * @swagger
 * /auth/sign-up:
 *  post:
 *    tags: [Auth]
 *    summary: Registro para la app
 *    description: Endpoint para registrar nuevo bar para el ingreso de la aplicacion
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/signUp"
 *    responses:
 *       '201':
 *         description: Bar registrado exitosamente.
 *       '400':
 *         description: |
 *          No se pudo registrar el Bar. Verifique los datos proporcionados.
 *            - Formato del email incorrecto.
 *       '409':
 *         description: |
 *          Error de restricción única.
 *            - username existente.
 *            - email existente.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *
 */
router.post('/sign-up', signUp);

/**
 * @swagger
 * /auth/login/profile:
 *  post:
 *    tags: [Auth]
 *    summary: Login del perfil, requiere sesion en perfil o en bar
 *    description: Endpoint para hacer login con los perfiles
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/loginProfile"
 *    responses:
 *       '200':
 *         description: Inicio de sesión exitoso.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/loginResponse"
 *       '401':
 *         description: |
 *          Error en la autorizacion.
 *            - Credenciales incorrectas. Verifique su pin.
 *            - ¡Usted no se ha identificado! por favor inicie sesión para obtener acceso
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *       - bearerAuth: []
 */

router.post(
  '/login/profile',
  protect(['barSession', 'profileSession']),
  logInProfile
);
/**
 * @swagger
 * /auth/forgot-password:
 *  post:
 *    tags: [Auth]
 *    summary: Recuperar contraseña
 *    description: Endpoint para recuperar la contraseña del bar
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/recoveryPassword"
 *    responses:
 *       '200':
 *         description: Se envio un codigo a su correo para restablecer su contraseña.
 *       '404':
 *         description: No se encontró ninguna BAR con el EMAIL especificado.
 *       '409':
 *         description: Error de validación, revise que los campos enviados son los correctos.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *       - bearerAuth: []
 */

router.post('/forgot-password', forgotPassword);
/**
 * @swagger
 * /auth/new-password:
 *  post:
 *    tags: [Auth]
 *    summary: Cambiar contraseña
 *    description: Endpoint para cambiar la contraseña del bar
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/newPassword"
 *    responses:
 *       '200':
 *         description: La operacion se realizo con exito.
 *       '400':
 *         description: Algo salio mal.
 *       '401':
 *         description: El proceso expiro, vuelva a enviar otra solicitud de recuperacion..
 *       '409':
 *         description: Error de validación, revise que los campos enviados son los correctos.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *       - bearerAuth: []
 */

router.post('/new-password', newPassword);

export default router;
