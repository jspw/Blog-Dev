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

export default function Login() {
  const history = useHistory();
  const initialFormData = {
    email: "",
    password: "",
  };

  const [user, setUser] = useContext(GlobalContext);

  const [formData, setFormData] = useState(initialFormData);

  const [isProcessing, setIsProcessing] = useState(false);

  const [showSnackBar, setShowSnackBar] = useState({
    show: false,
    type: "",
    message: "",
  });

  function handleHideSnackBar() {
    setShowSnackBar({
      show: false,
      type: "",
      message: "",
    });
  }

  function handleFormInput(e) {
    setFormData((pre) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  }
  function login(e) {
    e.preventDefault();
    setIsProcessing(true);

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

        setIsProcessing(false);

        axios({
          method: "GET",
          url: "/",
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        })
          .then((user) => {
            setUser(user.data);
            saveUserDataLocally(user.data);
            setShowSnackBar({
              show: true,
              type: "success",
              message: "Logged in successfully",
            });

            history.replace("/");
          })
          .catch((error) => {
            console.log("data load user : ", error.response);
            setShowSnackBar({
              show: true,
              type: "error",
              message:
                error.response.status === 401
                  ? "Please enter correct email and password"
                  : error.response.data.result ||
                    "Something Went Wrong, Please Try Again Later",
            });
          });
      })
      .catch((error) => {
        console.log("error", error.response);
        setIsProcessing(false);
        setShowSnackBar({
          show: true,
          type: "error",
          message:
            error.response.status === 401
              ? "Please enter correct email and password"
              : error.response.data.result ||
                "Something Went Wrong, Please Try Again Later",
        });
      });
  }

  return (
    <LoadingOverlay
      active={isProcessing}
      spinner
      text="Login in process please wait..."
      className="h-full w-full m-auto"
    >
      <div className="mt-20 ">
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
        <div className="container m-auto">
          <form onSubmit={login}>
            <div className="flex flex-col align-items-center space-y-4">
              <p className="text-3xl font-sans font-bold">Welcome Back Dev!</p>
              <p>Please Login to continue</p>
              {/* <label className="text-lg text-gray-500 text-left">Email</label> */}
              <input
                name="email"
                type="email"
                required
                placeholder="Please Enter Email Address"
                className="appearance-none outline-none border rounded p-2"
                onChange={handleFormInput}
              />

              <input
                required
                name="password"
                type="password"
                placeholder="Enter your password"
                className="appearance-none outline-none border rounded p-2"
                onChange={handleFormInput}
              />

              <button className="btn bg-green-500 rounded text-white font-medium">
                Login
              </button>

              <button className="btn text-green-500 rounded bg-white font-medium m-4">
                New SWE DEV ? Create An Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </LoadingOverlay>
  );
}
