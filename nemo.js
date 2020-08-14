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
        sendButton("Please select a genre:", [{ title: "pop", payload: "0~pop~VECTOR~" },
        { title: "rap", payload: "0~rap~VECTOR~" }, { title: "R&B", payload: "0~rb~VECTOR~" }]);
    }
    /* determine if first round (selecting genre) or subsequent rounds (selecting
       between links). */
    let split = payload.split('~')
    let round = split[0];

    // if first round (selected genre)
    if (round == 0) {
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
            // get the returned data here, a new pair of song URLs
            var link1 = resp.data.split('~')[0];
            var link2 = resp.data.split('~')[1];

            // display song previews; user selects preference
            say("Please select one of the following options.").then(() => {
                say('https://open.spotify.com/embed/track/' + link1).then(() => {
                    say('https://open.spotify.com/embed/track/' + link2).then(() => {
                        // rounds += 1;
                        round++;
                        var str = "Round " + round + ": I like..."
                        sendButton(str, [{
                            title: 'Track 1 better',
                            payload: round + '~' + link1 + '~' + link2 + '~VECTOR~'
                        }, { title: 'Track 2 better', payload: round + '~' + link2 + '~' + link1 + '~VECTOR~' }]);
                    });
                });
            });
        })
    }

    // if not first round (selecting links)
    if (round > 0 && round < 5) {
        axios({
            method: 'post',
            baseURL: 'https://playlist-generatr.herokuapp.com',
            url: '/',
            'Content-Type': 'application/json',
            data: {
                text: payload,
                round: round,
                vector: payload.split('~VECTOR~')[1],
                uris: payload.split('~VECTOR~')[0].split('~').splice(1)
            }
        }).then(resp => {
            say(resp.data);
            // get the returned data here, a new pair of song URLs
            var link1 = resp.data.split('~')[0];
            var link2 = resp.data.split('~')[1];
            var data = resp.data.split('~');
            var oldData = data.splice(2);
            var dataToSend = oldData.join('~');

            // display song previews; user selects preference
            say("Please select one of the following options.").then(() => {
                say('https://open.spotify.com/embed/track/' + link1).then(() => {
                    say('https://open.spotify.com/embed/track/' + link2).then(() => {
                        // rounds += 1;
                        round++;
                        var str = "Round " + round + ": I like..."
                        sendButton(str, [{
                            title: 'Track 1 better',
                            payload: round + '~' + link1 + '~' + link2 + '~' + dataToSend
                        }, { title: 'Track 2 better', payload: round + '~' + link2 + '~' + link1 + '~' + dataToSend }]);
                    });
                });
            });
        })
    }

    /* after picking preferences, 5 times, return results of kNN on user's 
       "taste vector" (5 recommended songs?) */
    if (round > 4) {
        // returns 5 song recs
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
            // get the returned data here, a new pair of song URLs.
            // again, replace var assignment with links fetched from backend
            var rec1 = 'https://open.spotify.com/embed/track/' + resp.data.split('~')[0];
            var rec2 = 'https://open.spotify.com/embed/track/' + resp.data.split('~')[1];
            var rec3 = 'https://open.spotify.com/embed/track/' + resp.data.split('~')[2];
            var rec4 = 'https://open.spotify.com/embed/track/' + resp.data.split('~')[3];
            var rec5 = 'https://open.spotify.com/embed/track/' + resp.data.split('~')[4];
            say("Here is your recommended mini-playlist!").then(() => {
                say(rec1 + "\n" + rec2 + "\n" + rec3 + "\n" + rec4 + "\n" + rec5).then(() => {
                    sendButton("Play again?", [{ title: 'Yes', payload: 'Again' }, 'No']);
                })
            })
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