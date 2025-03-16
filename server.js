const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const keywordExtractor = require("keyword-extractor");
const natural = require("natural");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

const JOB_SKILLS = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Machine Learning",
  "Data Science",
  "SQL",
  "MongoDB",
  "Cloud Computing",
  "AWS",
  "Docker",
  "Kubernetes",
  "Cybersecurity",
  "TensorFlow",
  "NLP",
];

app.post("/upload", upload.single("resume"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Extract text from PDF
    const pdfText = await pdfParse(req.file.buffer);
    const resumeText = pdfText.text.toLowerCase();

    // Extract keywords
    const extractedKeywords = keywordExtractor.extract(resumeText, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true,
    });

    // Match skills
    const matchedSkills = JOB_SKILLS.filter((skill) =>
      extractedKeywords.includes(skill.toLowerCase())
    );

    // Calculate score
    const score = (matchedSkills.length / JOB_SKILLS.length) * 100;

    res.json({
      text: resumeText,
      matchedSkills,
      score: score.toFixed(2) + "%",
      message: "Resume analysis complete",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to process resume" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
