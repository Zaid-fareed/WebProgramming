import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  const headerStyle = {
    background: '#242424',
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    position: 'sticky',
    top: 0
  };

  const linkStyle = {
    color: '#646cff',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    transition: 'color 0.3s'
  };

  return (
    <Router>
      <nav style={headerStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
      </nav>

      <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;