const db = require("../models");

module.exports = {
    insert: function(req, res){
        db.cueSheet.create(req.body)
            .then(function(results){
                res.json(results)
            })
    }
}