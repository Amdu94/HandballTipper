import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import GuessesTable from "../Components/GuessesTable/GuessesTable.jsx";

const GuessesList = () => {
    const [loading, setLoading] = useState(true);
    const [guesses, setGuesses] = useState([]);
    //const [matches, setMatches] = useState([]);
    const { userId } = useParams();
    const currentDate = new Date();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const guessesResponse = await fetch(`/api/users/${userId}/guesses`);
                const matchesResponse = await fetch("/api/matches");

                const userGuesses = await guessesResponse.json();
                const matchesData = await matchesResponse.json();


                const enrichedGuesses = userGuesses.map(guess => {
                    const match = matchesData.find((m) => m.id === guess.match);
                    const pastMatch = new Date(match.date) < currentDate;
                    return { ...guess, matchDetails: match, pastMatch };
                });

                setGuesses(enrichedGuesses);
                //setMatches(matchesData);
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, [userId]);

    const handleGuessChange = (index, field, value) => {
        const updatedGuesses = [...guesses];
        updatedGuesses[index][field] = Number(value);
        setGuesses(updatedGuesses);
    };

    const saveUserGuesses = async (guessId) => {
        try {
            const guessToSave = {
                homeScore: guesses.find(guess => guess.match === guessId).homeScore,
                awayScore: guesses.find(guess => guess.match === guessId).awayScore,
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
                onGuessChange={handleGuessChange}
                onSaveGuess={saveUserGuesses}
            />
        </>
    );
};

export default GuessesList;

