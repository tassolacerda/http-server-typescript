import * as net from 'net';

const server = net.createServer((socket) => {

    socket.on('data', (data) => {
        const request = data.toString().trim();
        const [requestLine] = request.split('\r\n');
        const [method, url] = requestLine.split(' ');

        console.log(request, 'request')
        console.log(requestLine, 'requestLine');
        console.log(method, url);

        const verifyIfURLContainsEcho = (url) => {
            if (url.includes('echo')) {
                const baseURL = url;
                const splittedURL = baseURL.split('/echo/');

                if (baseURL === `/echo/${splittedURL[1]}`) {
                    return true
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }



        if (url === '/') {
            socket.write("HTTP/1.1 200 OK\r\n\r\n");
        } else if (verifyIfURLContainsEcho(url)) {
                const splittedURL = url.split('/echo/');
                console.log(splittedURL);
                socket.write(
                    `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${splittedURL[1].length}\r\n\r\n${splittedURL[1]}`
                );
        } else {
            socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
        }
        socket.end();

    })
});

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");



server.listen(4221, 'localhost', () => {
    console.log('Server is running on port 4221');
});
