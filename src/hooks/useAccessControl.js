import { useSelector } from "react-redux";

export const useAccessControl = () => {
    const { modules, user } = useSelector(state => state.auth);

    const checkRoleAccess = (requiredRoles, requiredModules, requiredAccess) => {
        if (!Array.isArray(requiredRoles) || !Array.isArray(requiredModules)) {
            console.error('Required roles and modules should be arrays.');
            return false;
        }
        return modules.some(module => {
            return (
                (requiredModules.length === 0 || requiredModules.includes(module.module_slug)) &&
                (requiredRoles.length === 0 || requiredRoles.includes(user?.role)) &&
                (!requiredAccess || module?.permission?.includes(requiredAccess))
            );
        });
    };

    const checkPermission = (module, action, child) => {
        if (!module || !action) {
            console.error('Module and action are required.');
            return false;
        }
        const modulePermissions = modules.find(mod => mod.module_slug === module)?.permission;
        return modulePermissions?.includes(action) && child;
    };
    return { checkRoleAccess, checkPermission };
};