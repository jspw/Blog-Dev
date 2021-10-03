import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { useHistory } from "react-router";
import { GlobalContext } from "../../Context/GlobalContext";
import {
  saveTokenLocally,
  saveUserDataLocally,
} from "../../utility/localStorage";

export default function SignUp() {
  const formInitState = {
    username: "",
    firstName: "",
    lastName: "",
    bio: "",
    email: "",
    password: "",
    address: "",
    image: "",
    github: "",
  };

  const [user, setUser] = useContext(GlobalContext);

  const history = useHistory();

  const [formData, setFormData] = useState(formInitState);

  const [isProcessing, setIsProcessing] = useState(false);

  const [showSnackBar, setShowSnackBar] = useState({
    show: false,
    type: "",
    message: "",
  });

  function handleFormDataChange(e) {
    setFormData((pre) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  }

  function login() {
    axios({
      method: "POST",
      url: "auth/login",
      data: {
        email: formData.email,
        password: formData.password,
      },
    })
      .then((response) => {
        saveTokenLocally(response.data.token);
        axios
          .get("/")
          .then((response) => {
            setUser(response.data);
            saveUserDataLocally(response.data);
            setIsProcessing(false);
            history.replace("/");
          })
          .catch((error) => {
            setShowSnackBar({
              show: true,
              type: "error",
              message:
                error.response.status === 401
                  ? "Please enter correct email and password"
                  : error.response.data.result ||
                    "Something Went Wrong, Please Try Again Later",
            });
            setIsProcessing(false);
          });
      })
      .catch((error) => {
        setShowSnackBar({
          show: true,
          type: "error",
          message:
            error.response.status === 401
              ? "Please enter correct email and password"
              : error.response.data.result ||
                "Something Went Wrong, Please Try Again Later",
        });
        setIsProcessing(false);
      });
  }

  function signUp(e) {
    e.preventDefault();
    setIsProcessing(true);
    axios({
      method: "POST",
      url: "user/create",
      data: formData,
    })
      .then((response) => {
        setShowSnackBar({
          show: true,
          type: "success",
          message: "Account Created Successfully",
        });

        setFormData(formInitState);
        login();
      })
      .catch((error) => {
        setIsProcessing(false);
        setShowSnackBar({
          show: true,
          type: "error",
          message:
            error.message || "Something Went Wrong, Please Try Again Later",
        });
      });
  }

  function handleHideSnackBar() {
    setShowSnackBar({
      show: false,
      type: "",
      message: "",
    });
  }

  return (
    <LoadingOverlay
      active={isProcessing}
      spinner
      text="Signing up please wait..."
    >
      <div className="mt-20">
        <Snackbar
          open={showSnackBar.show}
          autoHideDuration={6000}
          onClose={handleHideSnackBar}
        >
          <Alert
            onClose={handleHideSnackBar}
            severity={showSnackBar.type}
            sx={{ width: "100%" }}
            variant="filled"
          >
            {showSnackBar.message}
          </Alert>
        </Snackbar>
        <div className="container m-auto ">
          <h1 className="text-center font-semibold text-xl">
            Sign Up For A New Account
          </h1>
          <form onSubmit={signUp}>
            <div className="flex flex-col space-y-3">
              <div className="flex flex-col space-y-1">
                <label className="text-lg font-thin">Username</label>
                <input
                  onChange={handleFormDataChange}
                  required
                  name="username"
                  className="outline-none border rounded p-2 bg-gray-300 appearance-none  focus:bg-white"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-lg font-thin">Email</label>
                <input
                  onChange={handleFormDataChange}
                  required
                  name="email"
                  type="email"
                  className="outline-none border rounded p-2 bg-gray-300 focus:bg-white"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-lg font-thin">FirstName</label>
                <input
                  onChange={handleFormDataChange}
                  required
                  name="firstName"
                  className="outline-none border rounded p-2 bg-gray-300 focus:bg-white"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-lg font-thin">LastName</label>
                <input
                  onChange={handleFormDataChange}
                  required
                  name="lastName"
                  className="outline-none border rounded p-2 bg-gray-300 focus:bg-white"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-lg font-thin">Bio</label>
                <textarea
                  required
                  onChange={handleFormDataChange}
                  name="bio"
                  className="outline-none border rounded p-2 bg-gray-300 focus:bg-white"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-lg font-thin">Address</label>
                <input
                  onChange={handleFormDataChange}
                  required
                  name="address"
                  className="outline-none border rounded p-2 bg-gray-300 focus:bg-white"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-lg font-thin">Image Link</label>
                <input
                  onChange={handleFormDataChange}
                  required
                  name="image"
                  className="outline-none border rounded p-2 bg-gray-300 focus:bg-white"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-lg font-thin">Password</label>
                <input
                  onChange={handleFormDataChange}
                  required
                  name="password"
                  type="password"
                  className="outline-none border rounded p-2 bg-gray-300 focus:bg-white"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-lg font-thin">Github</label>
                <input
                  onChange={handleFormDataChange}
                  required
                  name="github"
                  className="outline-none border rounded p-2 bg-gray-300 focus:bg-white"
                />
              </div>
              <button
                className="btn bg-green-500 rounded pt-2 pb-2 text-lg mb-4 text-white"
                type="submit"
              >
                SignUp
              </button>
              {/* <svg
                class="animate-spin bg-yellow-400 h-5 w-5 mr-3 align-self-baseline"
                viewBox="0 0 24 24"
              ></svg> */}
            </div>
          </form>
        </div>
      </div>
    </LoadingOverlay>
  );
}
