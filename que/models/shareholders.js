module.exports = function(sequelize, DataTypes) {

    var shareholders =sequelize.define("shareholders", {
        // shareholderId: DataTypes.INTEGER,
        shareholderName: DataTypes.STRING,
        affiliation: DataTypes.STRING,
        // songs: DataTypes.STRING,
        ipiNumber: DataTypes.STRING
    });

    //shareholders.associate = function(models) {
    //  associating shareholders to songs

      //  shareholders.belongsToMany(models.songs,{
      //      through: "ShareholderSongs"
      //  })
      //};
    return shareholders;
  };
  
