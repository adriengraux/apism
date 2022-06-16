const express = require('express')
const app = express()
const port = 3000
const apiKey = '123456'
app.get('/', (req, res) => {
  if(apiKey !== req.headers['X-api-key']){
    return res.sendStatus(401)
  }
  const result = {
    success: true
  }
  res.send(result)
})

app.listen(port, () => {
  console.log(`Dummy api listening on port ${port}`)
})
