module.exports = function(sequelize, DataTypes) {

    var shareholderSongs =sequelize.define("shareholderSongs", {
        shares: DataTypes.INTEGER,
        role: DataTypes.STRING
    });

   
    return shareholderSongs;
  };
  