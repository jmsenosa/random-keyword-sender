var async = require('async');
var request = require('request').defaults({ json: true });

function createIntance(){
    request({
        url: "http://localhost:3000/instances/create/", //URL to hit
        method: "POST"
    }, function(err, response, body){
        if(err) {
            var error = {
                data: err
            };

            console.log(error);
        } else {
            console.log(body);
        }
    });
}

function stopInstance(instances){
    request({
        url: "http://localhost:3000/instances/stop/", //URL to hit
        method: "POST",
        json:{
            instances: instances
        }
    }, function(err, response, body){
        if(err) {
            var error = {
                data: err
            };

            console.log(error);
        } else {
            console.log(body);
        }
    });
}

function terminateInstance(instances){
    request({
        url: "http://localhost:3000/instances/delete/", //URL to hit
        method: "POST",
        json:{
            instances: instances
        }
    }, function(err, response, body){
        if(err) {
            var error = {
                data: err
            };

            console.log(error);
        } else {
            console.log(body);
        }
    });
}

// terminateInstance(['i-f379f32c','i-7c78f2a3']);