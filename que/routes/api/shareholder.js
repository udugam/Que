const shareholderController = require('../../controllers/shareholdersController')
const router = require('express').Router()

router.route('/add')
    .post(shareholderController.insert)

router.route('/delete').post(shareholderController.delete)

    module.exports = router