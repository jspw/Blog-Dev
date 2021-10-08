import CustomNavBar from "./components/NavBar/CustomNavBar";
import Home from "./pages/Home";
import axios from "axios";
import { getLocalToken } from "./utility/localStorage";
import Blog from "./pages/Blog";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddBlog from "./pages/AddBlog";
import User from "./pages/User";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import GlobalStore from "./Context/GlobalContext";
import EditBlog from "./pages/EditBlog";
import EditProfile from "./pages/EditProfile";
import Category from "./pages/Category";

function App() {
  axios.defaults.baseURL = "/api/";

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
          <Route exact path="/category/:name">
            <Category />
          </Route>
          <Route exact path="/user/edit">
            <EditProfile />
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
