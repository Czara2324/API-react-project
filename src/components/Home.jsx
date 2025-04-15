import React, { useState, useEffect} from "react";
import { Link } from 'react-router';

function Home () {
    const [breeds, setBreeds] = useState([]);
        const [searchTerm, setSearchTerm] = useState('');
        const [favourites, setFavourites] = useState(() => {
            const savedFavourites = localStorage.getItem('favourites');
            return savedFavourites ? JSON.parse(savedFavourites) : [];
        });

    const searchBreed = () => {
        fetch(`https://dog.ceo/api/breeds/image/random`)
            .then(response => response.json())
            .then(data => {
                const breed = data.message.split('/')[4];
                setBreeds([breed]);
            })
            .catch(error => console.error('Error fetching breed:', error));
    };

    const toggleFavourite = (breed) => {
        const updatedFavourites = favourites.includes(breed.id)
            ? favourites.filter(fav => fav !== breed.id)
            : [...favourites, breed.id];
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    useEffect(()=> {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(response => response.json())
            .then(data => {
                const breed = data.message.split('/')[4];
                setBreeds([breed]);
            })
            .catch(error => console.error('Error fetching breeds:', error));
    });

    return (
        <div>
            <h1>Dog Breeds</h1>
            <input 
                type="text"
                placeholder="Search for a breed"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                />
            <button onClick={searchBreed}>Search Dog Breed</button>
            <ul>
                {breeds.map(breed => (
                    <li key={breed.id}>
                        <Link to={`/breed/${breed.id}`}>
                            {breed.name}
                        </Link>
                        <button onClick={() => toggleFavourite(breed)}>
                            {favourites.includes(breed.id) ? 'Unfavourite' : 'Favourite'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home;