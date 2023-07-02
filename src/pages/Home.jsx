import UploadImage from "../components/UploadImage";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useEffect ,useCallback} from "react";
import { userAction } from "../store/user-slice";
import axios from "axios";
function Home() {
    console.log("Home");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const username = localStorage.getItem("username");
    
    // const image = localStorage.getItem("image");
    // console.log(image)

    const savePathImage = useCallback(async (username) => { 
      try {
        const response = await axios.get(
          `http://localhost:4000/image?username=${username}`);
        const user = await response.data.data;
        dispatch(userAction.updateUsername(user.username));
        dispatch(userAction.updateImage(user.image));
      }
      catch (err) {
        console.log(err);
      }
    },[dispatch])

    useEffect(() => {
      dispatch(userAction.updateUsername(username));
      if(user.username)
      {
        savePathImage(user.username);
      }
      
    }, [dispatch,savePathImage,username,user.username])

    // useEffect(() => {
    //   console.log(username, image);
    //   if (username) {
    //     dispatch(userAction.updateUsername(username));
    //   }
    //   if (image !== "null") {
    //     dispatch(userAction.updateUsername(username));
    //   }
    //   try {
    //     const res = await axios.post(
    //       `http://localhost:4000/upload?username=${user.username}`,
    //       {
    //         image: publicUrl,
    //       }
    //     );
        
    //   }
    //   catch (err) {
    //     console.log(err);
    //   }
    // }, [username,image,dispatch]);
    return (
    <div>
    <UploadImage></UploadImage>

    </div> );
}

export default Home;