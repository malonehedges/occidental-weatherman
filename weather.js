
const https = require('https')

const weatherRegex = /\d{1,3}\.\d{1,2}°F/g

const formatWeather = (webSource) => {
  const tempString = webSource.match(weatherRegex)[0]
  const tempNum = Math.round(Number(tempString.substr(0, tempString.length - 2)))

  return tempNum
}

const reqOptions = {
  host: 'apps.oxy.edu',
  path: '/ws/'
}

const getWeather = () => {
  return new Promise((resolve, reject) => {
    https.request(reqOptions, (response) => {
      let body = ''

      response.on('data', (chunk) => {
        body += chunk
      })

      response.on('end', () => {
        const tempNum = formatWeather(body)
        resolve(tempNum)
      })
    }).on('error', (error) => {
      reject(error)
    }).end()
  })
}

module.exports = getWeather
