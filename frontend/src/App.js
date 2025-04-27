import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch('http://localhost5068:/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo List</h1>

      <div style={{ marginBottom: "20px" }}>
        <input 
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          placeholder="New task title"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} {task.isImportant && <strong>(Important)</strong>}
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
