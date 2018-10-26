module.exports = function(sequelize, DataTypes) {

    var shareholders =sequelize.define("shareholders", {
        shareholderId: DataTypes.INTEGER,
        shareholderName: DataTypes.STRING,
        affiliation: DataTypes.STRING,
        songs: DataTypes.STRING,
        ipiNumber: DataTypes.STRING
    })
    return shareholders;
  };
  