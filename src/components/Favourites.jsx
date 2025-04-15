import React, { useState, useEffect} from "react";
import { Link } from 'react-router';

function Favourites () {
    const [favourites, setFavourites] = useState(() => {
        const savedFavourites = localStorage.getItem('favourites');
        return savedFavourites ? JSON.parse(savedFavourites) : [];
    });
    const [breeds, setBreeds] = useState([]);

    useEffect(() => {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(response => response.json())
            .then(data => setBreeds(data))
            .catch(error => console.error('Error fetching breeds:', error));
    }, []);

    const favouriteBreeds = breeds.filter(breed => favourites.includes(breed.id));

    const removeFavourite = (breed) => {
        const updatedFavourites = favourites.filter(favId => favId !== breed.id);
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    if (favourites.length === 0) {
        return (
        <div>
            <h1>No favourite breeds found.</h1>;
            <Link to="/">Go back to Home</Link>
        </div>
        );
    }

    return (
        <div>
            <h1>My Favourite Dog Breeds</h1>
            <ul>
                {favouriteBreeds.map(breed => (
                    <li key={breed.id}>
                        <Link to={`/breed/${breed.id}`}>
                            {breed.name}
                        </Link>
                        <button onClick={() => removeFavourite(breed.id)}>
                            Remove from Favourites
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Favourites;