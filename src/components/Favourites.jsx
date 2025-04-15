import React, { useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router';

function Favourites() {
    const [favourites, setFavourites] = useState([]);
    const [images, setImages] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('favourites')) || [];
        setFavourites(saved);

        Promise.all(saved.map(breed =>
            fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
              .then(res => res.json())
              .then(data => ({ breed, image: data.message }))
          )).then(results => {
            const imgMap = {};
            results.forEach(({ breed, image }) => {
              imgMap[breed] = image;
            });
            setImages(imgMap);
          });
        }, []);

        const removeFavourite = (breed) => {
            const updated = favourites.filter(fav => fav !== breed);
            setFavourites(updated);
            localStorage.setItem('favourites', JSON.stringify(updated));
        
            const updatedImages = { ...images };
            delete updatedImages[breed];
            setImages(updatedImages);
          };
        

    return (
    <div>
        <h1>Your Favourite Breeds</h1>
        <button onClick={() => navigate('/')}>← Back to Home</button>
        {favourites.length === 0 ? (
        <p>No favourites yet.</p>
        ) : (
        <ul>
            {favourites.map(breed => (
            <li key={breed}>
                <img src={images[breed]} alt={breed} width="150" />
                <p>{breed}</p>
                <Link to={`/breed/${breed}`}>Details</Link>
                <button onClick={() => removeFavourite(breed)}>Remove</button>
            </li>
            ))}
        </ul>
        )}
    </div>
    );
}

export default Favourites;