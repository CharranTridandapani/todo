import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const BASE_URL= "http://13.127.9.169:5000"
  // Fetch tasks from backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch(`${BASE_URL}/tasks`);

   const data = await response.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (task) {
      const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: task })
      });
      fetchTasks(); // Refresh the list
      setTask(""); // Clear input field
    }
  };

  const deleteTask = async (id) => {
    await fetch(`${BASE_URL}/tasks/${id}`, { method: 'DELETE' });
    fetchTasks(); // Refresh the list
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
