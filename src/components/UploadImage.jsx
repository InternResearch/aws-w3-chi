import { useRef,useState  } from "react";
import { Link } from "react-router-dom";
import { Card, Avatar } from "antd";
import axios from "axios";
import UploadIcon from "../assets/images/Upload icon.png";
import styles from "./UploadImage.module.css";
import { useSelector,useDispatch } from "react-redux";
import { userAction } from "../store/user-slice";

function UploadImage() {
  const inputRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
 
  const uploadImage = async (file) => {
    const options = { headers: { 'Content-Type': file.type } };
   

    try {
      const token = localStorage.getItem("token");
        const s3Urls = await axios.get(
            `http://localhost:4000/files?contentType=${file.type}`,{
              headers: { Authorization: `Bearer ${token}` }
            }
        ).then(response => response.data?.urls);

        if (!s3Urls.signedUrl) {
            throw new Error('S3 signed url is not defined');
        }
        await axios.put(s3Urls.signedUrl, file, options);
        console.log(s3Urls.publicUrl)
        savePathImage(s3Urls.publicUrl)
        dispatch(userAction.updateImage(s3Urls.publicUrl));
        setImageUrl(s3Urls.publicUrl);
    } catch (err) {
        console.error(`Error uploading image: ${err.message}`);
    }
}

  const savePathImage = async (publicUrl) => { 
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:4000/upload`,
        {
          image: publicUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        },
      );
      
    }
    catch (err) {
      console.log(err);
    }
    
  }

  const handleChange = async (e) => {
    // const timestamp = new Date().getTime();
    console.log("day")
    const file = e.target.files[0];
    if (!file) 
    {
      return};
    if (file.size > 5*1024*1024) 
    {console.log("Max size")
      return} ;
    await uploadImage(file);
  }

  const handleClickUpload = () => {
    inputRef.current.click();
  };
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <input type="file" hidden onChange={handleChange} ref={inputRef} />
        <Card className={styles["card-upload"]}>
          <img className={styles["upload-icon"]} src={UploadIcon} alt="upload-icon"></img>
          <p className={styles["upload-text"]}>
            Drag & drop files or
            <span onClick={handleClickUpload}> Browse </span>
          </p>
        </Card>
        <Card className={styles["card-image"]}>
           { user.image ?  <Avatar className={styles["avatar"]} size={300}   src={user.image}></Avatar> : 
          (imageUrl &&  <Avatar className={styles["avatar"]} size={300}   src={imageUrl}></Avatar>) }
        </Card>
      </Card>
    </div>
  );
}

export default UploadImage;
