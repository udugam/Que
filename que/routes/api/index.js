const router = require('express').Router()
const cueRoutes = require('./cues')

//Insert api model specific api routes here
router.use('/cues', cueRoutes)

module.exports = router