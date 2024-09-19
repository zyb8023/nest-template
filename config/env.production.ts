import { levels } from 'log4js';

export default {
  // 服务基本配置
  SERVICE_CONFIG: {
    // 端口
    port: 3000,
  },
  // 数据库配置
  DATABASE_CONFIG: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'nestjs',
    autoLoadEntities: true,
    synchronize: false,
  },
  LOG_CONFIG: {
    level: 'INFO',
  },
};
