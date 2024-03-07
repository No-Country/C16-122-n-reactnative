import { Router } from "express";
import { 
  getBars,
  deleteBar,
  editBar
} from "../controllers";
import { checkRole, protect } from "../middlewares";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Bares
 *  description: Bars endpoints
 */

/**
 * @swagger
 * /bar:
 *  get:
 *    tags: [Bares]
 *    summary: Obtener los bares, requiere sesion del perfil o del bar
 *    description: Endpoint para listar los bares.
 *    parameters:
 *       - name: id
 *         in: path
 *         description: Id del bar
 *         required: true
 *         schema:
 *           type: integer
 *    responses:
 *       '200':
 *         description: Consulta exitosa.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión para obtener acceso.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */

router.get('/', protect(['barSession', 'profileSession']), getBars);
router.use(protect(['profileSession']));
router.use(checkRole(['ADMIN']));

/**
 * @swagger
 * /bar/{id}:
 *  delete:
 *    tags: [Bares]
 *    summary: Eliminar un bar, requiere sesion del perfil
 *    description: Endpoint para eliminar un bar
 *    parameters:
 *       - name: id
 *         in: path
 *         description: Id del bar
 *         required: true
 *         schema:
 *           type: integer
 *    responses:
 *       '204':
 *         description: Bar eliminado exitosamente.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '404':
 *         description: No se encontró ningún bar con el ID especificado.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */

router.delete('/:id', deleteBar);

/**
 * @swagger
 * /bar/{id}:
 *  patch:
 *    tags: [Bares]
 *    summary: Editar un Bar, requiere sesion del perfil
 *    description: Endpoint para editar bar
 *    parameters:
 *       - name: id
 *         in: path
 *         description: Id del bar 
 *         required: true
 *         schema:
 *           type: integer
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/barGeneral"
 *    responses:
 *       '200':
 *         description: Bar editado exitosamente.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/barResponse"
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


router.patch('/:id', editBar);

export default router;

