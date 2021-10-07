import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { useHistory } from "react-router";
import { GlobalContext } from "../Context/GlobalContext";

export default function EditProfile() {
  const [user, _] = useContext(GlobalContext);

  const formInitState = {
    firstName: user.firstName,
    lastName: user.lastName,
    bio: user.bio,
    email: user.email,
    address: user.address,
    image: user.image,
    github: user.github,
  };

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

  function updateProfile(e) {
    e.preventDefault();
    setIsProcessing(true);
    // console.log(formData);
    axios({
      method: "PUT",
      url: `user/${user.username}`,
      data: formData,
    })
      .then((response) => {
        // console.log(response.data);
        setShowSnackBar({
          show: true,
          type: "success",
          message: "Profile Updated Successfully",
        });

        setFormData(formInitState);
        history.push(`/user/${user.username}`);
      })
      .catch((error) => {
        // console.log(error);
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
      text="Updating profile, please wait..."
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
          <form onSubmit={updateProfile}>
            <div className="flex flex-col space-y-3">
              {/* <div className="flex flex-col space-y-1">
                <label className="text-lg font-thin">Username</label>
                <input
                  onChange={handleFormDataChange}
                  required
                  name="username"
                  value = {formData.username}
                  className="outline-none border rounded p-2 bg-gray-300 appearance-none  focus:bg-white"
                />
              </div> */}
              {/* <div className="flex flex-col space-y-1">
                <label className="text-lg font-thin">Email</label>
                <input
                  onChange={handleFormDataChange}
                  required
                  name="email"
                  type="email"
                  value={formData.email}
                  className="outline-none border rounded p-2 bg-gray-300 focus:bg-white"
                />
              </div> */}
              <div className="flex flex-col space-y-1">
                <label className="text-lg font-thin">FirstName</label>
                <input
                  value={formData.firstName}
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
                  value={formData.lastName}
                  className="outline-none border rounded p-2 bg-gray-300 focus:bg-white"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-lg font-thin">Bio</label>
                <textarea
                  required
                  onChange={handleFormDataChange}
                  name="bio"
                  value={formData.bio}
                  className="outline-none border rounded p-2 bg-gray-300 focus:bg-white"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-lg font-thin">Address</label>
                <input
                  onChange={handleFormDataChange}
                  required
                  name="address"
                  value={formData.address}
                  className="outline-none border rounded p-2 bg-gray-300 focus:bg-white"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-lg font-thin">Image Link</label>
                <input
                  onChange={handleFormDataChange}
                  required
                  name="image"
                  value={formData.image}
                  className="outline-none border rounded p-2 bg-gray-300 focus:bg-white"
                />
              </div>
              {/* 
              <div className="flex flex-col space-y-1">
                <label className="text-lg font-thin">Password</label>
                <input
                  onChange={handleFormDataChange}
                  required
                  name="password"
                  type="password"
                  value={formData.password}
                  className="outline-none border rounded p-2 bg-gray-300 focus:bg-white"
                />
              </div> */}
              <div className="flex flex-col space-y-1">
                <label className="text-lg font-thin">Github</label>
                <input
                  onChange={handleFormDataChange}
                  required
                  name="github"
                  value={formData.github}
                  className="outline-none border rounded p-2 bg-gray-300 focus:bg-white"
                />
              </div>
              <button
                className="btn bg-green-500 rounded pt-2 pb-2 text-lg mb-4 text-white"
                type="submit"
              >
                Update
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
