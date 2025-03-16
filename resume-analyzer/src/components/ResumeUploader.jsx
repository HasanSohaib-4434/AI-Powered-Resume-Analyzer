import React, { useState } from "react";
import axios from "axios";

const ResumeUploader = ({ onAnalysisComplete }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume file.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onAnalysisComplete(response.data);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-100 max-w-md mx-auto text-center">
      <h3 className="mb-4">Upload Your Resume</h3>
      <div className="mb-3">
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="form-control form-control-lg"
        />
      </div>
      <button
        className={`btn btn-lg btn-primary mt-3 ${uploading ? "disabled" : ""}`}
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload & Analyze"}
      </button>
    </div>
  );
};

export default ResumeUploader;