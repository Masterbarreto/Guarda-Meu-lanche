import path from 'path'
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const config = {
    production: {
        client: "pg",
        useNullAsDefault: true,
        connection: {
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        },
        migrations: {
            directory: path.resolve("../migrations"),
        },
        seeds: {
            directory: path.resolve("../seeds"),
        },
    },
    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: '../database.sqlite'
        },
        migrations: {
            directory: path.resolve('../migrations')

        },
        seeds: {
            directory: path.resolve('../seeds')
        },
        pool: {
            afterCreate: (connection, done) => {
                connection.run('PRAGMA foreign_keys = ON');
                done();
            }
        }
    }


}

config.development = config.production
export default config