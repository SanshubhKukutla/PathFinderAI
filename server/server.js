const express = require("express");
const bodyParser = require('body-parser');
const multer = require('multer');
const axios = require('axios');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const cors = require("cors");
const upload = multer({ storage: multer.memoryStorage() });

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use(require("./routes/record"));

// Get MongoDB driver connection
const dbo = require("./db/conn");

app.use(bodyParser.json());

app.post('/api/extract-text', upload.single('pdf'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No PDF file uploaded.');
  }
  try {
    const pdfData = await pdfParse(req.file.buffer);
    const pdfText = pdfData.text;

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = pdfText + `Please format your results as a JSON object as follows. DO NOT add extra backticks or double quotes. 
    { "Education": [ { "Institution": "<institution>", "Degree": "<degree>" }, { ... } ], "Experience": [ { "Company": "<company>", "Role": "<role>", "Description": "<description>", "Year": "<year as one integer>"}, {
        "Company": "<company>",
       "Role": "<role>",
  "Description": "<description>",
  "Year": "<year as one integer>"
  }, . . . ],
  "Skills": ["<skill_1>", "<skill_2>", "<skill_3>", "<skill_4>". . . ] }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // strip text of backticks, "json", backslashes, and \n
    const strippedText = text.replace(/`/g, '').replace(/json/g, '').replace(/\\/g, '').replace(/\n/g, '');

    // prase the string into a JSON object, if there is an error, return the string
    try {
      const parsedText = JSON.parse(strippedText);
      res.json(parsedText);;
    } catch (error) {
      console.error('Error parsing the extracted text:', error);
    }

  } catch (error) {
    console.error('Error processing the PDF:', error);
    res.status(500).send('Error extracting text from PDF.');
  }
});

 
app.listen(port, () => {
  // Perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});