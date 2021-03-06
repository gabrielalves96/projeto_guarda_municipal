const dotenv = require('dotenv');
const convict = require('convict');
const fs = require('fs');

dotenv.config();

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind the app.',
    format: 'port',
    default: 3000,
    env: 'GM_PORT',
  },
  db: {
    database: {
      doc: 'The name of the database',
      format: String,
      default: '',
      env: 'GM_DB_NAME',
    },
    username: {
      doc: 'The user used to connect to the database',
      format: String,
      default: '',
      env: 'GM_DB_USER',
      sensitive: true,
    },
    password: {
      doc: 'The password used to connect to the database',
      format: String,
      default: '',
      env: 'GM_DB_PASSWORD',
      sensitive: true,
    },
    dialect: {
      doc: 'The type of the database',
      format: ['mysql', 'mssql', 'mariadb', 'postgres', 'sqlite'],
      default: 'mysql',
      env: 'GM_DB_DIALECT',
    },
    host: {
      doc: 'The database server address',
      format: 'ipaddress',
      default: '127.0.0.1',
      env: 'GM_DB_HOST',
    },
    port: {
      doc: 'The port used to connect to the database',
      format: 'port',
      default: 3306,
      env: 'GM_DB_PORT',
    },
    pool: {
      max: {
        doc:
          'The max allowed open connections, this should be the number of max connections configured on the database server divided by the number of running node instances',
        format: 'nat',
        default: 25,
        env: 'GM_DB_POOL_MAX',
      },
    },
  },
});

// Enable config override using scoped config files
const env = config.get('env');
const file = `./config.${env}.json`;
if (fs.existsSync(file)) {
  config.loadFile(file);
}

config.validate({ allowed: 'strict' });

module.exports = config;
