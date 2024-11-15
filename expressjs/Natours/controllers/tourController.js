const fs = require('fs');
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../assets/data/tours-simple.json`)
);

exports.checkTourId = (req, res, next, val) => {
    if (val * 1 > tours.length) {
        return res.status(404).json({
            status: 'failure',
            message: 'Invalid id',
        });
    }
    next();
};

exports.checkTourBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(404).json({
            status: 'failure',
            message: 'Invalid Data',
        });
    }
    next();
};
exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours,
        },
    });
};
exports.getTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);
    if (!tour) {
        return res.status(404).json({
            status: 'failure',
            message: 'Invalid id',
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    });
};
exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/assets/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour,
                },
            });
        }
    );
};
exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour>',
        },
    });
};
exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null,
    });
};
