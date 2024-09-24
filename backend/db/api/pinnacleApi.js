import axios from 'axios';

const fetchMatches = async () => {
const options = {
  method: 'GET',
  url: 'https://api-handball.p.rapidapi.com/games',
  params: {
    league: '131',
    season: '2024'
  },
  headers: {
    'x-rapidapi-key': '7611778bc8msh18078fe1032908dp13d104jsn2d2f4f9e2868',
    'x-rapidapi-host': 'api-handball.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	return response.data.response;
} catch (error) {
	console.error(error);
}
};

export default fetchMatches; // Exportáljuk az aszinkron függvényt