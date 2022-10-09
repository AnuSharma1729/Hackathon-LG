const express = require("express");
const app = express();
const https = require("https");
const path = require("path");

var found = "error";
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
function findSong(ress){
    var data = new FormData();
    data.append('audioFile', fs.createReadStream("C:/Users/sharm/OneDrive/Desktop/Hackathon LG/uploads/Baby.wav"));
    var config = {
        method: 'post',
        url: 'https://codelikeada.lgads.tv/acr/lookup-file',
        headers: {
            auth: "229d028063a11904f846c91224abaa99113f3a15",
            ...data.getHeaders()
        },
        data : data
    };
    console.log("sbc")
    axios(config)
        .then(function (response) {
            if(response.data["lookup_status"] === 1){
                found = "Match found";
                console.log("Match found");
            }else{
                found = "No match found";
                console.log("No match found");
            }
            console.log(response.data);
            ress.send(response.data);
            ress.writeHead(200, { 'Connection': 'close' });
            ress.end("That's all folks!");
        })
        .catch(function (error) {
            ress.end("That's all error!");
            console.log(error);
        });
}


    
    
app.get("/", function(req, res){
        https.get()
        console.log(req);
        res.send("200 OK ");
    
})
var Busboy = require('busboy');

app.post('/upload/audio', function (req, res) {
    console.log("file found");
    var busboy = Busboy({ headers: req.headers });
    busboy.on('file', async function(fieldname, file, filename, encoding, mimetype) {
        console.log(JSON.stringify(filename));
      var saveTo = path.join(__dirname, 'uploads/' + filename.filename);
      console.log(saveTo);
      file.pipe(fs.createWriteStream(saveTo));
    //   await new Promise((resolve) => setTimeout(() => resolve(), 3000));
    //   console.log(saveTo);
    //   findSong(saveTo,res);

    //   file.close();
    });
 
    busboy.on('finish', function() {
        
        findSong(res);
        


    //   res.writeHead(200, { 'Connection': 'close' });
    //   res.end("That's all folks!");

    });
     return req.pipe(busboy);    
     
});

// app.post("/uplad/audio", function(req, res){
//     console.log(req);
//     console.log("getting audio");
//     // res.send("200 OK ");
//     var file;
//     if(!req.files)
//     {
//         res.send("File was not found");
//         return;
//     }
//     file = req.files.FormFieldName;  // here is the field name of the form

//     res.send("File Uploaded");

// })

app.listen(3000, function(req,res){
    
    console.log("Server is running on port 3000.");

})
