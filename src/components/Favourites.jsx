import React, { useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router';

function Favourites() {
    const [favourites, setFavourites] = useState([]);//stores a list of favourited breeds, pulled from localStorage so the user's picks are remembered
    const [images, setImages] = useState({});//stores the images of the favourited breeds
    const navigate = useNavigate();

    //When the component mounts, this runs once (because of the empty []).
    //It fetches the list of favourited breeds from localStorage and then fetches a random image for each breed.
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

        //This function removes a breed from the favourites list. It updates the state and localStorage accordingly.
        const removeFavourite = (breed) => {
            const updated = favourites.filter(fav => fav !== breed);
            setFavourites(updated);
            localStorage.setItem('favourites', JSON.stringify(updated));
        
            const updatedImages = { ...images };
            delete updatedImages[breed];
            setImages(updatedImages);
          };
        
          //This renders the component. It includes a button to go back to the home page, and a list of favourited breeds.
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