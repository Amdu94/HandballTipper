import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import NextMatchesTable from "../Components/NextMatchesTable";

const fetchMatches = () => {
    return fetch("/api/nextMatches").then((res) => res.json());
};

const NextMatchesList = () => {
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

    return <NextMatchesTable matches={matches} />;
};

export default NextMatchesList;
