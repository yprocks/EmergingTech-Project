const medication = require("../model/medication.model");
const patient = require("../model/patient.model");

const findPatients = function (req, res) {
    patient.find({nurseId: req.params.nurseId}, function (err, patients) {
        if (err) {
            res.status(500).json({
                message: err.message
            });
            return;
        }
        res.status(200).json(patients);
    });
};

const findPatientsOnMedication = function (req, res) {
    let now = new Date();
    let date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);
    patient.find({
        nurseId: req.params.nurseId
    }, function (err, patients) {
        if (err) {
            res.status(500).json({
                message: err.message
            });
            return;
        }
        let patientsOnMedication = [];

        for (let i = 0; i < patients.length; i++) {
            medication.findOne({
                patientId: patients[i].patientId,
                $or: [{end_date: {$lt: date}}, {end_date: null}]
            }, function (err, medicationObj) {

                // console.log(medicationObj);
                let med;
                if (err) {
                    res.status(500).json({
                        message: err.message
                    });
                    return;
                }
                //
                // if (!medicationObj) {
                //     res.status(200).json({
                //         message: 'No patients found on medication'
                //     });
                //     return;
                // }
                med = patients[i];
                if(medicationObj)
                    med.end_date = medicationObj.end_date;
                patientsOnMedication.push(med);
            });

        }
        res.status(200).json(patientsOnMedication);

    });
};

module.exports = {
    "findPatients": findPatients,
    "findPatientsOnMedication": findPatientsOnMedication
};