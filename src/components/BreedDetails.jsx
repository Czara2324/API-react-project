import React, { useState, useEffect} from "react";
import { useParams, Link } from 'react-router';

function BreedDetails () {
    const { id } = useParams();
    const [breed, setBreed] = (null);

    useEffect(() => {
        fetch(`https://dog.ceo/api/breeds/image/random/${id}`)
            .then(response => response.json())
            .then(data => setBreed(breed))
            .catch(error => console.error('Error fetching breed:', error));
    }, []);

    if (!breed) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{breed.name}</h1>
            <img src={breed.image} alt={breed.name} />
            <p>{breed.description}</p>
            <Link to="/">Back to Home</Link>
        </div>
    );
}
export default BreedDetails;