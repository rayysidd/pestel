const Navbar = ({ activePage, handleNavClick }) => {
    return (
      <div className="nav-bar">
        {["Home", "PESTEL analysis", "Markets Reports", "Portfolio", "Contact"].map((page) => (
          <a
            key={page}
            href="#"
            className={activePage === page ? "active" : ""}
            onClick={() => handleNavClick(page)}
          >
            {page}
          </a>
        ))}
      </div>
    );
  };
  
  export default Navbar;
  