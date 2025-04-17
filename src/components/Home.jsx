import React, { useState, useEffect} from "react";
import { Link } from 'react-router';

function Home () {
    const [allBreeds, setAllBreeds] = useState([]);//stores the list of dog breeds you get from the API
    const [searchTerm, setSearchTerm] = useState('');//stores the search term entered by the user
    const [favourites, setFavourites] = useState(() => { //stores a list of favourited breeds, pulled from localStorage so the user's picks are remembered
        const savedFavourites = localStorage.getItem('favourites');
        return savedFavourites ? JSON.parse(savedFavourites) : [];
    });

    //When the component mounts, this runs once (because of the empty []).
    //It fetches all dog breeds from the API and converts the object into an array of breed names using Object.keys.
    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/list/all")
          .then(res => res.json())
          .then(data => {
            const breedsArray = Object.keys(data.message);
            setAllBreeds(breedsArray);
          })
          .catch(err => console.error("Error fetching breeds:", err));
      }, []);


    //This function toggles the favourite status of a breed. If the breed is already in the favourites list, it removes it; otherwise, it adds it.
    //It also updates localStorage to keep the user's favourites persistent across sessions.
    const toggleFavourite = (breed) => {
    const updated = favourites.includes(breed)
        ? favourites.filter(fav => fav !== breed)
        : [...favourites, breed];
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
    };
    //This filters allBreeds to only show breeds that match the user’s search input, ignoring case.
    const filteredBreeds = allBreeds.filter(b =>
        b.toLowerCase().includes(searchTerm.toLowerCase())
      );

    //This renders the component. It includes a search input, below a list of dog breeds, and buttons to favourite/unfavourite each breed.
    //For each breed, it shows an image, the breed name,a link to a details page, and a button to toggle its favourite status.
      return (
        <div>
          <h1>Dog Breeds</h1>
          <input
            type="text"
            placeholder="Search breed..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
    
          <ul>
            {filteredBreeds.map((breed) => (
              <li key={breed}>
                <img
                  src={`https://dog.ceo/api/breed/${breed}/images/random`}
                  alt={breed}
                  width="150"
                  onError={(e) => e.target.style.display = 'none'}
                />
                <p>{breed}</p>
                <Link to={`/breed/${breed}`}>Details</Link>
                <button onClick={() => toggleFavourite(breed)}>
                  {favourites.includes(breed) ? 'Unfavourite' : 'Favourite'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    }

export default Home;