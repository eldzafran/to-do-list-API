import TaskForm from './TaskForm';
import TaskList from './TaskList';

function Dashboard({ tasks, setTasks, logout }) {
  const getPendingTasks = () => tasks.filter(task => task.status === 'pending').length;
  const getCompletedTasks = () => tasks.filter(task => task.status === 'done').length;

  return (
    <div style={styles.page}>
      {/* background*/}
      <div style={styles.decorativeCircle1}></div>
      <div style={styles.decorativeCircle2}></div>
      
      {/* header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
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

          <button onClick={logout} style={styles.logoutButton}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.logoutIcon}>
              <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="currentColor"/>
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* koten utama */}
      <main style={styles.main}>
        <div style={styles.container}>
          {}
          <div style={styles.statsSection}>
            <div style={styles.statCard}>
              <div style={styles.statIconContainer}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM10 17H8V11H10V17ZM16 17H14V7H16V17ZM12 17H12V13H12V17Z" fill="#2563eb"/>
                </svg>
              </div>
              <div style={styles.statContent}>
                <h3 style={styles.statTitle}>Total Tasks</h3>
                <p style={styles.statValue}>{tasks.length}</p>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIconContainer}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#f59e0b"/>
                  <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6Z" fill="#f59e0b" opacity="0.6"/>
                </svg>
              </div>
              <div style={styles.statContent}>
                <h3 style={styles.statTitle}>Pending</h3>
                <p style={styles.statValue}>{getPendingTasks()}</p>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIconContainer}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#10b981"/>
                </svg>
              </div>
              <div style={styles.statContent}>
                <h3 style={styles.statTitle}>Completed</h3>
                <p style={styles.statValue}>{getCompletedTasks()}</p>
              </div>
            </div>
          </div>

          {/* task form*/}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.sectionIcon}>
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#2563eb"/>
                  <path d="M11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" fill="#2563eb"/>
                </svg>
                Add New Task
              </h2>
            </div>
            <div style={styles.formCard}>
              <TaskForm setTasks={setTasks} />
            </div>
          </div>

          {/* task list*/}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.sectionIcon}>
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM10 17H8V11H10V17ZM16 17H14V7H16V17ZM12 17H12V13H12V17Z" fill="#2563eb"/>
                </svg>
                Your Tasks
              </h2>
              <div style={styles.taskStats}>
                <span style={styles.taskStat}>
                  <span style={styles.taskStatDot}></span>
                  Total: {tasks.length}
                </span>
                <span style={styles.taskStat}>
                  <span style={{...styles.taskStatDot, background: '#f59e0b'}}></span>
                  Pending: {getPendingTasks()}
                </span>
                <span style={styles.taskStat}>
                  <span style={{...styles.taskStatDot, background: '#10b981'}}></span>
                  Completed: {getCompletedTasks()}
                </span>
              </div>
            </div>
            <div style={styles.taskListCard}>
              <TaskList tasks={tasks} setTasks={setTasks} />
            </div>
          </div>
        </div>
      </main>

      {/* footer */}
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
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    position: 'relative',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
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
  
  header: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid #e2e8f0',
    padding: '20px 40px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  },
  
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    padding: '12px 24px',
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
  
  main: {
    flex: 1,
    padding: '40px',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    zIndex: 2,
    position: 'relative',
  },
  
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  },
  
  statsSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 24,
  },
  
  statCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: 24,
    borderRadius: 16,
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    transition: 'all 0.2s ease',
  },
  
  statIconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderRadius: 12,
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
  },
  
  statContent: {
    flex: 1,
  },
  
  statTitle: {
    margin: '0 0 8px 0',
    fontSize: 14,
    fontWeight: 500,
    color: '#64748b',
  },
  
  statValue: {
    margin: 0,
    fontSize: 32,
    fontWeight: 700,
    color: '#1e293b',
    lineHeight: 1,
  },
  
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
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
  
  taskStats: {
    display: 'flex',
    gap: 20,
  },
  
  taskStat: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
    color: '#64748b',
    fontWeight: 500,
  },
  
  taskStatDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#2563eb',
  },
  
  formCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: 16,
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
  },
  
  taskListCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: 16,
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    padding: 24,
  },
  
  footer: {
    padding: '24px 40px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid #e2e8f0',
    marginTop: 'auto',
  },
  
  footerText: {
    margin: 0,
    fontSize: 13,
    color: '#94a3b8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    textAlign: 'center',
  },
  
  footerIcon: {
    flexShrink: 0,
  },
};
export default Dashboard;