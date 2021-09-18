import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BlogDetail from "./BlogDetail";
import Writer from "./Writer";

export default function Blog() {
  const [blog, setBlog] = useState(null);
  const { title } = useParams();

  useEffect(() => {
    axios
      .get(`blog/${title}`)
      .then((blog) => {
        console.log("blog loaded", blog.data);
        setBlog(blog.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (blog)
    return (
      <div className="grid grid-cols-3 gap-4 p-4 mt-16">
        <BlogDetail
          blogId={blog.id}
          title={blog.title}
          content={blog.content}
          createdAt={blog.createdAt}
          username={blog.user.username}
          comments={blog.comments}
          reacts={blog.reacts}
          category={blog.category}
        />
        <Writer
          firstName={blog.user.firstName}
          lastName={blog.user.lastName}
          bio={blog.user.bio}
          joinAt={blog.user.createdAt}
          address={blog.user.address}
          username={blog.user.username}
        />
      </div>
    );
  else return <h2>Loading</h2>;
}
