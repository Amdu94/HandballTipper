import { Link} from "react-router-dom";
import "./MatchesTable.css";

const MatchesTable =({ matches }) => (
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
                    <td>{match.date}</td>
                    <td>{match.homeScore}</td>
                    <td>{match.awayScore}</td>
                    <td></td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default MatchesTable;
