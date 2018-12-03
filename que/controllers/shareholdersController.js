const db = require("../models");

module.exports = {
    insert: function (req, res) {
        console.log(req.body)
        db.shareholders.findOrCreate({
            where: {
                ipiNumber: req.body.ipiNumber
            },
            defaults: {
                shareholderName: req.body.shareholderName,
                affiliation: req.body.affiliation,
                ipiNumber: req.body.ipiNumber
            }
        }).spread((user, created) => {
            //   user - gives an object with the id, shareholderName, affiliation, ipiNumber
            // created - gives a true or false value - if its a new shareholder - then its true, if not its false 
            // console.log( 
            // user.get({
            //     plain:true
            // }))
            // console.log(created)
            db.shareholderSongs.findOrCreate({
                // this will prevent a shareholder to be created if one exist for the song already
                // can enhance it later to ask the user if they want to update the record instead 
                where: {
                    songId: req.body.songId,
                    shareholderId: user.id
                },
                defaults: {
                    role: req.body.role,
                    songId: req.body.songId,
                    shareholderId: user.id,
                    shares: req.body.share
                }
            })
                .spread((shares, sharesCreated) => {
                    console.log({
                        user: user.get({
                            plain: true
                        }),
                        userComplete: created,
                        shares: shares.get({
                            plain: true
                        }),
                        sharesCreated: sharesCreated

                    },
                    res.json(shares))

                })
            // .then(res => {
            //     console.log(res)
            //     res.json(res)
            // })
        })

    },
    delete: function (req, res) {
        console.log(req.body)
        db.shareholderSongs.destroy({
            where: {
                songId: req.body.songId,
                shareholderId: req.body.shareholderId
            }
        }).then(deleted => {
            console.log(deleted)
            res.json(deleted)
        })
    },
    getInfo: function(req, res){
        console.log(req.params.email)
        console.log("=============================================")
        db.shareholderSongs.findAll({
            include: [{
                all: true,
                include: [{ all: true,
                include:[{all:true}] }]
            }]
        }).then(shareData => {
            db.songs.findAll()
                .then(songData => {
                    res.json([shareData, songData])
                })
        })

    }
}

