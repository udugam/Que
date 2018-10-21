const router = require('express').Router()

router.route('/test')
    .get(function(req,res) {
        res.json("<h1>The server Test Route is Working!</h1>")
    })

module.exports = router