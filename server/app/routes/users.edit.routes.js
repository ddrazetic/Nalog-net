// const db = require("../models");
// const Role = db.role;
// const User = db.user;
// const User_Role = db.user_role;
// db.sequelize.sync();

// module.exports = function (app) {
//   app.get("/userss", (req, res) => {
//     res.set({
//       "Access-Control-Expose-Headers": "Content-Range",
//       "Content-Range": "posts 0-30/30",
//       "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
//     });
//     User.findAll().then(function (result) {
//       res.json(result);

//       // console.log(str);
//     });
//   });

//   app.get("/userss/:id", (req, res) => {
//     const id = req.params.id;
//     User.findOne({
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

//   app.delete("/userss/:id", (req, res) => {
//     const id = req.params.id;

//     User.destroy({ where: { id: id } })
//       .then((result) => {
//         res.json({ redirect: "/users" });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   app.put("/userss/:id", async (req, res) => {
//     const id = req.params.id;
//     res.set({
//       "Access-Control-Expose-Headers": "Content-Range",
//       "Content-Range": "posts 0-30/30",
//       "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
//     });
//     User.update(req.body, {
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
