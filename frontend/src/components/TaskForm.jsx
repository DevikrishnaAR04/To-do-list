import { useState } from "react";

// Form to add a new task (B3)
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the browser's full page reload
    if (!title.trim()) return;
    const ok = await onAdd(title);
    if (ok) setTitle(""); // clear the input after a successful add
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
