import { Sequelize } from 'sequelize';

const DATABASE_URL = process.env.DATABASE_URL || '';

const db = new Sequelize(DATABASE_URL, { logging: false });

export default db;
