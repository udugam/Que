const router = require('express').Router()
const cueController = require('../../controllers/cueController')
const cueSheetController = require("../../controllers/cueSheetController");
const shareholderController = require('../../controllers/shareholdersController')
const songController = require('../../controllers/songsControllers')

router.route('/cues')
    .get(cueSheetController.find)

router.route('/cueSheet')
    .post(cueSheetController.insert)

module.exports = router