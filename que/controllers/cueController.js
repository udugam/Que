const db = require("../models");

module.exports = {
    insert: function(req,res){
        console.log('here')
        db.cues.create(req)
        res.json(true)
    }
}