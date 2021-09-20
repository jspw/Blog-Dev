import moment from "moment";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../../../Context/GlobalContext";

export default function Comment({
  id,
  username,
  image,
  content,
  createdAt,
  onDeleteComment,
  onEditComment,
  userId,
  blogId,
}) {
  const [editingMode, setEditingMode] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function deleteComment() {
    handleClose();
    onDeleteComment(id);
  }

  function editComment(e) {
    setEditingMode(false);
    e.preventDefault();
    onEditComment({
      id,
      userId,
      blogId,
      content: commentFormValue,
    });
  }

  const [commentFormValue, setCommentFormValue] = useState(content);

  const [user, setUser] = useContext(GlobalContext);

  function handleCommentEdit(e) {
    setCommentFormValue(e.target.value);
  }

  return (
    <div className="flex ">
      <div>
        <img
          height="30px"
          width="30px"
          className="rounded-full m-2"
          src={`${image}`}
          alt="User Image"
        />
      </div>
      <div className="container rounded border-2 shadow flex flex-col space-y-2 p-2">
        <div className="flex flex-row justify-content-between align-items-top">
          <div className="flex flex-row space-x-2">
            <p className="font-semibold">{username}</p>
            <p className="text-gray-500">
              {moment(Date.parse(createdAt)).startOf("day").fromNow()}
            </p>
          </div>
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
                <MenuItem
                  onClick={() => {
                    setEditingMode(true);
                    handleClose();
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem onClick={deleteComment}>Delete</MenuItem>
              </Menu>
            </div>
          )}
        </div>

        {editingMode ? (
          <form
            onSubmit={editComment}
            className="flex flex-col justify-items-start space-y-2"
          >
            <div>
              <input
                onChange={handleCommentEdit}
                autoFocus
                value={commentFormValue}
                className="p-2 appearance-none outline-none border-blue-500 border max-w-sm rounded"
              />
            </div>
            <div className="flex flex-row space-x-2  max-w-sm">
              <button
                className="btn text-blue-500 hover:text-white hover:bg-blue-400"
                type="submit"
              >
                Update
              </button>
              <button
                className="btn text-red-600 hover:bg-red-600 hover:text-white"
                onClick={() => setEditingMode(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>{content}</div>
        )}
      </div>
    </div>
  );
}
