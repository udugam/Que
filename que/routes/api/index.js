const router = require('express').Router()
const acrRoutes = require('./acrcloud.js')
const cueRoutes = require('./cues')
const uploadRoutes = require('./upload.js')

//acr routes
router.use('/acrcloud', acrRoutes)

//upload route
router.use(uploadRoutes)

//cue routes
router.use('/cues', cueRoutes)
router.use('/cuesheet', cueRoutes)

module.exports = router