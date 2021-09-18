import axios from "axios";
import { useState } from "react";

export default function CommentForm({ image, blogId }) {
  const [showButton, setShowButton] = useState(false);

  const [comment, setComment] = useState("");

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
        userId: "c8996fe6-22a1-44d4-bc5e-96c5d4db531e",
        blogId: blogId,
        content: comment,
      },
    })
      .then((comment) => {
        console.log("comment added", comment.data);
        closeEditingMode();
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
          src="https://scontent.fdac10-1.fna.fbcdn.net/v/t1.6435-1/p160x160/52681081_959948207528841_7080454252623036416_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=7206a8&_nc_eui2=AeHROnsNyaNfuvFQS2VfkaTIFYgmNFaSeGAViCY0VpJ4YAExU6e2ioS2wMYri4h5X0q16wP-07DYnqVq_R436X3f&_nc_ohc=At53HlxhL7kAX_fbwq9&_nc_ht=scontent.fdac10-1.fna&oh=88bc2d7a385c379c0ba7338f03739a04&oe=616C0678"
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
