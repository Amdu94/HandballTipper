import React from 'react';

const GuessesTable = ({ guesses, matches, onGuessChange, onSaveGuess }) => {
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
                    <th>Save</th>
                </tr>
                </thead>
                <tbody>
                {guesses.map((guess, index) => (
                    <tr key={index}>
                        <td>{getMatchById(guess.match)?.home} vs {getMatchById(guess.match)?.away}</td>
                        <td>
                            <input
                                type="number"
                                value={guess.home || ''} // Ha guess.home null, akkor üres string lesz
                                onChange={(e) => onGuessChange(index, 'home', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={guess.away || ''} // Ha guess.away null, akkor üres string lesz
                                onChange={(e) => onGuessChange(index, 'away', e.target.value)}
                            />
                        </td>
                        <td>
                            <button onClick={() => onSaveGuess(guess._id)}>Save</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GuessesTable;

