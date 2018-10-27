const db = require("../models");

module.exports = {
    find: function(req, res){
        db.cueSheet.findAll({})
            .then(function(result){
                res.json(result)
            })
    },
    insert: function(req, res){
        db.cueSheet.create(req.body)
            .then(function(results){
                res.json(results)
            })
    }
}