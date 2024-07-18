const soap = require('soap')
const http = require('http');
const fs = require('fs');

//defining the service implementation
const service = {
    WeatherService: {
        WeatherPort: {
            GetWeather: function(args, callback) {
                //perform the logic to get the weather by the location input
                const location = args.location
                const temperature = '25°C'
                const description = 'Overcast'

                //Return the response

                const result = {
                    temperature: temperature,
                    description: description
                }
                callback(null, result)
            }
        }
    }
}

//create the soap server
const xml = fs.readFileSync('weatherService.wsdl', 'utf8');
const server = http.createServer(function(request, response) {
    response.end('404: Not Found: ' + request.url);
});

// const server = soap.listen({path: '/weather', xml: xml}, function() {
//     console.log('SOAP Server running at http://localhost:8000/weather?wsdl')
// })

//attach the service implementation to SOAP Server
server.listen(8000, function() {
    const soapServer = soap.listen(server, '/weather', service, xml);
    console.log('SOAP Server running at http://localhost:8000/weather?wsdl');
});