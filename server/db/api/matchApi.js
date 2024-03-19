const fetchData = async () => {
    const url = 'https://api-handball.p.rapidapi.com/games?league=177&season=2024';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7611778bc8msh18078fe1032908dp13d104jsn2d2f4f9e2868',
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

module.exports = fetchData;
