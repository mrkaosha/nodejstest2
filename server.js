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

    // Writing the response now at the end of reading the request
    req.on('end', function() {
      console.log('Body: ' + body)
      
      var bodyJSON = JSON.parse(body)
      var bodyJSONid = bodyJSON.id
      var bodyJSONdata = bodyJSON.data
      res.writeHead(200, {'Content-Type': 'application/json'})
      var responseJSON = { id: "" }

      if(bodyJSONid==="username") {
        userName = bodyJSONdata
        res.end(JSON.stringify({ id: "problem1.html" }))
      }
      
      /** Start coding here */

      if(bodyJSONid==="answer1") {
        if(bodyJSONdata==="red") {
          res.end(JSON.stringify({ dialog: "correct!", id: "problem2.html" }))
        } else {
          res.end(JSON.stringify({ dialog: "incorrect :(", id: "problem1.html" }))
        }
      }

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