import React, { useState, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
function App() {
  const [src, setSrc] = useState(null);
  const handleFileChnage = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
  };
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [result, setResult] = useState(null);

  function getCroppedImg() {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // As Base64 string
    const base64Image = canvas.toDataURL('image/jpeg');
    setResult(base64Image);
  }

  return (
    <div className="App">
      <h1>Image Cropper</h1>
      <input type="file" accept="image/*" onChange={handleFileChnage} />
      {src && (
        <div>
          <ReactCrop
            src={src}
            onImageLoaded={setImage}
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
          />
          <button onClick={getCroppedImg}>Crop</button>
        </div>
      )}
      {result && <img src={result} alt="result" style={{borderRadius: "50%"}}/>}
    </div>
  );
}

export default App;
