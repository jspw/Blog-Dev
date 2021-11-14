import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../Context/GlobalContext";

export default function Writer({
  firstName,
  lastName,
  bio,
  address,
  joinAt,
  userId,
  image,
  followers,
}) {
  const [user, _] = useContext(GlobalContext);

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (user)
      followers.map((follower) => {
        if (follower.user.id === user.id) setIsFollowing(true);
      });
  }, []);

  function follow() {
    console.log("hele");
    axios({
      method: "POST",
      url: "follower/create",
      data: {
        userId,
        followerId: user.id,
      },
    })
      .then((response) => {
        if (response.data.message === "Followed") setIsFollowing(true);
        if (response.data.message === "Unfollowed") setIsFollowing(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <div className="col-span-1 bg-white p-4 shadow-md rounded ">
      <div className="h-4 bg-black"></div>
      <div className="flex flex-col justify-center space-y-2">
        <div className="flex">
          <div>
            <img
              height="30px"
              width="30px"
              className="rounded-full m-2"
              src={image}
            />
          </div>
          <div className="m-2 font-medium text-lg">
            {firstName} {lastName}
          </div>
        </div>
        {user && user.id != userId ? (
          <button
            onClick={follow}
            className="btn-dark rounded p-2 font-mono font-semibold text-gray-100 hover:text-white"
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        ) : null}
        <p>{bio}</p>
        <div>
          <p className="text-gray-500">LOCATION</p>
          <p className="">{address}</p>
        </div>
        <div>
          <p className="text-gray-500">JOINTED</p>
          <p className="">{joinAt}</p>
        </div>
      </div>
    </div>
  );
}
