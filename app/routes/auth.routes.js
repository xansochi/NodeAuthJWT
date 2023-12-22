const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  // Update with id
  app.put("/api/auth/:username", [authJwt.verifyToken],controller.update);

  // Retrieve with id
  app.get("/api/auth/:username", [authJwt.verifyToken],controller.findOne);

  app.post("/api/auth/signin", controller.signin);
};