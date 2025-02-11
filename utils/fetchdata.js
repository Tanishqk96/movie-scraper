const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/41881/comm',
  headers: {
    'x-rapidapi-key': '53c96ff072msh2ce28742151e066p1c027ajsnc658f4b96a97',
    'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}