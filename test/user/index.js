import test from 'tape'
import request from 'supertest'
import app from '../../src/server'
import User from '../../src/models/user/userSchema'

// create a unique email and password combination to use for this test
const email = 'testuser@applification.net'
const password = 'userP45s'

// IF I do this, it's going to sign up a new user everytime. So ideally I want to delete this user once signed up
// Suspect this means I need a delete account option
test('sign up', tt => {
  request(app)
    .post('/signup')
    .send({ email, password })
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      tt.error(err, 'No error')
      // tt.comment(res.body.token)
      tt.ok(res.body.token, 'Token node present')
      tt.end()
    })
})

// Sign Up: User Already Exists
test('Sign up: User already exists', tt => {
  request(app)
    .post('/signup')
    .send({ email, password })
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

test('sign in', tt => {
  request(app)
    .post('/signin')
    .send({ email, password })
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      tt.error(err, 'No error')
      // tt.comment(res.body.token)
      tt.ok(res.body.token, 'Token node present')
      tt.end()
    })
})

test.onFinish(() => {
  // Delete the user now we have completed our tests
  User.findOneAndRemove({ email }, err => {
    if (err) {
      console.log(`Error deleting user ${err}`)
    } else {
      console.log('Test User Deleted from Mongo')
    }
  })
})
