const orders = require("../controllers/order.controller.js");

module.exports = (app) => {
  var router = require("express").Router();
  // Create a new Tutorial
  router.post("/orders", orders.create);
  // Retrieve all orders
  router.get("/orders", orders.findAll);
  // retrieve all countries
  router.get("/countries", orders.findAllCountries);

  // Retrieve a single Tutorial with id
  router.get("/orders/:id", orders.findOne);
  // Update a Tutorial with id
  router.put("/orders/:id", orders.update);
  // Delete a Tutorial with id
  router.delete("/orders/:id", orders.delete);
  // Delete all orders
  router.delete("/orders", orders.deleteAll);
  app.use("/api", router);
};
