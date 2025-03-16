import { useState } from "react";
import ResumeUploader from "./components/ResumeUploader";
import ResumeAnalyzer from "./components/ResumeAnalyzer";

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 py-5">
      <h2 className="mb-5 text-center">Resume Analyzer</h2>
      
      {!analysisResult ? (
        <ResumeUploader onAnalysisComplete={setAnalysisResult} />
      ) : (
        <div className="w-100 mt-4 p-4 border rounded shadow-lg">
          <h4 className="text-center mb-4">Analysis Result</h4>
          <ResumeAnalyzer
            text={analysisResult.text}
            matchedSkills={analysisResult.matchedSkills}
            score={analysisResult.score}
          />
        </div>
      )}
    </div>
  );
}

export default App;