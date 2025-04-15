import React, { useState, useEffect} from "react";
import { useParams, useNavigate } from 'react-router';

function BreedDetails () {
    const { breedName } = useParams();
    const [image, setImage] = useState('');
    const [subBreeds, setSubBreeds] = useState([]);
    const navigate = useNavigate();

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