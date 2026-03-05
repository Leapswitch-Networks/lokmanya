const { body } = require('express-validator');

exports.ValidatemasterModule =  [
    body('module_type').trim()
    .notEmpty().withMessage('Module Type is Required!'),

	body('title').trim()
    .notEmpty().withMessage('Title is Required!').bail(),
];

exports.ValidateDeleteMasterModule =  [
    body('module_type').trim().notEmpty().withMessage('Module Type is Required!'),
    body('module_slug').trim().notEmpty().withMessage('Module Slug is Required!').bail(),
	body('id').trim().notEmpty().withMessage('Id is Required!').bail().isInt().withMessage("ID is invalid").bail(),
];