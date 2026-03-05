const ModulesModal = require("@/app/models/ModuleModal.js");
const sequelize = require("@/configs/database.js");
const AssignModule = require("@/app/models/AssignModal.js");

exports.checkModules = async (res, adminUser) => {
    let modules = {};
    if (adminUser.role == 'super_admin') {
        modules = await ModulesModal.findAll({
            raw: true,
            attributes: [
                'module_id', 'module_name', 'module_slug', 'icon_component',
                [sequelize.fn('CONCAT', JSON.stringify(['view', 'add', 'edit', 'delete'])), 'permission'],
            ],
            order: [
                ['sequence', 'ASC'],
            ]
        });
        modules = modules.map(mod => ({ ...mod, role: "admin" }))
    } else {
        modules = await AssignModule.findAll({
            raw: true,
            where: {
                user_id: adminUser.id
            },
            attributes: ['module.module_id', 'module.module_name', 'module.module_slug', 'module.icon_component', 'permission', 'role'],
            include: [{
                model: ModulesModal,
                on: {
                    col1: sequelize.where(sequelize.col("module.module_id"), "=", sequelize.col("module_assign.assign_module_id"))
                },
                required: false
            }],
        });
    }
    modules = modules?.map(mode => ({ ...mode, permission: JSON.parse(mode?.permission || []) }))
    return modules;
};
