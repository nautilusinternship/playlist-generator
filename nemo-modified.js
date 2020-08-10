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
            baseURL: 'https://playlist-generatr.herokuapp.com', //knn.py takes the genre and returns two songs
            url: '/',
            'Content-Type': 'application/json',
            data: {
                genre: genre,
                round: round
            }
        })
        // get the two songs from knn.py
        axios({
            method: 'get',
            baseURL: 'https://playlist-generatr.herokuapp.com',
            url: '/',
            'Content-Type': 'application/json',
        })
            .then((result) => {
                // get the returned data here, a new pair of song URLs
                var link1 = result.data.split(':'[0]);
                var link2 = result.data.split(':')[1];

                //var link1 = "https://open.spotify.com/track/2Mee0OQcf0X2059JwUd4Vj?si=kbv7WojqRGOGjL_7UyPGbQ";
                //var link2 = "https://open.spotify.com/track/4qPsuCJ6GunSYBS7V0MYNR?si=WrfpSVYmTRK9NjjVYDMOoA";
                //var test_alex_link = "https://p.scdn.co/mp3-preview/8766887d3e1b11ee435bd9008d0b6610d28b1eef?cid=162b7dc01f3a4a2ca32ed3cec83d1e02";

                // display song previews; user selects preference
                say("Please select one of the following options.").then(() => {
                    say(link1).then(() => {
                        say(test_alex_link).then(() => {
                            // rounds += 1;
                            round++;
                            var str = "Round " + round + ": I like..."
                            sendButton(str, [{
                                title: 'Track 1 better',
                                payload: link1 + ":" + round
                            }, { title: 'Track 2 better', payload: link2 + ":" + round }])
                        })
                    })
                })
            }
            //knn.py takes the preferred of the two songs and returns two new songs
            axios({
                method: 'post',
                baseURL: 'https://playlist-generatr.herokuapp.com',
                url: '/',
                'Content-Type': 'application/json',
                data: {
                    text: payload
                }
            })

    }


    // if not first round (selecting links). 
    if (payload_type == 'https' && round < 5) {
        // get the next two songs
        axios({
            method: 'get',
            baseURL: 'https://playlist-generatr.herokuapp.com',
            url: '/',
            'Content-Type': 'application/json',
        })
            .then((result) => {
                // get the returned data here, a new pair of song URLs.
                // again, replace var assignment with links fetched from backend
                var link3 = result.data.split(':'[0]);
                var link4 = result.data.split(':')[1];
                //var link3 = "https://open.spotify.com/track/7qwt4xUIqQWCu1DJf96g2k?si=bLoEG9E_SUWxq-RAoE5edg";
                //var link4 = "https://open.spotify.com/track/0qPeakaeFndczx9OhJIFp6?si=fTLvG9OWS6uLPPH8TBu8kQ";
                say("Please select one of the following options.").then(() => {
                    say(link3).then(() => {
                        say(link4).then(() => {
                            round++;
                            var str = "Round " + round + ": I like..."
                            sendButton(str, [{
                                title: 'Track 1 better',
                                payload: link3 + ":" + round
                            }, { title: 'Track 2 better', payload: link4 + ":" + round }])
                        })
                    })
                })
                // return preferred song to knn.py via app.js
                axios({
                    method: 'post',
                    baseURL: 'https://playlist-generatr.herokuapp.com',
                    url: '/',
                    'Content-Type': 'application/json',
                    data: {
                        /* return song link as payload so the URI, and subsequently song
                         parameters, can be fetched from db to update user's personal
                         "taste vector" */
                        text: payload
                    }
                })
            }
    }
    else {
        // get the last two song recs based on the choice from round 4, which was posted to app.js in previous if statement
        axios({
            method: 'get',
            baseURL: 'https://playlist-generatr.herokuapp.com',
            url: '/',
            'Content-Type': 'application/json',
        })
            .then((result) => {
                // get the returned data here, a new pair of song URLs.
                // again, replace var assignment with links fetched from backend
                var link3 = result.data.split(':'[0]);
                var link4 = result.data.split(':')[1];

                //var link3 = "https://open.spotify.com/track/7qwt4xUIqQWCu1DJf96g2k?si=bLoEG9E_SUWxq-RAoE5edg";
                //var link4 = "https://open.spotify.com/track/0qPeakaeFndczx9OhJIFp6?si=fTLvG9OWS6uLPPH8TBu8kQ";

                say("Please select one of the following options.").then(() => {
                    say(link3).then(() => {
                        say(link4).then(() => {
                            sendButton("I like...", [{
                                title: 'Track 1 better',
                                payload: link3 + ":" + round
                            }, { title: 'Track 2 better', payload: link4 + ":" + round }])
                        })
                    })
                })
            })
            .catch((err) => { })
        // post preference from 5th round to app.js
        axios({
            method: 'post',
            baseURL: 'https://playlist-generatr.herokuapp.com',
            url: '/',
            'Content-Type': 'application/json',
            data: {
                text: payload
            }
        })

        // sendButton("Try again?",[{title: 'Yes', payload: 'TryAgain'},'No']);
    }


    /* after picking preferences, 5 times, return results of kNN on user's 
       "taste vector" (5 recommended songs?) */
    if (round > 4) {
        // returns 5 song recs
        axios({
            method: 'get',
            baseURL: 'https://playlist-generatr.herokuapp.com',
            url: '/',
            'Content-Type': 'application/json',
        })
        .then((result) => {
            // get the returned data here, a new pair of song URLs.
            // again, replace var assignment with links fetched from backend
            var rec1 = result.data.split(':'[0]);
            var rec2 = result.data.split(':')[1];
            var rec3 = result.data.split(':'[2]);
            var rec4 = result.data.split(':')[3];
            var rec5 = result.data.split(':'[4]);
            say("Here is your recommended mini-playlist!").then(() => {
                var rec1 = "song 1";
                var rec2 = "song 2";
                var rec3 = "song 3";
                var rec4 = "song 4";
                var rec5 = "song 5";
                say(rec1 + "\n" + rec2 + "\n" + rec3 + "\n" + rec4 + "\n" + rec5).then(() => {
                    sendButton("Play again?", [{ title: 'Yes', payload: 'Again' }, 'No']);                    })
                })
            }
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
