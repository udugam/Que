module.exports = function(sequelize, DataTypes) {

    var cueSheets =sequelize.define("cueSheet", {
        productionId: DataTypes.INTEGER,
        productionTitle: DataTypes.STRING,
        type: DataTypes.STRING,
        productionDuration: DataTypes.INTEGER,
        musicDuration: DataTypes.INTEGER
    })
    return cueSheets;
};
  