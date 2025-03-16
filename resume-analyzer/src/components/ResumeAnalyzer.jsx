import React from "react";

function ResumeAnalyzer({ text, matchedSkills, score }) {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="container mt-4">
        <h3 className="text-center">Resume Analysis Result</h3>
        <div className="alert alert-info mt-4">
          <h5 className="text-center">Resume Score: {score}</h5>
          {matchedSkills.length > 0 ? (
            <>
              <p><strong>Matching Skills:</strong> {matchedSkills.join(", ")}</p>
              <p>
                {score > 50
                  ? "Great job! Your resume is strong."
                  : "Consider improving your resume with more relevant skills."}
              </p>
            </>
          ) : (
            <p>No matching skills found. Consider adding more relevant skills to your resume.</p>
          )}
        </div>
        <h5>Extracted Text (Preview):</h5>
        <pre className="mt-3 p-2 border bg-light">{text.substring(0, 500)}...</pre>
      </div>
    </div>
  );
}

export default ResumeAnalyzer;
