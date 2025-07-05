import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import NewsPage from './NewsPage';
import PestelAnalysis from './PestelAnalysis';

function Portfolio() {
  return (
    <>
      <h1>Portfolio Analysis</h1>
      <div className="data-box">
        <p>Track and analyze your portfolio performance with our advanced analytics tools.</p>
        <p>This feature is coming soon.</p>
      </div>
    </>
  );
}

function Contact() {
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
}

function App() {
  return (
    <Router>
      <div className="header">
        <span>PESTEL ANALYSIS DASHBOARD</span>
      </div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pestel" element={<PestelAnalysis />} />
          <Route path="/reports" element={<NewsPage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
