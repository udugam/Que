const router = require('express').Router()
const cueRoutes = require('./cues')
const cueSheetRoutes =require('./cueSheet')
//Insert api model specific api routes here
const uploadRoutes = require('./upload.js')
const shareholderRoutes = require('./shareholder')

//upload route
router.use(uploadRoutes)

//cue routes
router.use('/cues', cueRoutes)

router.use('/cuesheet', cueSheetRoutes)

router.use('/shareholder', shareholderRoutes)

module.exports = router