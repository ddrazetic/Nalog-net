module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    editId: {
      type: Sequelize.INTEGER,
    },
    nameWorker: {
      type: Sequelize.STRING,
    },
    nameModerator: {
      type: Sequelize.STRING,
    },
    countryDestination: {
      type: Sequelize.STRING,
    },
    placeDestination: {
      type: Sequelize.STRING,
    },
    salary: {
      type: Sequelize.INTEGER,
    },
    date: {
      type: Sequelize.STRING,
    },
    numberOfDays: {
      type: Sequelize.INTEGER,
    },
    addition: {
      type: Sequelize.STRING,
    },
  });
  // User.findAll().then(function (result) {
  //   console.log(result);
  // });
  return Order;
};
