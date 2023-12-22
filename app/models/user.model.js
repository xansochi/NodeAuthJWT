module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.TEXT
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };
