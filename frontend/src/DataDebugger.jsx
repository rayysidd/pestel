function DataDebugger({ analysisResult, companyName, sector }) {
  return (
    <div className="debugger">
      <h3>Data Debugger</h3>
      <div className="debug-section">
        <h4>Input Data</h4>
        <p><strong>Company:</strong> {companyName}</p>
        <p><strong>Sector:</strong> {sector}</p>
      </div>
      <div className="debug-section">
        <h4>Analysis Result</h4>
        <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
      </div>
    </div>
  );
}

export default DataDebugger;