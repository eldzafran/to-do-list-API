import { useState } from 'react';
import API from '../api';

function TaskForm({ setTasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const res = await API.post('/tasks', {
        title,
        description,
        due_date: dueDate,
        status: 'pending'
      });

      setTasks(prev => [...prev, res.data]);
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} style={styles.form}>
      <div style={styles.formHeader}>
        <h3 style={styles.formTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.titleIcon}>
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#2563eb"/>
            <path d="M11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" fill="#2563eb"/>
          </svg>
          Add New Task
        </h3>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.fieldIcon}>
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="#2563eb"/>
          </svg>
          Task Title *
        </label>
        <input
          style={styles.input}
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.fieldIcon}>
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM16 11H8V9H16V11ZM16 15H8V13H16V15ZM16 19H8V17H16V19Z" fill="#2563eb"/>
          </svg>
          Description <span style={styles.optional}>(optional)</span>
        </label>
        <textarea
          style={styles.textarea}
          placeholder="Add any details or notes about this task..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows="3"
          disabled={isSubmitting}
        />
      </div>

      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.fieldIcon}>
              <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3 4.9 3 6V20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM5 8V6H19V8H5Z" fill="#2563eb"/>
            </svg>
            Due Date
          </label>
          <div style={styles.dateContainer}>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              style={styles.dateInput}
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <div style={styles.buttonContainer}>
          <button 
            style={isSubmitting ? { ...styles.button, ...styles.buttonLoading } : styles.button}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <span style={styles.buttonContent}>
                <span style={styles.spinner}></span>
                Adding...
              </span>
            ) : (
              <span style={styles.buttonContent}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.buttonIcon}>
                  <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
                </svg>
                Add Task
              </span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    padding: 32,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  
  formHeader: {
    marginBottom: 8,
  },
  
  formTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
    color: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  
  titleIcon: {
    flexShrink: 0,
  },
  
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: '#334155',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  
  fieldIcon: {
    flexShrink: 0,
  },
  
  optional: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: 400,
    marginLeft: 4,
  },
  
  input: {
    padding: '14px 16px',
    borderRadius: 12,
    border: '1.5px solid #e2e8f0',
    fontSize: 15,
    outline: 'none',
    transition: 'all 0.2s ease',
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    fontFamily: 'inherit',
  },
  
  textarea: {
    padding: '14px 16px',
    borderRadius: 12,
    border: '1.5px solid #e2e8f0',
    fontSize: 15,
    outline: 'none',
    transition: 'all 0.2s ease',
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    fontFamily: 'inherit',
    resize: 'vertical',
    minHeight: 100,
  },
  
  row: {
    display: 'flex',
    gap: 16,
    alignItems: 'flex-end',
  },
  
  dateContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  
  dateInput: {
    flex: 1,
    padding: '14px 16px',
    borderRadius: 12,
    border: '1.5px solid #e2e8f0',
    fontSize: 15,
    outline: 'none',
    transition: 'all 0.2s ease',
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    fontFamily: 'inherit',
  },
  
  buttonContainer: {
    marginBottom: 8,
  },
  
  button: {
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: '#ffffff',
    border: 'none',
    padding: '14px 28px',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
    letterSpacing: '0.01em',
    minWidth: 140,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonLoading: {
    opacity: 0.8,
    cursor: 'not-allowed',
  },
  
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  
  buttonIcon: {
    flexShrink: 0,
  },
  
  spinner: {
    width: 18,
    height: 18,
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: '#ffffff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

// animasi spinner
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);


export default TaskForm;