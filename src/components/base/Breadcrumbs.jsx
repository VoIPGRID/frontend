import React from 'react';
import { Route, Link } from 'react-router-dom';

import '../../assets/style/Breadcrumbs.css';

const Breadcrumbs = () => (
    <Route
        path="*"
        render = {props => {
            let parts = props.location.pathname.split("/");
            const place = parts[parts.length-1];
            parts = parts.slice(1, parts.length-1);
            return (<ul className="breadcrumbs">{parts.map(crumb)} <li>{capitalizeFirstLetter(place)}</li></ul>)
        }}
    />
)


const crumb = (part, partIndex, parts) => {
    const path = ['', ...parts.slice(0, partIndex+1)].join("/");
    return <li key={path}><Link key={path} to={path}>{capitalizeFirstLetter(part)}</Link></li>
}

// Capitalize first letter of our breadcrumbs.
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).replace(/_/g, ' ');
}

export default Breadcrumbs;
