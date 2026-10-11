// All calls to the backend live here (B6). Each returns parsed JSON.
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

// Helper: send a request and throw a readable error if the server rejects it
async function request(url, options) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

// GET all tasks
export const getTasks = () => request(API);

// POST a new task
export const createTask = (title) =>
  request(API, { method: "POST", body: JSON.stringify({ title }) });

// PUT: send only the fields to change, e.g. { completed: true }
export const updateTask = (id, changes) =>
  request(`${API}/${id}`, { method: "PUT", body: JSON.stringify(changes) });

// DELETE a task
export const deleteTask = (id) => request(`${API}/${id}`, { method: "DELETE" });
