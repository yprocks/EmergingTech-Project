const patient = require("../model/patient.model");
const quotes = require("../model/quote.model");

const getTodaysQuote = function (req, res) {
    let now = new Date();
    let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    patient.findById(req.params.patientId, function (err, patient) {
        if (err) {
            res.status(500).json({
                message: err.message
            });
        }
        quotes.findOne({created_on: {$gte: startOfToday}, nurseId: patient.nurseId}, function (err, quote) {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
            }
            res.status(200).json(quote);
        });
    });
};

const updateTodaysQuote = function (req, res) {
    let now = new Date();
    let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    quotes.findOneAndUpdate({created_on: {$gte: startOfToday}, nurseId: req.body.nurseId}, req.body,
        {upsert: true}, function (err, quote) {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
            }
            res.status(200).json(quote);
        });
};

const removeQuote = function (req, res) {
    quotes.findByIdAndRemove(req.params.quoteId, function (err, quote) {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
            }
            res.status(200).json(quote);
        });
};

module.exports = {
    "getTodaysQuote": getTodaysQuote,
    "updateTodaysQuote": updateTodaysQuote,
    "removeQuote": removeQuote
};