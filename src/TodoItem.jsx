import { useState } from "react";

export default function TodoItem(props) {
  console.log(props);
  const [isClicked, setIsClicked] = useState(false);
  function toggleItem() {
    setIsClicked(!isClicked);
  }

  return (
    <section className="todo-item">
      <p>Task: {props.task}</p>
      <button className="expand-btn" onClick={toggleItem}>
        {isClicked ? "Collapse" : "Expand"}
      </button>

      {isClicked && (
        <div>
          <p>Description: {props.description}</p>
          <p>Due: {props.date}</p>
          <p>Priority: {props.priority}</p>
        </div>
      )}
    </section>
  );
}
