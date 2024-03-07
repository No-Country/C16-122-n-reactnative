import { Router } from 'express';
import { checkRole, protect } from '../middlewares';
import {
  createProductCategoryForBar,
  deleteProductCategoryForBar,
  editProductCategoryForBar,
  getProductsCategoriesForBar,
} from '../controllers/productCategory.controllers';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Categorias
 *  description: Endpoints para las categorias de los productos
 */

router.use(protect(['profileSession']));

/**
 * @swagger
 * /product-categories:
 *  get:
 *    tags: [Categorias]
 *    summary: Obtener las categorias de productos del Bar, requiere sesion del perfil
 *    description: Endpoint para listar las categorias de productos creados en el bar
 *    responses:
 *       '200':
 *         description: Consulta exitosa.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/productsCategoriesResponse"
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */

router.get('/', getProductsCategoriesForBar);
router.use(checkRole(['ADMIN']));
/**
 * @swagger
 * /product-categories:
 *  post:
 *    tags: [Categorias]
 *    summary: Crear una categoria para el Bar, requiere sesion del perfil
 *    description: Endpoint para crear categorias del bar
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/productCategoryGeneral"
 *    responses:
 *       '200':
 *         description: Categoria creado exitosamente.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/productCategoryResponse"
 *       '400':
 *         description: No se pudo crear la Categoria. Verifique los datos proporcionados.
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
router.post('/', createProductCategoryForBar);
/**
 * @swagger
 * /product-categories/{id}:
 *  patch:
 *    tags: [Categorias]
 *    summary: Editar una categoria del Bar, requiere sesion del perfil
 *    description: Endpoint para editar las categorias del bar
 *    parameters:
 *       - name: id
 *         in: path
 *         description: Id de la categoria
 *         required: true
 *         schema:
 *           type: integer
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/productCategoryGeneral"
 *    responses:
 *       '200':
 *         description: Categoria editado exitosamente.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/productCategoryResponse"
 *       '400':
 *         description: No se pudo editar la categoria. Verifique los datos proporcionados.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta..
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
router.patch('/:id', editProductCategoryForBar);
/**
 * @swagger
 * /product-categories/{id}:
 *  delete:
 *    tags: [Categorias]
 *    summary: Eliminar una categoria del bar, requiere sesion del perfil
 *    description: Endpoint para eliminar categorias del bar
 *    parameters:
 *       - name: id
 *         in: path
 *         description: Id de la categoria
 *         required: true
 *         schema:
 *           type: integer
 *    responses:
 *       '204':
 *         description: Categoria eliminado exitosamente.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta..
 *       '404':
 *         description: No se encontró ninguna categoria con el ID especificado.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.delete('/:id', deleteProductCategoryForBar);

export default router;
