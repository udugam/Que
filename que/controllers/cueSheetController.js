const db = require("../models");

module.exports = {
    find: function(req, res){
        db.cueSheet.findAll({
            where: {
                userEmail: req.params.email
            }
        })
            .then(function(cueSheets){
                res.json(cueSheets)  
            })
    },
    findAllInfo: function(req, res) {
        console.log(req.params.id)
        console.log("---------------------------------------------")

        db.cueSheet.findAll({
            where: {userEmail: req.params.id },
            include: [{
                model: db.cues
            }]
        }).then(cuesC => {
            let input = []
            for(var i = 0; i < cuesC.length; i++){
                for(var j = 0; j < cuesC.length; j++){
                    if(cuesC[i].dataValues.cues[j]){
                        input.push(cuesC[i].dataValues.cues[j].dataValues.songId)
                    }
                }
            }
            db.songs.findAll({
                where: {id: input },
                include: [{
                    model: db.shareholders
                }]
            }).then(songSharS => {
                res.json({first: cuesC, second: songSharS})
            })
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
