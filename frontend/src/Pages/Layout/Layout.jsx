// Layout.js
import React from "react";
import { Outlet, Link } from "react-router-dom";

import "./Layout.css"

const Layout = () => (
    <div className="Layout">
        <nav>
            <ul>
                <li className="grow">
                    <Link to="/">Home</Link>
                </li>
                <li className="grow">
                    <Link to="/matches">Matches</Link>
                </li>
                <li className="grow">
                    <Link to="/users">Users</Link>
                </li>
                <li className="grow">
                    <Link to="/newUser">Create User</Link>
                </li>
            </ul>
        </nav>
        <Outlet />
    </div>
);

export default Layout;


