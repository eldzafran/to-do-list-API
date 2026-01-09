import TaskForm from './TaskForm';
import TaskList from './TaskList';

function Dashboard({ tasks, setTasks, logout }) {
  return (
    <div style={styles.page}>
      {/* Decorative elements - sama dengan login dan register */}
      <div style={styles.decorativeCircle1}></div>
      <div style={styles.decorativeCircle2}></div>
      
      <div style={styles.container}>
        <div style={styles.card}>
          <header style={styles.header}>
            <div style={styles.headerLeft}>
              <div style={styles.logoContainer}>
                <div style={styles.logo}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h1 style={styles.appTitle}>TaskFlow</h1>
                  <p style={styles.appSubtitle}>Manage your tasks efficiently</p>
                </div>
              </div>
            </div>

            <button onClick={logout} style={styles.logoutButton}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.logoutIcon}>
                <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="currentColor"/>
              </svg>
              Logout
            </button>
          </header>

          <div style={styles.content}>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.sectionIcon}>
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM10 17H8V11H10V17ZM16 17H14V7H16V17ZM12 17H12V13H12V17Z" fill="#2563eb"/>
                </svg>
                Add New Task
              </h2>
              <TaskForm setTasks={setTasks} />
            </div>

            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.sectionIcon}>
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM10 17H8V11H10V17ZM16 17H14V7H16V17ZM12 17H12V13H12V17Z" fill="#2563eb"/>
                  </svg>
                  Your Tasks
                  <span style={styles.taskCount}>{tasks.length}</span>
                </h2>
                <div style={styles.stats}>
                  <span style={styles.stat}>
                    Pending: {tasks.filter(t => !t.completed).length}
                  </span>
                  <span style={styles.stat}>
                    Completed: {tasks.filter(t => t.completed).length}
                  </span>
                </div>
              </div>
              <TaskList tasks={tasks} setTasks={setTasks} />
            </div>
          </div>

          <footer style={styles.footer}>
            <p style={styles.footerText}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.footerIcon}>
                <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z" fill="#94a3b8"/>
                <path d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#94a3b8"/>
              </svg>
              TaskFlow Dashboard • Keep track of what matters
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    position: 'relative',
    overflow: 'auto',
    padding: '20px',
  },
  
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: 900,
    margin: '0 auto',
    zIndex: 2,
  },
  
  decorativeCircle1: {
    position: 'fixed',
    top: '-100px',
    right: '-80px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0.03) 100%)',
    zIndex: 1,
  },
  
  decorativeCircle2: {
    position: 'fixed',
    bottom: '-120px',
    left: '-100px',
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(37, 99, 235, 0.01) 100%)',
    zIndex: 1,
  },
  
  card: {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '32px 40px',
    borderRadius: 24,
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.02)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 2,
  },
  
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottom: '1px solid #e2e8f0',
  },
  
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 12,
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    border: '1px solid rgba(37, 99, 235, 0.1)',
  },
  
  appTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 700,
    color: '#1e293b',
    letterSpacing: '-0.025em',
  },
  
  appSubtitle: {
    margin: '4px 0 0 0',
    fontSize: 14,
    color: '#64748b',
    fontWeight: 400,
  },
  
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    color: '#64748b',
    border: 'none',
    padding: '12px 20px',
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    letterSpacing: '0.01em',
  },
  
  logoutIcon: {
    flexShrink: 0,
  },
  
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  },
  
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  
  sectionTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 600,
    color: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  
  sectionIcon: {
    flexShrink: 0,
  },
  
  taskCount: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 24,
    height: 24,
    padding: '0 8px',
    background: '#eff6ff',
    color: '#2563eb',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600,
    marginLeft: 8,
  },
  
  stats: {
    display: 'flex',
    gap: 16,
  },
  
  stat: {
    padding: '6px 12px',
    background: '#f8fafc',
    color: '#64748b',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    border: '1px solid #e2e8f0',
  },
  
  footer: {
    marginTop: 40,
    paddingTop: 24,
    borderTop: '1px solid #e2e8f0',
    textAlign: 'center',
  },
  
  footerText: {
    margin: 0,
    fontSize: 13,
    color: '#94a3b8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  
  footerIcon: {
    flexShrink: 0,
  },
};

// Add CSS for hover effects
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  .logout-button:hover {
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%) !important;
    color: #dc2626 !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.1) !important;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .section-stat:hover {
    background: #f1f5f9 !important;
    border-color: #cbd5e1 !important;
  }
`, styleSheet.cssRules.length);

// Apply the class names for hover effects
Object.assign(styles.logoutButton, { 
  ':hover': { 
    background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
    color: '#dc2626',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.1)',
  } 
});

Object.assign(styles.stat, { 
  ':hover': { 
    background: '#f1f5f9',
    borderColor: '#cbd5e1',
  } 
});

export default Dashboard;