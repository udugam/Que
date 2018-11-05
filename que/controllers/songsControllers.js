const db = require("../models");

module.exports = {
    insert: function(req){
        db.songs.create(req)
    }
}