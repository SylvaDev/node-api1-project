const server = require('./api/server');

const port = 9000;

// START YOUR SERVER HERE
server.listen(port, () => {
    console.log(`Server is starting...`)
    console.log(`Server is listen on http://localhost:${port}`)
});
