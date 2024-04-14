import React, { useEffect, useState } from 'react';
import Loading from '../Components/Loading/Loading.jsx';
import MatchesTable from '../Components/MatchesTable/MatchesTable.jsx';

const fetchMatches = () => {
    return fetch('/api/matches').then((res) => res.json());
};

const MatchesList = () => {
    const [loading, setLoading] = useState(true);
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMatches()
            .then((fetchedMatches) => {
                setMatches(fetchedMatches);
                setLoading(false);
            })
            .catch((fetchError) => {
                setError(fetchError);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (!matches || matches.length === 0) {
        return <div>No matches available</div>;
    }

    if (error) {
        return <div>Error fetching matches: {error.message}</div>;
    }

    return <MatchesTable matches={matches} />;
};

export default MatchesList;



