import React from 'react';

function TaskItem({ task, onDelete, onMarkImportant, onMarkDone, importantFeatureEnabled }) {
  return (
    <li className={`mb-4 p-4 border rounded shadow-sm hover:shadow-lg transition ${task.isDone ? "bg-green-100" : "bg-white"}`}>


      <div className={`flex items-center font-bold text-lg ${task.isDone ? "line-through text-gray-400" : ""}`}>
        {task.title}
        {task.isImportant && (
          <span className="text-red-500 ml-2">🚩</span>
        )}
      </div>
      <div className="text-sm text-gray-500">{task.description}</div>

      <div className="mt-2 flex gap-2">
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>

        {!task.isImportant && importantFeatureEnabled && (
          <button
            onClick={() => onMarkImportant(task.id)}
            className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition"
          >
            Mark Important
          </button>
        )}

        {!task.isDone && (
          <button
            onClick={() => onMarkDone(task.id)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
          >
            Mark Done
          </button>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
