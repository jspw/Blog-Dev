import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BlogDetail from "./BlogDetail";
import Writer from "./Writer";
import Spinner from "../utility/Spinner";

export default function Blog() {
  const [blog, setBlog] = useState(null);
  const { title } = useParams();

  const [comments, setComments] = useState([]);

  function onAddComment(comment) {
    const updatedComment = [...comments];

    updatedComment.unshift(comment);

    setComments([...updatedComment]);
  }

  function onDeleteComment(id) {
    axios
      .delete(`comment/${id}`)
      .then((response) => {
        // console.log(response.data);

        setComments((pre) => pre.filter((comment) => comment.id != id));
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  function onEditComment(comment) {
    // console.log(comment);
    axios({
      method: "POST",
      url: `comment/${comment.id}`,
      data: {
        userId: comment.userId,
        blogId: blog.id,
        content: comment.content,
      },
    })
      .then((response) => {
        // console.log(response.data);
        const updatedComments = comments.map((com) => {
          if (com.id === comment.id) com.content = comment.content;

          return com;
        });
        // console.log(updatedComments);
        setComments(updatedComments);
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  useEffect(() => {
    axios
      .get(`blog/${title}`)
      .then((response) => {
        // console.log("blog loaded", response.data);
        setBlog(response.data);
        setComments(response.data.comments);
      })
      .catch((error) => {
        // console.log(error);
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
          onDeleteComment={onDeleteComment}
          onEditComment={onEditComment}
          reacts={blog.reacts}
          category={blog.category}
          categoryId={blog.categoryId}
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
  else return <Spinner />;
}
