const Home = ({ handleNavClick }) => {
    return (
      <>
        <h1>Welcome to PESTEL Analysis Dashboard</h1>
        <div className="data-box">
          Create comprehensive PESTEL Analysis of any sector and company using advanced AI.
          <div style={{ marginTop: "20px" }}>
            <button className="btn btn-primary" onClick={() => handleNavClick("PESTEL analysis")}>
              Start Your Analysis
            </button>
          </div>
        </div>
      </>
    );
  };
  
  export default Home;
  