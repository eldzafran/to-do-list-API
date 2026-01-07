import { useState } from 'react';

function TaskForm({ addTask, editingTask, updateTask, cancelEdit }) {
  const [title, setTitle] = useState(editingTask ? editingTask.title : '');
  const [description, setDescription] = useState(editingTask ? editingTask.description : '');
  const [dueDate, setDueDate] = useState(editingTask ? editingTask.due_date : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { title, description, due_date: dueDate };

    if(editingTask) {
      updateTask(editingTask.id, taskData);
      cancelEdit();
    } else {
      addTask(taskData);
    }

    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input type="text" value={title} placeholder="Task title" onChange={e => setTitle(e.target.value)} required />
      <input type="text" value={description} placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
      {editingTask && <button type="button" onClick={cancelEdit}>Cancel</button>}
    </form>
  );
}

export default TaskForm;
