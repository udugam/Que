const router = require('express').Router()
const acrRoutes = require('./acrcloud.js')

//Insert api model specific api routes here
router.use('/acrcloud', acrRoutes)
const cueRoutes = require('./cues')

//Insert api model specific api routes here
router.use('/cues', cueRoutes)

router.use('/cuesheet', cueRoutes)

module.exports = router