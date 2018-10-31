const router = require('express').Router()
const cueController = require('../../controllers/cueController')
const cueSheetController = require("../../controllers/cueSheetController");
const songController = require('../../controllers/songsControllers')

router.route('/cues')
    .get(cueSheetController.find)

router.route('/cueSheet')
    .post(cueSheetController.insert)


// /api/cuesheet/id
router.route('/:id')
    .get(cueSheetController.findById)

module.exports = router