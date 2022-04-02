const users = require("../controllers/users_roles.controller.js");

module.exports = (app) => {
  var router = require("express").Router();

  // Retrieve all users
  router.get("/users", users.findAll);
  // Retrieve all moderators
  router.get("/moderators", users.findAllModerators);

  // Retrieve a single user with id
  router.get("/users/:id", users.findOne);
  // Update a user with id
  router.put("/users/:id", users.update);
  // Delete a user with id
  router.delete("/users/:id", users.delete);

  app.use("/", router);
};
