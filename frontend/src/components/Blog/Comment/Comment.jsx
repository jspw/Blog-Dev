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
}) {
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

  const [user, setUser] = useContext(GlobalContext);

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
                <MenuItem color="danger" onClick={deleteComment}>
                  {/* <p className="bg-yellow-400 pl-4 pr-4 text-white rounded font-semibold"> */}
                  Edit
                  {/* </p> */}
                </MenuItem>
                <MenuItem onClick={deleteComment}>
                  {/* <p className="bg-red-700 pl-2 pr-2  text-white rounded font-semibold"> */}
                  Delete
                  {/* </p> */}
                </MenuItem>
              </Menu>
            </div>
          )}
        </div>

        <div>{content}</div>
      </div>
    </div>
  );
}
