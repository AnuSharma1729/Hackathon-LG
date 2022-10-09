var axios = require('axios')

function getHits(str){
	const res = await axios.get('https://codelikeada.lgads.tv/epg/programs?',{params:{programTitle:'${str}',limit: 5}});
	return res.data.args;
}
