import server from './server'

const port = process.env.PORT || 1973
server.listen(port, () => {
  console.dir(`Middleware listening on port: ${port}`)
})
