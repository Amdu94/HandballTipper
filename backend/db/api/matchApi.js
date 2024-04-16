import dotenv from 'dotenv'
dotenv.config();

const API_KEY = process.env.API_KEY;
const fetchData = async () => {
    const url = 'https://api-handball.p.rapidapi.com/games?league=50&season=2023';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'api-handball.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
};

export default fetchData
