import { Router } from 'express';
import { checkRole, protect } from '../middlewares';
import {
  createTableForBar,
  deleteTableForBar,
  editableForBar,
  getTablesForBar,
} from '../controllers/table.controllers';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Mesas
 *  description: Mesas endpoints
 */

router.use(protect(['profileSession']));

/**
 * @swagger
 * /tables:
 *  get:
 *    tags: [Mesas]
 *    summary: Obtener los mesas del Bar, requiere sesion del perfil
 *    description: Endpoint para listar las mesas creados en el bar
 *    responses:
 *       '200':
 *         description: Consulta exitosa.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/tablesResponse"
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */

router.get('/', getTablesForBar);
router.use(checkRole(['ADMIN']));
/**
 * @swagger
 * /tables:
 *  post:
 *    tags: [Mesas]
 *    summary: Crear una mesa para el Bar, requiere sesion del perfil
 *    description: Endpoint para crear mesas del bar
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/tableGeneral"
 *    responses:
 *       '200':
 *         description: Mesa creado exitosamente.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/tableResponse"
 *       '400':
 *         description: No se pudo crear la mesa. Verifique los datos proporcionados.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta.
 *       '409':
 *         description: Error de validación, revise que los campos enviados son los correctos.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.post('/', createTableForBar);

/**
 * @swagger
 * /tables/{id}:
 *  patch:
 *    tags: [Mesas]
 *    summary: Editar una mesa del Bar, requiere sesion del perfil
 *    description: Endpoint para editar las mesas del bar
 *    parameters:
 *       - name: id
 *         in: path
 *         description: Id de la mesa
 *         required: true
 *         schema:
 *           type: integer
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/tableGeneral"
 *    responses:
 *       '200':
 *         description: Mesa editado exitosamente.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/tableResponse"
 *       '400':
 *         description: No se pudo editar la mesa. Verifique los datos proporcionados.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta..
 *       '404':
 *         description: No se encontró ninguna mesa con el ID especificado.
 *       '409':
 *         description: Error de validación, revise que los campos enviados son los correctos.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.patch('/:id', editableForBar);

/**
 * @swagger
 * /tables/{id}:
 *  delete:
 *    tags: [Mesas]
 *    summary: Eliminar una mesa del bar, requiere sesion del perfil
 *    description: Endpoint para eliminar mesas del bar
 *    parameters:
 *       - name: id
 *         in: path
 *         description: Id de la mesa
 *         required: true
 *         schema:
 *           type: integer
 *    responses:
 *       '204':
 *         description: Mesa eliminado exitosamente.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta..
 *       '404':
 *         description: No se encontró ninguna mesa con el ID especificado.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.delete('/:id', deleteTableForBar);
export default router;
