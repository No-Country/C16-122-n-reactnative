import express, {
  Application,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import cors from 'cors';
import db from '../database/db';
import path from 'path';
import AppError from './appError';
import swaggerUi from 'swagger-ui-express';
import swaggerSetup from '../docs/swagger';
import { ProductCategoryModel, initModels } from '../database/models';
import { globalErrorHandler } from '../controllers';
import {
  authRoutes,
  profileRoutes,
  tableRoutes,
  productCategoryRoutes,
  productRoutes,
  barRoutes,
  billOrderRoutes,
} from '../routes';

class Server {
  private app: Application;
  private PORT: string = process.env.PORT || '4003';
  private HOST: string = process.env.HOST || 'localhost';
  private ROUTE: string = process.env.ROUTE || '/api/v1';
  private rootDir = path.resolve(__dirname, '..');

  constructor() {
    this.app = express();
    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  database() {
    db.authenticate()
      .then(() => console.log('Database authenticate'))
      .catch(err => console.log(err));
    initModels();
    db.sync({ alter: true })
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
    //usar esto para sync
    // ProductCategoryModel.sync({ alter: true })
    //   .then(() => console.log('category synced'))
    //   .catch(error => console.log(error));
  }
  routes() {
    const router = Router();
    this.app.use(this.ROUTE, router);
    router.use('/auth', authRoutes);
    router.use('/bar', barRoutes);
    router.use('/profiles', profileRoutes);
    router.use('/tables', tableRoutes);
    router.use('/product-categories', productCategoryRoutes);
    router.use('/products', productRoutes);
    router.use('/bill-orders', billOrderRoutes);

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup));

    this.app.use(
      /^\/(?!$).*$/,
      (req: Request, res: Response, next: NextFunction) => {
        return next(
          new AppError(`can't find ${req.originalUrl} on this server`, 404)
        );
      }
    );
    this.app.use('/', (req: Request, res: Response) => {
      res.json({
        status: true,
        server: 'OK',
      });
    });
    this.app.use(globalErrorHandler);
  }
  listen() {
    this.app.listen(this.PORT, () => {
      const server = `http://${this.HOST}:${this.PORT}`;
      console.log(`🚀 Server deployed at: ${server}`);
      console.log(`📝 View docs at: ${server}/api-docs`);
    });
  }
}

export default Server;
