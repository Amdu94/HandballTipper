import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import GuessesTable from "../Components/GuessesTable";

const GuessesList = () => {
    const [loading, setLoading] = useState(true);
    const [guesses, setGuesses] = useState([]);
    const [matches, setMatches] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const guessesResponse = await fetch(`/api/users/${userId}/guesses`);
                const matchesResponse = await fetch("/api/allMatches");

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

    if (loading) {
        return <Loading />;
    }

    return <GuessesTable guesses={guesses} matches={matches} />;
};

export default GuessesList;
