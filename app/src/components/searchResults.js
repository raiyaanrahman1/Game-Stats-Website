import React from 'react';
import { withRouter } from 'react-router';

const SearchResults = (props) => {

    let searchTerms = [];

    for(let game of props.matchedTerms){
        searchTerms.push(<li> {"Game " + game.id} </li>)
    }
    
    return (
        <div className="page-content">
            <h1> Search Results: </h1>
            <ul> {searchTerms} </ul>
        </div>
    );
};

export default withRouter(SearchResults);