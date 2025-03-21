function SavedAnalyses({ savedAnalyses, formatDate, viewAnalysis, deleteAnalysis }) {
  return (
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
  );
}

export default SavedAnalyses;