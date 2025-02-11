import { useState } from "react";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmitTextForm = async (e) => {
    e.preventDefault();

    try {
      const fetchMultiple = async () => {
        try {
          const response = await fetch("http://localhost:8000/multiple");
          const data = await response.json();
          const filePromises = data.map(async (filename) => {
            const fetchFilenameData = await fetch(`http://localhost:8000/fetch/file/${filename}`);
            const fileBlob = await fetchFilenameData.blob();
            return URL.createObjectURL(fileBlob);
          });
          const imageURLs = await Promise.all(filePromises);
          console.log(imageURLs);
        } catch (error) {
          console.log(error);
        }
      };

      await fetchMultiple();

      const submission = { username, password };
      const response = await fetch("http://localhost:8000/text-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      console.log(data);
      setMessage(JSON.stringify(data, null, 2));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitMultiPartForm = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image to upload.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("image", image);

      console.log("Submitting FormData:", formData);

      const response = await fetch("http://localhost:8000/form-multipart", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }

      console.log("Upload Response:", data);
      setMessage(JSON.stringify(data, null, 2));
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div>
      <p>{message}</p>
      <h2>fetch</h2>
      <button onClick={() => console.log("fetchSingle")}>fetchSingle</button>
      {image && (
        <div>
          <h3>SingleFile</h3>
          <img src={image} alt="single file" />
        </div>
      )}
      <form onSubmit={handleSubmitTextForm}>
        <h2>handle single file</h2>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => console.log("fetchMultiple")}>fetchMultiple</button>
        {image && (
          <div>
            <h3>Multiple Files</h3>
            <img src={URL.createObjectURL(image)} alt="multiple files" />
          </div>
        )}
      </form>
    </div>
  );
};

export default App;