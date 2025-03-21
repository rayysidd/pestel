import { useState } from 'react';
import './App.css';
import './index.css'
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import PestelAnalysis from './PestelAnalysis';

function App() {
  const [activePage, setActivePage] = useState('Home');

  const handleNavClick = (page) => {
    setActivePage(page);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'Home':
        return <Home onStartAnalysis={() => handleNavClick('PESTEL analysis')} />;
      case 'PESTEL analysis':
        return <PestelAnalysis />;
      case 'Markets Reports':
        return (
          <>
            <h1>Market Reports</h1>
            <div className="data-box">
              <p>Our comprehensive market reports provide in-depth analysis of industry trends, competitive landscapes, and growth opportunities.</p>
              <p>This feature is coming soon.</p>
            </div>
          </>
        );
      case 'Portfolio':
        return (
          <>
            <h1>Portfolio Analysis</h1>
            <div className="data-box">
              <p>Track and analyze your portfolio performance with our advanced analytics tools.</p>
              <p>This feature is coming soon.</p>
            </div>
          </>
        );
      case 'Contact':
        return (
          <>
            <h1>Contact Us</h1>
            <div className="data-box">
              <p>Have questions or feedback? We'd love to hear from you.</p>
              <p>Email: contact@pestelanalysis.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="header">
        <span>PESTEL ANALYSIS DASHBOARD</span>
      </div>
      <Navbar activePage={activePage} handleNavClick={handleNavClick} />
      <div className="container">
        {renderContent()}
      </div>
      <Footer />
    </>
  );
}

export default App;