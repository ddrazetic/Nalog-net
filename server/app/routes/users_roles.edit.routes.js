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

// const db = require("../models");
// const Role = db.role;
// const User = db.user;
// const User_Role = db.user_role;
// db.sequelize.sync();

// module.exports = function (app) {
//   app.get("/users", (req, res) => {
//     res.set({
//       "Access-Control-Expose-Headers": "Content-Range",
//       "Content-Range": "posts 0-30/30",
//       "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
//     });
//     User.findAll({
//       raw: true,
//       include: [
//         {
//           model: Role,
//           through: "user_roles",
//         },
//       ],
//     }).then(function (result) {
//       res.json(result);
//     });
//   });

//   app.get("/moderators", (req, res) => {
//     res.set({
//       "Access-Control-Expose-Headers": "Content-Range",
//       "Content-Range": "posts 0-30/30",
//       "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
//     });
//     User.findAll({
//       raw: true,
//       include: [
//         {
//           model: Role,
//           through: "user_roles",
//           where: { id: 2 },
//         },
//       ],
//     }).then(function (result) {
//       res.json(result);
//     });
//   });

//   app.get("/users/:id", (req, res) => {
//     const id = req.params.id;
//     User.findOne({
//       where: {
//         id: id,
//       },
//       include: [
//         {
//           model: Role,
//           through: "user_roles",
//         },
//       ],
//     })
//       .then((result) => {
//         res.json(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   app.delete("/users/:id", (req, res) => {
//     const id = req.params.id;

//     User.destroy({ where: { id: id } })
//       .then((result) => {
//         res.json({ redirect: "/userss" });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   app.put("/users/:id", async (req, res) => {
//     const id = req.params.id;
//     res.set({
//       "Access-Control-Expose-Headers": "Content-Range",
//       "Content-Range": "posts 0-30/30",
//       "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
//     });
//     User.findOne({
//       where: {
//         id: id,
//       },
//       include: [
//         {
//           model: Role,
//           as: "roles",
//           through: "user_roles",
//         },
//       ],
//     }).then((result) => {
//       result.setRoles([req.body.roleId]);
//     });
//   });
// };

// const db = require("../models");
// const Role = db.role;
// const User = db.user;
// const User_Role = db.user_role;
// db.sequelize.sync();

// module.exports = function (app) {
//   app.get("/users", (req, res) => {
//     res.set({
//       "Access-Control-Expose-Headers": "Content-Range",
//       "Content-Range": "posts 0-30/30",
//       "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
//     });
//     User.findAll({
//       raw: true,
//       include: [
//         {
//           model: Role,
//           through: "user_roles",
//         },
//       ],
//     }).then(function (result) {
//       res.json(result);
//     });
//   });

//   app.get("/moderators", (req, res) => {
//     res.set({
//       "Access-Control-Expose-Headers": "Content-Range",
//       "Content-Range": "posts 0-30/30",
//       "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
//     });
//     User.findAll({
//       raw: true,
//       include: [
//         {
//           model: Role,
//           through: "user_roles",
//           where: { id: 2 },
//         },
//       ],
//     }).then(function (result) {
//       res.json(result);
//     });
//   });

//   app.get("/users/:id", (req, res) => {
//     const id = req.params.id;
//     User.findOne({
//       where: {
//         id: id,
//       },
//       include: [
//         {
//           model: Role,
//           through: "user_roles",
//         },
//       ],
//     })
//       .then((result) => {
//         res.json(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   app.delete("/users/:id", (req, res) => {
//     const id = req.params.id;

//     User.destroy({ where: { id: id } })
//       .then((result) => {
//         res.json({ redirect: "/userss" });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   app.put("/users/:id", async (req, res) => {
//     const id = req.params.id;
//     res.set({
//       "Access-Control-Expose-Headers": "Content-Range",
//       "Content-Range": "posts 0-30/30",
//       "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
//     });
//     User.findOne({
//       where: {
//         id: id,
//       },
//       include: [
//         {
//           model: Role,
//           as: "roles",
//           through: "user_roles",
//         },
//       ],
//     }).then((result) => {
//       result.setRoles([req.body.roleId]);
//     });
//   });
// };
