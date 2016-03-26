# GraphQL Starter

> This is a starter middleware project running on Node.js, Express, GraphQL, JSON Web Tokens, Passport and Mongoose. It's intended as a quick start to get an app middleware up and running quickly.

## ESLint
This project is configured with ESLint Javascript linting.

To configure edit .eslintrc, full configuration options can be found at http://eslint.org/

## Pre-Commit
This project makes use of the pre-commit module to ensure changes cannot be pushed to the GIT repo unless they pass the Javascript linter.

It is pre-configured to check ESLint, for more configuration options see https://github.com/observing/pre-commit

### Express
Uses express

### Morgan

### Mongoose

## config
Configuration settings are held within config.js.
Set at deployment time?

## Routes
Add new routes within router.js

## nodemon
During development start the server using:

```Javascript
npm run dev
```
The server will then automatically restart as files change.
