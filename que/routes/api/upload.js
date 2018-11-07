const router = require('express').Router()
let {PythonShell} = require('python-shell')

router.route('/upload')
    .post(function(req,res) {
        let uploadedFile = req.files.file;
        // Use the mv() method to place the file somewhere on your server
        uploadedFile.mv('/Users/udugam/Documents/UofT-CodingBootcamp-Homework/NewQueFolder/Que/que/audio_files/uploadedFile.mp3', function(err) {
            if (err)
            return res.status(500).send(err);

            let options = {
                mode: 'text',
                pythonPath: '/usr/local/bin/python',
                pythonOptions: ['-u'], // get print results in real-time
                scriptPath: '/Users/udugam/Documents/UofT-CodingBootcamp-Homework/NewQueFolder/Que/que/acrcloud_scan_files_python',
                args: ['-f', '/Users/udugam/Documents/UofT-CodingBootcamp-Homework/NewQueFolder/Que/que/audio_files/uploadedFile.mp3',
                        '-c', '/Users/udugam/Documents/UofT-CodingBootcamp-Homework/NewQueFolder/Que/que/acrcloud_scan_files_python/config.json']
            };
    
            PythonShell.run(`acrcloud_scan_files_python.py`, options, function(err, results) {
                if (err) throw err
                console.log('finished')
                res.json(true);
            })
            
        });
    })

module.exports =  router
