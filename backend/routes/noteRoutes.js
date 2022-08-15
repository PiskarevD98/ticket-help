const express = require('express')
const router = express.Router({ mergeParams: true })
const { getNotes, addNotes } = require('../controlles/noteController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getNotes).post(protect, addNotes   )

module.exports = router

