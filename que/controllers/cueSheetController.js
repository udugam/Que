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

        db.cueSheet.findAll({
            where: {userEmail: "test@mail.com" },
            include: [{
                model: db.cues
            }]
        }).then(cuesC => {
            db.cues.findAll({
                where: { },
                include: [{
                    model: db.songs
                }]
            }).then(cueSong => {
                db.songs.findAll({
                    where: { },
                    include: [{
                        model: db.shareholders
                    }]
                }).then(songSharS => {
                    res.json({first: cuesC, second: cueSong, third: songSharS})
                })
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
