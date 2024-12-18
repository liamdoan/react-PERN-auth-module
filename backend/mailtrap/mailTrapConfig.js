const { MailtrapClient } = require("mailtrap");
const dotenv = require('dotenv');
dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

module.exports.mailtrapClient = new MailtrapClient({
    token: TOKEN,
});

module.exports.sender = {
    email: "hello@demomailtrap.com",
    name: "Lam Doan",
};
// const recipients = [
//     {
//         email: "lamdoan9898@gmail.com",
//     }
// ];

// client
//     .send({
//         from: sender,
//         to: recipients,
//         subject: "You are awesome!",
//         text: "Congrats for sending test email with Mailtrap!",
//         category: "Integration Test",
//     })
//     .then(console.log, console.error);
