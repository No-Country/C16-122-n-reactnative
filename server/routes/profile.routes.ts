import { Router } from 'express';
import {
  createProfileForBar,
  deleteProfileForBar,
  editProfileForBar,
  getProfilesForBar,
} from '../controllers/profile.controllers';
import { checkRole, protect } from '../middlewares/auth.middlewares';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Perfiles
 *  description: Perfiles endpoints
 */

/**
 * @swagger
 * /profiles:
 *  get:
 *    tags: [Perfiles]
 *    summary: Obtener los perfiles del Bar, requiere sesion del perfil o del bar
 *    description: Endpoint para listar los perfiles creados en el bar
 *    responses:
 *       '200':
 *         description: Consulta exitosa.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/profilesResponse"
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión para obtener acceso.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */

router.get('/', protect(['barSession', 'profileSession']), getProfilesForBar);
router.use(protect(['profileSession']));
router.use(checkRole(['ADMIN']));
/**
 * @swagger
 * /profiles:
 *  post:
 *    tags: [Perfiles]
 *    summary: Crear un nuevo perfil para el Bar, requiere sesion del perfil
 *    description: Endpoint para crear  perfiles del bar
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/profileGeneral"
 *    responses:
 *       '200':
 *         description: Perfil creado exitosamente.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/profileResponse"
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '409':
 *         description: Error de validación, revise que los campos enviados son los correctos.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.post('/', createProfileForBar);

/**
 * @swagger
 * /profiles/{id}:
 *  patch:
 *    tags: [Perfiles]
 *    summary: Editar un perfile del Bar, requiere sesion del perfil
 *    description: Endpoint para editar  perfiles del bar
 *    parameters:
 *       - name: id
 *         in: path
 *         description: Id del perfil
 *         required: true
 *         schema:
 *           type: integer
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/profileGeneral"
 *    responses:
 *       '200':
 *         description: Perfil editado exitosamente.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/profileResponse"
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '404':
 *         description: No se encontró ningún perfil con el ID especificado.
 *       '409':
 *         description: Error de validación, revise que los campos enviados son los correctos.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.patch('/:id', editProfileForBar);
/**
 * @swagger
 * /profiles/{id}:
 *  delete:
 *    tags: [Perfiles]
 *    summary: Eliminar un perfil del bar, requiere sesion del perfil
 *    description: Endpoint para eliminar perfiles del bar
 *    parameters:
 *       - name: id
 *         in: path
 *         description: Id del perfil
 *         required: true
 *         schema:
 *           type: integer
 *    responses:
 *       '204':
 *         description: Perfil eliminado exitosamente.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '404':
 *         description: No se encontró ningún perfil con el ID especificado.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.delete('/:id', deleteProfileForBar);
export default router;
