import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); 

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), subtasks: [] }]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addSubtask = (taskId, subtask) => {
    setTasks(tasks.map(task => (
      task.id === taskId
        ? { ...task, subtasks: [...task.subtasks, { ...subtask, id: Date.now() }] }
        : task
    )));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>Управление задачами</h1>
      <TaskForm onSubmit={addTask} />
      
      <div>
        <button onClick={() => setFilter('all')}>Все</button>
        <button onClick={() => setFilter('completed')}>Выполненные</button>
        <button onClick={() => setFilter('incomplete')}>Невыполненные</button>
      </div>
      
      <TaskList
        tasks={filteredTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        addSubtask={addSubtask}
      />
    </div>
  );
}

export default App;
