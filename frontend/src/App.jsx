import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { getTasks, createTask, updateTask, deleteTask } from "./api.js";

export default function App() {
  const [tasks, setTasks] = useState([]); // B2: tasks live in state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // B2: fetch all tasks once when the page loads
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // B3: add a task, then put it at the top of the list (no reload)
  const handleAdd = async (title) => {
    try {
      const newTask = await createTask(title);
      setTasks((prev) => [newTask, ...prev]);
      setError("");
      return true; // tells the form it can clear the input
    } catch (e) {
      setError(e.message);
      return false;
    }
  };

  // B4: toggle completed or edit the title, then swap in the updated task
  const handleUpdate = async (id, changes) => {
    try {
      const updated = await updateTask(id, changes);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

  // B5: delete a task, then remove it from state
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <h1>MERN To-Do List</h1>
      <TaskForm onAdd={handleAdd} />
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p className="muted">Loading tasks...</p>
      ) : (
        <>
          <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
          <p className="muted">
            {remaining} of {tasks.length} task{tasks.length === 1 ? "" : "s"} remaining
          </p>
        </>
      )}
    </div>
  );
}
