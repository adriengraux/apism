const express = require('express')
const app = express()
const port = 3000

const API_KEY = '395a9cce-6ffc-48b8-8372-b95089c3abc6'

app.get('/', (req, res) => {
  const apiKeyFromHeader = req.headers['x-api-key']
  if (API_KEY !== apiKeyFromHeader) {
    res.sendStatus(401)
    return
  }
  const result = {
    success: true
  }
  res.send(result)
})

app.listen(port, () => {
  console.log(`Dummy api listening on port ${port}`)
})
