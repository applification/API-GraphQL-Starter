import Authentication from './lib/authentication'
import passportService from './services/passport' // eslint-disable-line no-unused-vars
import passport from 'passport'

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

export default app => {
  app.get('/', (req, res) => {
    res.json({ response: 'JSON middleware up and running' })
  })
  app.get('/protected', requireAuth, (req, res) => {
    res.json({ response: 'Protected route' })
  })
  app.post('/signin', requireSignin, Authentication.signin)
  app.post('/signup', Authentication.signup)
}
