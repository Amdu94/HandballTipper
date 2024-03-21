// GuessesTable.js
import "./GuessesTable.css";

const GuessesTable = ({ guesses, matches }) => {
    const getMatchById = (matchId) => {
        return matches.find((match) => match._id === matchId);
    };

    return (
        <div className="GuessesTable">
            <table>
                <thead>
                <tr>
                    <th>Match</th>
                    <th>Home Score</th>
                    <th>Away Score</th>
                </tr>
                </thead>
                <tbody>
                {guesses.map((guess, index) => (
                    <tr key={index}>
                        <td>{getMatchById(guess.match)?.home} vs {getMatchById(guess.match)?.away}</td>
                        <td>{guess.home}</td>
                        <td>{guess.away}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GuessesTable;

