const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require("./emailTemplates");
const { sender, mailtrapClient } = require("./mailTrapConfig");

// call this in Signup controller
// email and verificationToken are pass from UserModel object
module.exports.sendVerificationEmail = async (email, verificationToken) => {
    const recipientEmail =[{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender, //sender in the config
            to: recipientEmail,
            subject: "Verify your email",
            html:   VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });

        console.log("email send ok!", response)
    } catch (error) {
        console.error(error)
    }
}


// call this in verify email controller
module.exports.sendWelcomeEmail = async (email, userName) => {
    const recipientEmail =[{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipientEmail,
            template_uuid: "e5acfa27-16e7-4c51-9154-ba7363eb62eb", // template created at MailTrap
            template_variables: {
                "company_info_name": "Lam Doan .Inc",
                "name": userName
            }
        });

        console.log("Welcome email sent!", response);
    } catch (error) {
        throw new Error("something wrong when sending welcome email", error);
    }
}

// call this in reset password controller
module.exports.sendPasswordResetEmail = async (email, resetUrl) => {
    const recipientEmail = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipientEmail,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
            category: "Reset password"
        });

        console.log("Reset password email sent!", response);
    } catch (error) {
        throw new Error("something wrong when sending reset password email", error);
    }
}

// call this in reset password controller
module.exports.sendPasswordResetEmailSuccess = async (email) => {
    const recipientEmail = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipientEmail,
            subject: "Password Reset Successfully!",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Reset password"
        });

        console.log("Password reset successfully!", response)
    } catch (error) {
        console.error(error);
        throw new Error(error)
    }
}
