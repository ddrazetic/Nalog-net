// const db = require("../models");
// const Role = db.role;
// const User = db.user;
// const User_Role = db.user_role;
// db.sequelize.sync();

// module.exports = function (app) {
//   app.get("/rolestype", (req, res) => {
//     res.set({
//       "Access-Control-Expose-Headers": "Content-Range",
//       "Content-Range": "posts 0-30/30",
//       "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
//     });
//     Role.findAll().then(function (result) {
//       res.json(result);

//       // console.log(str);
//     });
//   });
//   app.get("/roles", (req, res) => {
//     res.set({
//       "Access-Control-Expose-Headers": "Content-Range",
//       "Content-Range": "posts 0-10/30",
//       "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
//     });
//     User_Role.findAll({ raw: true }).then(function (result) {
//       res.json(result);

//       // console.log(str);
//     });
//   });
//   // hhuefwcjrioiweicjer

//   app.get("/rolestype/:id", (req, res) => {
//     const id = req.params.id;
//     Role.findOne({
//       where: {
//         id: id,
//       },
//     })
//       .then((result) => {
//         res.json(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   app.get("/roles/:id", (req, res) => {
//     const id = req.params.id;
//     User_Role.findOne({
//       where: {
//         userId: id,
//       },
//     })
//       .then((result) => {
//         res.json(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   app.delete("/rolestype/:id", (req, res) => {
//     const id = req.params.id;

//     Role.destroy({ where: { id: id } })
//       .then((result) => {
//         res.json({ redirect: "/rolestype" });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   app.put("/rolestype/:id", async (req, res) => {
//     const id = req.params.id;
//     res.set({
//       "Access-Control-Expose-Headers": "Content-Range",
//       "Content-Range": "posts 0-30/30",
//       "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
//     });
//     Role.update(req.body, {
//       where: {
//         id: id,
//       },
//     })
//       .then((num) => {
//         if (num == 1) {
//           res.send({
//             message: "Tutorial was updated successfully.",
//           });
//         } else {
//           res.json({ redirect: "/rolestype" });
//         }
//       })

//       .catch((err) => {
//         res.status(500).send({
//           message: "Error updating Tutorial with id=" + id,
//         });
//       });
//   });
//   app.put("/roles/:id", async (req, res) => {
//     const id = req.params.id;
//     res.set({
//       "Access-Control-Expose-Headers": "Content-Range",
//       "Content-Range": "posts 0-30/30",
//       "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
//     });
//     User_Role.update(req.body, {
//       where: {
//         userId: id,
//       },
//     })
//       .then((num) => {
//         if (num == 1) {
//           res.send({
//             message: "Tutorial was updated successfully.",
//           });
//         } else {
//           res.json({ redirect: "/userss" });
//         }
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message: "Error updating Tutorial with id=" + id,
//         });
//       });
//   });
// };
