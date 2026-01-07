import { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import API from '../api';

function Dashboard({ tasks, setTasks }) {
  const [editingTask, setEditingTask] = useState(null);

  const addTask = async (taskData) => {
    try {
      const res = await API.post('/tasks', taskData);
      setTasks(prev => [...prev, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const res = await API.put(`/tasks/${id}`, taskData);
      setTasks(prev => prev.map(t => t.id === id ? res.data : t));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDone = async (id) => {
    try {
      const task = tasks.find(t => t.id === id);
      const newStatus = task.status === 'done' ? 'pending' : 'done';
      const res = await API.put(`/tasks/${id}`, { status: newStatus });
      setTasks(prev => prev.map(t => t.id === id ? res.data : t));
    } catch (err) {
      console.error(err);
    }
  };

  const startEditTask = (task) => setEditingTask(task);
  const cancelEdit = () => setEditingTask(null);

  return (
    <div>
      <h1>Tasks</h1>
      <TaskForm
        addTask={addTask}
        editingTask={editingTask}
        updateTask={updateTask}
        cancelEdit={cancelEdit}
      />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        startEditTask={startEditTask}
        toggleDone={toggleDone}
      />
    </div>
  );
}

export default Dashboard;
