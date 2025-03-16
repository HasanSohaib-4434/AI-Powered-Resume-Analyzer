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
    <div className="container text-center mt-4">
      <h3>Upload Resume</h3>
      <input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="form-control" />
      <button className="btn btn-success mt-3" onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload & Analyze"}
      </button>
    </div>
  );
};

export default ResumeUploader;
