import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BlogDetail from "./BlogDetail";
import Writer from "./Writer";

export default function Blog() {
  const [blog, setBlog] = useState(null);
  const { title } = useParams();

  const [comments, setComments] = useState([]);

  function onAddComment(comment) {
    setComments([...comments, comment]);
  }

  useEffect(() => {
    axios
      .get(`blog/${title}`)
      .then((response) => {
        console.log("blog loaded", response.data);
        setBlog(response.data);
        setComments(response.data.comments);
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
          image={blog.user.image}
          comments={comments}
          onAddComment={onAddComment}
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
          userId={blog.user.id}
          image={blog.user.image}
          followers={blog.user.followers}
        />
      </div>
    );
  else return <h2>Loading</h2>;
}
