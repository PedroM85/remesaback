import { DataSource } from "typeorm";
import { SYS_Users} from './Entities/sys_users'
import { DB_HOST,DB_NAME,DB_PASSWORD,DB_PORT, DB_USERNAME } from "./config";


export const AppDataSource  = new DataSource({
    type: 'mysql',
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: Number(DB_PORT),
    logging: false,
    entities: [SYS_Users],
    synchronize: false,
    ssl: false
});
