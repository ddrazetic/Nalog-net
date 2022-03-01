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
require("./app/routes/users.edit.routes")(app);
require("./app/routes/roles.edit.routes")(app);
require("./app/routes/users_roles.edit.routes")(app);

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
