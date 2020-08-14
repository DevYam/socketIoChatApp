var express = require('express')
var bodyParser = require('body-parser')
var app = express()// Here the express() is a instance of express that we required above
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

var messages = [
]

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}) )


var dbURL = 'mongodb+srv://user:user@cluster0.rgcug.mongodb.net/Cluster0?retryWrites=true&w=majority'

var Message = mongoose.model('Message',{
    name: String,
    message: String
})

app.get("/messages",(req,res)=>{
    res.send(messages)
})
app.post("/messages",(req,res)=>{
    var message = new Message(req.body)

    message.save((err)=>{
        if (err)
            sendStatus(500)
        messages.push(req.body)
        io.emit('message',req.body)
        res.sendStatus(200 )
    })
})

io.on('connection',(socket)=>{
    console.log("A user connected")
})

mongoose.connect(dbURL,{ useNewUrlParser: true,useUnifiedTopology: true }, (err)=>{
    console.log("mongo db connection",err)
})
var server = http.listen(8080, ()=>{
    console.log("server is listening to port", server.address().port)
} )
