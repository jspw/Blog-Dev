import { Fragment, useContext } from "react";
import CustomNavBar from "./components/NavBar/CustomNavBar";
import Home from "./components/Home/Home";
import axios from "axios";
import { getLocalToken } from "./utility/localStorage";
import Blog from "./components/Blog/Blog";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddBlog from "./components/Blog/AddBlog";
import User from "./components/User/User";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import GlobalStore, { GlobalContext } from "./Context/GlobalContext";
import EditBlog from "./components/EditBlog/EditBlog";

function App() {
  axios.defaults.baseURL = "http://localhost:3001/";

  const token = getLocalToken();

  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }

  return (
    <GlobalStore>
      <Router>
        <CustomNavBar />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/blog/create">
            <AddBlog />
          </Route>
          <Route exact path="/blog/edit">
            <EditBlog />
          </Route>
          <Route exact path="/blog/:title">
            <Blog />
          </Route>
          <Route exact path="/user/:username">
            <User />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </GlobalStore>
  );
}

export default App;
