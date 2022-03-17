const db = require("../models");
const Role = db.role;
const User = db.user;
const User_Role = db.user_role;
db.sequelize.sync();

exports.findAll = (req, res) => {
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
};

exports.findAllModerators = (req, res) => {
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
};

exports.findOne = (req, res) => {
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
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({ where: { id: id } })
    .then((result) => {
      res.json({ redirect: "/userss" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.update = (req, res) => {
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
};
