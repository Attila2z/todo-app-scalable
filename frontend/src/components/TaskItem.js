import React from 'react';

function TaskItem({ task, onDelete, onMarkImportant, onMarkDone, onUnmarkDone, importantFeatureEnabled }) {
  return (
    <li className={`mb-4 p-4 border rounded shadow-sm hover:shadow-lg transition ${task.isDone ? "bg-green-100" : "bg-white"}`}>
      <div className="flex items-center justify-between">
        <div className={`font-bold ${task.isDone ? "line-through" : ""}`}>
          {task.title}
        </div>
        {task.isImportant && (
          <div className="text-red-500 ml-2">
            🚩
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500 mt-1">
        {task.description}
      </div>

      <div className="mt-4 space-x-2">
        <button onClick={() => onDelete(task.id)} className="px-2 py-1 bg-red-400 text-white rounded hover:bg-red-500">
          Delete
        </button>

        {!task.isImportant && importantFeatureEnabled && (
          <button onClick={() => onMarkImportant(task.id)} className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500">
            Mark Important
          </button>
        )}

        {!task.isDone && (
          <button onClick={() => onMarkDone(task.id)} className="px-2 py-1 bg-green-400 text-white rounded hover:bg-green-500">
            Mark Done
          </button>
        )}

        {task.isDone && (
          <button onClick={() => onUnmarkDone(task.id)} className="px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-500">
            ❌ Cancel Done
          </button>
        )}
      </div>
    </li>
  );
}

export default TaskItem;

