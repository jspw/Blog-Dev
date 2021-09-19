import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import UserBlogs from "./Blogs";
import Dashboard from "./Dashboard";

export default function User() {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  const [totalReacts, setTotalReacts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  useEffect(() => {
    axios
      .get(`user/${username}`)
      .then((response) => {
        setUser(response.data);
        response.data.blogs.map((blog) => {
          setTotalReacts(totalReacts + blog.reacts.length);
          setTotalComments(totalComments + blog.comments.length);
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    user && (
      <div className=" mt-20">
        <div className=" container m-auto  rounded shadow p-4 space-y-4">
          <div className="flex flex-col align-items-center space-y-4">
            <div>
              <img
                className="rounded-full"
                height="200px"
                width="200px"
                src={user.image}
              />
            </div>
            <p className="font-bold  text-lg">{username}</p>
            <p className="font-thin  text-md">{user.bio}</p>
            <div className="flex flex-row justify-content-evenly space-x-2">
              <div className="flex p-1 text-gray-500 space-x-1">
                <MyLocationIcon /> <p>{user.address}</p>
              </div>
              <div className="flex p-1 text-gray-500 space-x-1">
                <CakeIcon /> <p>Join on {user.createdAt}</p>
              </div>
              <div className="flex p-1 text-gray-500 space-x-1">
                <EmailIcon /> <p>{user.email}</p>
              </div>

              <div className="flex p-1 text-gray-500 space-x-1">
                <GitHubIcon /> <a href={user.github}>{user.github}</a>
              </div>
            </div>
            <hr />
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

          <UserBlogs blogs={user.blogs} />
        </div>
      </div>
    )
  );
}
