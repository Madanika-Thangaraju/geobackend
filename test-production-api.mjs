import https from 'https';

const testEndpoint = (method, path, body = null) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'testapi.geohomefinder.com',
            port: 443,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (body) {
            const bodyStr = JSON.stringify(body);
            options.headers['Content-Length'] = bodyStr.length;
        }

        console.log(`\n🔍 Testing: ${method} ${path}`);

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                console.log(`✅ Status: ${res.statusCode}`);
                console.log(`📦 Response: ${data.substring(0, 200)}`);
                resolve({ status: res.statusCode, data });
            });
        });

        req.on('error', (e) => {
            console.error(`❌ Error: ${e.message}`);
            reject(e);
        });

        if (body) {
            req.write(JSON.stringify(body));
        }

        req.end();
    });
};

(async () => {
    try {
        // Test health/root endpoint
        await testEndpoint('GET', '/');

        // Test register endpoint
        await testEndpoint('POST', '/users/register', {
            name: 'Test User',
            email: `test${Date.now()}@example.com`,
            password: 'Test@123',
            phone: '9876543210',
            role: 'tenant'
        });

        console.log('\n✅ All tests completed!');
    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
    }
})();
