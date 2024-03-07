import { Router } from 'express';
import { checkRole, protect } from '../middlewares';
import {
  addOrderInBillOrderForBar,
  createBillOrderForBar,
  getBillOrdersForBar,
  payBillOrder,
  getBillOrderForBar,
  getBillOrderByTableForBar,
  addOrCreateOrderInBillOrderForBar,
} from '../controllers/billOrder.controllers';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Factura
 *  description: Endpoints para las Facturas del bar
 */

router.use(protect(['profileSession']));
router.use(checkRole(['EMPLOYEE', 'ADMIN']));

/**
 * @swagger
 * /bill-orders:
 *  get:
 *    tags: [Factura]
 *    summary: Obtener las facturas del Bar, requiere sesion del perfil
 *    description: Endpoint para listar los facturas creados en el bar
 *    responses:
 *       '200':
 *         description: Consulta exitosa.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/billOrdersResponse"
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */

router.get('/', getBillOrdersForBar);
/**
 * @swagger
 * /bill-orders/table/{tableId}:
 *  get:
 *    tags: [Factura]
 *    summary: Optener una factura activa de la mesa del Bar, requiere sesion del perfil
 *    description: Endpoint para obtener una factura de la mesa selecciona en el bar
 *    parameters:
 *       - name: tableId
 *         in: path
 *         description: Id de la mesa
 *         required: true
 *         schema:
 *           type: integer
 *    responses:
 *       '200':
 *         description: Consulta exitosa.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/billOrderResponse"
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta..
 *       '404':
 *         description: No se encontró ninguna factura activa en la mesa con el ID especificado.
 *       '409':
 *         description: Error de validación, revise que los campos enviados son los correctos.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.get('/table/:tableId', getBillOrderByTableForBar);
/**
 * @swagger
 * /bill-orders/{billOrderId}:
 *  get:
 *    tags: [Factura]
 *    summary: Optener una factura del Bar, requiere sesion del perfil
 *    description: Endpoint para obtener una factura del bar
 *    parameters:
 *       - name: billOrderId
 *         in: path
 *         description: Id de la factura
 *         required: true
 *         schema:
 *           type: integer
 *    responses:
 *       '200':
 *         description: Consulta exitosa.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/billOrderResponse"
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta..
 *       '404':
 *         description: No se encontró ninguna factura con el ID especificado.
 *       '409':
 *         description: Error de validación, revise que los campos enviados son los correctos.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.get('/:billOrderId', getBillOrderForBar);

/**
 * @swagger
 * /bill-orders/table/{tableId}:
 *  post:
 *    tags: [Factura]
 *    summary: Crear una factura para el Bar, requiere sesion del perfil
 *    description: Endpoint para crear facturas en el bar
 *    parameters:
 *       - name: tableId
 *         in: path
 *         description: Id de la tabla
 *         required: true
 *         schema:
 *           type: integer
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/billOrderGeneral"
 *    responses:
 *       '200':
 *         description: Factura creado exitosamente.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/billOrder"
 *       '400':
 *         description: No se pudo crear la factura. Verifique los datos proporcionados.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta.
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
router.post('/table/:tableId', createBillOrderForBar);
/**
 * @swagger
 * /bill-orders/create-or-add/{tableId}:
 *  post:
 *    tags: [Factura]
 *    summary: Crear una factura o añadir ordenes para la mesa seleccionada del Bar, requiere sesion del perfil
 *    description: Endpoint para crear facturas o añadir ordenes en caso de que la factura exista en el bar
 *    parameters:
 *       - name: tableId
 *         in: path
 *         description: Id de la mesa
 *         required: true
 *         schema:
 *           type: integer
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/billOrderGeneral"
 *    responses:
 *       '200':
 *         description: Factura creado exitosamente.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/billOrder"
 *       '400':
 *         description: No se pudo crear completa la opeacion. Verifique los datos proporcionados.
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta.
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
router.post('/create-or-add/:tableId', addOrCreateOrderInBillOrderForBar);

/**
 * @swagger
 * /bill-orders/{billOrderId}/addOrder:
 *  patch:
 *    tags: [Factura]
 *    summary: Agregar ordenes en la factura del bar, requiere sesion del perfil
 *    description: Endpoint para agregar ordenes en la factura del bar
 *    parameters:
 *       - name: billOrderId
 *         in: path
 *         description: Id de la factura
 *         required: true
 *         schema:
 *           type: integer
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: "#/components/schemas/billOrderGeneral"
 *    responses:
 *       '200':
 *         description: Orden agregado a la factura exitosamente.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/billOrderResponse"
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta..
 *       '404':
 *         description: No se encontró ninguna factura con el ID especificado.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.patch('/:billOrderId/addOrder', addOrderInBillOrderForBar);

/**
 * @swagger
 * /bill-orders/{billOrderId}/pay:
 *  patch:
 *    tags: [Factura]
 *    summary: Marcar como pagado la factura del bar, requiere sesion del perfil
 *    description: Endpoint para marcar la factura del bar
 *    parameters:
 *       - name: billOrderId
 *         in: path
 *         description: Id de la factura
 *         required: true
 *         schema:
 *           type: integer
 *    responses:
 *       '200':
 *         description: Factura marcada como pagada exitosamente.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/billOrderResponse"
 *       '401':
 *         description: ¡Usted no se ha identificado! por favor inicie sesión con su perfil para obtener acceso.
 *       '403':
 *         description: Este perfil no tiene permisos para acceder a esta ruta..
 *       '404':
 *         description: No se encontró ninguna factura con el ID especificado.
 *       '500':
 *          description: Ha ocurrido un error interno. Por favor, inténtelo de nuevo más tarde.
 *    security:
 *      - bearerAuth: []
 *
 */
router.patch('/:billOrderId/pay', payBillOrder);

export default router;
