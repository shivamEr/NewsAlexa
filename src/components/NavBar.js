import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">{this.props.title}</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active mx-2">
                                <Link className="nav-link">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link">News </Link>
                            </li>
                            <li className="nav-item dropdown mx-2">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Category
                                </a>
                                <div className="dropdown-menu">
                                    <Link to='/business' className="dropdown-item">Business</Link>
                                    <Link to='/entertainment' className="dropdown-item">Entertainment</Link>
                                    <Link to='general' className="dropdown-item">General</Link>
                                    <Link to='health' className="dropdown-item">Health</Link>
                                    <Link to='science' className="dropdown-item">Science</Link>
                                    <Link to='sport' className="dropdown-item">Sports</Link>
                                    <Link to='technology' className="dropdown-item">Technology</Link>
                                </div>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link">About</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link">Contact</Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        );
    }
}
