'use strict';
const axios = require('axios');

// create counter to track # of song pairs user has picked from
let rounds = 0;

const start = (say, sendButton) => {
    say("In this game, you will choose your preference from provided songs so\
	we can help recommend other music you might like :)").then(() => {
        sendButton('Are you ready?', [{ title: 'Yes', payload: 'Ready' }, 'No']);
    });
};


const state = (payload, say, sendButton) => {
    if (payload == 'Ready' || payload == 'Again') {
        // just a few sample genres to test with, obvi will add all once done
        sendButton("Please select a genre:", [{ title: "pop", payload: "gen:pop:0" },
        { title: "rap", payload: "gen:rap:0" }, { title: "R&B", payload: "gen:rb:0" }]);
    }
    /* determine if first round (selecting genre) or subsequent rounds (selecting
       between links). */
    let split = payload.split(':')
    const payload_type = split[0];
    let genre = split[1];
    let round = split[split.length - 1];

    // if first round (selected genre)
    if (payload_type == 'gen') {
        // post genre and round number to app.js
        axios({
            method: 'post',
            baseURL: 'https://playlist-generatr.herokuapp.com', 
            url: '/',
            'Content-Type': 'application/json',
            data: {
                text: payload
            }
        }).then(resp => {
           say(resp.data);
        })
    }
};

module.exports = {
    filename: 'helloworld',
    title: 'Hello World SIS',
    introduction: [
        'Welcome to Nemobot Music Recommender!'
    ],
    start: start,
    state: state
};