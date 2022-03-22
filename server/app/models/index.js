const fs = require("fs");

const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  dialectOptions: {
    multipleStatements: true,
  },
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.order = require("../models/order.model.js")(sequelize, Sequelize);
db.country = require("../models/country.model.js")(sequelize, Sequelize);
db.user_role = sequelize.define(
  "user_roles",
  {
    userId: {
      type: Sequelize.STRING,
    },

    roleId: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  primaryKey: "userId",
  otherKey: "roleId",
});

var sql_string = fs.readFileSync(
  "./app/models/putni_nalozi_drzave.sql",
  "utf8"
);

// console.log(sql_string);
db.sequelize.query(sql_string);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
