import { config } from 'dotenv';
import { ChannelChats } from './src/entities/ChannelChats';
import { DataSource } from 'typeorm';
import { Mentions } from './src/entities/Mentions';
import { WorkspaceMembers } from './src/entities/WorkspaceMembers';
import { ChannelMembers } from './src/entities/ChannelMembers';
import { Workspaces } from './src/entities/Workspaces';
import { DMs } from './src/entities/DMs';
import { Users } from './src/entities/Users';
import { Channels } from './src/entities/Channels';
config();

const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        ChannelChats,
        ChannelMembers,
        Channels,
        DMs,
        Mentions,
        Users,
        WorkspaceMembers,
        Workspaces,
    ],
    migrations: [__dirname + '/src/migrations/*.ts'],
    charset: 'utf8mb4_general_ci',
    synchronize: false,
    logging: true,
});

export default dataSource;
