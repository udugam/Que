module.exports = function(sequelize, DataTypes) {

    var songs =sequelize.define("songs", {
        songId: DataTypes.INTEGER,
        songTitle: DataTypes.STRING,
        artists: DataTypes.STRING,
        shareholdersId: DataTypes.STRING,
        fingerprintId: DataTypes.INTEGER
    })
    return songs;
  };
  