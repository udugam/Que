const db = require("../models");

module.exports = {
    find: function(req, res){
        db.cueSheet.findAll({})
            .then(function(result){
                res.json(result.data.id)
            })
    },
    insert: function(req, res){
        db.cueSheet.create(req.body)
            .then(function (results) {
                res.json(results)
            })
    },
    findById: function (req, res) {
        // var cueSheetId = req.params.id

        db.cueSheet.findOne({
            where: { id: req.params.id }
        })
            .then(dbCueSheet => {

                // res.json(dbCueSheet.dataValues)
                db.cues.findAll({
                    where: { cueSheetId: req.params.id },
                    include: [{
                        all: true,
                        include: [{ all: true,
                        include:[{all:true}] }]
                    }]
                }).then(dbcues => {
                    // console.log({cueSheet:dbCueSheet, cues:dbcues})
                    res.json({ cueSheet: dbCueSheet, cues: dbcues })
                })
            })
            .catch(err => {
                console.log(err)
                res.status(422).json(err)
            })
    }
}
// findById = function(req, res){
//     var cueSheetId = 1
//     db.cueSheet.findByPk(cueSheetId)
//     .then(dbCueSheet =>{
//         console.log(dbCueSheet.dataValues)})}

//         findById()