const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const env = require('@/config/environment.js');
const env = require('@/configs/environment.js');
const { sendError, sendResponse, checkModules } = require('@/helpers');
// sendEmail
const { BASE_URL } = require("@/configs/constant.js");
const User = require('@/app/models/UserModal');
const { v4: uuidv4 } = require('uuid');
const Session = require('@/app/models/SessionModal.js');
const axios = require('axios');
exports.Login = async (req, res) => {
    try {
        const { username, password } = req.body;
 
        let condition = username.match(/^[0-9]+$/) !== null ? { email: username } : { email: username };
        
        let adminUser = await User.findOne({
            where: condition
        });
        

        if (!adminUser) return sendError(res, null, 'No user found', 401);
        if (!password) return sendResponse(res, "User Exist", { password: 0 });

        const passwordMatch = await bcrypt.compare(password, adminUser.password);
        if (!passwordMatch) return sendError(res, "Invalid credentials", 'Invalid credentials', 401);
        let data = { user: adminUser }

        // Check Module Access //
        let modules = await checkModules(res, adminUser);
        let uid = await uuidv4();
        if (password) {
            const payload = {
                user: {
                    id: adminUser.id,
                    email: adminUser.email,
                    role: adminUser.role,
                    SID: uid
                },
            };
            await Session.create({ userId: adminUser.id, sessionId: uid })
            const expireTime = 60 * 60 * 3  // 3H
            const accessToken = jwt.sign(payload, env.accessTokenSecret, { expiresIn: expireTime });
            data = { accessToken, modules, ...data }
        }

        return sendResponse(res, null, data);
    } catch (error) {
        console.log(error, 'error');
        return sendError(res, error, "Server Error in fetching User Login");
    }
}

exports.verify = async (req, res) => {
    try {
        const { email, its_no } = req.user.user;
        let condition = its_no ? { its_no } : { email };
        let adminUser = await User.findOne({
            where: condition
        });
        // console.log("adminUser",adminUser);
        

        if (!adminUser) return sendError(res, null, 'No user found', 422);

        let modules = await checkModules(res, adminUser);

        return sendResponse(res, `Welcome Back ${adminUser.name}`, { user: adminUser, modules: modules });
    } catch (error) {
        console.error(error);
        return sendError(res, error, "Server Error in fetching User Details");
    }
}

exports.Forgot_password = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) return sendError(res, null, "User not found", 422);

        const payload = {
            user_details: {
                id: user.id,
                name: user.name,
                email: user.email
            },
        };
        const resetToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
        const options = {
            resetLink: `${BASE_URL}/change-password/${resetToken}`,
            name: `${user.name}`,
        }
        await sendEmail([user.email], 'Password Reset', { filename: 'resetPasswordMail.html', options });
        return sendResponse(res, "Reset link sent to your email");
    } catch (error) {
        sendError(res, error, "Server Error in sending link");
    }
};

exports.Set_password = async (req, res) => {
    let { token, password } = req.body;
    try {
        await jwt.verify(token, process.env.JWT_SECRET, async (err, admin) => {
            if (err) return sendError(res, err, 'Invalid or expired reset token please generate new link', 422);
            const { id, email } = admin.user_details;

            // Generate a salt and hash the new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const adminUser = await User.update({
                password: hashedPassword
            }, {
                where: { id, email }
            });

            if (!adminUser) return sendError(res, null, 'Password not changed', 422);

            return sendResponse(res, 'Password changed succefully!');
        });
    } catch (err) {
        return res.send({ mesage: err.stack });
    }
}

exports.verifyPolicy = async (req, res) => {
    try {
        await User.update({ tnc_verify: true }, { where: { id: req.user.user.id } })
        sendResponse(res, "Successfully Verify", { tnc_verify: true })
    } catch (err) {
        return res.send({ mesage: err.stack });
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, conPassword } = req.body;

        if (!newPassword || !conPassword) return sendError(res, "Please enter new and confirm password");
        if (newPassword !== conPassword) return sendError(res, 'Password mismatch');
        if (!currentPassword) return sendResponse(res, "Please enter current password");
        const { id } = req.user.user;

        const user = await User.findOne({ where: { id }, raw: true });
        if (!user) return sendError(res, "User not found");
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) return sendError(res, "Invalid credentials", 'Invalid credentials', 401);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const updatedUser = await User.update({
            password: hashedPassword
        }, { where: { id } });

        Session.destroy({ where: { userId: id } });

        if (!updatedUser) return sendError(res, "Failed to update password");
        return sendResponse(res, "Password changed successfully.");
    } catch (err) {
        return sendError(res, err, "server error");
    }
}

exports.logout = async (req, res) => {
    try {
        let id = req.user.user.SID
        Session.destroy({ where: { sessionId: id } });

        return sendResponse(res, "User Logout successfully.");
    } catch (err) {
        return sendError(res, err, "server error");
    }
}

exports.recaptchverify = async (req, res) => {
    
    // console.log('in',req.body.secretKey);

    const value = req.body.value; // Assuming the token is sent in the request body
    // const secretKey = req.body.secretKey;
    const secretKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
        params: {
            secret: secretKey,
            response: value
        }
    });
            // console.log('Backend Data1-',response.data)
            res.json(response.data);

}