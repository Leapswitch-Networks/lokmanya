// const Permission = require("../api/Permission/Permission.model");

// exports.createPermission = async (user, module_id) => {
//     try {
//         return await Permission.findOrCreate({
//             where: { entity_id: user.id, module_id, entity_type: user.role === "vendor" ? "vendor" : "user" }
//         });
//     } catch (error) {
//         return error
//     }
// }
