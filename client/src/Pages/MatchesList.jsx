// MatchesList.js

import React, { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import MatchesTable from '../Components/MatchesTable';

const fetchMatches = () => {
    return fetch('/api/matches').then((res) => res.json());
};

const MatchesList = () => {
    const [loading, setLoading] = useState(true);
    const [matches, setMatches] = useState(null);

    useEffect(() => {
        fetchMatches()
            .then((matches) => {
                setLoading(false);
                setMatches(matches);
            })
    }, []);

    if (loading) {
        return <Loading />
    }

    return <MatchesTable matches={matches} />;
};

export default MatchesList;

