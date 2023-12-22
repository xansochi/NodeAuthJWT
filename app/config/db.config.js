module.exports = {
    HOST: "host.com",
    USER: "user",
    PASSWORD: "123",
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
