import { useState } from 'react';
import API from '../api';

function TaskList({ tasks, setTasks }) {
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDueDate, setEditDueDate] = useState('');

  const updateStatus = async (task, status) => {
    const res = await API.put(`/tasks/${task.id}`, { status });
    setTasks(prev => prev.map(t => t.id === task.id ? res.data : t));
  };

  const remove = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const startEdit = (task) => {
    setEditingTask(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditDueDate(task.due_date || '');
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditTitle('');
    setEditDescription('');
    setEditDueDate('');
  };

  const saveEdit = async (id) => {
    try {
      const res = await API.put(`/tasks/${id}`, {
        title: editTitle,
        description: editDescription,
        due_date: editDueDate,
      });
      setTasks(prev => prev.map(t => t.id === id ? res.data : t));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (tasks.length === 0) {
    return (
      <div style={styles.emptyState}>
        <div style={styles.emptyIcon}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#2563eb" opacity="0.2"/>
            <path d="M11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" fill="#2563eb"/>
          </svg>
        </div>
        <p style={styles.emptyTitle}>No tasks yet</p>
        <p style={styles.emptySubtitle}>Start by adding your first task above</p>
      </div>
    );
  }

  return (
    <div style={styles.taskList}>
      <div style={styles.taskGrid}>
        {tasks.map(task => (
          <div
            key={task.id}
            style={{
              ...styles.taskCard,
              borderLeft: `4px solid ${task.status === 'done' ? '#10b981' : '#2563eb'}`,
              background: editingTask === task.id ? '#f8fafc' : 'white',
            }}
          >
            {editingTask === task.id ? (
              <div style={styles.editForm}>
                <div style={styles.editHeader}>
                  <h4 style={styles.editTitle}>Edit Task</h4>
                  <div style={styles.editActions}>
                    <button 
                      onClick={() => saveEdit(task.id)}
                      style={styles.saveButton}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
                      </svg>
                      Save
                    </button>
                    <button 
                      onClick={cancelEdit}
                      style={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                
                <input
                  style={styles.editInput}
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  placeholder="Task title"
                />
                
                <textarea
                  style={styles.editTextarea}
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                  placeholder="Description"
                  rows="2"
                />
                
                <input
                  type="date"
                  style={styles.editDate}
                  value={editDueDate}
                  onChange={e => setEditDueDate(e.target.value)}
                />
              </div>
            ) : (
              <>
                <div style={styles.cardHeader}>
                  <div style={styles.taskTitleRow}>
                    <div style={{
                      ...styles.statusIndicator,
                      background: task.status === 'done' ? '#10b981' : '#2563eb'
                    }} />
                    <h4 style={styles.taskTitle}>{task.title}</h4>
                  </div>
                  
                  <div style={styles.actionButtons}>
                    <button 
                      onClick={() => startEdit(task)}
                      style={styles.editBtn}
                      title="Edit task"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="#64748b"/>
                      </svg>
                    </button>
                    
                    <button 
                      onClick={() => remove(task.id)}
                      style={styles.deleteBtn}
                      title="Delete task"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="#94a3b8"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {task.description && (
                  <p style={styles.taskDescription}>{task.description}</p>
                )}

                {task.due_date && (
                  <div style={styles.taskMeta}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.metaIcon}>
                      <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3 4.9 3 6V20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM5 8V6H19V8H5Z" fill="#64748b"/>
                    </svg>
                    <span style={styles.dueDate}>Due: {new Date(task.due_date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                )}

                <div style={styles.taskActions}>
                  <div style={styles.statusToggle}>
                    <button
                      style={task.status === 'pending' ? styles.statusBtnActive : styles.statusBtn}
                      onClick={() => updateStatus(task, 'pending')}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.statusIcon}>
                        <path d="M18 6H6C4.9 6 4 6.9 4 8V16C4 17.1 4.9 18 6 18H18C19.1 18 20 17.1 20 16V8C20 6.9 19.1 6 18 6ZM18 16H6V8H18V16Z" fill={task.status === 'pending' ? '#ffffff' : '#64748b'}/>
                      </svg>
                      Pending
                    </button>
                    
                    <button
                      style={task.status === 'done' ? styles.statusBtnActive : styles.statusBtn}
                      onClick={() => updateStatus(task, 'done')}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.statusIcon}>
                        <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill={task.status === 'done' ? '#ffffff' : '#64748b'}/>
                      </svg>
                      Completed
                    </button>
                  </div>
                  
                  <div style={styles.taskStatusBadge}>
                    <span style={{
                      ...styles.statusBadge,
                      background: task.status === 'done' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                      color: task.status === 'done' ? '#10b981' : '#2563eb'
                    }}>
                      {task.status === 'done' ? '✓ Completed' : '⏳ Pending'}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  taskList: {
    padding: 0,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  
  taskGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: 20,
  },
  
  taskCard: {
    background: 'white',
    borderRadius: 16,
    padding: 24,
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  
  editForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  
  editHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  editTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: '#1e293b',
  },
  
  editActions: {
    display: 'flex',
    gap: 8,
  },
  
  saveButton: {
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  
  cancelButton: {
    background: 'transparent',
    color: '#64748b',
    border: '1px solid #e2e8f0',
    padding: '8px 16px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
  },
  
  editInput: {
    padding: '12px 16px',
    borderRadius: 8,
    border: '1.5px solid #e2e8f0',
    fontSize: 14,
    fontFamily: 'inherit',
  },
  
  editTextarea: {
    padding: '12px 16px',
    borderRadius: 8,
    border: '1.5px solid #e2e8f0',
    fontSize: 14,
    fontFamily: 'inherit',
    resize: 'vertical',
    minHeight: 60,
  },
  
  editDate: {
    padding: '12px 16px',
    borderRadius: 8,
    border: '1.5px solid #e2e8f0',
    fontSize: 14,
    fontFamily: 'inherit',
  },
  
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  
  taskTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    flexShrink: 0,
  },
  
  taskTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: '#1e293b',
    lineHeight: 1.4,
  },
  
  actionButtons: {
    display: 'flex',
    gap: 8,
  },
  
  editBtn: {
    background: 'transparent',
    border: '1px solid #e2e8f0',
    padding: '6px',
    cursor: 'pointer',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  
  deleteBtn: {
    background: 'transparent',
    border: '1px solid #e2e8f0',
    padding: '6px',
    cursor: 'pointer',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  
  taskDescription: {
    margin: '0 0 20px 0',
    fontSize: 14,
    color: '#64748b',
    lineHeight: 1.5,
    flex: 1,
  },
  
  taskMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    padding: '10px 12px',
    background: '#f8fafc',
    borderRadius: '8px',
  },
  
  metaIcon: {
    flexShrink: 0,
  },
  
  dueDate: {
    fontSize: 13,
    color: '#475569',
    fontWeight: 500,
  },
  
  taskActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  
  statusToggle: {
    display: 'flex',
    gap: 8,
    background: '#f1f5f9',
    padding: '4px',
    borderRadius: '10px',
  },
  
  statusBtn: {
    padding: '8px 16px',
    border: 'none',
    background: 'transparent',
    borderRadius: '8px',
    fontSize: 13,
    fontWeight: '500',
    color: '#64748b',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
  },
  
  statusBtnActive: {
    padding: '8px 16px',
    border: 'none',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    borderRadius: '8px',
    fontSize: 13,
    fontWeight: '500',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)',
  },
  
  statusIcon: {
    flexShrink: 0,
  },
  
  taskStatusBadge: {
    marginLeft: 'auto',
  },
  
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: 12,
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  },
  
  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    border: '2px dashed #e2e8f0',
    margin: '20px 0',
  },
  
  emptyIcon: {
    marginBottom: '20px',
    opacity: 0.5,
  },
  
  emptyTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 8px 0',
  },
  
  emptySubtitle: {
    fontSize: '14px',
    color: '#94a3b8',
    margin: 0,
  },
};


export default TaskList;