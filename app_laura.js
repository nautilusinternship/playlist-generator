const express = require('express');
const { spawn } = require('child_process');
var bodyParser = require('body-parser');
const app = express();
app.set('port', process.env.PORT || 3000)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

var songURI = "Null";
var roundNumber = 0;
var genre = "Null";

app.post("/",(req,res)=>{

    // PARSE USER INPUT FROM NEMO
    //console.log("post block entered.");
    //console.log("receiving data...");
    //console.log('body is', req.body);
    var text = req.body["text"];
    //console.log('text is', text);
    // payload_type = text.split(':')[0];
    // console.log(payload_type);
    genreOrLink = text.split(':')[0];
    //console.log(genre);
    roundNumber = text.split(':')[1];
    //console.log(roundNumber);

    // MANIPULATE DATA AND SEND BACK TO NEMO
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', ['script2.py', genreOrLink, roundNumber]); 
    // collect data from script. Takes whatever is printed from python script knn.py and post on localhost:3000
    python.stdout.on('data', function (data) {
        console.log("Pipe data from python script...");
        dataToSend = data.toString();
    });
    // send data to browser
    python.on('close', (code) => {
        console.log('child process close all stdio');
        res.send(dataToSend)
        res.data = dataToSend
    });
    console.log(res.data)
    return res
});

app.get('/', (req, res) => {
    console.log("get block entered.");
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', ['script2.py', genreOrLink, roundNumber]); 
    // collect data from script. Takes whatever is printed from python script knn.py and post on localhost:3000
    python.stdout.on('data', function (data) {
        console.log("Pipe data from python script...");
        dataToSend = data.toString();
    });
    // send data to browser
    python.on('close', (code) => {
        console.log('child process close all stdio with code ${code}');
        res.send(dataToSend)
    });
}); 
app.listen(app.get('port'), () => console.log('example app listening on: port ' + app.get('port')))
