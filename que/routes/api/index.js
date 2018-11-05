const router = require('express').Router()
const acrRoutes = require('./acrcloud.js')
const cueRoutes = require('./cues')
const uploadRoutes = require('./upload.js')
const shareholderRoutes = require('./shareholder')

//acr routes
router.use('/acrcloud', acrRoutes)

//upload route
router.use(uploadRoutes)

//cue routes
router.use('/cues', cueRoutes)
router.use('/cuesheet', cueRoutes)

router.use('/shareholder', shareholderRoutes)

module.exports = router