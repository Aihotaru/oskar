var static = require('node-static');

var fileServer = new static.Server('../app');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response, function (err, result) {
            if (err) { // There was an error serving the file 
                console.error("Error serving " + request.url + " - " + err.message);

                if (request.url == '/new') {
                    console.log(request.body);
                }

                // Respond to the client 
                response.writeHead(err.status, err.headers);
                response.end();
            }
        });
    }).resume();
}).listen(8080);