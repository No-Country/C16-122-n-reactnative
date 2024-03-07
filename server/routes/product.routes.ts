import { Router } from 'express';
import { checkRole, protect } from '../middlewares';
import {
  createProductForBar,
  deleteProductForBar,
  editProductForBar,
  getProductsForBar,
} from '../controllers/product.controllers';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Productos
 *  description: Endpoints para las productos de los productos
 */

router.use(protect(['profileSession']));

/**
 * @swagger
 * /products:
 *  get:
 *    tags: [Productos]
 *    summary: Obtener los de productos del Bar, requiere sesion del perfil
 *    description: Endpoint para listar los productos creados en el bar
 *    responses:
 *       '200':
 *         description: Consulta exitosa.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/productsResponse"
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */

router.get('/', getProductsForBar);
router.use(checkRole(['ADMIN']));
/**
 * @swagger
 * /products:
 *  post:
 *    tags: [Productos]
 *    summary: Crear una producto para el Bar, requiere sesion del perfil
 *    description: Endpoint para crear productos en el bar
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/productGeneral"
 *    responses:
 *       '200':
 *         description: Producto creado exitosamente.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/productResponse"
 *       '400':
 *         description: No se pudo crear el producto. Verifique los datos proporcionados.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta.
 *       '404':
 *         description: No se encontró ninguna categoria con el ID especificado.
 *       '409':
 *         description: Error de validación, revise que los campos enviados son los correctos.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.post('/', createProductForBar);

/**
 * @swagger
 * /products/{id}:
 *  patch:
 *    tags: [Productos]
 *    summary: Editar un producto del Bar, requiere sesion del perfil
 *    description: Endpoint para editar los productos del bar
 *    parameters:
 *       - name: id
 *         in: path
 *         description: Id del producto
 *         required: true
 *         schema:
 *           type: integer
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/productGeneralEdit"
 *    responses:
 *       '200':
 *         description: Producto editado exitosamente.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/productResponse"
 *       '400':
 *         description: No se pudo editar el producto. Verifique los datos proporcionados.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta..
 *       '404':
 *         description: No se encontró ningun producto con el ID especificado.
 *       '409':
 *         description: Error de validación, revise que los campos enviados son los correctos.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.patch('/:id', editProductForBar);

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *    tags: [Productos]
 *    summary: Eliminar un producto del bar, requiere sesion del perfil
 *    description: Endpoint para eliminar productos del bar
 *    parameters:
 *       - name: id
 *         in: path
 *         description: Id del producto
 *         required: true
 *         schema:
 *           type: integer
 *    responses:
 *       '204':
 *         description: Producto eliminado exitosamente.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta..
 *       '404':
 *         description: No se encontró ninguna producto con el ID especificado.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.delete('/:id', deleteProductForBar);

export default router;
