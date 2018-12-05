const cueSheetController = require("../../controllers/cueSheetController");
const router = require('express').Router()



// /api/cuesheet/id
router.route('/:id')
    .get(cueSheetController.findById)
router.route('/delete/:id')
    .post(cueSheetController.delete)

module.exports = router