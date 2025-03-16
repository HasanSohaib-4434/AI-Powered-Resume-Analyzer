import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ResumeUploader from "./components/ResumeUploader.jsx";
import ResumeAnalyzer from "./components/ResumeAnalyzer.jsx";

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <div className="container">
      <h2 className="text-center mt-3">AI-Powered Resume Analyzer</h2>
      <ResumeUploader onAnalysisComplete={setAnalysisResult} />

      {analysisResult && (
        <div className="mt-4 p-3 border">
          <h4>Analysis Result:</h4>
          <p><strong>Matching Skills:</strong> {analysisResult.matchedSkills.join(", ") || "None"}</p>
          <p><strong>Resume Score:</strong> {analysisResult.score}</p>
          <pre className="mt-3 p-2 border">{analysisResult.text.substring(0, 500)}...</pre>
        </div>
      )}
    </div>
  );
}
export default App;
