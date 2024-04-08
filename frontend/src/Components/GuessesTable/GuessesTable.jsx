import React from 'react';

import "./GuessesTable.css"

const GuessesTable = ({ guesses, onGuessChange, onSaveGuess, getMatchById, isPastMatch }) => {


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
                        <td>{getMatchById(guess.match)?.home} vs {getMatchById(guess.match)?.away}</td>
                        <td>
                            <input
                                type="number"
                                value={guess.homeScore || ''}
                                onChange={(e) => onGuessChange(index, 'homeScore', e.target.value)}
                                disabled={isPastMatch(guess.match)}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={guess.awayScore || ''}
                                onChange={(e) => onGuessChange(index, 'awayScore', e.target.value)}
                                disabled={isPastMatch(guess.match)}
                            />
                        </td>
                        <td>
                            {guess.points}
                        </td>
                        <td>
                            {isPastMatch(guess.match) ?
                                'The guess is not allowed' :
                            <button onClick={() => onSaveGuess(guess.match)} disabled={isPastMatch(guess.match)}>
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


