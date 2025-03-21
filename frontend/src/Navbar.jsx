function Navbar({ activePage, handleNavClick }) {
  return (
    <div className="nav-bar">
      <a 
        href="#" 
        className={activePage === 'Home' ? 'active' : ''}
        onClick={() => handleNavClick('Home')}
      >
        Home
      </a>
      <a 
        href="#" 
        className={activePage === 'PESTEL analysis' ? 'active' : ''}
        onClick={() => handleNavClick('PESTEL analysis')}
      >
        PESTEL Analysis
      </a>
      <a 
        href="#" 
        className={activePage === 'Markets Reports' ? 'active' : ''}
        onClick={() => handleNavClick('Markets Reports')}
      >
        Market Reports
      </a>
      <a 
        href="#" 
        className={activePage === 'Portfolio' ? 'active' : ''}
        onClick={() => handleNavClick('Portfolio')}
      >
        Portfolio
      </a>
      <a 
        href="#" 
        className={activePage === 'Contact' ? 'active' : ''}
        onClick={() => handleNavClick('Contact')}
      >
        Contact
      </a>
    </div>
  );
}

export default Navbar;