var express = require('express')
var app = express()     // Here the express() is a instance of express that we required above

app.use(express.static(__dirname))
var server = app.listen(3000, ()=>{
    console.log("server is listening to port", server.address().port)
} )
