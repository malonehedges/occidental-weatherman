
const Assistant = require('actions-on-google').ApiAiAssistant
const express = require('express')
const bodyParser = require('body-parser')
const getWeather = require('./weather')

const app = express()
app.use(bodyParser.json({type: 'application/json'}))

const WEATHER_ACTION = 'weatherQuery'

app.post('/webhook', function (req, res) {
  const assistant = new Assistant({request: req, response: res})

  function weatherAction (assistant) {
    return getWeather().then((temp) => {
      assistant.tell(`It's currently ${temp} degrees at Occidental College`)
    }).catch((error) => {
      console.error(error)
      assistant.tell(`I can't seem to get that right now`)
    })
  }

  let actionMap = new Map()
  actionMap.set(WEATHER_ACTION, weatherAction)

  assistant.handleRequest(actionMap)
})

if (module === require.main) {
  // Start the server
  const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port
    console.log('App listening on port %s', port)
  })
}

module.exports = app
