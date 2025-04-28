import React from 'react';

function TaskItem({ task, onDelete, onMarkImportant, importantFeatureEnabled }) {
  return (
    <li className="mb-4 p-4 border rounded shadow-sm">
      <div className="flex items-center font-bold text-lg">
        {task.title}
        {task.isImportant && (
          <span className="text-red-500 ml-2">🚩</span>
        )}
      </div>
      <div className="text-sm text-gray-500">{task.description}</div>

      <div className="mt-2 flex gap-2">
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>

        {!task.isImportant && importantFeatureEnabled && (
          <button
            onClick={() => onMarkImportant(task.id)}
            className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
          >
            Mark Important
          </button>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
