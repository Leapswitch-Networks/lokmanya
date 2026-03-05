'use strict'

const environment = {
  port: process.env.PORT,
  env_type: process.env.ENV_TYPE,
  databaseName: process.env.NEXT_PUBLIC_DATABASE_NAME || 'root',
  databaseHost: process.env.NEXT_PUBLIC_DATABASE_HOST || 'localhost',
  databaseUserName: process.env.NEXT_PUBLIC_DATABASE_USERNAME || 'root',
  databasePassword: process.env.NEXT_PUBLIC_DATABASE_PASSWORD || '',
  databaseClient: process.env.NEXT_PUBLIC_DATABASE_CLIENT || 'mysql',
  databasePort: process.env.NEXT_PUBLIC_DATABASE_PORT || 3306,
  accessTokenSecret: process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET || '278599DF361D3C313147FA9A394D9',
  refreshTokenSecret: process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET,
}

module.exports = environment
