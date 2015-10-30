var async = require('async');
var faker = require('faker');
var request = require('request').defaults({ json: true });

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}


var words = new Array();

for(var i = 0; i < 20; i++){
    var adjective = faker.hacker.adjective();

    if(isInArray(adjective, words)) {
    }else{
        words.push(adjective)
    }
    var verb = faker.hacker.verb();

    if(isInArray(verb, words)) {
    }else{
        words.push(verb)
    }
    var noun = faker.hacker.noun();

    if(isInArray(noun, words)) {
    }else{
        words.push(noun)
    }
    var ingverb = faker.hacker.ingverb();

    if(isInArray(ingverb, words)) {
    }else{
        words.push(ingverb)
    }
    var color = faker.commerce.color();

    if(isInArray(color, words)) {
    }else{
        words.push(color)
    }
    var country = faker.address.country();

    if(isInArray(country, words)) {
    }else{
        words.push(country)
    }
}

function sendData(words){
    for(i in words){
        // console.log(words[i]);
        request({
            url: "http://localhost:3000/keyword/save/", //URL to hit
            json: {
                keyword: words[i]
            },
            method: "GET"
        }, function(err, response, body){

            if(err) {
                var error = {
                    data: err
                };
                console.log(err);
            } else {
                console.log(body);
            }
        });
    }
}


async.waterfall([
    function(cb){
        request({
            url: "http://localhost:3000/instances/count_availability/", //URL to hit
            json: {
                keywordCount: words.length
            },
            method: "GET"
        }, function(err, response, body){

            if(err) {
                var error = {
                    data: err
                };
                cb(err,null);
            } else {
                var availabilityTotal = body.data.total;
                var maxperTweet = body.data.maxperTweet;
                var instanceNum = Math.ceil(words.length / maxperTweet);
                cb(null,availabilityTotal,instanceNum);
            }
        });
    },
    function(count,instanceNum, cb){
        if(words.length < count){
            cb(true, words);
        }else{
            var counter = 0;
            var instances = []
            async.whilst(
                function () { return counter < instanceNum; },
                function (cback) {
                    request({
                        url: "http://localhost:3000/instances/create/", //URL to hit
                        method: "POST"
                    }, function(err, response, body){
                        if(err) {
                            var error = {
                                data: err
                            };

                            cback(error);
                        } else {
                            instances.push(body);
                            counter++;
                            cback();
                        }
                    });
                },
                function (err) {
                    if(err){
                        cb(err, null);
                    }

                    cb(null,instances);
                }
            );
        }
    },
    function(instances, cb) {
        /*async.map(instances, function(item, xcb){
            var newItem = item.ins_aws_instanceID;
            xcb(null,newItem);
        }, function(err, results){
            var count = 0;
            console.log(results);
            async.whilst(
                function () { return count < 1; },
                function (callback) {
                    request({
                        url: "http://localhost:3000/instances/watch/", //URL to hit
                        json: {
                            instances: results
                        },
                        method: "POST"
                    }, function(err, response, body){
                        if(err){
                            callback(err);
                        }
                        console.log('test123/; ',body);
                        count++;
                        callback();
                    });
                },
                function (err) {
                    if(err){
                        cb(err);
                    }else{
                        cb();
                    }
                }
            );
        }); */

        cb(null,instances);
    }

],function(err){
    if(err){
        if(err === true) {
            sendData(words)
        }else{
            console.error("errrrR:::",err);
        }
    }else{
        sendData(words)
    }
});