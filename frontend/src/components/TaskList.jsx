function TaskList({ tasks, deleteTask, startEditTask, toggleDone }) {
  if(tasks.length === 0) return <p>No tasks yet.</p>;

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} style={{ textDecoration: task.status === 'done' ? 'line-through' : 'none' }}>
          <strong>{task.title}</strong> - {task.description || 'No description'} - Due: {task.due_date || 'N/A'}
          <button onClick={() => toggleDone(task.id)}>{task.status === 'done' ? 'Undo' : 'Done'}</button>
          <button onClick={() => startEditTask(task)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
