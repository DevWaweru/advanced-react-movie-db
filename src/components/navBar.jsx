import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <Link className="navbar-brand" to="/">Movies DB</Link>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-item nav-link" to="/movies">Movies <span className="sr-only">(current)</span></NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav my-2">
                    {!user && 
                    <React.Fragment>
                    <li className="nav-item">
                        <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
                    </li>
                    </React.Fragment>
                    }
                    {user && 
                    <React.Fragment>
                    <li className="nav-item">
                        <NavLink className="nav-item nav-link" to="/profile">{user.name}</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-item nav-link " to="/logout">Log out</NavLink>
                    </li>
                    </React.Fragment>
                    }
                </ul>
            </div>
        </nav>
    );
}
 
export default NavBar;