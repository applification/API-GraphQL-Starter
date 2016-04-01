# GraphQL Starter

> This is a starter middleware project running on Node.js, Express, GraphQL, JSON Web Tokens, Passport and Mongoose. It's intended as a quick start to get an app middleware up and running quickly.

## Installing
```Javascript
npm install
```

Set up a Mongo Database and ensure it's running locally
```Javascript
mongod
```

## Config
Configuration settings are held within config.js i.e name of Mongo Database a secret key for hashing passwords

## ESLint
This project is configured with ESLint Javascript linting.

To configure edit .eslintrc, full configuration options can be found at http://eslint.org/

Run linting from CLI:

```Javascript
npm test
```

### Express
The server uses express, to start the server in development mode which uses nodemon to re-start the server every time a file change is detected.

```Javascript
npm dev run
```
To run for production
```Javascript
npm start
```

This will run the npm pre-start which compiles the ES6 code to a dist folder ready for deployment.

## Routes
Add new routes within router.js

## GraphQL
GraphiQL is integrated and can be accessed on /graphql path. It is used for all queries / mutations beyond the initial sign up / sign in flow.

## Authentication
The sign up / sign in authorization flow makes use of JSON Web Tokens in combination with Passport to authenticate endpoints using tokens. Client must request, store and send this token with all secured API endpoints and GraphQL Queries. 

## Pre-Commit
This project makes use of the pre-commit module to ensure changes cannot be pushed to the GIT repo unless they pass the Javascript linter.

It is pre-configured to check ESLint, for more configuration options see https://github.com/observing/pre-commit
