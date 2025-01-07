module.exports.logOut = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Logout ok!"
    });
};
