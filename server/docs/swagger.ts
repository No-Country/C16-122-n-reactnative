import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';
import path from 'path';

const server = `http://${process.env.HOST}:${process.env.PORT}${process.env.ROUTE}`;
const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentacion BAR API',
    version: '1.0.0',
  },
  servers: [
    {
      url: server,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    schemas: {
      signUp: {
        type: 'object',
        required: ['name', 'password', 'userName', 'email'],
        properties: {
          email: { type: 'string', example: 'correo@gmail.com' },
          name: { type: 'string', example: 'Bar la unica' },
          password: { type: 'string', example: 'abcde12345' },
          userName: { type: 'string', example: 'uniqueBar' },
        },
      },
      login: {
        type: 'object',
        required: ['password', 'userName'],
        properties: {
          password: { type: 'string', example: 'abcde12345' },
          userName: { type: 'string', example: 'uniqueBar' },
        },
      },
      loginProfile: {
        type: 'object',
        required: ['pinCode', 'profielId'],
        properties: {
          pinCode: { type: 'string', example: '109e9d' },
          profileId: { type: 'number', example: 1 },
        },
      },
      recoveryPassword: {
        type: 'object',
        required: ['email'],
        properties: {
          email: { type: 'string', example: 'example@gmail.com' },
        },
      },
      newPassword: {
        type: 'object',
        required: ['newPassword', 'verifyPassword', 'code'],
        properties: {
          newPassword: { type: 'string', example: 'abcde12345' },
          verifyPassword: { type: 'string', example: 'abcde12345' },
          code: { type: 'string', example: '9e6c' },
        },
      },
      loginResponse: {
        type: 'object',
        example: {
          status: true,
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA4MzgzNDY5LCJleHAiOjE3MDgzOTA2Njl9.Y5Y9qMfC9brP2tAbS-4OBYUEWa53OzTTo14j7_YiArw',
          bar: {
            email: 'correo@gmail.com',
            name: 'Bar la unica',
            password: 'abcde12345',
            userName: 'uniqueBar',
          },
        },
      },
      profileResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          profile: {
            $ref: '#/components/schemas/profile',
          },
        },
      },
      profilesResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          profiles: {
            type: 'array',
            items: {
              oneOf: [
                { $ref: '#/components/schemas/profile' },
                { $ref: '#/components/schemas/profile' },
                { $ref: '#/components/schemas/profile' },
              ],
            },
          },
        },
      },
      profileGeneral: {
        type: 'object',
        required: ['name', 'role', 'pinCode'],
        properties: {
          name: { type: 'string', example: 'Mesero1' },
          role: {
            type: 'string',
            example: 'EMPLOYEE',
            enum: ['ADMIN', 'EMPLOYEE', 'CHEF'],
          },
          pinCode: { type: 'string', example: 'abcde12345' },
        },
      },
      profile: {
        type: 'object',
        example: {
          id: 1,
          name: 'Mesero 1',
          role: 'EMPLOYEE',
          pinCode: 'unknow',
          barId: 22,
          updatedAt: '2024-02-23T23:14:39.342Z',
          createdAt: '2024-02-23T23:14:39.342Z',
        },
      },
      barResponse: {
        type: 'object',
        example: {
          status: true,
          bar: {
            email: 'correo@gmail.com',
            name: 'Bar la unica',
            password: 'abcde12345',
            userName: 'uniqueBar',
          },
        },
      },
      barGeneral: {
        type: 'object',
        required: ['email', 'name', 'password'],
        properties: {
          email: { type: 'string', example: 'correo@gmail.com' },
          name: { type: 'string', example: 'Bar la unica' },
          password: { type: 'string', example: 'abcde12345' },
        },
      },
      bar: {
        type: 'object',
        example: {
          email: 'correo@gmail.com',
          name: 'Bar la unica',
          password: 'abcde12345',
        },
      },
      tableGeneral: {
        type: 'object',
        required: ['ability', 'location'],
        properties: {
          isOccupied: {
            type: 'boolean',
            example: false,
            description: 'No es necesario enviarlo, el valor default de false',
          },
          ability: { type: 'num', example: 5 },
          location: { type: 'string', example: 'medio' },
        },
      },
      productCategoryGeneral: {
        type: 'object',
        required: ['name', 'category'],
        properties: {
          name: { type: 'string', example: 'Hamburgesas' },
          description: {
            type: 'string',
            example: 'sandwiches con medallones de carne',
          },
        },
      },
      table: {
        type: 'object',
        example: {
          isOccupied: false,
          id: 1,
          tableNumber: 1,
          ability: 5,
          location: 'medio',
          barId: 22,
          updatedAt: '2024-02-22T19:37:04.016Z',
          createdAt: '2024-02-22T19:37:04.016Z',
        },
      },
      tableResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          table: {
            $ref: '#/components/schemas/table',
          },
        },
      },
      tablesResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          tables: {
            type: 'array',
            items: {
              oneOf: [
                { $ref: '#/components/schemas/table' },
                { $ref: '#/components/schemas/table' },
                { $ref: '#/components/schemas/table' },
              ],
            },
          },
        },
      },
      productCategory: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'Hamburgesas' },
          description: {
            type: 'string',
            example: 'sandwiches con medallones de carne',
          },
          barId: { type: 'number', example: '22' },
          updatedAt: { type: 'date', example: '2024-02-22T20:38:55.984Z' },
          createdAt: { type: 'date', example: '2024-02-22T20:38:55.984Z' },
        },
      },
      productsCategories: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'Hamburgesas' },
          description: {
            type: 'string',
            example: 'sandwiches con medallones de carne',
          },
          barId: { type: 'number', example: '22' },
          updatedAt: { type: 'date', example: '2024-02-22T20:38:55.984Z' },
          createdAt: { type: 'date', example: '2024-02-22T20:38:55.984Z' },
          products: {
            type: 'array',
            items: {
              oneOf: [
                { $ref: '#/components/schemas/product' },
                { $ref: '#/components/schemas/product' },
                { $ref: '#/components/schemas/product' },
              ],
            },
          },
        },
      },
      productCategoryResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          category: {
            $ref: '#/components/schemas/productCategory',
          },
        },
      },
      productsCategoriesResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          categories: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/productsCategories',
            },
          },
        },
      },
      productGeneral: {
        type: 'object',
        required: ['name', 'description', 'price', 'productCategoryId'],
        properties: {
          name: { type: 'string', example: 'Hamburguesa cheese' },
          description: {
            type: 'string',
            example: 'Hamburguesa a la Parrilla Con Queso',
          },
          price: { type: 'float', example: 10.5 },
          productCategoryId: {
            type: 'number',
            example: 1,
            description: 'Id de la categoria al que pertenece el producto',
          },
        },
      },
      productGeneralEdit: {
        type: 'object',
        required: ['name', 'description', 'price'],
        properties: {
          name: { type: 'string', example: 'Hamburguesa cheese' },
          description: {
            type: 'string',
            example: 'Hamburguesa a la Parrilla Con Queso',
          },
          price: { type: 'float', example: 10.5 },
        },
      },
      product: {
        type: 'object',
        example: {
          id: 3,
          name: 'Helado Mini Princesa',
          price: 11.5,
          description: 'Helado Mini Princesa',
          productCategoryId: 3,
          createdAt: '2024-02-23T18:03:30.951Z',
          updatedAt: '2024-02-23T18:03:30.951Z',
        },
      },
      productResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          product: {
            $ref: '#/components/schemas/product',
          },
        },
      },
      productsResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          products: {
            type: 'array',
            items: {
              oneOf: [
                { $ref: '#/components/schemas/product' },
                { $ref: '#/components/schemas/product' },
                { $ref: '#/components/schemas/product' },
              ],
            },
          },
        },
      },
      order: {
        type: 'object',
        required: ['quantity', 'productId'],
        properties: {
          quantity: { type: 'number', example: 3 },
          productId: { type: 'number', example: 1 },
        },
      },
      order2: {
        type: 'object',
        required: ['quantity', 'productId'],
        properties: {
          quantity: { type: 'number', example: 5 },
          productId: { type: 'number', example: 2 },
        },
      },
      billOrder: {
        type: 'object',
        example: {
          status: true,
          billOrder: {
            total: 84,
            isBilled: false,
            id: 26,
            profileId: 9,
            tableId: 13,
            updatedAt: '2024-02-29T17:24:34.630Z',
            createdAt: '2024-02-29T17:24:32.995Z',
          },
        },
      },
      billOrderPay: {
        type: 'object',
        example: {
          status: true,
          billOrder: {
            total: 84,
            isBilled: true,
            id: 26,
            profileId: 9,
            tableId: 13,
            updatedAt: '2024-02-29T17:24:34.630Z',
            createdAt: '2024-02-29T17:24:32.995Z',
          },
        },
      },
      billOrderDetail: {
        type: 'object',
        example: {
          id: 24,
          total: 84,
          isBilled: true,
          profileId: 9,
          tableId: 13,
          createdAt: '2024-02-29T07:34:23.771Z',
          updatedAt: '2024-02-29T07:35:07.434Z',
          orderDetails: [
            {
              id: 41,
              quantity: 3,
              billOrderId: 24,
              productId: 1,
              createdAt: '2024-02-29T07:34:24.982Z',
              updatedAt: '2024-02-29T07:34:24.982Z',
              product: {
                id: 1,
                name: 'Hamburguesa cheese',
                price: 10.5,
                description: 'Hamburguesa a la Parrilla Con Queso',
                productCategoryId: 10,
                createdAt: '2024-02-29T06:48:04.137Z',
                updatedAt: '2024-02-29T06:48:04.137Z',
              },
            },
            {
              id: 42,
              quantity: 5,
              billOrderId: 24,
              productId: 2,
              createdAt: '2024-02-29T07:34:25.033Z',
              updatedAt: '2024-02-29T07:34:25.033Z',
              product: {
                id: 2,
                name: 'Hamburguesa carne',
                price: 10.5,
                description: 'Hamburguesa a la Parrilla',
                productCategoryId: 10,
                createdAt: '2024-02-29T06:48:10.503Z',
                updatedAt: '2024-02-29T06:48:10.503Z',
              },
            },
          ],
          billOrderNumber: '00004',
        },
      },
      billOrderGeneral: {
        type: 'array',
        items: {
          oneOf: [
            { $ref: '#/components/schemas/order' },
            { $ref: '#/components/schemas/order2' },
          ],
        },
      },
      billOrdersResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          billOrders: {
            type: 'array',
            items: {
              oneOf: [
                { $ref: '#/components/schemas/billOrderDetail' },
                { $ref: '#/components/schemas/billOrderDetail' },
              ],
            },
          },
        },
      },
      billOrderResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          billOrder: {
            $ref: '#/components/schemas/billOrderDetail',
          },
        },
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: [`${path.join(__dirname, '../routes/*.routes*')}`],
};

export default swaggerJSDoc(swaggerOptions);
