const SavedAnalyses = ({ savedAnalyses, viewAnalysis, deleteAnalysis }) => {
    return (
      <div className="saved-analyses-container">
        <h2>Saved PESTEL Analyses</h2>
        {savedAnalyses.length > 0 ? (
          <div className="saved-analyses">
            {savedAnalyses.map((analysis) => (
              <div className="analysis-card" key={analysis._id}>
                <h3>{analysis.company}</h3>
                <p><strong>Sector:</strong> {analysis.sector}</p>
                <button className="btn btn-secondary" onClick={() => viewAnalysis(analysis)}>View</button>
                <button className="btn btn-danger" onClick={() => deleteAnalysis(analysis._id)}>Delete</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No saved analyses yet.</p>
        )}
      </div>
    );
  };
  
  export default SavedAnalyses;
  