import React, { useState } from 'react';
import TaskForm from './TaskForm';

const TaskItem = ({ task, updateTask, deleteTask, addSubtask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [isSubtasksVisible, setIsSubtasksVisible] = useState(true); // Для сворачивания подзадач

  const handleToggleComplete = () => {
    updateTask(task.id, { completed: !task.completed });
  };

  const handleEdit = (data) => {
    updateTask(task.id, data);
    setIsEditing(false);
  };

  const handleAddSubtask = (subtask) => {
    addSubtask(task.id, subtask);
    setIsAddingSubtask(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <TaskForm onSubmit={handleEdit} defaultValues={task} isEdit />
      ) : (
        <div>
          <h3 className={task.completed ? 'completed' : ''}>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={handleToggleComplete}>
            {task.completed ? 'Отметить как не выполнено' : 'Отметить как выполнено'}
          </button>
          <button onClick={() => setIsEditing(true)}>Редактировать</button>
          <button className="delete" onClick={() => deleteTask(task.id)}>Удалить</button>
        </div>
      )}

      <button onClick={() => setIsAddingSubtask(true)}>Добавить подзадачу</button>
      {isAddingSubtask && <TaskForm onSubmit={handleAddSubtask} />}

      {task.subtasks && task.subtasks.length > 0 && (
        <div>
          <button onClick={() => setIsSubtasksVisible(!isSubtasksVisible)}>
            {isSubtasksVisible ? 'Скрыть подзадачи' : 'Показать подзадачи'}
          </button>
          {isSubtasksVisible && (
            <div className="subtasks">
              {task.subtasks.map((subtask) => (
                <div key={subtask.id}>
                  <h5>{subtask.title}</h5>
                  <p>{subtask.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
