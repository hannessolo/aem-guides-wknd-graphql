/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
//import {useGraphQLPersisted} from '../api/useGraphQL';
import {getAllAdventures, getAdventuresByActivity} from '../api/persistedQueries';
import Error from './Error';
import Loading from './Loading';
import './Adventures.scss';


function Adventures() {
    
    const [adventureActivity, setAdventureActivity] = useState('');
    const [response, setResponse] = useState();

    useEffect(() => {

        // set response to null while fetching the new data (prompts loading icon)
        setResponse();

        // if an activity is set (i.e "Camping", "Hiking"...)
        if(adventureActivity && adventureActivity !== '') {
            // run a filter query to get adventures based on the activity
            getAdventuresByActivity(adventureActivity)
                .then(response => setResponse(response));
        }
        else {
            // Otherwise get all the adventures data (unfiltered)
            getAllAdventures()
                .then(response => setResponse(response));
        }
      }, [adventureActivity])

    //If response is null then return a loading state...
    if(!response) return <Loading />;

    //If there is an error with the GraphQL query
    if(response && response.errors) return <Error errorMessage={response.errors} />;
    
    return (
        <div className="adventures">
          <button onClick={() => setAdventureActivity('')}>All</button>
          <button onClick={() => setAdventureActivity('Camping')}>Camping</button>
          <button onClick={() => setAdventureActivity('Cycling')}>Cycling</button>
          <button onClick={() => setAdventureActivity('Rock Climbing')}>Rock Climbing</button>
          <button onClick={() => setAdventureActivity('Skiing')}>Skiing</button>
          <button onClick={() => setAdventureActivity('Social')}>Social</button>
          <button onClick={() => setAdventureActivity('Surfing')}>Surfing</button>
          <ul className="adventure-items">
            {
                //Iterate over the returned data items from the query
                response.data.adventureList.items.map((adventure) => {
                    return (
                        <AdventureListItem key={adventure.slug} {...adventure} />
                    );
                })
            }
            </ul>
        </div>
    );
}

// Render individual Adventure item
function AdventureListItem({title, slug, primaryImage, tripLength, price}) {

  //Must have title, path, and image
  if(!title || !title || !primaryImage ) {
    return null;
  }
  return (
        <li className="adventure-item">
          <Link to={`/adventure:/${slug}`}>
            <img className="adventure-item-image" src={primaryImage._path} 
                 alt={title}/>
          </Link>
          <div className="adventure-item-length-price">
            <div className="adventure-item-length">{tripLength}</div>
            <div className="adventure-item-price">{price}</div>
          </div>
          <div className="adventure-item-title">{title}</div>
      </li>
      );
}


export default Adventures;
