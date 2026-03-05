const sequelize = require("../config/database");
const { sendError, sendResponse } = require("../helpers");
const AssignModule = require("../models/AssignModal");
const ModulesModal = require("../models/ModuleModal");
const User = require("../models/UserModal");

exports.save = async (req, res) => {
    try {
        const { user_id, permissions } = req.body
        let records = permissions?.map(({ admin, permission, module_id }) => {
            return {
                user_id: parseInt(user_id),
                role: admin ? 'admin' : 'user',
                permission,
                assigner_id: parseInt(req?.user?.user?.id),
                assign_module_id: parseInt(module_id),
            }
        })

        let assign = await AssignModule.bulkCreate(records)
        if (!assign) return sendError(res, null, "something went wrong");
        let updateData = {
            module_assign: records?.some(e => e.permission.length) ? 1 : 0,
            role: 'user'
        }
        if (req.user.user.role === "super_admin") {
            if (records?.some(rec => rec.role === 'admin')) updateData.role = 'admin';
        }
        await User.update(updateData, {
            where: {
                id: parseInt(user_id),
                status: "active",
                module_assign: 0
            }
        })

        return sendResponse(res, "Saved successfully!", { data: assign });
    } catch (err) {
        console.log(err, 'records');
        return sendError(res, err, "Server Error")
    }
};

exports.get = async (req, res) => {
    try {
        let assignCondition = {
            attributes: ['user_id', 'assign_module_id', 'role', 'permission'],
            include: [{ model: User, attributes: ['id', 'name', 'module_assign', 'status', 'role'] }],
        }

        if (req.user.user.role !== "super_admin") assignCondition.where = { assigner_id: parseInt(req.user.user.id) };
        let assign = await AssignModule.findAll(assignCondition)
        let userList = await User.findAll({
            where: {
                status: "active",
                module_assign: 0
            }
        })
        assign = JSON.stringify(assign)
        assign = JSON.parse(assign)


        assign = await assign.reduce((acc, row) => {
            const userObj = acc.find(item => item.user_id === row.user_id);
            if (userObj) {
                userObj.modules.push({
                    role: row.role,
                    permission: JSON.parse(row.permission),
                    module_assign_id: row.assign_module_id,
                });
                return acc;
            }
            acc.push({
                user_id: row.user_id,
                user: { ...row.user },
                modules: [{
                    role: row.role,
                    permission: JSON.parse(row.permission),
                    module_assign_id: row.assign_module_id,
                }],
            });
            return acc;
        }, []);
        return sendResponse(res, "Fetched successfully!", { data: assign, userList });
    } catch (err) {
        console.log(err, 'records');
        return sendError(res, err, "Server Error")
    }
};

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params
        let whereCondition = {
            user_id: parseInt(id)
        }
        if (req.user.user.role !== "super_admin") {
            whereCondition.assigner_id = parseInt(req.user.user.id)
        }
        let assign = await AssignModule.findAll({
            where: whereCondition,
            attributes: ['id', 'user_id', 'assign_module_id', 'role', 'permission'],
            include: [{ model: User, attributes: ['id', 'name', 'module_assign', 'status', 'role'] }],
        })

        assign = JSON.stringify(assign)
        assign = JSON.parse(assign)

        assign = await assign.reduce((acc, row) => {
            const userObj = acc.find(item => item.user_id === row.user_id);
            if (userObj) {
                userObj.modules.push({
                    id: row.id,
                    role: row.role,
                    permission: JSON.parse(row.permission),
                    module_assign_id: row.assign_module_id,
                });
                return acc;
            }
            acc.push({
                user_id: row.user_id,
                user: { ...row.user },
                modules: [{
                    id: row.id,
                    role: row.role,
                    permission: JSON.parse(row.permission),
                    module_assign_id: row.assign_module_id,
                }],
            });
            return acc;
        }, []);
        return sendResponse(res, "Fetched successfully!", { assign: assign[0] });
    } catch (err) {
        console.log(err, 'records');
        return sendError(res, err, "Server Error")
    }
};

exports.UpdateUser = async (req, res) => {
    const transaction = await sequelize.transaction()
    try {
        const { user_id, permissions } = req.body;

        let records = await Promise.all(permissions?.map((module) => {
            const { admin, permission, module_id, updated } = module
            let obj = {
                user_id: parseInt(user_id),
                role: admin ? 'admin' : 'user',
                permission,
                assigner_id: parseInt(req?.user?.user?.id),
                assign_module_id: parseInt(module_id),
            };
            if (!!updated) {
                if (module?.id) {
                    if (!permission.length) {
                        AssignModule.destroy({ where: { id: parseInt(module?.id) }, transaction })
                        return obj

                    } else {
                        AssignModule.update(obj, { where: { id: parseInt(module?.id) }, transaction })
                        return obj
                    }
                } else {
                    if (!permission.length) return obj;
                    AssignModule.create(obj, { transaction })
                    return obj
                }
            }
            return obj;
        }))

        let userData = {
            module_assign: records?.some(e => e.permission.length) ? 1 : 0
        }
        if (req.user.user.role === "super_admin") {
            userData.role = permissions?.some(rec => rec.admin) ? 'admin' : 'user'
        }
        await User.update(userData, {
            where: {
                id: parseInt(user_id),
                status: "active",
                module_assign: 1
            },
            transaction
        });
        await transaction.commit()
        return sendResponse(res, "Saved successfully!");
    } catch (err) {
        if (transaction) await transaction.rollback()
        console.log(err, 'records');
        return sendError(res, err, "Server Error")
    }
};