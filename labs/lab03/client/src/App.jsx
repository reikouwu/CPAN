import React, { useState } from 'react';

const App = () => {
  const [singleFile, setSingleFile] = useState(null);
  const [multipleImages, setMultipleImages] = useState([]);
  const [displayImage, setDisplayImage] = useState(null);
  const [message, setMessage] = useState("");
  const [dogImage, setDogImage] = useState(null);

  const handleSingleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0]);
    }
  };

  const fetchSingleFile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/single`);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setDisplayImage(imageUrl);
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };

  const fetchMultipleFiles = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/multiple`);
      const data = await response.json();
      setMultipleImages(data.images);
    } catch (error) {
      console.error("Error fetching multiple files:", error);
    }
  };

  const fetchDogImage = async () => {
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      console.error("Error fetching dog image:", error);
    }
  };

  const handleSubmitSingleFile = async (e) => {
    e.preventDefault();
    if (!singleFile) {
      setMessage("Please select a file before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", singleFile);
      
      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSaveDogImage = async () => {
    if (!dogImage) {
      setMessage("Please fetch a dog image before saving.");
      return;
    }

    try {
      const response = await fetch(dogImage);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append("file", blob, "dog.jpg");

      const saveResponse = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const data = await saveResponse.json();

      if (!saveResponse.ok) {
        throw new Error(data.error || "Dog image upload failed");
      }
      setMessage("Dog image uploaded successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <p>{message}</p>
      <h2>Fetch Single Random Image</h2>
      <button onClick={fetchSingleFile}>Fetch Single File</button>
      {displayImage && (
        <div>
          <h3>Single File</h3>
          <img
            src={displayImage}
            alt="Display Image"
            style={{ width: "200px", marginTop: "10px" }}
          />
        </div>
      )}
      <form onSubmit={handleSubmitSingleFile}>
        <h2>Upload Single File</h2>
        <input type="file" onChange={handleSingleFileChange} />
        <button type="submit">Upload Single File</button>
      </form>

      <h2>Fetch Multiple Random Images</h2>
      <button onClick={fetchMultipleFiles}>Fetch Multiple Files</button>
      <div>
        {multipleImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Random ${index}`}
            style={{ width: "200px", marginTop: "10px" }}
          />
        ))}
      </div>

      <h2>Fetch Random Dog Image</h2>
      <button onClick={fetchDogImage}>Fetch Dog Image</button>
      {dogImage && (
        <div>
          <h3>Dog Image</h3>
          <img
            src={dogImage}
            alt="Dog"
            style={{ width: "200px", marginTop: "10px" }}
          />
          <button onClick={handleSaveDogImage}>Save Dog Image</button>
        </div>
      )}
    </div>
  );
};

export default App;