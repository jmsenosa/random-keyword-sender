var faker = require('faker');
var request = require('request').defaults({ json: true });


function isInArray(value, array) {
    return array.indexOf(value) > -1;
}


var words = new Array();

for(var i = 0; i < 500; i++){
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

var keywordJSON = [];
for(i in words){
    // console.log(words[i]);
    var json = {
        name: words[i]
    };

    keywordJSON.push(json);
}

request({
    url: "http://localhost:3000/keyword/save_json/", //URL to hit
    json: {
        keyword: keywordJSON
    },
    method: "POST"
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