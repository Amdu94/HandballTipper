// GuessesList.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import GuessesTable from "../Components/GuessesTable/GuessesTable.jsx";

const GuessesList = () => {
    const [loading, setLoading] = useState(true);
    const [guesses, setGuesses] = useState([]);
    const [matches, setMatches] = useState([]);
    const { userId } = useParams();
    const currentDate = new Date();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const guessesResponse = await fetch(`/api/users/${userId}/guesses`);
                const matchesResponse = await fetch("/api/matches");

                const userGuesses = await guessesResponse.json();
                const matchesData = await matchesResponse.json();

                setGuesses(userGuesses);
                setMatches(matchesData);
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, [userId]);

    const getMatchById = (matchId) => {
        return matches.find((match) => match.id === matchId);
    };

    const isPastMatch = (matchId) => {
        const match = getMatchById(matchId);
        return new Date(match.date) < currentDate;
    };


    const handleGuessChange = (index, field, value) => {
        const updatedGuesses = [...guesses];
        updatedGuesses[index][field] = Number(value);
        setGuesses(updatedGuesses);
    };

    const saveUserGuesses = async (guessId) => {
        try {
            const guessToSave = {
                home: guesses.find(guess => guess.match === guessId).home,
                away: guesses.find(guess => guess.match === guessId).away,
            };

            await fetch(`/api/users/${userId}/guesses/${guessId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(guessToSave),
            });
            console.log('Guess saved successfully');
        } catch (error) {
            console.error('Error saving guess:', error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <GuessesTable
                guesses={guesses}
                matches={matches}
                onGuessChange={handleGuessChange}
                onSaveGuess={saveUserGuesses}
                getMatchById={getMatchById}
                currentDate={currentDate}
                isPastMatch={isPastMatch}// Pass current date as prop
            />
        </>
    );
};

export default GuessesList;
