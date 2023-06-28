import { useRef,useState } from "react";
import { Card, Avatar } from "antd";
import axios from "axios";
import UploadIcon from "../assets/images/Upload icon.png";
import styles from "./UploadImage.module.css";


function UploadImage() {
  const inputRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);

  const uploadImage = async (filename, file) => {
    const options = { headers: { 'Content-Type': file.type } };

    try {
        const s3Urls = await axios.get(
            `http://localhost:4000/files?filename=${filename}&contentType=${file.type}`
        ).then(response => response.data?.urls);

        if (!s3Urls.signedUrl) {
            throw new Error('S3 signed url is not defined');
        }
        await axios.put(s3Urls.signedUrl, file, options);

        setImageUrl(s3Urls.publicUrl);
    } catch (err) {
        console.error(`Error uploading image: ${err.message}`);
    }
}
  const handleChange = async (e) => {
    const timestamp = new Date().getTime();
    const file = e.target.files[0];
    if (!file) return;
    const filename = file.name.split('.')[0].replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '').toLowerCase() + `_${timestamp}`;
    const fileExtension = file.name.split('.').pop();
    console.log(`${filename}.${fileExtension}`)
    await uploadImage(`${filename}.${fileExtension}`, file);
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
          {imageUrl && <Avatar className={styles["avatar"]} size={300}  shape="square" src={imageUrl}></Avatar> }
        </Card>
      </Card>
    </div>
  );
}

export default UploadImage;
