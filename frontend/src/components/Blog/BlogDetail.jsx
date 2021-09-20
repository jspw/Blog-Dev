import DOMPurify from "dompurify";
import Comments from "./Comment/Comments";
import CommentForm from "./Comment/Form";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export default function BlogDetail({
  title,
  content,
  username,
  image,
  createdAt,
  categoryId,
  comments,
  reacts,
  category,
  blogId,
  onAddComment,
  onDeleteComment,
}) {
  const [user, setUser] = useContext(GlobalContext);
  const createMarkup = (html) => {
    console.log(html);
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function deleteBlog() {
    handleClose();
    axios
      .delete(`blog/${title}`)
      .then((response) => {
        console.log(response.data);
        history.push("/");
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  const [isReacted, setIsReacted] = useState(false);
  const [reactCount, setReactCount] = useState(reacts.length);

  useEffect(() => {
    if (user)
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
          <div>
            {user && username === user.username && (
              <div>
                <Button
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  ...
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <Link
                    to={{
                      pathname: "/blog/edit",
                      blog: {
                        title,
                        content,
                        categoryId,
                      },
                    }}
                  >
                    <MenuItem color="danger">
                      {/* <p className="bg-yellow-400 pl-4 pr-4 text-white rounded font-semibold"> */}
                      Edit
                      {/* </p> */}
                    </MenuItem>
                  </Link>

                  <MenuItem onClick={deleteBlog}>
                    {/* <p className="bg-red-700 pl-2 pr-2  text-white rounded font-semibold"> */}
                    Delete
                    {/* </p> */}
                  </MenuItem>
                </Menu>
              </div>
            )}
            <div className="flex flex-row justify-content-between">
              <p className="text-lg p-2">{reactCount}</p>
              <button onClick={user ? addReact : null}>
                <FavoriteIcon color={`${isReacted ? "success" : ""}`} />
              </button>
            </div>
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
          {user && (
            <CommentForm
              blogId={blogId}
              image={user.image}
              onAddComment={onAddComment}
            />
          )}
          <Comments comments={comments} onDeleteComment={onDeleteComment} />
        </div>
      </div>
    </div>
  );
}
