const router = require('express').Router()
const testRoute = require('./test.js')

//Insert api model specific api routes here
router.use('/test', testRoute)

module.exports = router