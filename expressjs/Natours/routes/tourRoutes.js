const express = require('express');
const {
    getAllTours,
    createTour,
    getTour,
    updateTour,
    deleteTour,
    checkTourId,
    checkTourBody,
} = require('./../controllers/tourController');

const router = express.Router();

router.param('id', checkTourId);
router.route('/').get(getAllTours).post(checkTourBody, createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
