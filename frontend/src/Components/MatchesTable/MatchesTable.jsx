// MatchesTable.js

import React from 'react';
import { Link } from 'react-router-dom';

import "./MatchesTable.css"

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

const MatchesTable = ({ matches }) => (
    <div className="MatchesTable">
        <table>
            <thead>
            <tr>
                <th>Home</th>
                <th>Away</th>
                <th>Date</th>
                <th>Home Score</th>
                <th>Away Score</th>
                <th>View Guesses</th>
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
                    <td>
                        <Link to={`/matches/${match._id}/guesses`}>
                            View Guesses
                        </Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default MatchesTable;
