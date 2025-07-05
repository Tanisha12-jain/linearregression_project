import React, { useState } from 'react';
import './App.css'; // Optional: for basic styles

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (task.trim() === '') return;
    const newTask = { text: task, completed: false };
    setTodos([...todos, newTask]);
    setTask('');
  };

  const deleteTask = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div style={styles.container}>
      <h2>📝 To-Do App</h2>
      <div style={styles.inputBox}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addButton}>Add</button>
      </div>

      <ul style={styles.todoList}>
        {todos.map((todo, index) => (
          <li key={index} style={styles.todoItem}>
            <span
              onClick={() => toggleComplete(index)}
              style={{
                ...styles.taskText,
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTask(index)} style={styles.deleteButton}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    border: '2px solid #ccc',
    borderRadius: '10px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  inputBox: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  input: {
    width: '70%',
    padding: '10px',
    fontSize: '16px',
  },
  addButton: {
    width: '25%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
  },
  todoList: {
    listStyle: 'none',
    padding: 0,
  },
  todoItem: {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "gray",
  },
  taskText: {
    cursor: 'pointer',
    flex: 1,
    textAlign: 'left',
  },
  deleteButton: {
    border: 'none',
    background: 'transparent',
    fontSize: '18px',
    cursor: 'pointer',
  },
};

export default App;
