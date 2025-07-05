import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const current = location.pathname;

  return (
    <div className="nav-bar">
      <Link to="/" className={current === '/' ? 'active' : ''}>Home</Link>
      <Link to="/pestel" className={current === '/pestel' ? 'active' : ''}>PESTEL Analysis</Link>
      <Link to="/reports" className={current === '/reports' ? 'active' : ''}>Market Reports</Link>
      <Link to="/portfolio" className={current === '/portfolio' ? 'active' : ''}>Portfolio</Link>
      <Link to="/contact" className={current === '/contact' ? 'active' : ''}>Contact</Link>
    </div>
  );
}

export default Navbar;
