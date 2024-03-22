import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import AllMatchesTable from "../Components/AllMatchesTable";

const fetchMatches = () => {
    return fetch("/api/matches").then((res) => res.json());
};

const AllMatchesList = () => {
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

    return <AllMatchesTable matches={matches} />;
};

export default AllMatchesList;
