const http = require('http')
const fs = require('fs')

userName='South Hills Student'

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' })
  if (req.method == 'POST') {
    console.log('POST')
    var body = ''
    req.on('data', function(data) {
      body += data
      console.log('Partial body: ' + body)
    })
    req.on('end', function() {
      console.log('Body: ' + body)
      
      if(JSON.parse(body).id==="username") {
        res.writeHead(200, {'Content-Type': 'application/json'})
        userName = JSON.parse(body).data
        res.end(JSON.stringify({ id: "problem1.html" }))
      }
      
      /** Start coding here */

      /** Do not go beyond this section for now */

    })
  } else if (req.method == 'GET' && req.url == '/username') {
    console.log('GET Username')
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({data: userName}))
  } 
  else {
    var url = req.url;
    if(url ==='/') {
        fs.createReadStream('index.html').pipe(res)
    } else if(url ==='/problem1.html')  {
        fs.createReadStream('problem1.html').pipe(res)
    } else if(url ==='/problem2.html')  {
        fs.createReadStream('problem2.html').pipe(res)
    } else if(url ==='/problem3.html')  {
        fs.createReadStream('problem3.html').pipe(res)
    } else if(url ==='/problem4.html')  {
        fs.createReadStream('problem4.html').pipe(res)
    } else if(url ==='/problem5.html')  {
        fs.createReadStream('problem5.html').pipe(res)
    } else {
        res.write('Doesn\'t exist'); 
        res.end(); 
    }
    console.log("connected") 
  }
})

server.listen(process.env.PORT || 80)