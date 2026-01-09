import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API, { setAuthToken } from '../api';

function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validasi password
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);

    try {
      const res = await API.post('/register', {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      const token = res.data.data.token;
      setAuthToken(token);
      onRegister(token);
      
      setSuccess('Registration successful! Redirecting...');
      
      // Redirect setelah 1.5 detik
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Decorative elements - sama dengan login */}
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
            <h2 style={styles.title}>Create Account</h2>
            <p style={styles.subtitle}>Join us to manage your tasks efficiently</p>
          </div>

          <div style={styles.formGroup}>
            {/* Error Alert */}
            {error && (
              <div style={styles.errorAlert}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.errorIcon}>
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#ef4444"/>
                </svg>
                <span style={styles.alertText}>{error}</span>
              </div>
            )}

            {/* Success Alert */}
            {success && (
              <div style={styles.successAlert}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.successIcon}>
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#10b981"/>
                </svg>
                <span style={styles.alertText}>{success}</span>
              </div>
            )}

            {/* Name Field */}
            <div style={styles.field}>
              <label style={styles.label}>Full Name</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {/* Email Field */}
            <div style={styles.field}>
              <label style={styles.label}>Email Address</label>
              <input
                style={styles.input}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                style={styles.input}
                type="password"
                placeholder="•••••••• (min. 6 characters)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {/* Confirm Password Field */}
            <div style={styles.field}>
              <label style={styles.label}>Confirm Password</label>
              <input
                style={styles.input}
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
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
                Creating Account...
              </span>
            ) : 'Create Account'}
          </button>

          <p style={styles.footer}>
            Already have an account?{' '}
            <Link to="/login" style={styles.link}>
              Sign in
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
  
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: '#334155',
    letterSpacing: '0.01em',
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
  
  errorAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '14px 16px',
    background: '#fef2f2',
    borderRadius: 12,
    border: '1px solid #fecaca',
    fontSize: 14,
    color: '#dc2626',
  },
  
  successAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '14px 16px',
    background: '#f0fdf4',
    borderRadius: 12,
    border: '1px solid #bbf7d0',
    fontSize: 14,
    color: '#059669',
  },
  
  alertText: {
    fontWeight: 500,
  },
  
  errorIcon: {
    flexShrink: 0,
  },
  
  successIcon: {
    flexShrink: 0,
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
  .register-input:focus {
    border-color: #2563eb !important;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
    background-color: white !important;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .register-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.25) !important;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .register-link:hover {
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

Object.assign(styles.link, { 
  ':hover': { 
    color: '#1d4ed8' 
  } 
});

export default Register;