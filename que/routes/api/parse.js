const fs = require('fs')
const parse = require('csv-parse') //converts csv lines to objects
const sec = require('sec') //converts string of format 00:00:00 to seconds integer
const rawDataArray = []
const songController = require('../../controllers/songsControllers')
const cueController = require('../../controllers/cueController')
const db = require("../../models");



//Read the csv file created by the ACRCloud Python SDK
const processCSV = function(filePath, cueSheetId, cb) {
    console.log(cueSheetId)
    fs.createReadStream(filePath)
        .pipe(parse({
            columns:true, //uses first line of csv as object key names for remaining lines of the file
            trim:true
        }))
        .on('data', function(data) {
            try {
                //push each parsed csv line to an array as an object
                rawDataArray.push(data)
            }
            catch(err) {
                //error handler
            }
        })
        .on('end', function() {
            //remove extra data from each object in the array
            const editedResults = removeExtraData(rawDataArray)

            //filter array to only contain single songs with their duration
            const summary = filterEditedResults(editedResults)
            
            //Loop through summary array and add each song to the database
            summary.forEach(result => {
                let song = {
                    songTitle: result.songName,
                    artists: result.artists,
                    fingerprintId: result.acrid,
                }

                db.songs.create(song)
                .then(song =>{
                    // console.log(song)
                    // console.log(`Song Id: ${song.id}
                    // Song Title: ${song.songTitle}
                    // Artist: ${song.artists}`)
                    db.cues.create({
                        cueSheetId: cueSheetId,
                        duration: result.duration,
                        songId: song.id
                    }).then(() => {
                        cb(true)
                    })
                })
            })
        })
}
  

const removeExtraData = (rawDataArray) => {
    var editedResults = rawDataArray.map((result) => {
        let editedResult = {
            songName: result.title,
            artists: result.artists,
            timestamp: sec(result.timestamp.substr(3,result.timestamp.length)), //uses string methods to clean string format, then uses sec module to convert to seconds integer
            acrid: result.acrid
        }
        return editedResult
    })
    return editedResults
}

const filterEditedResults = (editedResultsArray) => {
    let trackingSongId = null
    let startTime = null
    const summary = []

    editedResultsArray.forEach((result,index) => {
        if (result.acrid) { //This only works for tracks with continuous music, need sample file with unrecognized audio for further development 
            //if the current result id is different than the current id that we're tracking, a new song needs to be tracked since the old one is completed
            if(result.acrid != trackingSongId) {
                if(index !== 0) {
                    summary[summary.length-1].duration = editedResultsArray[index-1].timestamp-startTime
                }

                let newSong = {
                    songName: result.songName,
                    artists: result.artists,
                    acrid: result.acrid
                }
                startTime = result.timestamp
                trackingSongId = result.acrid
                summary.push(newSong)
            } else if (index===editedResultsArray.length-1) {
                summary[summary.length-1].duration = editedResultsArray[index-1].timestamp-startTime
            }
        } 
    })
    return summary
}

module.exports = processCSV

