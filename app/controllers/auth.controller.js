const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    data: req.body.data,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  const username = req.params.username;

  User.update({ data: req.body.data }, {
    where: { username: username }
  })
    .then(name => {
      if (name == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.status(404).send({ message: `Cannot update User with name=${username}. Maybe User was not found or req.body is empty!` });
        // res.send({
        //   message: `Cannot update User with name=${username}. Maybe User was not found or req.body is empty!`
        // });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with name=" + username
      });
    });
};

exports.findOne = (req, res) => {
  const username = req.params.username;

  User.findOne({
    where: {
      username: req.params.username
    }
  })
    .then(data => {
      if (data) {
        res.send(data.data);
      } else {
        res.status(404).send({
          message: `Cannot find User with name=${username}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with name=" + username
      });
    });
};
