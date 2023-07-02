import { Form, Link, json,redirect } from "react-router-dom";
import Input from "../components/Input"
import ButtonAuth from "../components/ButtonAuth"
import axios from "axios";
import styles from "./Form.module.css"
import { Card } from "antd";

function Signup() {
    return ( <div className={styles["container"]}>
      <Card className={styles["card-container"]}>
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
      
    <ButtonAuth value="Sign up"></ButtonAuth> 
    <div className={styles.link}>
    <Link to="/login">Login</Link> 
    </div>
    
  </Form></Card></div> );
}

export default Signup;

export const action = async ({ request }) => {
    const data = await request.formData();
    const authUser = {
      username: data.get("username"),
      password: data.get("password"),
    };
    console.log(authUser);
    const response =  await axios.post('http://localhost:4000/signup',authUser);
    if (response.status === 400) {
        return response
    }
    if (response.status !== 200) {
      throw json({ message: "Could not authenticate user" }, { status: 500 });
    }
    return redirect("/login");
  };