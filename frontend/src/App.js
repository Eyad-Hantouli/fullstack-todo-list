import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Fetch tasks when the component mounts
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:8000/').then((response) => {
      setTasks(response.data);
    });
  };

  const addTask = () => {
    axios.post('http://localhost:8000/', { name: newTask }).then((response) => {
      setTasks(response.data);
      setNewTask('');
    });
  };

  const updateTask = (id, newName) => {
    axios.put(`http://localhost:8000/${id}`, { name: newName }).then((response) => {
      setTasks(response.data);
    });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:8000/${id}`).then((response) => {
      setTasks(response.data);
    });
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <ul className='items'>
        {tasks && tasks.map((task) => (
          <li key={task.id} className='item'>
            <p>
              {task.name}
            </p>
            <div className='buttons-container'>
              <div className='button edit' onClick={() => updateTask(task.id, prompt('Enter new task name:', task.name))}><i class="fa-solid fa-pen"></i></div>
              <div className='button delete' onClick={() => deleteTask(task.id)}><i class="fa-solid fa-trash"></i></div>
            </div>
          </li>
        ))}
      </ul>
      <div className='form'>
        <input
          type="text"
          placeholder="Add Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <div className='button add' onClick={addTask}><i class="fa-solid fa-square-plus"></i></div>
      </div>
    </div>
  );
}

export default App;
