import jwt from 'jwt-simple'
import User from '../models/user/userSchema'
import config from '../config'

function tokenForUser(user) {
  // do not use email or password as they CAN change
  // sub = subject of token
  // iat = issued at time
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = (req, res) => {
  // user already email and pass authed, just need to give them a token
  res.send({ token: tokenForUser(req.user) })
}

exports.signup = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' })
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err) }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' }) // bad data
    }

    const user = new User({
      email,
      password
    })

    user.save(err => {
      if (err) { return next(err) }

      res.json({ token: tokenForUser(user) })
    })
  })
}
