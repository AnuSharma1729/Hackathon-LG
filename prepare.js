var axios = require('axios');
var fs = require('fs');
var FormData = require('form-data')

const authKey = '229d028063a11904f846c91224abaa99113f3a15'
var config = {
    method: 'post',
    url: 'https://codelikeada.lgads.tv/acr/init-db',
    headers: {
        auth: authKey
    }
}
axios(config)
	.then(function (response) {
		console.log(JSON.stringify(response.data));
	})
	.catch(function (error) {
		console.log(error);
	});

function addSong(filepath,cid,name,artist,genre){
    var data = new FormData();
    data.append('audioFile', fs.createReadStream(filepath));
    data.append('metadata', `{"content_id": ${cid}, "content_type": "song", "name": ${name}, "artist": ${artist}, "genre": ${genre}}`);
    var head1 = data.getHeaders();
    var head2 = {
        auth: authKey
    }
    var head3 = Object.assign({},head1,head2)
    var config1 = {
        method: 'post',
        url: 'https://codelikeada.lgads.tv/acr/add-file',
        headers: head3,
        data : data
    };
    console.log(config1.headers);
    axios(config1)
    .then(function (response) {
	    console.log(response.data);
    })
    .catch(function (error) {
	    console.log(error);
    });
}

const ReadLines = require('n-readlines');
const readLines = new ReadLines('./data/src.txt');

for (let i = 0; i < 5; i++) {
    let line;
    line = readLines.next();
    line = line.toString('ascii');
    var cid1 = parseInt(line);
    line = readLines.next();
    line = line.toString('ascii');
    var name1 = line;
    line = readLines.next();
    line = line.toString('ascii');
    var artist1 = line;
    line = readLines.next();
    line = line.toString('ascii');
    var genre1 = line;
    addSong(`./data/${cid1}.wav`,cid1,name1,artist1,genre1);
}
