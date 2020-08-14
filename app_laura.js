const express = require('express');
const { spawn } = require('child_process');
var bodyParser = require('body-parser');
const app = express();
app.set('port', process.env.PORT || 3000)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.post("/", (req, res) => {

    // PARSE USER INPUT FROM NEMO
    var textdata = "Null";
    var text = req.body["text"];
    textdata = text;
    console.log(textdata);
    // MANIPULATE DATA AND SEND BACK TO NEMO
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', ['knn-inprogress.py', textdata]);
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
        console.log(res.data)
        return res
    });
});

app.get('/', (req, res) => {
    console.log("get block entered.");
    var dataToSend;
    try {
        // spawn new child process to call the python script
        const python = spawn('python', ['knn-inprogress.py', textdata]);
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
    }
    catch {
        // send data to browser
        res.send('No data from nemobot at this time.')
    }
});
app.listen(app.get('port'), () => console.log('example app listening on: port ' + app.get('port')))
