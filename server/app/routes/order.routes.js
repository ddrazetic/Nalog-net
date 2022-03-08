const orders = require("../controllers/order.controller.js");

module.exports = (app) => {
  var router = require("express").Router();
  // Create a new Tutorial
  router.post("/", orders.create);
  // Retrieve all orders
  router.get("/", orders.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", orders.findOne);
  // Update a Tutorial with id
  router.put("/:id", orders.update);
  // Delete a Tutorial with id
  router.delete("/:id", orders.delete);
  // Delete all orders
  router.delete("/", orders.deleteAll);
  app.use("/api/orders", router);
};
