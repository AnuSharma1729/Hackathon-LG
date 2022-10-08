const express = require("express");
const app = express();
const https = require("https");

// app.get("/", function(req, res){

//     https.get()
//     res.send("Server is running on port 3000");
// })

var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('audioFile', fs.createReadStream('C:/Users/sharm/Downloads/acetest.wav'));
var config = {
    method: 'post',
    url: 'https://codelikeada.lgads.tv/acr/lookup-file',
    headers: {
	    auth: "229d028063a11904f846c91224abaa99113f3a15",
	    ...data.getHeaders()
    },
    data : data
};
axios(config)
    .then(function (response) {
        if(response.data["lookup_status"] === 1){
            console.log("Match found");
        }else{
            console.log("No match found");
        }
	    console.log(response.data);
    })
    .catch(function (error) {
	    console.log(error);
    });






// app.listen(3000, function(){
//     console.log("Server is running on port 3000.");

// })
