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

    if (!todoData.task.trim()) {
      console.warn("Todo must have a task!");
      return;
    }

    setTodos((prevTodos) => {
      const isDuplicate = prevTodos.some(
        (todo) =>
          todo.task === todoData.task && todo.project === todoData.project
      );

      if (isDuplicate) {
        console.warn("Duplicate todo detected. Skipping addition.");
        return prevTodos;
      } else {
        return [...prevTodos, { ...todoData, id: crypto.randomUUID() }];
      }
    });

    event.target.reset();
  }

  function updateTodo(id, updatedData) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedData } : todo
      )
    );
  }

  function addProject(event) {
    event.preventDefault();
    const projectInput = document.getElementById("project-input").value.trim();

    if (!projectInput) return; // Prevent empty names

    if (!projects.includes(projectInput)) {
      setProjects((prevProjects) => [...prevProjects, projectInput]);
    } else {
      console.warn("Project already exists!");
    }

    document.getElementById("project-input").value = ""; // Clear input field
  }

  return (
    <>
      <form className="todo-form" onSubmit={addTodo}>
        <label htmlFor="task">Task:</label>
        <input
          id="task"
          type="text"
          name="task"
          placeholder="Do work"
          required
        />

        <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          name="description"
          placeholder="Go to office"
          required
        />

        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" required />

        <fieldset>
          <legend>Priority:</legend>
          <label>
            <input type="radio" name="priority" value="High" defaultChecked />{" "}
            High
          </label>
          <label>
            <input type="radio" name="priority" value="Medium" /> Medium
          </label>
          <label>
            <input type="radio" name="priority" value="Low" /> Low
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
          <input id="project-input" type="text" />
          <button type="button" onClick={addProject}>
            Add new project
          </button>
        </div>

        <button type="submit">Add Todo</button>
      </form>

      <main className="main">
        <label htmlFor="filter-project">Filter by Project:</label>
        <select
          id="filter-project"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          {projects.map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>

        {todos
          .filter((todo) => todo.project === selectedProject)
          .map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              task={todo.task}
              description={todo.description}
              date={todo.date}
              project={todo.project}
              priority={todo.priority}
              updateTodo={updateTodo}
            />
          ))}
      </main>
    </>
  );
}

export default App;
