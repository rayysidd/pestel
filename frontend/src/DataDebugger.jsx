import React from 'react';

const DataDebugger = ({ analysisResult, companyName, sector }) => {
  return (
    <div className="debug-container" style={{ 
      marginTop: '20px', 
      padding: '16px', 
      border: '2px dashed red', 
      backgroundColor: '#fff8f8' 
    }}>
      <h3>Debug Information</h3>
      
      <div>
        <h4>State Variables:</h4>
        <pre>companyName: "{companyName}"</pre>
        <pre>sector: "{sector}"</pre>
      </div>
      
      <div>
        <h4>Analysis Result Object:</h4>
        <pre style={{ whiteSpace: 'pre-wrap', overflow: 'auto', maxHeight: '400px' }}>
          {JSON.stringify(analysisResult, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default DataDebugger;