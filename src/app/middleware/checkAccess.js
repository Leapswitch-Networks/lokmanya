const jwt = require('jsonwebtoken');
const { accessTokenSecret } = require('@/configs/environment');
const { sendError, checkModules } = require('@/helpers');
const Session = require('@/app/models/SessionModal');

const checkAccess = (requiredmodules, requiredRoles) => {

	
	return async (req, res, next) => {
		try {
			const accessToken = req.headers['authorization'];
			
			await jwt.verify(accessToken, accessTokenSecret, { ignoreExpiration: true }, async (err, decoded) => {
				const isTokenExpired = decoded?.exp * 1000 < Date.now();
				if (isTokenExpired || !decoded || err) {
					await Session.destroy({ where: { sessionId: decoded?.user?.SID } });
					return sendError(res, err, 'Session Expired', 401);
				}
				const { user } = decoded;
				req.user = decoded;
				let session = await Session.findOne({ where: { sessionId: user?.SID } })
				if (!session) return sendError(res, null, 'Session Changed', 403);
				// Check Modules if given
				const moduleData = await checkModules(res, user);
				if (!moduleData) return sendError(res, null, 'Access denied due to permissions', 403);
				if (requiredmodules?.length) {
					let access = requiredmodules.some((perm) => moduleData.some(data => data.module_slug === perm));
					if (!access) return sendError(res, null, 'Access denied due to permissions', 403);
				}

				// Check Roles if given
				if (requiredRoles?.length) {
					if (!requiredRoles.includes(user?.role)) return sendError(res, null, 'Access Denied', 403);
				}

				// // Check Permission if given
				// if (requiredPermissions?.length && requiredmodules?.length) {

				// 	console.log(moduleData, 'moduleData');
				// 	// if (!requiredRoles.includes(user?.role)) return sendError(res, null, 'Access Denied', 403);
				// }

				next();
			});

		} catch (error) {
			return sendError(res, error, "Server Error in creating module");
		}
	}
};

module.exports = checkAccess;