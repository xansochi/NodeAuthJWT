
#   Basic authentication Server with NodeJS and Express 4

## What we have : 
- User registration with 3 roles.
- User login with JWT token.
- Store basic data.

The server is ready to be deployed on free Vercel hosting.


## Tech Stack

**Server:** Node, Express, Sequelize, Jsonwebtoken, PG

You will need a PostgreSQL database to work.
## API ENDPOINTS
    1. '/'      - welcome

    2. '/api/auth/signup' - POST - registration

    3. '/api/auth/signin' - POST - login

    4. '/api/auth/:username' -  GET - get user data

    5. '/api/auth/:username' -  PUT - update user data
## Other

Change secret phrase to yours in app/config

```bash
  module.exports = {
    secret: "User-secret-key"
  };
```
DB connection info in app/config

```bash
module.exports = {
    HOST: "youdb.com",
    USER: "user",
    PASSWORD: "O_2i4rO3Hi2JWyjm",
    DB: "dbname",
    dialect: "postgres",
    dialectOptions: {
      useUTC: false, 
    },
    timezone: '+00:00', 
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 5000,
      evict: 1000,
    }
  };
```
## Authors

- [@xansochi](https://www.github.com/xansochi)


## Feedback

If you have any feedback, please reach out to us at @xansochi

