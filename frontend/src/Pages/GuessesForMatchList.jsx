// GuessesForMatchList.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Components/Loading';
import GuessesForMatchTable from '../Components/GuessesForMatchTable/GuessesForMatchTable.jsx';
import ErrorPage from "./ErrorPage.jsx";

const fetchGuessesForMatch = (matchId) => {
    return fetch(`/api/matches/${matchId}/guesses`).then((res) => res.json());
};

const GuessesForMatchList = () => {
    const { matchId } = useParams();
    const [loading, setLoading] = useState(true);
    const [guesses, setGuesses] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGuessesForMatch(matchId)
            .then((guesses) => {
                setLoading(false);
                setGuesses(guesses);
            })
            .catch((error) => {
                console.error('Error fetching guesses for match:', error);
                setError('Error fetching guesses for match');
            });
    }, [matchId]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorPage />;
    }


    return <GuessesForMatchTable guesses={guesses} />;
};

export default GuessesForMatchList;
