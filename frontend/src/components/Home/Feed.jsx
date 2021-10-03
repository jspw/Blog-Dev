import axios from "axios";
import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import Container from "@mui/material/Container";
import { Card } from "@mui/material";
import { Link } from "react-router-dom";
import Spinner from "../utility/Spinner";

export default function Feed() {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    axios
      .get("blog/all")
      .then((blogs) => {
        setBlogs(blogs.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return blogs ? (
    <div className="w-full mt-20 p-4 space-y-4">
      <div className=" text-2xl font-semibold text-blue-500 mb-4  w-full bg-white">
        Blogs
      </div>

      <hr />

      {blogs.map((blog) => (
        <Card key={blog.id} className="m-2 p-4">
          <Container key={blog.id} style={{ alignItems: "start" }}>
            <div style={{ display: "flex", justifyContent: "start" }}>
              <div style={{ padding: "10px" }}>
                <img
                  width="30px"
                  height="30px"
                  style={{ borderRadius: "50%" }}
                  src={`${blog.user.image}`}
                />
              </div>
              <div>
                <Link
                  className="p-2 text-sm text-green-500 font-mono"
                  to={`/user/${blog.user.username}`}
                >
                  {blog.user.username}
                </Link>

                <div style={{ padding: "5px", fontSize: "10px" }}>
                  {blog.createdAt}
                </div>
              </div>
            </div>
            <div className="ml-4 flex flex-col">
              <Link className="text-2xl " to={`/blog/${blog.title}`}>
                {blog.title}
              </Link>
              <a className="text-purple-500" href={blog.category.name}>
                #{blog.category.name}
              </a>
              <div style={{ display: "flex" }}>
                <div style={{ paddingRight: "20px" }}>
                  <FavoriteIcon color="success" /> {blog.reacts.length} reacts{" "}
                </div>
                <div style={{ paddingRight: "5px" }}>
                  <CommentIcon color="info" /> {blog.comments.length} comments
                </div>
              </div>
            </div>
          </Container>
        </Card>
      ))}
    </div>
  ) : (
    <Spinner />
  );
}
