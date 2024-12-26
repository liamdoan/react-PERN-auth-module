module.exports.TEMPLATE_VERIFICATION_EMAIL = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, rgb(248, 203, 0), rgb(223, 182, 0)); padding: 20px; text-align: center;">
        <h1 style="color: black; margin: 0;">Email Verification</h1>
    </div>
    <div style="background-color: #2d2d2d; color: white; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <p>Welcome to LD Inc. Your email verification code is:</p>
        <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: rgb(248, 203, 0);">{verificationCode}</span>
        </div>
        <p>Enter this code to complete your signing up.</p>
        <p>This code will expire in 15 minutes.</p>
        <p>If you didn't create an account, please ignore this email.</p>
        <p>Warmly welcome,<br>LD inc. Team</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
        <p>This is an automated message, please do not reply to this email.</p>
    </div>
</body>
</html>
`;

module.exports.TEMPLATE_PASSWORD_RESET_SUCCESS = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, rgb(248, 203, 0), rgb(223, 182, 0)); padding: 20px; text-align: center;">
        <h1 style="color: black; margin: 0;">Password Reset Successfully</h1>
    </div>
    <div style="background-color: #2d2d2d; color: white; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <p>Your password has been reset successfully.</p>
        <div style="text-align: center; margin: 30px 0;">
            <div style="background-color: rgb(248, 203, 0); color: black; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
                ✓
            </div>
        </div>
        <p>If this request is not from you, please contact our customer support immediately.</p>
        <p>We recommend that you:</p>
        <ul>
            <li>Use a strong password</li>
            <li>Avoid using one password for multiple platform</li>
        </ul>
        <p>Thank you for being our considerate user.</p>
        <p>Regards,<br>LD Inc. Team</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
        <p>This is an automated message, please do not reply to this email.</p>
    </div>
</body>
</html>
`;

module.exports.TEMPLATE_PASSWORD_RESET_REQUEST = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, rgb(248, 203, 0), rgb(223, 182, 0)); padding: 20px; text-align: center;">
        <h1 style="color: black; margin: 0;">Password Reset</h1>
    </div>
    <div style="background-color: #2d2d2d; color: white; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <p>A request to reset your password has been received. If this request wasn't from you, please ignore this message.</p>
        <p>Click below button to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
            <a href="{resetURL}" style="background-color: rgb(248, 203, 0); color: black; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
        </div>
        <p>The link will expire in 1 hour.</p>
        <p>Regards,<br>LD Inc. Team</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
        <p>This is an automated message, please do not reply to this email.</p>
    </div>
</body>
</html>
`;