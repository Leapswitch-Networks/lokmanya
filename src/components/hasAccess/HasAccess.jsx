import { useAccessControl } from "../../hooks/useAccessControl";
import NotFound from "../Error/NotFound";

const HasAccess = ({
    children,
    permissions,
    renderAuthFailed,
    role,
    access
}) => {
    const { checkRoleAccess } = useAccessControl();
    if (permissions === 'doctors') return children;

    const hasRequiredPermission = checkRoleAccess(role || [], permissions ? [permissions] : [], access)
    if (hasRequiredPermission) return children;
    return renderAuthFailed || <NotFound />;
};

export default HasAccess;
