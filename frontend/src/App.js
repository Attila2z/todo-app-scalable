import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [importantOnly, setImportantOnly] = useState(false);
  const [importantFeatureEnabled, setImportantFeatureEnabled] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchFeatureStatus();
  }, []);

  const fetchTasks = () => {
    fetch('http://localhost:5068/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  };

  const fetchFeatureStatus = () => {
    fetch('http://localhost:5068/tasks/feature-status')
      .then(response => response.json())
      .then(data => setImportantFeatureEnabled(data.importantFeatureEnabled))
      .catch(error => console.error('Error fetching feature status:', error));
  };

  const addTask = () => {
    fetch('http://localhost:5068/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTaskTitle })
    })
    .then(() => {
      setNewTaskTitle("");
      fetchTasks();
    })
    .catch(error => console.error('Error adding task:', error));
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:5068/tasks/${id}`, { method: 'DELETE' })
      .then(() => fetchTasks())
      .catch(error => console.error('Error deleting task:', error));
  };

  const markImportant = (id) => {
    fetch(`http://localhost:5068/tasks/${id}/mark-important`, { method: 'PATCH' })
      .then(() => fetchTasks())
      .catch(error => console.error('Error marking important:', error));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Todo List App</h1>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          placeholder="New task title"
          style={{ flexGrow: 1, padding: "10px" }}
        />
        <button onClick={addTask} style={{ padding: "10px" }}>Add Task</button>
      </div>

      {importantFeatureEnabled && (
        <div style={{ marginBottom: "20px" }}>
          <label>
            <input
              type="checkbox"
              checked={importantOnly}
              onChange={e => setImportantOnly(e.target.checked)}
            />
            {" "} Show only Important tasks
          </label>
        </div>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks
          .filter(task => !importantOnly || task.isImportant)
          .map(task => (
            <li key={task.id} style={{ marginBottom: "10px", padding: "10px", border: "1px solid lightgray", borderRadius: "5px" }}>
              {task.title}{" "}
              {task.isImportant && (
                <strong style={{ color: "red" }}>(Important)</strong>
              )}
              <button onClick={() => deleteTask(task.id)} style={{ marginLeft: "10px" }}>
                Delete
              </button>
              {!task.isImportant && importantFeatureEnabled && (
                <button onClick={() => markImportant(task.id)} style={{ marginLeft: "10px" }}>
                  Mark Important
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
