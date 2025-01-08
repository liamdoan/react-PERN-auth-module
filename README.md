## Description

Full authentication model with React-Nodejs-Espress-MongoDB, redux. (screenshot below)

- After user signs up, an email with verification code is sent to user email
  (currently tested ok with Mailtrap demo, and demo service only allows Mailtrap to send emails to user's own account email address - me).
- After providing correct code, user account will be verified, and then direct to login page.
- After clicking Forgot Password button and providing correct email, a link to reset password is sent to user email.
  Through that link, user can provide new password. If everything works, an email to confirm password reset will be sent.
- User logs in, and will be direct to Homepage which is a `protected route`, only authenticated user can see.
- With cookie, if user session is still valid, user will not have to log in if browser is shut down or refreshed.
- If user session is still valid and user clicks login button from root home page, it directs user to `protected route` without having to stop at login page.

Frontend:

- TypeScript React, Redux.

Backend:

- NodeJS, Express, jwt (jsonwebtoken), bcryptjs and crypto library.

Database:

- MongoDB

Further expansion: integrate with an existing project, user can log in and only see data belonging to that user.

## Screenshot

![Email Screenshots](client/public/screenshots/email-screens.png)

![UI Screenshots](client/public/screenshots/user-screens.png)
