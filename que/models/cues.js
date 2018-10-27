module.exports = function(sequelize, DataTypes) {

    var cues =sequelize.define("cues", {
        // productionId: DataTypes.INTEGER,
        // songId: DataTypes.INTEGER,
        duration: DataTypes.INTEGER,
        usage: DataTypes.STRING
    });

    cues.associate = function(models){
        // each cue belongs to a production 
        cues.belongsTo(models.cueSheet, {
            foreignKey: {
              allowNull: false
            }
          });
        //   each cue also belongs to a song 
          cues.belongsTo(models.songs, {
            foreignKey: {
              allowNull: false
            }
          });
    }
    return cues;
  };
  