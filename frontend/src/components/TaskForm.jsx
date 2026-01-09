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
      <div style={styles.inputGroup}>
        <div style={styles.inputIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#2563cf"/>
            <path d="M11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" fill="#2563cf"/>
          </svg>
        </div>
        <input
          style={styles.input}
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.inputIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="#2563cf"/>
            <path d="M14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" fill="#2563cf"/>
          </svg>
        </div>
        <textarea
          style={styles.textarea}
          placeholder="Add description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows="3"
        />
      </div>

      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <div style={styles.inputIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3 4.9 3 6V20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM5 8V6H19V8H5Z" fill="#2563cf"/>
            </svg>
          </div>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            style={styles.date}
          />
        </div>
        
        <button 
          style={isSubmitting ? {...styles.button, ...styles.buttonSubmitting} : styles.button}
          disabled={isSubmitting}
        >
          <span style={styles.buttonContent}>
            {isSubmitting ? (
              <>
                <svg style={styles.spinner} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" stroke="url(#gradient)" opacity="0.3"/>
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5"/>
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="1"/>
                    </linearGradient>
                  </defs>
                </svg>
                Adding...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.buttonIcon}>
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="white"/>
                  <path d="M11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" fill="white"/>
                </svg>
                Add Task
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '40px',
    padding: '30px',
    background: '#ffffff',
    borderRadius: '18px',
    border: '1px solid #f1f5ff',
    boxShadow: '0 8px 24px rgba(37, 99, 207, 0.06)'
  },
  inputGroup: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    flex: 1,
    padding: '16px 16px 16px 48px',
    borderRadius: '14px',
    border: '2px solid #eef2ff',
    fontSize: '15px',
    fontWeight: '500',
    color: '#1e293b',
    background: '#ffffff',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
  },
  textarea: {
    flex: 1,
    padding: '16px 16px 16px 48px',
    borderRadius: '14px',
    border: '2px solid #eef2ff',
    fontSize: '15px',
    fontWeight: '500',
    color: '#1e293b',
    background: '#ffffff',
    transition: 'all 0.3s ease',
    outline: 'none',
    resize: 'none',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    minHeight: '100px',
    boxSizing: 'border-box'
  },
  row: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },
  date: {
    flex: 1,
    padding: '16px 16px 16px 48px',
    borderRadius: '14px',
    border: '2px solid #eef2ff',
    fontSize: '15px',
    fontWeight: '500',
    color: '#1e293b',
    background: '#ffffff',
    transition: 'all 0.3s ease',
    outline: 'none',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    boxSizing: 'border-box'
  },
  button: {
    background: 'linear-gradient(135deg, #2563cf 0%, #3b82f6 100%)',
    color: '#ffffff',
    border: 'none',
    padding: '16px 32px',
    borderRadius: '14px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    minWidth: '140px',
    boxShadow: '0 6px 20px rgba(37, 99, 207, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
  },
  buttonSubmitting: {
    opacity: '0.8',
    cursor: 'not-allowed'
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  buttonIcon: {
    transition: 'transform 0.3s ease'
  },
  spinner: {
    animation: 'spin 1s linear infinite'
  }
};

// Menambahkan efek hover dan focus untuk input
const addFormStyles = `
  input:focus, textarea:focus, input[type="date"]:focus {
    border-color: #2563cf;
    box-shadow: 0 0 0 3px rgba(37, 99, 207, 0.1);
  }
  
  input:hover, textarea:hover, input[type="date"]:hover {
    border-color: #c7d2fe;
  }
  
  button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(37, 99, 207, 0.25);
  }
  
  button:active:not(:disabled) {
    transform: translateY(0);
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  ::placeholder {
    color: #94a3b8;
    font-weight: 400;
  }
  
  /* Style untuk date picker icon */
  input[type="date"]::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

// Menambahkan styles ke document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = addFormStyles;
  document.head.appendChild(styleElement);
}

export default TaskForm;