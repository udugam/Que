module.exports = function(sequelize, DataTypes) {

    var cueSheet =sequelize.define("cueSheet", {
        userEmail: DataTypes.STRING,
        productionTitle: DataTypes.STRING,
        productionYear: DataTypes.INTEGER,
        type: DataTypes.STRING,
        productionDuration: DataTypes.INTEGER,
        musicDuration: DataTypes.INTEGER
    });

    cueSheet.associate = function(models) {
        // associating a cue sheet with cues
        // When a cuesh is deleted, also delete any product
        // that belongs to that cue sheet
        cueSheet.hasMany(models.cues, {
          onDelete: "CASCADE"
        });
      };
    return cueSheet;
};
  