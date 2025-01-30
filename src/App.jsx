import { useState } from "react";
import TodoItem from "./TodoItem";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [projects, setProjects] = useState(["Default"]);
  const [selectedProject, setSelectedProject] = useState("Default");
  function addTodo(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const todoData = Object.fromEntries(formData);
    setTodos((prevTodos) => {
      return [...prevTodos, todoData];
    });
  }
  function addProject(event) {
    event.preventDefault();
    const newProject = document.getElementById("project-input").value;

    if (!newProject.trim()) return; // Prevent empty project names

    setProjects((prevProjects) => [...prevProjects, newProject]);
    // Clear input field after adding
    document.getElementById("project-input").value = "";
  }

  return (
    <>
      <form className="todo-form" onSubmit={addTodo}>
        <label htmlFor="task">Task:</label>
        <input id="task" type="text" name="task" placeholder="Do work"></input>
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          placeholder="Go to office"
          name="description"
        />
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date"></input>

        <fieldset>
          <legend>Priority:</legend>
          <label htmlFor="high">
            <input type="radio" name="priority" value="High" />
            High
          </label>
          <label htmlFor="medium">
            <input type="radio" name="priority" value="med" />
            Medium
          </label>
          <label htmlFor="low">
            <input type="radio" name="priority" value="Low" />
            Low
          </label>
        </fieldset>
        <label htmlFor="project">Project:</label>
        <select id="project" name="project">
          {projects.map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>
        <div>
          <label htmlFor="project-input">Enter new project:</label>
          <input id="project-input" type="project-input" />
          <button type="button" onClick={addProject}>
            Add new project
          </button>
        </div>
        <button type="submit">Add Todo</button>
      </form>
      <main className="main">
        <select id="project" name="project">
          {projects.map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>
        {todos.map((todo) => {
          console.log(todo);
          return (
            <TodoItem
              key={todo.task}
              task={todo.task}
              description={todo.description}
              date={todo.date}
              project={todo.project}
              priority={todo.priority}
            />
          );
        })}
      </main>
    </>
  );
}

export default App;
