module.exports = (sequelize, Sequelize) => {
  const Country = sequelize.define("putni_nalozi_drzave", {
    naziv: {
      type: Sequelize.STRING,
    },
    naziv_eng: {
      type: Sequelize.STRING,
    },
    valuta: {
      type: Sequelize.STRING,
    },
    prioritet: {
      type: Sequelize.INTEGER,
    },
    dnevnice: {
      type: Sequelize.DECIMAL,
    },
  });

  return Country;
};
