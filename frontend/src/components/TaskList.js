import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onMarkImportant, importantFeatureEnabled, importantOnly }) {
  return (
    <ul className="space-y-4">
      {tasks
        .filter(task => !importantOnly || task.isImportant)
        .map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onMarkImportant={onMarkImportant}
            importantFeatureEnabled={importantFeatureEnabled}
          />
        ))}
    </ul>
  );
}

export default TaskList;
