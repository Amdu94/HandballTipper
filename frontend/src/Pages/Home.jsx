import React from 'react';

const Home = () => {

    const username = localStorage.getItem('username');

    return (
        <div className="Home">
            <h1>Welcome to your handball prediction app!</h1>
            {username && <h2>Hello, {username}!</h2>} {/* Ha van felhasználónév, megjelenítjük */}
            <p>This app allows you to create a user account, view upcoming matches, and submit your predictions for their scores. You can also track your past predictions and see how well you're doing.</p>
        </div>
    );
};

export default Home;
