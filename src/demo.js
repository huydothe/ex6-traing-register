const http = require('http');
const fs = require('fs');
const port = 8080;
const host = "localhost";
const qs = require('qs');

const server = http.createServer((req, res)=>{
    if(req.method === 'GET') {
        fs.readFile('./src/register.html', 'utf-8', (err, data) => {
            // if(err){
            //     res.writeHead(404,{'Content-Type' : 'text/html'});
            //     res.end()
            // }
            // else {
                res.writeHead(200, {'Content-Type' : 'text/html'});
                res.write(data);
                res.end();
            // }
        })
    }else {
        let data = ''
        req.on('data',(chunk)=>{
            data += chunk;
        })
        req.on('end',()=>{
            console.log(qs.parse(data));
            return res.end(`Register success`)
        })
        req.on('error', ()=>{
            res.writeHead(404,{'Content-Type' : 'text/html'});
            res.end()
        })
    }
})

server.listen(port,()=>{
    console.log(`Server is running at http://${host}:${port}`);
})
