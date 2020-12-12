const axios = require('axios');

const getClima = async(lat, lng) => {	
	
	let resp = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${ lat }&lon=${ lng }&units=metric&cnt=3&appid=f369635965b00ad16ced5da4da4b9f3b`);
    return resp.data.list;
}

module.exports = {
	getClima
}