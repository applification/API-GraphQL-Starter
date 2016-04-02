import test from 'tape'
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../../src/server'
import User from '../../src/models/user/userSchema'

// create a unique email and password combination to use for this test
const users = [
  {
    email: 'testuser@applification.net',
    password: 'userP45s'
  },
  {
    email: 'testuser1@applification.net',
    password: 'userP45s1'
  },
  {
    email: 'testuser2@applification.net',
    password: 'userP45s2'
  }
]

// Delete any existing users from Mongo from failed tests
users.map(user => {
  User.findOneAndRemove({ email: user.email }, err => {
    if (err) {
      console.log(`Error deleting user ${err}`)
    }
  })
  return false
})

// Set up ids array to capture mongo user ids
const ids = [];

// Just formatting for the output
test('Users Test Setup', tt => {
  tt.pass('Users list setup')
  tt.end()
})

// User Sign Up: New User
users.map(user => {
  test(`Sign up: ${user.email}`, tt => {
    request(app)
      .post('/signup')
      .send({ email: user.email, password: user.password })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        tt.error(err, 'No error')
        // tt.comment(res.body.token)
        // tt.comment(JSON.stringify(res.body))
        ids.push(res.body.id)
        tt.ok(res.body.token, 'Should have a Token')
        tt.ok(res.body.id, 'Should have an ID')
        tt.end()
      })
  })
  return false
})

// User Sign Up: User Already Exists
test('Sign up: User already exists', tt => {
  request(app)
    .post('/signup')
    .send({ email: users[0].email, password: users[0].password })
    .expect('Content-Type', /json/)
    .expect(422)
    .end((err, res) => {
      const json = {
        error: 'Email is in use'
      }
      tt.error(err, 'No error')
      tt.same(res.body, json, 'JSON: Email in use returned')
      tt.end()
    })
})

// User Sign In
test('sign in', tt => {
  request(app)
    .post('/signin')
    .send({ email: users[0].email, password: users[0].password })
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      tt.error(err, 'No error')
      // tt.comment(res.body.token)
      // tt.comment(JSON.stringify(res.body))
      tt.ok(res.body.token, 'Should have a Token')
      tt.ok(res.body.id, 'Should have an ID')
      tt.end()
    })
})

// Get Single User Details
test('get user', tt => {
  // tt.comment(`ids: ${ids}`)
  request(app)
    .post('/graphql')
    .set('Content-Type', 'application/graphql')
    .send(
      `query {
        userId(id: "${ids[0]}") {
          email
        }
      }`
    )
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(res => {
      tt.ok(res.body, 'Res body present')
      tt.ok(res.body.data.userId.email, 'Email present')
      tt.equal(res.body.data.userId.email, users[0].email, 'Email should match')
    })
    .end((err) => {
      tt.error(err, 'No error')
      tt.end()
    })
})

// Update User
// Mutation that will update a user in mongo db and validate that change actually ocrrured
test('update user', tt => {
  // tt.comment(`ids: ${ids}`)
  request(app)
    .post('/graphql')
    .set('Content-Type', 'application/graphql')
    .send(
      `mutation {
        updateUser(id:"${ids[0]}", email:"updated@applification.net") {
          id,
          email
        }
      }`
    )
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(res => {
      res.body.data.updateUser.email = 'updated@application.net'
      tt.pass('Email should be updated@applification.net')
    })
    .end((err) => {
      // Update users[0] email otherwise teardown will not work properly
      users[0].email = 'updated@applification.net'
      tt.error(err, 'No error')
      tt.end()
    })
})

// Get List of Users
test('get users', tt => {
  request(app)
    .post('/graphql')
    .set('Content-Type', 'application/graphql')
    .send(
      `query {
        users {
          id,
          email
        }
      }`
    )
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(res => {
      // tt.comment(JSON.stringify(res.body))
      tt.ok(res.body.data.users, 'Users array present')
      tt.pass('List of users returned')
    })
    .end((err) => {
      tt.error(err, 'No error')
      tt.end()
    })
})

// Just formatting for the output
test('Teardown Clean Up', tt => {
  tt.end()
})

test.onFinish(() => {
  // Delete the user now we have completed our tests
  users.map(user => {
    User.findOneAndRemove({ email: user.email }, err => {
      if (err) {
        console.log(`Error deleting user ${err}`)
      } else {
        console.log(`Removed ${user.email} from db`)
      }
    })
    return false
  })
  // Delay otherwise db connection gets closed before all data deleted
  setTimeout(() => {
    mongoose.connection.close()
  }, 2000)
})
