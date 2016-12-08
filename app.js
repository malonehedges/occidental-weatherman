process.env.DEBUG = 'actions-on-google:*'

const Assistant = require('actions-on-google').ApiAiAssistant
const express = require('express')
const bodyParser = require('body-parser')
const getWeather = require('./weather')

const app = express()
app.use(bodyParser.json({type: 'application/json'}))

const WEATHER_ACTION = 'weatherQuery'

// [START YourAction]
app.post('/webhook', function (req, res) {
  const assistant = new Assistant({request: req, response: res})

  console.log('Request headers: ' + JSON.stringify(req.headers))
  console.log('Request body: ' + JSON.stringify(req.body))

  function getWeather (assistant) {
    getWeather((err, temperature) => {
      assistant.tell(`The weather is currently ${temperature} degrees`)
    })
  }

  let actionMap = new Map()
  actionMap.set(WEATHER_ACTION, getWeather)

  assistant.handleRequest(actionMap)
})
// [END YourAction]

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port
    console.log('App listening on port %s', port)
  })
  // [END server]
}

module.exports = app
