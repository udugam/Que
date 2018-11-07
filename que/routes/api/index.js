const router = require('express').Router()
const acrRoutes = require('./acrcloud.js')
const shareholderRoutes = require('./shareholder')
const cueRoutes = require('./cues')
const cueSheetRoutes =require('./cueSheet')
//Insert api model specific api routes here
router.use('/acrcloud', acrRoutes)


//Insert api model specific api routes here
router.use('/cues', cueRoutes)

router.use('/cuesheet', cueSheetRoutes)

router.use('/shareholder', shareholderRoutes)

module.exports = router