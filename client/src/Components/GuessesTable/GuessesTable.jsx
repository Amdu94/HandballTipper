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
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {guesses.map((guess, index) => (
                    <tr key={index}>
                        <td>{getMatchById(guess.match)?.home} vs {getMatchById(guess.match)?.away}</td>
                        <td>
                            <input
                                type="number"
                                value={guess.home || ''}
                                onChange={(e) => onGuessChange(index, 'home', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={guess.away || ''}
                                onChange={(e) => onGuessChange(index, 'away', e.target.value)}
                            />
                        </td>
                        <td>
                            <button onClick={() => onSaveGuess(guess._id)}>
                                {guess.home !== null && guess.away !== null ? 'Update' : 'Save'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GuessesTable;


