
import UploadImage from "./components/UploadImage";

function App() {
  
  return (
    // <div className="App">
    // <input type="file" id="img" name="img" accept="image/*" onChange={handleChange}></input>
    // {imageUrl && <div className="result">
    //     <a href={imageUrl} className="image-url" target="_blankד">Uploaded Image</a>
    // </div>}
    // </div>
   
    <div className="App">
      <UploadImage></UploadImage>
    </div>
  );
}

export default App;
