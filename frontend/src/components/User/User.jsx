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
  useEffect(() => {
    axios
      .get(`user/${username}`)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
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
                src="https://scontent.fdac10-1.fna.fbcdn.net/v/t1.6435-1/p160x160/52681081_959948207528841_7080454252623036416_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=7206a8&_nc_eui2=AeHROnsNyaNfuvFQS2VfkaTIFYgmNFaSeGAViCY0VpJ4YAExU6e2ioS2wMYri4h5X0q16wP-07DYnqVq_R436X3f&_nc_ohc=At53HlxhL7kAX_fbwq9&_nc_ht=scontent.fdac10-1.fna&oh=88bc2d7a385c379c0ba7338f03739a04&oe=616C0678"
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
            reacts=""
            views=""
            blogs={user.blogs.length}
            comments=""
          />
          <hr />

          <UserBlogs blogs={user.blogs} />
        </div>
      </div>
    )
  );
}
