import axios from "axios";
import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import PreviewIcon from "@mui/icons-material/Preview";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Image } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Link, useHistory } from "react-router-dom";

export default function UserBlogs({ blogs, isAdmin }) {
  console.log(blogs);

  const history = useHistory();

  function deleteBlog(title) {
    axios
      .delete(`blog/${title}`)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <div>
      <div className="text-2xl font-semibold pb-2 ">Blogs</div>

      {blogs.map((blog) => (
        <div className="flex flex-row p-4 rounded border justify-content-between align-items-center">
          <div>
            <div className="text-2xl font-mono">
              <Link to={`/blog/${blog.title}`}>{blog.title}</Link>
            </div>
            <div className="flex space-x-2">
              <div style={{ paddingRight: "20px" }}>
                <FavoriteIcon color="success" /> {blog.reacts.length} reacts{" "}
              </div>
              <div style={{ paddingRight: "5px" }}>
                <CommentIcon color="info" /> {blog.comments.length} comments
              </div>
              <div style={{ paddingRight: "20px" }}>
                <PreviewIcon color="secondary" />{" "}
                {(blog.reacts.length + blog.comments.length) *
                  Math.round(Math.random() * 20)}{" "}
                Views{" "}
              </div>
            </div>
          </div>

          {isAdmin && (
            <div className="space-x-2">
              <button className="bg-yellow-400  pl-4 pr-4 rounded">Edit</button>
              <button
                onClick={() => deleteBlog(blog.title)}
                className="btn-danger pl-4 pr-4 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
