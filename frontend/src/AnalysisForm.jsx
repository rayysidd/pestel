function AnalysisForm({ companyName, sector, setCompanyName, setSector, handleSubmit, isLoading }) {
  return (
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
  );
}

export default AnalysisForm;