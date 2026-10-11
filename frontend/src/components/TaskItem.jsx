import { useState } from "react";

// One task row: checkbox (B4), inline edit, delete button (B5)
export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const saveEdit = () => {
    if (draft.trim() && draft.trim() !== task.title) {
      onUpdate(task._id, { title: draft });
    }
    setEditing(false);
  };

  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onUpdate(task._id, { completed: !task.completed })}
      />

      {editing ? (
        <input
          className="edit-input"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => e.key === "Enter" && saveEdit()}
        />
      ) : (
        <span
          className={task.completed ? "title done" : "title"} /* strike-through when done */
          onDoubleClick={() => setEditing(true)}
          title="Double-click to edit"
        >
          {task.title}
        </span>
      )}

      <button className="delete" onClick={() => onDelete(task._id)} aria-label="Delete task">
        Delete
      </button>
    </li>
  );
}
