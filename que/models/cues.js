module.exports = function(sequelize, DataTypes) {

    var cues =sequelize.define("cue", {
        cueId: DataTypes.INTEGER,
        songId: DataTypes.INTEGER,
        duration: DataTypes.INTEGER,
        usage: DataTypes.STRING
    })
    return cues;
  };
  