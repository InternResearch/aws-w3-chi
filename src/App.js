
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import Login, { action as LoginAction } from "./pages/Login";
import Signup, { action as SignupAction } from "./pages/Signup";
import {action as LogoutAction} from "./pages/Logout"
import Home from "./pages/Home";
import Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    id: "root",
    children: [
      { index: true, element:  <Navigate to="/signup" replace /> },
      {
        path: "login",
        element: <Login></Login>,
         action: LoginAction
      },
      {
        path: "home",
        element: <Home></Home>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
        action: SignupAction
      },
      {
        path: "logout",
        action: LogoutAction,
      },
    ]
  }
])
function App() {
      return (<RouterProvider router={router}></RouterProvider>
  );
}

export default App;
