module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
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
      type: Sequelize.DECIMAL(10, 2),
    },
    travelCosts: {
      type: Sequelize.DECIMAL(10, 2),
    },
    otherCosts: {
      type: Sequelize.DECIMAL(10, 2),
    },
    totalCosts: {
      type: Sequelize.DECIMAL(10, 2),
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
    roleEditId: {
      type: Sequelize.INTEGER,
      defaultValue: 2,
    },
  });

  return Order;
};
