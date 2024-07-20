import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setTaskInput(task.text);
  };

  const updateTask = () => {
    setTasks(tasks.map(task => (task.id === currentTask.id ? { ...task, text: taskInput } : task)));
    setTaskInput('');
    setIsEditing(false);
    setCurrentTask({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateTask();
    } else {
      addTask();
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskInput}
          onChange={handleInputChange}
          placeholder="Add a new task"
        />
        <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span
              className={`checkbox ${task.completed ? 'checked' : ''}`}
              onClick={() => toggleComplete(task.id)}
            >
              {task.completed && <i className="fas fa-check"></i>}
            </span>
            {task.text}
            <button onClick={() => editTask(task)}>
              <i className="fas fa-edit"></i>
            </button>
            <button onClick={() => deleteTask(task.id)}>
              <i className="fas fa-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
