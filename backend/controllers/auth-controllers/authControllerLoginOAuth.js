const { generateTokenAndSetCookies } = require("../../utils/generateTokenAndSetCookies");

module.exports.googleOAuthCallback = (req, res) => {
    const user = req.user;

    generateTokenAndSetCookies(res, user.id);
    
    res.redirect(`${process.env.DEVELOPMENT_CLIENT_URL}/login`);
};
