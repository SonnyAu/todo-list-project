import { useState } from "react";

export default function TodoItem({
  id,
  task,
  description,
  date,
  priority,
  updateTodo,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedDate, setEditedDate] = useState(date);
  const [editedPriority, setEditedPriority] = useState(priority);

  function handleSave() {
    updateTodo(id, {
      task: editedTask,
      description: editedDescription,
      date: editedDate,
      priority: editedPriority,
    });
    setIsEditing(false); // Exit edit mode
  }

  return (
    <section className="todo-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <input
            type="date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
          />
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p onDoubleClick={() => setIsEditing(true)}>Task: {task}</p>
          <p>Description: {description}</p>
          <p>Due: {date}</p>
          <p>Priority: {priority}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </section>
  );
}
