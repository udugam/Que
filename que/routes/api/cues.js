const router = require('express').Router()
const cueController = require('../../controllers/cueController')
const cueSheetController = require("../../controllers/cueSheetController");
const songController = require('../../controllers/songsControllers')

router.route('/cues')
    .get(cueSheetController.find)

router.route('/cueSheet')
    .post(cueSheetController.insert)

router.route('/new')
.post(cueController.insert)


router.route('/delete')
.post(cueController.delete)

router.route('/edit')
.post(cueController.edit)

module.exports = router