const cueSheetController = require("../../controllers/cueSheetController");
const router = require('express').Router()



// /api/cuesheet/id
router.route('/:id')
    .get(cueSheetController.findById)

module.exports = router