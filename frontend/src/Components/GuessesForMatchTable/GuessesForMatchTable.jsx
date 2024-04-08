// GuessesForMatchTable.js

import React from 'react';

import "./GuessesForMatchTable.css"

const GuessesForMatchTable = ({ guesses }) => (
    <div className="GuessesForMatchTable">
        <table>
            <thead>
            <tr>
                <th>User</th>
                <th>Home Score</th>
                <th>Away Score</th>
                <th>Points</th>
            </tr>
            </thead>
            <tbody>
            {guesses.map((guess) => (
                <tr key={guess.id}>
                    <td>{guess.user}</td>
                    <td>{guess.homeScore}</td>
                    <td>{guess.awayScore}</td>
                    <td>{guess.points}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default GuessesForMatchTable;
