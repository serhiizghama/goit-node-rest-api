import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connection successful');
} catch (error) {
    console.error('Database connection error: ', error);
    process.exit(1);
}

export default sequelize;
