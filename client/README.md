Full authentication model with React-Nodejs-Espress-MongoDB.

- After user signs up, an email with verification code is sent to user email.
- After providing correct code, user account will be verified, and then direct to login page.
- User logs in, and will be direct to Homepage which is a `protected route`, only authenticated user can see.
- With cookie, if user session is still valid, user will not have to log in if browser is shut down or refreshed.
- After clicking Forgot Password button and providing correct email, a link to reset password is sent to user email.
  Through that link, user can provide new password. If everything works, an email to confirm password reset will be sent.

Frontend:

- TypeScript React, Redux.

Backend:

- NodeJS, Express, with jwt (jsonwebtoken), bcryptjs and crypto library.

Database:

- MongoDB

Further expansion: integrate with an existing project, user can log in and only see data belonging to that user.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
