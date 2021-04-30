const router = require('express').Router();
let Day = require('../models/day.model');

router.route('/').get((req, res) => {
    Day.find()
        .then(days => res.json(days))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const date = Date.parse(req.body.date);
    const anxiety = req.body.anxiety;
    const smiles = req.body.smiles;

    const newDay = new Day({
        date,
        anxiety,
        smiles,
    });

    newDay.save()
        .then(() => res.json('Day added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});




router.route('/:id').get((req, res) => {
    Day.findById(req.params.id)
    .then(day => res.json(day))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Day.findByIdAndDelete(req.params.id)
    .then(() => res.json('Entry deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    Day.findByIdAndUpdate(req.params.id)
    .then(day => {
        day.date = Date.parse(req.body.date);
        day.anxiety = req.body.anxiety;
        day.smiles = req.body.smiles;

        day.save()
        .then(() => res.json('Entry updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    });
})



module.exports = router;