const { MailtrapClient } = require("mailtrap");
const dotenv = require('dotenv');
dotenv.config()

const TOKEN = process.env.MAILTRAP_TOKEN;

module.exports.mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

module.exports.sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Lam Doan",
};
