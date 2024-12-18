const { VERIFICATION_EMAIL_TEMPLATE } = require("./emailTemplates");
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
