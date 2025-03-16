import React, { useState } from "react";

function ResumeAnalyzer({ text }) {
  const [score, setScore] = useState(null);
  const keywords = [
    "React",
    "JavaScript",
    "Node.js",
    "CSS",
    "MongoDB",
    "Python",
  ];

  const analyzeResume = () => {
    let matchCount = keywords.filter((word) => text.includes(word)).length;
    let finalScore = ((matchCount / keywords.length) * 100).toFixed(2);
    setScore(finalScore);
  };

  return (
    <div className="container text-center mt-4">
      <h3>Resume Analysis</h3>
      <button className="btn btn-primary mt-2" onClick={analyzeResume}>
        Analyze Resume
      </button>
      {score !== null && (
        <div className="alert alert-info mt-3">
          <h5>Resume Score: {score}%</h5>
          <p>
            {score > 50
              ? "Great job! Your resume is strong."
              : "Consider improving your resume with more relevant skills."}
          </p>
        </div>
      )}
    </div>
  );
}

export default ResumeAnalyzer;
