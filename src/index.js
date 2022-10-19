import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'

function Example() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  function loadImages() {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(
        (result) => {
          const gallery = [];
          for (let i = 0; i < result.data.memes.length; i++) {
            gallery.push(result.data.memes[i]);
          }
          setLoaded(true);
          setImages(gallery);
        },
        (error) => {
          setLoaded(true);
          setError(error);
        }
      )
  }

  useEffect(() => {
    loadImages();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  else if (!isLoaded) {
    return <div>Loading...</div>;
  }
  else {
    return (
      <div>
        <div className='header'>
          <div className='load-button'>
            <button onClick={() => loadImages()}>Load images</button>
          </div>
        </div>
        <ul>
          {images.map((imgSrc, index) => (
            <div className='gallery'>
              <img src={imgSrc.url} key={index} ></img>
            </div>
          ))}
        </ul>
      </div>
    );
  }

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Example />);  