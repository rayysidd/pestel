import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // States
  const [activePage, setActivePage] = useState('Home')
  const [companyName, setCompanyName] = useState('')
  const [sector, setSector] = useState('')
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [savedAnalyses, setSavedAnalyses] = useState([])
  const [activeTab, setActiveTab] = useState('form')
  
  // Load saved analyses from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedPestelAnalyses')
    if (saved) {
      setSavedAnalyses(JSON.parse(saved))
    }
  }, [])

  const handleNavClick = (page) => {
    setActivePage(page)
    
    if (page === 'PESTEL analysis') {
      setActiveTab('form')
    }
  }

  // Mock function to simulate API call
  const fetchPestelAnalysis = async () => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock response
    const mockResponse = {
      company: companyName,
      sector: sector,
      date: new Date().toISOString(),
      analysis: {
        political: `Political factors affecting ${companyName} in the ${sector} sector include government regulations, trade policies, and political stability in key markets.`,
        economic: `Economic factors include market growth rate, inflation, interest rates, and economic stability in regions where ${companyName} operates.`,
        social: `Social trends affecting ${companyName} include changing consumer preferences, demographic shifts, and cultural factors influencing purchasing decisions.`,
        technological: `${companyName} must consider technological advancements in the ${sector} sector, digital transformation trends, and innovation requirements.`,
        environmental: `Environmental considerations include sustainability practices, carbon footprint reduction, and compliance with environmental regulations.`,
        legal: `Legal factors affecting ${companyName} include industry-specific regulations, data protection laws, and intellectual property considerations.`
      }
    }
    
    setAnalysisResult(mockResponse)
    setIsLoading(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (companyName.trim() && sector.trim()) {
      fetchPestelAnalysis()
    }
  }

  const saveAnalysis = () => {
    if (analysisResult) {
      const newSavedAnalyses = [
        ...savedAnalyses,
        {
          id: Date.now(),
          ...analysisResult,
          savedAt: new Date().toISOString()
        }
      ]
      
      setSavedAnalyses(newSavedAnalyses)
      localStorage.setItem('savedPestelAnalyses', JSON.stringify(newSavedAnalyses))
      alert('Analysis saved successfully!')
    }
  }

  const deleteAnalysis = (id) => {
    const confirmed = confirm('Are you sure you want to delete this analysis?')
    if (confirmed) {
      const updatedAnalyses = savedAnalyses.filter(analysis => analysis.id !== id)
      setSavedAnalyses(updatedAnalyses)
      localStorage.setItem('savedPestelAnalyses', JSON.stringify(updatedAnalyses))
    }
  }

  const viewAnalysis = (analysis) => {
    setAnalysisResult(analysis)
    setActiveTab('form')
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

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
                <h2>{analysisResult.company} - PESTEL Analysis</h2>
                <p><strong>Sector:</strong> {analysisResult.sector}</p>
                <p><strong>Date:</strong> {formatDate(analysisResult.date)}</p>
                
                <h3>Political Factors</h3>
                <p>{analysisResult.analysis.political}</p>
                
                <h3>Economic Factors</h3>
                <p>{analysisResult.analysis.economic}</p>
                
                <h3>Social Factors</h3>
                <p>{analysisResult.analysis.social}</p>
                
                <h3>Technological Factors</h3>
                <p>{analysisResult.analysis.technological}</p>
                
                <h3>Environmental Factors</h3>
                <p>{analysisResult.analysis.environmental}</p>
                
                <h3>Legal Factors</h3>
                <p>{analysisResult.analysis.legal}</p>
                
                <h3>Raw API Response</h3>
                <pre className="analysis-result">
                  {JSON.stringify(analysisResult, null, 2)}
                </pre>
                
                <button className="btn btn-success" onClick={saveAnalysis}>
                  Save Analysis
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="saved-analyses-container">
            <h2>Saved PESTEL Analyses</h2>
            
            {savedAnalyses.length > 0 ? (
              <div className="saved-analyses">
                {savedAnalyses.map(analysis => (
                  <div className="analysis-card" key={analysis.id}>
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
                        onClick={() => deleteAnalysis(analysis.id)}
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
    )
  }

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
        )
      case 'PESTEL analysis':
        return renderPestelContent()
      case 'Markets Reports':
        return (
          <>
            <h1>Market Reports</h1>
            <div className="data-box">
              <p>Our comprehensive market reports provide in-depth analysis of industry trends, competitive landscapes, and growth opportunities.</p>
              <p>This feature is coming soon.</p>
            </div>
          </>
        )
      case 'Portfolio':
        return (
          <>
            <h1>Portfolio Analysis</h1>
            <div className="data-box">
              <p>Track and analyze your portfolio performance with our advanced analytics tools.</p>
              <p>This feature is coming soon.</p>
            </div>
          </>
        )
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
        )
      default:
        return null
    }
  }

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
  )
}

export default App