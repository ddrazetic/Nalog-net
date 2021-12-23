//import React, { useState } from "react";
const express = require("express");
const cors = require("cors");
const app = express();
//const [users1, setUsers1] = useState(0);
var corsOptions = {
  enabled: true,
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const User = db.user;
const User_Role = db.user_role;
db.sequelize.sync();

app.get("/users", (req, res) => {
  res.set({
    "Access-Control-Expose-Headers": "Content-Range",
    "Content-Range": "posts 0-30/30",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  });
  User.findAll().then(function (result) {
    res.json(result);

    // console.log(str);
  });
});
app.get("/rolestype", (req, res) => {
  res.set({
    "Access-Control-Expose-Headers": "Content-Range",
    "Content-Range": "posts 0-30/30",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  });
  Role.findAll().then(function (result) {
    res.json(result);

    // console.log(str);
  });
});
app.get("/roles", (req, res) => {
  res.set({
    "Access-Control-Expose-Headers": "Content-Range",
    "Content-Range": "posts 0-10/30",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  });
  User_Role.findAll({ raw: true }).then(function (result) {
    res.json(result);

    // console.log(str);
  });
});
// hhuefwcjrioiweicjer

app.get("/userss", (req, res) => {
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

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  User.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/rolestype/:id", (req, res) => {
  const id = req.params.id;
  Role.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/roles/:id", (req, res) => {
  const id = req.params.id;
  User_Role.findOne({
    where: {
      userId: id,
    },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/userss/:id", (req, res) => {
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
      res.json({ redirect: "/users" });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.delete("/rolestype/:id", (req, res) => {
  const id = req.params.id;

  Role.destroy({ where: { id: id } })
    .then((result) => {
      res.json({ redirect: "/rolestype" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/userss/:id", (req, res) => {
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
  User.update(req.body, {
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully.",
        });
      } else {
        res.json({ redirect: "/userss" });
      }
    })

    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
});
app.put("/userss/:id", async (req, res) => {
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

app.put("/rolestype/:id", async (req, res) => {
  const id = req.params.id;
  res.set({
    "Access-Control-Expose-Headers": "Content-Range",
    "Content-Range": "posts 0-30/30",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  });
  Role.update(req.body, {
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully.",
        });
      } else {
        res.json({ redirect: "/rolestype" });
      }
    })

    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
});
app.put("/roles/:id", async (req, res) => {
  const id = req.params.id;
  res.set({
    "Access-Control-Expose-Headers": "Content-Range",
    "Content-Range": "posts 0-30/30",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  });
  User_Role.update(req.body, {
    where: {
      userId: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully.",
        });
      } else {
        res.json({ redirect: "/userss" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
});

app.put("/userss/:id", async (req, res) => {
  const id = req.params.id;
  res.set({
    "Access-Control-Expose-Headers": "Content-Range",
    "Content-Range": "posts 0-30/30",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  });
  Role.update(req.body, {
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully.",
        });
      } else {
        res.json({ redirect: "/userss" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
});
//   Role.update(req.body,
//     { id : 1 }
//   )
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "Tutorial was updated successfully.",
//         });
//       } else {
//         res.json({ redirect: "/userss" });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating Tutorial with id=" + id,
//       });
//     });
// });

// try {
//   const result = await Role.update(req.body, { where: { id: 1 } });
//   console.log("Project with id =1 updated successfully!");
// } catch (err) {
//   console.log("Project update failed !");
// }

// Role.update(
//   // Set Attribute values
//   { name: "name123" },

//   // Where clause / criteria
//   { where: { id: id } }
// )
//   .then(function () {
//     console.log("Project with id =1 updated successfully!");
//   })
//   .error(function (err) {
//     console.log("Project update failed !");
//     //handle error here
//   });
// });

// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });
// module.exports = (req, res, next) => {
//   res.header("Content-Range", "posts 0-20/20");

//   next();
// };
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to backend of application..." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
