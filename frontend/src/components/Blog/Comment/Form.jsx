import axios from "axios";
import { useContext, useState } from "react";
import { GlobalContext } from "../../../Context/GlobalContext";

export default function CommentForm({ image, blogId, onAddComment }) {
  const [showButton, setShowButton] = useState(false);

  const [comment, setComment] = useState("");

  const [user, setUser] = useContext(GlobalContext);

  function handleComment(event) {
    setComment(event.target.value);
  }

  function handleCommentSubmit(event) {
    event.preventDefault();
    console.log(comment, blogId);
    addComment();
  }

  function closeEditingMode() {
    setComment("");
    setShowButton(false);
  }

  function addComment() {
    axios({
      method: "POST",
      url: "comment/create",
      data: {
        userId: user.id,
        blogId: blogId,
        content: comment,
      },
    })
      .then((comment) => {
        console.log("comment added", comment.data);
        closeEditingMode();
        onAddComment({
          id: comment.data.id,
          content: comment.data.content,
          createdAt: comment.data.createdAt,
          user: {
            id: user.id,
            image: user.image,
            username: user.username,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="flex justify-items-stretch">
      <div>
        <img
          height="30px"
          width="30px"
          className="rounded-full m-2"
          src={`${image}`}
          alt="User Image"
        />
      </div>
      <div>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            onChange={handleComment}
            value={comment}
            type="text"
            onClick={() => setShowButton(true)}
            className="p-2 m-1  border bg-gray-200  rounded shadow focus:shadow-outline focus:border-blue-300 focus:outline-none focus:bg-white "
            placeholder="Start a discussion"
            name="comment"
          />
          {showButton && (
            <div className="flex">
              <button type="submit" className="rounded btn-outline-primary p-2">
                Submit
              </button>
              <button
                className="btn-outline-danger p-2 rounded"
                onClick={closeEditingMode}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
