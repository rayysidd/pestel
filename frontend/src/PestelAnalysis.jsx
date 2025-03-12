import { useState } from "react";
import AnalysisForm from "./AnalysisForm";
import SavedAnalyses from "./SavedAnalyses";
import AnalysisResult from "./AnalysisResult";

const PestelAnalysis = ({ companyName, setCompanyName, sector, setSector, analysisResult, setAnalysisResult, savedAnalyses, setSavedAnalyses, fetchPestelAnalysis, isLoading, saveAnalysis, deleteAnalysis, viewAnalysis, showDebugger }) => {
  const [activeTab, setActiveTab] = useState("form");

  return (
    <>
      <div className="tabs">
        <button className={`tab ${activeTab === "form" ? "active" : ""}`} onClick={() => setActiveTab("form")}>
          Generate Analysis
        </button>
        <button className={`tab ${activeTab === "saved" ? "active" : ""}`} onClick={() => setActiveTab("saved")}>
          Saved Analyses ({savedAnalyses.length})
        </button>
      </div>

      {activeTab === "form" ? (
        <>
          <AnalysisForm 
            companyName={companyName} setCompanyName={setCompanyName} 
            sector={sector} setSector={setSector} 
            fetchPestelAnalysis={fetchPestelAnalysis} isLoading={isLoading} 
          />
          <AnalysisResult analysisResult={analysisResult} saveAnalysis={saveAnalysis} isLoading={isLoading} />
        </>
      ) : (
        <SavedAnalyses savedAnalyses={savedAnalyses} viewAnalysis={viewAnalysis} deleteAnalysis={deleteAnalysis} />
      )}
    </>
  );
};

export default PestelAnalysis;
