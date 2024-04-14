import React from 'react';
import "./GuessesTable.css"

const GuessesTable = ({ guesses, onGuessChange, onSaveGuess }) => {
    return (
        <div className="GuessesTable">
            <table>
                <thead>
                <tr>
                    <th>Match</th>
                    <th>Home Score</th>
                    <th>Away Score</th>
                    <th>Points</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {guesses.map((guess, index) => (
                    <tr key={index}>
                        <td>{guess.matchDetails?.home} vs {guess.matchDetails?.away}</td>
                        <td>
                            <input
                                type="number"
                                value={guess.homeScore || ''}
                                onChange={(e) => onGuessChange(index, 'homeScore', e.target.value)}
                                disabled={guess.pastMatch}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={guess.awayScore || ''}
                                onChange={(e) => onGuessChange(index, 'awayScore', e.target.value)}
                                disabled={guess.pastMatch}
                            />
                        </td>
                        <td>
                            {guess.points}
                        </td>
                        <td>
                            {guess.pastMatch ?
                                'The guess is not allowed' :
                                <button onClick={() => onSaveGuess(guess.match)} disabled={guess.pastMatch}>
                                    Save
                                </button>}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GuessesTable;




