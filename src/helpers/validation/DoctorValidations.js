const { body } = require('express-validator');
exports.DoctorValidations = [
  body('doctor_name').notEmpty().withMessage('Doctor Name is Required!').bail(),
];