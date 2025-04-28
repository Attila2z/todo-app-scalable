import React from 'react';

function TaskForm({ title, description, onTitleChange, onDescriptionChange, onAddTask }) {
  return (
    <div className="space-y-4 mb-6">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={onTitleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        placeholder="Task description"
        value={description}
        onChange={onDescriptionChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={onAddTask}
        className="w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
      >
        Add Task
      </button>
    </div>
  );
}

export default TaskForm;
