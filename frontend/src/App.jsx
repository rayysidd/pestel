import { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
// Import the debugger component
// Create this component in a separate file named DataDebugger.jsx
import DataDebugger from './DataDebugger.jsx'; 

const API_URL = "http://localhost:5002/api/analysis";

function App() {
  // States
  const [activePage, setActivePage] = useState('Home');
  const [companyName, setCompanyName] = useState('');
  const [sector, setSector] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedAnalyses, setSavedAnalyses] = useState([]);
  const [activeTab, setActiveTab] = useState('form');
  const [showDebugger, setShowDebugger] = useState(true); // Set to true to show debugger

  // Helper function to parse markdown analysis string into an object
  const parseMarkdownToAnalysis = (markdown) => {
    const analysisObj = {};
    // Split the markdown string by double newlines to get each factor
    const entries = markdown.split("\n\n");
    entries.forEach(entry => {
      // Remove the leading bullet and any extra whitespace
      const cleanedEntry = entry.replace(/^\*\s*/, "").trim();
      // Split at the first colon
      const [keyPart, ...valueParts] = cleanedEntry.split(":");
      if (keyPart && valueParts.length > 0) {
        // Remove any markdown formatting from the key (like **)
        const key = keyPart.replace(/\*\*/g, "").trim().toLowerCase();
        const value = valueParts.join(":").trim();
        analysisObj[key] = value;
      }
    });
    return analysisObj;
  };
  

  // Load saved analyses on component mount
  useEffect(() => {
    axios.get(API_URL)
      .then((response) => setSavedAnalyses(response.data))
      .catch((error) => console.error("Error fetching saved analyses:", error));
  }, []); // Only on mount

  const handleNavClick = (page) => {
    setActivePage(page);
    if (page === 'PESTEL analysis') {
      setActiveTab('form');
    }
  };

  const fetchPestelAnalysis = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5002/api/generate-pestel', {
        company: companyName,
        sector: sector,
      });
      // If analysis is a markdown string, parse it into an object.
      let data = response.data;
      if (data && typeof data.analysis === 'string') {
        data.analysis = parseMarkdownToAnalysis(data.analysis);
      }
      if (!data.date) {
        data.date = new Date().toISOString();
      }
      if (!data.sector) {
        data.sector = sector;
      }
      console.log("New analysis data:", data);
      setAnalysisResult({ ...data });
    } catch (error) {
      console.error("Error fetching analysis:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!companyName.trim() && !sector.trim()) {
      alert("Please enter either a company name or sector.");
      return;
    }
    fetchPestelAnalysis();
  };

  const saveAnalysis = async () => {
    if (analysisResult) {
      try {
        const analysisToSave = {
          company: companyName,
          sector: sector,
          analysis: analysisResult.analysis,
          date: new Date().toISOString(),
          savedAt: new Date().toISOString()
        };
        console.log("Saving analysis:", analysisToSave);
        await axios.post(API_URL, analysisToSave);
        alert("Analysis saved successfully!");
        const response = await axios.get(API_URL);
        setSavedAnalyses(response.data);
      } catch (error) {
        console.error("Error saving analysis:", error);
      }
    }
  };

  const deleteAnalysis = async (id) => {
    if (window.confirm("Are you sure you want to delete this analysis?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setSavedAnalyses(savedAnalyses.filter((analysis) => analysis._id !== id));
      } catch (error) {
        console.error("Error deleting analysis:", error);
      }
    }
  };

  const viewAnalysis = (analysis) => {
    console.log("Viewing saved analysis:", analysis);
    
    // Set sector and company name from the saved analysis
    setCompanyName(analysis.company || "");
    setSector(analysis.sector || "");
    
    // Create a standardized analysis result object
    const standardizedResult = {
      company: analysis.company || "",
      sector: analysis.sector || "",
      date: analysis.date || analysis.savedAt || new Date().toISOString(),
      analysis: analysis.analysis || {}
    };
    
    console.log("Standardized analysis result:", standardizedResult);
    setAnalysisResult(standardizedResult);
    setActiveTab('form');
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date available";
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid date format";
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Error formatting date";
    }
  };

  const renderPestelContent = () => {
    return (
      <>
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            Generate Analysis
          </button>
          <button 
            className={`tab ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            Saved Analyses ({savedAnalyses.length})
          </button>
        </div>
        
        {activeTab === 'form' ? (
          <>
            <div className="analysis-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="companyName">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    className="form-control"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter company name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sector">Industry/Sector</label>
                  <input
                    type="text"
                    id="sector"
                    className="form-control"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    placeholder="Enter industry or sector"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? 'Generating Analysis...' : 'Generate PESTEL Analysis'}
                </button>
              </form>
            </div>
            {isLoading ? (
              <div className="loader">
                <div className="loader-dot"></div>
                <div className="loader-dot"></div>
                <div className="loader-dot"></div>
              </div>
            ) : analysisResult ? (
              <div className="data-box">
                <h2>{analysisResult.company || companyName} - PESTEL Analysis</h2>
                <p><strong>Sector:</strong> {analysisResult.sector || sector}</p>
                <p><strong>Date:</strong> {formatDate(analysisResult.date || analysisResult.savedAt)}</p>
                
                <h3>Political Factors</h3>
                <p>{analysisResult.analysis?.political || "No data available"}</p>
                <h3>Economic Factors</h3>
                <p>{analysisResult.analysis?.economic || "No data available"}</p>
                <h3>Social Factors</h3>
                <p>{analysisResult.analysis?.social || "No data available"}</p>
                <h3>Technological Factors</h3>
                <p>{analysisResult.analysis?.technological || "No data available"}</p>
                <h3>Environmental Factors</h3>
                <p>{analysisResult.analysis?.environmental || "No data available"}</p>
                <h3>Legal Factors</h3>
                <p>{analysisResult.analysis?.legal || "No data available"}</p>
                
                {/* Only show Raw API response in development mode
                {process.env.NODE_ENV === 'development' && (
                  <>
                    <h3>Raw API Response</h3>
                    <pre className="analysis-result">
                      {JSON.stringify(analysisResult, null, 2)}
                    </pre>
                  </>
                )} */}
                
                <button className="btn btn-success" onClick={saveAnalysis}>
                  Save Analysis
                </button>
              </div>
            ) : null}
            
            {/* Add debugger component */}
            {showDebugger && analysisResult && (
              <DataDebugger 
                analysisResult={analysisResult}
                companyName={companyName}
                sector={sector}
              />
            )}
          </>
        ) : (
          <div className="saved-analyses-container">
            <h2>Saved PESTEL Analyses</h2>
            {savedAnalyses.length > 0 ? (
              <div className="saved-analyses">
                {savedAnalyses.map(analysis => (
                  <div className="analysis-card" key={analysis._id}>
                    <h3>{analysis.company}</h3>
                    <div className="analysis-meta">
                      <p><strong>Sector:</strong> {analysis.sector}</p>
                      <p><strong>Saved:</strong> {formatDate(analysis.savedAt)}</p>
                    </div>
                    <div className="card-actions">
                      <button 
                        className="btn btn-secondary"
                        onClick={() => viewAnalysis(analysis)}
                      >
                        View
                      </button>
                      <button 
                        className="btn btn-danger"
                        onClick={() => deleteAnalysis(analysis._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No saved analyses yet. Generate and save your first PESTEL analysis!</p>
              </div>
            )}
          </div>
        )}
      </>
    );
  };

  const renderContent = () => {
    switch (activePage) {
      case 'Home':
        return (
          <>
            <h1>Welcome to PESTEL Analysis Dashboard</h1>
            <div className="data-box" id="financialData">
              Create comprehensive PESTEL Analysis of any sector and company using advanced AI technology. Our platform enables you to generate detailed insights across Political, Economic, Social, Technological, Environmental, and Legal factors that impact business performance.
              <div style={{ marginTop: '20px' }}>
                <button className="btn btn-primary" onClick={() => handleNavClick('PESTEL analysis')}>
                  Start Your Analysis
                </button>
              </div>
            </div>
          </>
        );
      case 'PESTEL analysis':
        return renderPestelContent();
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
      <div className="container">
        {renderContent()}
      </div>
      <div className="footer">&copy; 2025 PESTEL Analysis Dashboard. All rights reserved.</div>
    </>
  );
}

export default App;