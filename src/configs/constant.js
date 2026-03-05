exports.uploadCategory = {}

exports.environment = {
    // port: process.env.NEXT_PUBLIC_PORT,
    databaseName: process.env.NEXT_PUBLIC_DATABASE_NAME || 'lokmanya',
    databaseHost: process.env.NEXT_PUBLIC_DATABASE_HOST || 'localhost',
    databaseUserName: process.env.NEXT_PUBLIC_DATABASE_USERNAME || 'root',
    databasePassword: process.env.NEXT_PUBLIC_DATABASE_PASSWORD || '',
    databaseClient: process.env.NEXT_PUBLIC_DATABASE_CLIENT || 'mysql',
    databasePort: process.env.NEXT_PUBLIC_DATABASE_PORT || 4000,
    accessTokenSecret: process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET || '278599DF361D3C313147FA9A394D9',
    refreshTokenSecret: process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET,
    ENV_TYPE: process.env.NEXT_PUBLIC_ENV_TYPE || 'production',
    RECAPTCHA_SECRET_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SECRECT_KEY || '6LdKtvYqAAAAAPmZxDl5ncYabFPG-Rz36dPYD_hR',
}

exports.uploadCategory = {
    profile: "profile",
}

exports.emailTemplateId = {
    welcome: 'd-ad26160e704f43c0871205d88f556afd'
}

exports.emailConfiguration = {
    EMAIL_HOST: process.env.NEXT_PUBLIC_EMAIL_HOST || '',
    EMAIL_PORT: process.env.NEXT_PUBLIC_EMAIL_PORT || '',
    EMAIL_ID: process.env.NEXT_PUBLIC_EMAIL_ID || '',
    EMAIL_PASS: process.env.NEXT_PUBLIC_EMAIL_PASS || '',
    FROM_EMAIL: process.env.NEXT_PUBLIC_FROM_EMAIL || '',
}
