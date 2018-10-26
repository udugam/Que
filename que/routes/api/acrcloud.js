const router = require('express').Router()
let {PythonShell} = require('python-shell')


router.route('/recognize')
    .get(function(req,res) {
        let options = {
            mode: 'text',
            pythonPath: '/usr/local/bin/python',
            pythonOptions: ['-u'], // get print results in real-time
            //scriptPath: 'path/to/my/scripts',
            args: ['-f','/Users/udugam/Documents/UofT-CodingBootcamp-Homework/Que/que/audio_files/merge_from_ofoct.mp3']
        };

        PythonShell.run(`/Users/udugam/Documents/UofT-CodingBootcamp-Homework/Que/que/acrcloud_scan_files_python/acrcloud_scan_files_python.py`, options, function(err) {
            if (err) throw err
            console.log('finished')
        })
    })

module.exports = router


