const router = require('express').Router()
const acrRoutes = require('./acrcloud.js')

//Insert api model specific api routes here
router.use('/acrcloud', acrRoutes)

module.exports = router