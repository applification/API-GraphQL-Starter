export default app => {
  app.get('/', (req, res) => {
    res.send({ response: 'JSON middleware up and running' })
  })
}
