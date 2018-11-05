const db = require("../models");

module.exports = {
    insert: function(req){
        db.cues.create(req)
    }
}