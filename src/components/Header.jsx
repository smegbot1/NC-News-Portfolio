import React from 'react';
import { Link } from '@reach/router';

const Header = ({ username }) => {
    return (
        <header>
            <p>(User): {username}</p>
            <Link to='/'>
                <img id='header-logo' src="https://blog.northcoders.com/hubfs/Northcoders%20July2017%20Theme/learn_to_code_manchester_original_second.png" alt='NC-News'/>
            </Link>
        </header>
    );
};

export default Header;