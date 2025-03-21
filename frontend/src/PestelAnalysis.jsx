import { useState, useEffect } from 'react';
import axios from "axios";
import AnalysisForm from './AnalysisForm';
import AnalysisResult from './AnalysisResult';
import SavedAnalyses from './SavedAnalyses';
import DataDebugger from './DataDebugger';

const API_URL = "http://localhost:5002/api/analysis";

function PestelAnalysis() {
  const [companyName, setCompanyName] = useState('');
  const [sector, setSector] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedAnalyses, setSavedAnalyses] = useState([]);
  const [activeTab, setActiveTab] = useState('form');
  const [showDebugger, setShowDebugger] = useState(false); // Set to true to show debugger

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

  const fetchPestelAnalysis = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5002/api/generate-pestel', {
        company: companyName,
        sector: sector,
      });
      // If analysis is a markdown string, parse it into an object.
      let data = response.data;
      
      if (!data || !data.analysis) {
        setAnalysisResult({ message: "Pestel analysis could not be generated. Please try again later." });
        return;
      }

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
          <AnalysisForm 
            companyName={companyName}
            sector={sector}
            setCompanyName={setCompanyName}
            setSector={setSector}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
          
          {isLoading ? (
            <div className="loader">
              <div className="loader-dot"></div>
              <div className="loader-dot"></div>
              <div className="loader-dot"></div>
            </div>
          ) : analysisResult ? (
            <AnalysisResult 
              analysisResult={analysisResult}
              companyName={companyName}
              sector={sector}
              saveAnalysis={saveAnalysis}
              formatDate={formatDate}
            />
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
        <SavedAnalyses 
          savedAnalyses={savedAnalyses}
          formatDate={formatDate}
          viewAnalysis={viewAnalysis}
          deleteAnalysis={deleteAnalysis}
        />
      )}
    </>
  );
}

export default PestelAnalysis;