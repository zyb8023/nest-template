export default {
  // 服务基本配置
  SERVICE_CONFIG: {
    // 端口
    port: 8088,
  },
  // 数据库配置
  DATABASE_CONFIG: {
    autoLoadEntities: true,
    host: 'localhost',
    port: 3306,
    username: 'study',
    password: '12345678',
    database: 'study',
    logging: false,
    poolSize: 10,
    connectorPackage: 'mysql2',
    charset: 'utf8mb4',
    synchronize: true,
  },
  LOG_CONFIG: {
    level: 'DEBUG',
  },
};
