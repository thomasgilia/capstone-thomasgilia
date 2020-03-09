module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    accessLevel: Sequelize.STRING,
    
  });
};

// data type for list instead of string ?, i'm not using freezetablename
//   clientsOwned: Sequelize.STRING,
//     }, { freezeTableName: true });
//can make clientsOwned an array datatype? may help with inputs later
