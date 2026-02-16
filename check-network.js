const https = require('https');

const url = 'https://testapi.geohomefinder.com/users/login';

console.log(`Checking connectivity to: ${url}`);

const req = https.request(url, { method: 'POST' }, (res) => {
    console.log(`StatusCode: ${res.statusCode}`);
    console.log('Headers:', res.headers);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (e) => {
    console.error(`PROBLEM WITH REQUEST: ${e.message}`);
    if (e.code) console.error(`Error Code: ${e.code}`);
});

req.end();
