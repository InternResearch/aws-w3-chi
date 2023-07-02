import { Form, json,redirect,Link } from "react-router-dom";
import Input from "../components/Input"
import ButtonAuth from "../components/ButtonAuth"
import axios from "axios";
import styles from "./Form.module.css"
import { Card } from "antd";


function Login() {
    
    return ( <div className={styles["container"]}>
      <Card className={styles["card-container"]} >
        <Form method="post" >
          <Input
            name="username"
            label="Username"
            type="text"
            placeholder="Type your username"
          ></Input>
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="Type your password"
          ></Input>
        <ButtonAuth value="Log in" ></ButtonAuth>
        <div className={styles.link}>
    <Link to="/signup">Sign up</Link> 
    </div>
      </Form> </Card></div> );
     
}

export default Login;

export const action = async ({ request }) => {
    const data = await request.formData();
    const authUser = {
      username: data.get("username"),
      password: data.get("password"),
    };
    console.log(authUser);
    const response =  await axios.post('http://localhost:4000/login',authUser);
    if (response.status !== 200) {
      throw json({ message: "Could not authenticate user" }, { status: 500 });
    }

    const user = await response.data.data;
    console.log(user);
    localStorage.setItem("username", user.username);
    localStorage.setItem("image", user.image);

    return redirect("/home");
  };