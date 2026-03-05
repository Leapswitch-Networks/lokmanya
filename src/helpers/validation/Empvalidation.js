const { body } = require('express-validator');
const UserModal = require("../../models/UserModal");

exports.ValidateEmp = [
  body('user_type').optional().trim()
    .notEmpty().withMessage('User Type is Required!'),

  body('name').optional().trim()
    .notEmpty().withMessage('Name is Required!'),

  body('email').optional()
    .notEmpty().withMessage('Email is Required!').bail()
    .isEmail().withMessage("Email is invalid")
    .custom(async value => {
      const user = await UserModal.findOne({ where: { email: value } });
      if (user) {
        throw new Error('A user already exists with this e-mail address');
      }
    }),

  body('phone').optional().trim()
    .notEmpty().withMessage('Phone is Required!').bail()
    .isInt().withMessage("Phone No is invalid").bail()
    .isLength({ min: 10, max: 10 }).withMessage("Phone No should be 10 digits!")
    .custom(async value => {
      const user = await UserModal.findOne({ where: { phone: value } });
      if (user) {
        throw new Error('A user already exists with this phone address');
      }
    }),
  body('its_no').optional().trim()
    .notEmpty().withMessage('ITS No is Required!').bail()
    .isInt().withMessage('ITS No is invalid!').bail()
    .isLength({ min: 8, max: 8 }).withMessage("ITS No should be 8 digits!")
    .custom(async value => {
      const user = await UserModal.findOne({ where: { its_no: value } });
      if (user) {
        throw new Error('This ITS No is already exist!');
      }
    }),

  body('emp_role').optional().trim()
    .notEmpty().withMessage('Employee role is Required!').bail(),
];

exports.ValidateGetEmpInfo = [
  body('id').notEmpty().withMessage('ID is Required!').bail()
    .isInt().withMessage("ID is not number!").bail(),
];

exports.ValidateIniReponsibitily = [
  body('id').optional().notEmpty().withMessage('ID is Required!').bail()
    .isInt().withMessage("ID is not number!").bail(),

  body('user_id').notEmpty().withMessage('Employee ID is Required!').bail()
    .isInt().withMessage("Employee ID is not number!").bail(),

  body('initiative_name').notEmpty().withMessage('Initiative name is Required!').bail(),

  body('status').notEmpty().withMessage('Status is Required!').bail(),

  body('start_date').notEmpty().withMessage('Start Date is Required!').bail()
    .isISO8601().toDate().withMessage("Invalid date format"),

  body('end_date').optional().notEmpty().withMessage('End Date is Required!').bail().isISO8601().toDate().withMessage("Invalid date format"),
];

exports.ValidateJamait = [
  body('id').optional().notEmpty().withMessage('ID is Required!').bail()
    .isInt().withMessage("ID is not number!").bail(),

  body('user_id').notEmpty().withMessage('Employee ID is Required!').bail()
    .isInt().withMessage("Employee ID is not number!").bail(),

  body('jamiat_name').notEmpty().withMessage('Jamiat name is Required!').bail(),

  body('status').notEmpty().withMessage('Status is Required!').bail(),

  body('start_date').notEmpty().withMessage('Start Date is Required!').bail()
    .isISO8601().toDate().withMessage("Invalid date format"),

  body('end_date').optional().notEmpty().withMessage('End Date is Required!').bail().isISO8601().toDate().withMessage("Invalid date format"),
];

exports.ValidateEmpUpdate = [];