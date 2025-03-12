const AnalysisResult = ({ analysisResult, saveAnalysis, isLoading }) => {
    if (isLoading) return <div>Loading...</div>;
    if (!analysisResult) return null;
  
    return (
      <div className="data-box">
        <h2>{analysisResult.company} - PESTEL Analysis</h2>
        <p><strong>Sector:</strong> {analysisResult.sector}</p>
        <button className="btn btn-success" onClick={saveAnalysis}>Save Analysis</button>
      </div>
    );
  };
  
  export default AnalysisResult;
  