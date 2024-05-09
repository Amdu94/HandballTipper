import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config();

const API_KEY = process.env.API_KEY;
const sofaSportApi = async(course, page) => {
    const baseUrl = 'https://sofasport.p.rapidapi.com/v1/seasons/events';

        const options = {
            method: 'GET',
            url: baseUrl,
            params: {
                seasons_id: '53411',
                unique_tournament_id: '14037',
                page: page,
                course_events: course
            },
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'sofasport.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error(error);

        }
}

export default sofaSportApi;
