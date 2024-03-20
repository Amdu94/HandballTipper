import "./NextMatchesTable.css";

const formatDate = (dateString) => {
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return new Date(dateString).toLocaleString("hu-HU", options);
};

const NextMatchesTable = ({ matches }) => (
    <div className="MatchesTable">
        <table>
            <thead>
            <tr>
                <th>Home</th>
                <th>Away</th>
                <th>Date</th>
                <th>Home Score</th>
                <th>Away Score</th>
                <th />
            </tr>
            </thead>
            <tbody>
            {matches.map((match) => (
                <tr key={match._id}>
                    <td>{match.home}</td>
                    <td>{match.away}</td>
                    <td>{formatDate(match.date)}</td>
                    <td>{match.homeScore}</td>
                    <td>{match.awayScore}</td>
                    <td></td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default NextMatchesTable;
