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
