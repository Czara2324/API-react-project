import React, { useState, useEffect} from "react";
import { useParams, useNavigate } from 'react-router';

function BreedDetails () {
    const { breedName } = useParams();//this gets the breed name from the URL
    const [image, setImage] = useState('');//stores the image of the breed
    const [subBreeds, setSubBreeds] = useState([]);//stores the sub-breeds of the breed,if any

    useEffect(() => {
        // Fetch breed image
        fetch(`https://dog.ceo/api/breed/${breedName}/images/random`)
          .then(res => res.json())
          .then(data => setImage(data.message));

          // Fetch sub-breeds
        fetch('https://dog.ceo/api/breeds/list/all')
        .then(res => res.json())
        .then(data => {
        const subs = data.message[breedName];
        if (subs && subs.length > 0) {
            setSubBreeds(subs);
        }
        });
    }, [breedName]);

    // This page shows the details of a specific breed, including its image and any sub-breeds.
    // 
    return (
        <div>
          <h1>{breedName.toUpperCase()} Details</h1>
          <button onClick={() => navigate('/')}>← Back to Home</button>
          {image && <img src={image} alt={breedName} width="300" />}
          {subBreeds.length > 0 && (
            <div>
              <h3>Sub-breeds:</h3>
              <ul>
                {subBreeds.map(sub => (
                  <li key={sub}>{sub}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
}

export default BreedDetails;