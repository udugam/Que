const db = require("../models");

module.exports = {
// only validation against fingerprint id for now - later can validate against artisst title and song title
// the insert route will only add a new song assuming it doesn't exist
// on the front end we can have an option for user to select an existing song
    insert: function(req, res){
        db.songs.create(req.body)
        .then(song =>{
            // console.log(song)
            // console.log(`Song Id: ${song.id}
            // Song Title: ${song.songTitle}
            // Artist: ${song.artists}`)
            db.cues.create({
                duration:req.body.duration,
                usage: req.body.usage,
                cueSheetId: req.body.cueSheetId,
                songId: song.id
            }).then(cueResults =>{
                res.json(cueResults)
            })
        })

    },
    delete: function(req, res){
        db.cues.destroy({
            where:{
                id:req.body.cueId
            }
        }).then(deleted=>{
            res.json(deleted)
        })
    },

    edit: function(req, res){
        db.cues.update({
            duration:req.body.duration,
            usage: req.body.usage
        }, {
            where:{
                id:req.body.cueId
            }
        }).then(cueResults=>{
            db.songs.update({
                songTitle:req.body.songTitle,
                artists: req.body.artists
            },{
                where:{
                    id: req.body.songId
                }
            }).then(songRes=>{
                res.json(songRes)
            })
        })
    }
    
}



// { songTitle: 'Monday cue song edit',
// [0]   artists: 'Cue Artist edit',
// [0]   usage: 'Background Vocal',
// [0]   duration: '42',
// [0]   cueSheetId: '1',
// [0]   cueId: 13 }
