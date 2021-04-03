const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const PORT = parseInt(process.env.PORT) || 3000

const app = next({dev})
const handler = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/cast/:personId', (req, res) => {
    return app.render(req, res, '/cast', {personId})
  })

  server.all('*', (req, res) => {
    return handler(req, res)
  })

  // Set package.json script to run "dev": "node server.js"
  server.listen(PORT, error => {
    if(error) {
      throw error
    }

    console.log(`Server is running @ http://localhost:${PORT}`)
  })
})

