import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import config from './config'
import router from './router'

// Import GraphQL and destructure for easy access
import {
  GraphQLObjectType,
  GraphQLSchema
 } from 'graphql'

// Import express-graphql an easy express integration of https://github.com/graphql/graphiql
import graphqlHTTP from 'express-graphql'

// Import GraphQL Queries
import userQueries from './models/user/userQueries'

// Import GraphQL Mutations
import userMutations from './models/user/userMutations'

// Setup GraphQL RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'Query',
  description: 'Realize Root Query',
  fields: () => ({
    user: userQueries.user,
    users: userQueries.users,
    userId: userQueries.userId,
    userByName: userQueries.userByName
  })
})

// Setup GraphQL RootMutation
const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Realize Root Mutations',
  fields: () => ({
    addUser: userMutations.addUser,
    updateUser: userMutations.updateUser
  })
})

// Set up GraphQL Schema with our RootQuery and RootMutation
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

// Connect MongoDB with Mongoose
mongoose.connect(`mongodb://localhost/${config.db}`)

const app = express()
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))
app.use(bodyParser.json({ type: '*/*' }))
router(app)

export default app
