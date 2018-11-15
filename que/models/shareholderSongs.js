module.exports = function(sequelize, DataTypes) {

    var shareholderSongs =sequelize.define("shareholderSongs", {
        shares: DataTypes.INTEGER,
        role: DataTypes.STRING
    });

    shareholderSongs.associate = function(models) {
        shareholderSongs.belongsTo(models.songs, {
            foreignKey: {
              allowNull: false
            }
          })
    }

   
    return shareholderSongs;
  };
  