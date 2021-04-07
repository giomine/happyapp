const router = require('Express').Router();
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




module.exports = router;