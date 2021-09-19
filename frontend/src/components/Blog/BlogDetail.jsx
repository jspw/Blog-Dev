import DOMPurify from "dompurify";
import Comments from "./Comment/Comments";
import CommentForm from "./Comment/Form";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../Context/GlobalContext";

export default function BlogDetail({
  title,
  content,
  username,
  image,
  createdAt,
  comments,
  reacts,
  category,
  blogId,
  onAddComment,
}) {
  const [user, setUser] = useContext(GlobalContext);
  const createMarkup = (html) => {
    console.log(html);
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const [isReacted, setIsReacted] = useState(false);
  const [reactCount, setReactCount] = useState(reacts.length);

  useEffect(() => {
    reacts.map((react) => {
      if (react.user.id === user.id) setIsReacted(true);
    });
  }, []);

  function addReact() {
    axios({
      method: "POST",
      url: "react/create",
      data: {
        blogId,
        userId: user.id,
      },
    })
      .then((response) => {
        console.log(response.data);
        setIsReacted((pre) => !pre);
        if (response.data.message === "Reacted") setReactCount(reactCount + 1);
        else setReactCount(reactCount - 1);
      })
      .catch((error) => console.log(error));
  }

  console.log(blogId);
  return (
    <div className="col-span-2 bg-white  shadow-md rounded border-2 ">
      <div className="p-2 space-y-2">
        <div className="flex flex-row justify-content-between">
          <p className="text-2xl text-blue-600 font-semibold">{title}</p>
          <div className="flex flex-row justify-content-between">
            <p className="text-lg p-2">{reactCount}</p>
            <button onClick={addReact}>
              <FavoriteIcon color={`${isReacted ? "success" : ""}`} />
            </button>
          </div>
        </div>
        <p className="text-yellow-300 hover:cursor-pointer">#{category.name}</p>
        <div className="flex space-y-2">
          <div>
            <img
              height="30px"
              width="30px"
              className="rounded-full m-2"
              src={`${image}`}
              alt="User Image"
            />
          </div>
          <div className="m-2 font-medium">{username}</div>
          <div className="m-2 text-gray-600">{createdAt}</div>
        </div>
        <div
          className="preview pt-4"
          dangerouslySetInnerHTML={createMarkup(content)}
        ></div>
      </div>
      <hr />

      <div className="p-2">
        <p className="font-semibold text-xl">Discussion({comments.length})</p>
        <div className="space-y-4">
          <CommentForm
            blogId={blogId}
            image={user.image}
            onAddComment={onAddComment}
          />
          <Comments comments={comments} />
        </div>
      </div>
    </div>
  );
}
