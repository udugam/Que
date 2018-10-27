module.exports = function(sequelize, DataTypes) {

    var songs =sequelize.define("songs", {
        // songId: DataTypes.INTEGER,
        songTitle: DataTypes.STRING,
        artists: DataTypes.STRING,
        // shareholdersId: DataTypes.STRING,
        // shareholderName: DataTypes.STRING,
        fingerprintId: DataTypes.INTEGER
    });

    songs.associate = function(models) {
        // associating a cue sheet with cues
        // When a cuesh is deleted, also delete any product
        // that belongs to that cue sheet
        songs.hasMany(models.cues, {
          onDelete: "cascade"
        });

        songs.belongsToMany(models.shareholders,{
            through: "shareholderSongs"
        })
      };
    return songs;
  };
  