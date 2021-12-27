import React, { useState } from "react";
import PropTypes from "prop-types";
import "./taskitem.css";

TaskItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  taskState: PropTypes.string.isRequired,
  onTaskUpdate: PropTypes.func.isRequired,
  onTaskDelete: PropTypes.func.isRequired
};

export default function TaskItem({
  id,
  title,
  taskState,
  onTaskUpdate,
  onTaskDelete
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);

  const onTitleChange = (event) => {
    const newTitle = event.target.value;
    setEditableTitle(newTitle);
    onTaskUpdate(id, newTitle, taskState);
  };

  const changeInput = (event) => {
    if (event.type === "click") {
      setIsEditing(true);
    } else if (event.type === "keypress" && event.key === "Enter") {
      setIsEditing(false);
      if (editableTitle.length === 0) {
        onTaskDelete(id);
      }
    }
  };

  const onChageTaskState = (event) => {
    onTaskUpdate(id, title, event.target.value);
  };

  if (isEditing) {
    return (
      <div className="task-item">
        <input
          type="text"
          value={editableTitle}
          onChange={onTitleChange}
          onKeyPress={changeInput}
        />
      </div>
    );
  } else {
    return (
      <div className="task-item">
        <div onClick={changeInput}>{editableTitle}</div>
        <select onChange={onChageTaskState} value={taskState}>
          <option value="pendente">Pendente</option>
          <option value="fazendo">Fazendo</option>
          <option value="completo">Completo</option>
        </select>
      </div>
    );
  }
}
