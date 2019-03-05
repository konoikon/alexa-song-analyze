var request = require('request-promise');

const ACCESS_TOKEN = 'AFweoWs57FJjiw9tYVNyuWLw2EHDedRjPwwS-JPDEijW3C156lLcSqRiuWIR7MT6';
const BASE_URL = 'https://api.genius.com/'

function api_request(options, cb) {
    var default_req = request.defaults({
        baseUrl: BASE_URL,
        headers: {'Authorization': 'Bearer ' + ACCESS_TOKEN}
    });

    let promise = new Promise(function(resolve, reject) {
        default_req(options, function(err, response) {
            if (response.statusCode !== 200) {
                var payload = {
                    'Error': response,
                    'Status': response.statusCode
                };
                reject(payload);
            } else {
                resolve(response);
            }
        });
    });

    return promise;
}

function request_promise(request) {
    return new Promise(function(resolve, reject) {
        api_request(request).then(function(data) {
            resolve(JSON.parse(data.body));
        }).catch(function(data) {
            reject(data);
        });
    });
}

module.exports = { 
    search: function(query) {
        let request = {
            url: 'search',
            qs: {'q': query}
        }
        return request_promise(request);
    }
}