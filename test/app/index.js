import test from 'tape'
import request from 'supertest'
import app from '../../src/server'

test('root', tt => {
  request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      const json = {
        response: 'JSON middleware up and running'
      }

      tt.error(err, 'No error')
      tt.same(res.body, json, 'JSON as expected')
      tt.end()
    })
})
