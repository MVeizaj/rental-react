import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import HomeApp from "./Home/HomeApp";
import AboutApp from "./About/AboutApp";
import SearchApp from "./Search/Search";
import PropertyApp from "./Properties/PropertyApp";
import UserApp from "./User/UserApp";
import ContactsApp from "./Contacts/ContactsApp";
import ZonesApp from "./Zones/ZonesApp";
import TypesApp from "./Types/TypesApp";
import Agent from "./User/Agent";
import Property from "./Properties/Property";
import LoginApp from "./Authentication/LoginApp";
import MediaApp from "./Media/MediaApp";
import UserProfile from "./User/UserProfile";
import LogoutApp from "./Authentication/LogoutApp";

function Header() {
    return (
        <div>
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/search">Search</Link>
                        </li>
                    </ul>
                    <Link to="/login">Login</Link>
                    <Link to="/properties">Property</Link>
                    <Link to="/users">User</Link>
                    <Link to="/contacts">Contacts</Link>
                    <Link to="/zones">Zones</Link>
                    <Link to="/types">Types</Link>
                    <Link to="/logout">Logout</Link>
                    <hr/>
                    <Route exact path="/" component={HomeApp}/>
                    <Route path="/about" component={AboutApp}/>
                    <Route path="/search" component={SearchApp}/>
                </div>
                <Route path="/login" component={LoginApp}/>
                <Route path="/properties" component={PropertyApp}/>
                <Route path="/users" component={UserApp}/>
                <Route path="/contacts" component={ContactsApp}/>
                <Route path="/zones" component={ZonesApp}/>
                <Route path="/types" component={TypesApp}/>
                <Route path="/agent/:id" component={Agent}/>
                <Route path="/property/:id" component={Property}/>
                <Route path="/media/property/:id" component={MediaApp}/>
                <Route path="/user/:id" component={UserProfile}/>
                <Route path="/logout" component={LogoutApp}/>
            </Router>
        </div>
    )
}

export default Header;