import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import UserBlogs from "../components/User/Blogs";
import Dashboard from "../components/User/Dashboard";
import { GlobalContext } from "../Context/GlobalContext";
import { Link } from "react-router-dom";
import moment from "moment";
import Spinner from "../components/utility/Spinner";

export default function User() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [owner, _] = useContext(GlobalContext);

  const [totalReacts, setTotalReacts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (!owner) setIsAdmin(false);
    axios.get(`user/${username}`).then((response) => {
      setUser(response.data);
      setIsAdmin(
        owner ? (response.data.id === owner.id ? true : false) : false
      );
      response.data.blogs.forEach((blog) => {
        setTotalReacts(totalReacts + blog.reacts.length);
        setTotalComments(totalComments + blog.comments.length);
      });
    });
  }, []);
  return user ? (
    <div className=" mt-20 ">
      <div className=" container m-auto  rounded shadow p-4 space-y-4 bg-gray-50">
        {isAdmin && (
          <div className="text-right">
            <Link to="/user/edit">
              <button className="btn btn-dark ">Edit Profile</button>
            </Link>
          </div>
        )}
        <div className="flex flex-col align-items-center space-y-4">
          <div className="">
            <img
              alt={user.username}
              className="rounded-full"
              height="200px"
              width="200px"
              src={user.image}
            />
          </div>
          <p className="font-bold  text-lg">
            {user.firstName} {user.lastName}
          </p>
          <p className="font-thin  text-md">{user.bio}</p>
          <div className="flex flex-row justify-content-evenly space-x-2">
            <div className="flex p-1 text-gray-500 space-x-1">
              <MyLocationIcon /> <p>{user.address}</p>
            </div>
            <div className="flex p-1 text-gray-500 space-x-1">
              <CakeIcon /> <p>Join on {moment(user.createdAt).format("ll")}</p>
            </div>
            <div className="flex p-1 text-gray-500 space-x-1">
              <EmailIcon /> <a href={`mailto:${user.email}`}>{user.email}</a>
            </div>

            <div className="flex p-1 text-gray-500 space-x-1">
              <GitHubIcon />
              <a href={`https://github.com/${user.github}`}>{user.github}</a>
            </div>
          </div>
          <hr />
        </div>
        <hr />
        <div className="w-full  p-4">
          <div className="text-center text-gray-400">Education</div>
          <div className="text-center font-medium">
            Bsc in Software Engineering
          </div>
        </div>
        <hr />
        <Dashboard
          followers={user.followers.length}
          totalReacts={totalReacts}
          views=""
          blogs={user.blogs.length}
          totalComments={totalComments}
        />
        <hr />

        <UserBlogs blogs={user.blogs} isAdmin={isAdmin} />
      </div>
    </div>
  ) : (
    <Spinner />
  );
}
