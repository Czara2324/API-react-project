import React, { useState, useEffect} from "react";
import { Link } from 'react-router';

function Home () {
    const [allBreeds, setAllBreeds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [favourites, setFavourites] = useState(() => {
        const savedFavourites = localStorage.getItem('favourites');
        return savedFavourites ? JSON.parse(savedFavourites) : [];
    });

    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/list/all")
          .then(res => res.json())
          .then(data => {
            const breedsArray = Object.keys(data.message);
            setAllBreeds(breedsArray);
          })
          .catch(err => console.error("Error fetching breeds:", err));
      }, []);

    const toggleFavourite = (breed) => {
    const updated = favourites.includes(breed)
        ? favourites.filter(fav => fav !== breed)
        : [...favourites, breed];
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
    };

    const filteredBreeds = allBreeds.filter(b =>
        b.toLowerCase().includes(searchTerm.toLowerCase())
      );

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