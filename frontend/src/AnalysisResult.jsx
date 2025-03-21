function AnalysisResult({ analysisResult, companyName, sector, saveAnalysis, formatDate }) {
  return (
    <div className="data-box">
      <h2>{analysisResult.company || companyName} - PESTEL Analysis</h2>
      <p><strong>Sector:</strong> {analysisResult.sector || sector}</p>
      <p><strong>Date:</strong> {formatDate(analysisResult.date || analysisResult.savedAt)}</p>
      
      <div className="all-Factors">
        <div className="Factors political">
          <h3>Political Factors</h3>
          <p>{analysisResult.analysis?.political || "Invalid Information Entered!"}</p>
        </div>
      
        <div className="Factors economic">
          <h3>Economic Factors</h3>
          <p>{analysisResult.analysis?.economic || "Invalid Information Entered!"}</p>
        </div>

        <div className="Factors social">
          <h3>Social Factors</h3>
          <p>{analysisResult.analysis?.social || "Invalid Information Entered!"}</p>      
        </div>
      
        <div className="Factors technological">
          <h3>Technological Factors</h3>
          <p>{analysisResult.analysis?.technological || "Invalid Information Entered!"}</p>
        </div>
      
        <div className="Factors environmental">
          <h3>Environmental Factors</h3>
          <p>{analysisResult.analysis?.environmental || "Invalid Information Entered!"}</p>
        </div>
      
        <div className="Factors legal">
          <h3>Legal Factors</h3>
          <p>{analysisResult.analysis?.legal || "Invalid Information Entered!"}</p>
        </div>
      </div>
      
      <button className="btn btn-success" onClick={saveAnalysis}>
        Save Analysis
      </button>
    </div>
  );
}

export default AnalysisResult;