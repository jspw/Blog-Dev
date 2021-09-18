import DOMPurify from "dompurify";
import Comments from "./Comment/Comments";
import CommentForm from "./Comment/Form";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BlogDetail({
  title,
  content,
  username,
  createdAt,
  comments,
  reacts,
  category,
  blogId,
}) {
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
      if (react.user.id === "c8996fe6-22a1-44d4-bc5e-96c5d4db531e")
        setIsReacted(true);
    });
  }, []);

  function addReact() {
    axios({
      method: "POST",
      url: "react/create",
      data: {
        blogId,
        userId: "c8996fe6-22a1-44d4-bc5e-96c5d4db531e",
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
              src="https://scontent.fdac10-1.fna.fbcdn.net/v/t1.6435-1/p160x160/52681081_959948207528841_7080454252623036416_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=7206a8&_nc_eui2=AeHROnsNyaNfuvFQS2VfkaTIFYgmNFaSeGAViCY0VpJ4YAExU6e2ioS2wMYri4h5X0q16wP-07DYnqVq_R436X3f&_nc_ohc=At53HlxhL7kAX_fbwq9&_nc_ht=scontent.fdac10-1.fna&oh=88bc2d7a385c379c0ba7338f03739a04&oe=616C0678"
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
          <CommentForm blogId={blogId} />
          <Comments comments={comments} />
        </div>
      </div>
    </div>
  );
}
