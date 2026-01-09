import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API, { setAuthToken } from '../api';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await API.post('/login', { email, password });
      const token = res.data.data.token;

      setAuthToken(token);
      onLogin(token);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Decorative elements */}
        <div style={styles.decorativeCircle1}></div>
        <div style={styles.decorativeCircle2}></div>
        
        <form onSubmit={handleSubmit} style={styles.card}>
          <div style={styles.header}>
            <div style={styles.logoContainer}>
              <div style={styles.logo}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 style={styles.appTitle}>TaskFlow</h1>
            </div>
            <h2 style={styles.title}>Welcome Back</h2>
            <p style={styles.subtitle}>Sign in to continue to your dashboard</p>
          </div>

          <div style={styles.formGroup}>
            <div style={styles.field}>
              <label style={styles.label}>Email Address</label>
              <input
                style={styles.input}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={styles.field}>
              <div style={styles.labelContainer}>
                <label style={styles.label}>Password</label>
                <Link to="/forgot-password" style={styles.forgotLink}>
                  Forgot password?
                </Link>
              </div>
              <input
                style={styles.input}
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            style={isLoading ? { ...styles.button, ...styles.buttonLoading } : styles.button}
            disabled={isLoading}
          >
            {isLoading ? (
              <span style={styles.buttonContent}>
                <span style={styles.spinner}></span>
                Signing in...
              </span>
            ) : 'Sign in to your account'}
          </button>

          <p style={styles.footer}>
            Don't have an account?{' '}
            <Link to="/register" style={styles.link}>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: 440,
    zIndex: 2,
  },
  
  decorativeCircle1: {
    position: 'absolute',
    top: '-100px',
    right: '-80px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0.03) 100%)',
    zIndex: 1,
  },
  
  decorativeCircle2: {
    position: 'absolute',
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
    padding: '48px 40px',
    borderRadius: 24,
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.02)',
    display: 'flex',
    flexDirection: 'column',
    gap: 28,
    position: 'relative',
    zIndex: 2,
  },
  
  header: {
    textAlign: 'center',
    marginBottom: 10,
  },
  
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
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
  
  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 700,
    color: '#0f172a',
    letterSpacing: '-0.025em',
  },
  
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: '#64748b',
    lineHeight: 1.5,
  },
  
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  
  labelContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: '#334155',
    letterSpacing: '0.01em',
  },
  
  forgotLink: {
    fontSize: 13,
    fontWeight: 500,
    color: '#2563eb',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
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
  },
  
  button: {
    marginTop: 8,
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: '#ffffff',
    border: 'none',
    padding: '16px',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
    letterSpacing: '0.01em',
  },
  
  buttonLoading: {
    opacity: 0.8,
    cursor: 'not-allowed',
  },
  
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  
  spinner: {
    width: 18,
    height: 18,
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: '#ffffff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  
  footer: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
    color: '#64748b',
  },
  
  link: {
    color: '#2563eb',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
};

// Add CSS for spinner animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

// Add hover effects
styleSheet.insertRule(`
  .login-input:focus {
    border-color: #2563eb !important;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
    background-color: white !important;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .login-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.25) !important;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .forgot-link:hover, .signup-link:hover {
    color: #1d4ed8 !important;
  }
`, styleSheet.cssRules.length);

// Apply the class names for hover effects
Object.assign(styles.input, { 
  ':focus': { 
    borderColor: '#2563eb', 
    boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)', 
    backgroundColor: 'white' 
  } 
});

Object.assign(styles.button, { 
  ':hover': { 
    transform: 'translateY(-1px)', 
    boxShadow: '0 6px 16px rgba(37, 99, 235, 0.25)' 
  } 
});

Object.assign(styles.forgotLink, { 
  ':hover': { 
    color: '#1d4ed8' 
  } 
});

Object.assign(styles.link, { 
  ':hover': { 
    color: '#1d4ed8' 
  } 
});

export default Login;