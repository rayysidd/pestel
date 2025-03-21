function Home({ onStartAnalysis }) {
  return (
    <>
      <h1>Welcome to PESTEL Analysis Dashboard</h1>
      <div className="data-box" id="financialData">
        Create comprehensive PESTEL Analysis of any sector and company using advanced AI technology. Our platform enables you to generate detailed insights across Political, Economic, Social, Technological, Environmental, and Legal factors that impact business performance.
        <div style={{ marginTop: '20px' }}>
          <button className="btn btn-primary" onClick={onStartAnalysis}>
            Start Your Analysis
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;