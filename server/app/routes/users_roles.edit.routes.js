const db = require("../models");
const Role = db.role;
const User = db.user;
const User_Role = db.user_role;
db.sequelize.sync();

module.exports = function (app) {
  app.get("/users", (req, res) => {
    res.set({
      "Access-Control-Expose-Headers": "Content-Range",
      "Content-Range": "posts 0-30/30",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    });
    User.findAll({
      raw: true,
      include: [
        {
          model: Role,
          through: "user_roles",
        },
      ],
    }).then(function (result) {
      res.json(result);
    });
  });

  app.get("/moderators", (req, res) => {
    res.set({
      "Access-Control-Expose-Headers": "Content-Range",
      "Content-Range": "posts 0-30/30",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    });
    User.findAll({
      raw: true,
      include: [
        {
          model: Role,
          through: "user_roles",
          where: { id: 2 },
        },
      ],
    }).then(function (result) {
      res.json(result);
    });
  });

  app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    User.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Role,
          through: "user_roles",
        },
      ],
    })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.delete("/users/:id", (req, res) => {
    const id = req.params.id;

    User.destroy({ where: { id: id } })
      .then((result) => {
        res.json({ redirect: "/userss" });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    res.set({
      "Access-Control-Expose-Headers": "Content-Range",
      "Content-Range": "posts 0-30/30",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    });
    User.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Role,
          as: "roles",
          through: "user_roles",
        },
      ],
    }).then((result) => {
      result.setRoles([req.body.roleId]);
    });
  });

  //   app.put("/users/:id", async (req, res) => {
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
  //           res.json({ redirect: "/userss" });
  //         }
  //       })
  //       .catch((err) => {
  //         res.status(500).send({
  //           message: "Error updating Tutorial with id=" + id,
  //         });
  //       });
  //   });
};
