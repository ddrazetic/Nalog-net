const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  enabled: true,
  // origin: "http://192.168.0.118:8081",
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
require("./app/routes/users_roles.edit.routes")(app);
require("./app/routes/order.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
// const hostname = "192.168.0.118";
// app.listen(PORT, hostname, () => {
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
