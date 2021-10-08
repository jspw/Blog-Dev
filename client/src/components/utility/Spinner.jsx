import { ClipLoader } from "react-spinners";
import React from "react";

const Spinner = (props) => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div style={style}>
      <ClipLoader color={"#123abc"} loading={true} />
    </div>
  );
};

export default Spinner;
