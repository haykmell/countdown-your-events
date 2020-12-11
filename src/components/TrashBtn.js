import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const TrashBtn = ({ removeEvent, id }) => {
  return (
    <button className="remove-btn" onClick={() => removeEvent(id)}>
      <FaRegTrashAlt />
    </button>
  );
};

export default TrashBtn;
