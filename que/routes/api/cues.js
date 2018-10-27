const router = require('express').Router()
const cueController = require('../../controllers/cueController')
const cueSheetController = require("../../controllers/cueSheetController");
const shareholderController = require('../../controllers/shareholdersController')
const songController = require('../../controllers/songsControllers')

<<<<<<< HEAD
router.route('/cues')
    .get(cueSheetController.find)
=======
// router.route('/cues')
//     .get(cueController.example)
>>>>>>> eedeb6b71327efea9cbde2f6e012c692c4c93358

router.route('/cueSheet')
    .post(cueSheetController.insert)


// /api/cuesheet/id
router.route('/:id')
    .get(cueSheetController.findById)

module.exports = router