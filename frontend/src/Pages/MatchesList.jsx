import React, { useEffect, useState } from 'react';
import Loading from '../Components/Loading/Loading.jsx';
import MatchesTable from '../Components/MatchesTable/MatchesTable.jsx';

const fetchMatches = () => {
    return fetch('/api/matches')
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .catch((error) => {
            console.error('Error fetching matches:', error);
            throw error;
        });
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

