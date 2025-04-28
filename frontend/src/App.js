import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
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
      body: JSON.stringify({
        title: newTaskTitle,
        description: newTaskDescription
      })
    })
      .then(() => {
        setNewTaskTitle("");
        setNewTaskDescription("");
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

  const markDone = (id) => {
    fetch(`http://localhost:5068/tasks/${id}/mark-done`, { method: 'PATCH' })
      .then(() => fetchTasks())
      .catch(error => console.error('Error marking done:', error));
  };

  const unmarkDone = (id) => {
    fetch(`http://localhost:5068/tasks/${id}/unmark-done`, { method: 'PATCH' })
      .then(() => fetchTasks())
      .catch(error => console.error('Error unmarking done:', error));
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Attila's To-do List Application</h1>

        <TaskForm
          title={newTaskTitle}
          description={newTaskDescription}
          onTitleChange={e => setNewTaskTitle(e.target.value)}
          onDescriptionChange={e => setNewTaskDescription(e.target.value)}
          onAddTask={addTask}
        />

        {importantFeatureEnabled && (
          <div className="flex items-center justify-center my-4">
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                checked={importantOnly}
                onChange={e => setImportantOnly(e.target.checked)}
                className="accent-blue-500"
              />
              <span>Show only Important tasks</span>
            </label>
          </div>
        )}

        <TaskList
          tasks={tasks}
          onDelete={deleteTask}
          onMarkImportant={markImportant}
          onMarkDone={markDone}
          onUnmarkDone={unmarkDone}
          importantFeatureEnabled={importantFeatureEnabled}
          importantOnly={importantOnly}
        />
      </div>
    </div>
  );
}

export default App;
