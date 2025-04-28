import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onMarkImportant, onMarkDone, onUnmarkDone, importantFeatureEnabled, importantOnly }) {
  return (
    <ul className="list-none p-0">
      {tasks
        .filter(task => !importantOnly || task.isImportant)
        .map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onMarkImportant={onMarkImportant}
            onMarkDone={onMarkDone}
            onUnmarkDone={onUnmarkDone}
            importantFeatureEnabled={importantFeatureEnabled}
          />
        ))}
    </ul>
  );
}

export default TaskList;
