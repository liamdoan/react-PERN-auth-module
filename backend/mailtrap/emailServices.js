const { TEMPLATE_VERIFICATION_EMAIL, TEMPLATE_WELCOME, TEMPLATE_PASSWORD_RESET_REQUEST, TEMPLATE_PASSWORD_RESET_SUCCESS } = require("./emailTemplates");
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
            html:   TEMPLATE_VERIFICATION_EMAIL.replace("{verificationCode}", verificationToken),
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
            subject: "Welcome To LD Inc.",
            html: TEMPLATE_WELCOME.replace("{userName}", userName),
            category: "Welcome Email"
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
            html: TEMPLATE_PASSWORD_RESET_REQUEST.replace("{resetURL}", resetUrl),
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
            html: TEMPLATE_PASSWORD_RESET_SUCCESS,
            category: "Reset password"
        });

        console.log("Password reset successfully!", response)
    } catch (error) {
        console.error(error);
        throw new Error(error)
    }
}
