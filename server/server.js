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


// 3 functions for extracting text from PDF and converts it to PDF:

// Retry utility function for error handling
async function retryAsyncOperation(operation, maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
          return await operation();
      } catch (error) {
          console.error(`Attempt ${attempt} failed:`, error);
          if (attempt === maxAttempts) throw new Error(`Failed after ${maxAttempts} attempts`);
      }
  }
}

// Function to process the PDF and generate content
async function processPdfAndGenerateContent(pdfBuffer) {
  const pdfData = await pdfParse(pdfBuffer);
  const pdfText = pdfData.text;

  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const prompt = pdfText + `Please format your results as a JSON object as follows. If are no spaces between the words, please add spaces (e.g. MemberofInnovationEdgeteam -> Member of Innovation Edge team). Correct the capitalization (e.g. CISCOSYSTEMS -> Cisco Systems). Ensure that the skills are separated by commas and are in the format "skill_1, skill_2, skill_3, skill_4". If there are no skills, please add an empty array. (e.g. [10000 lines of codenPython Java GoLang Javascript] -> [Python, Java, GoLang, Javascript]). If there are no skills, please add an empty array. (e.g. [10000 lines of codenPython Java GoLang Javascript] -> [Python, Java, GoLang, Javascript]).

  { "name": "<name>", "position": "<current_position>":, "company": "<current_company>", "Education": [ { "Institution": "<institution>", "Degree": "<degree>" }, { ... } ], "Experience": [ { "Company": "<company>", "Role": "<role>", "Description": "<description>", "Year": "<year as one integer>"}, {"Company": "<company>", "Role": "<role>", "Description": "<description>", "Year": "<year as one integer>" }, . . . ], "Skills": ["<skill_1>", "<skill_2>", "<skill_3>", "<skill_4>". . . ] }`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  console.log(text);

  // strip text of backticks, "json", backslashes, and \n, and non-breaking spaces
  const strippedText = text.replace(/`/g, '').replace(/json/g, '').replace(/\u00a0/g, ' ').replace(/u2022/g, ' ').replace(/u2013/g, ' ').replace(/\n/g, '').replace(/\\/g, '');

  // parse the string into a JSON object, if there is an error, return the string
  const parsedText = JSON.parse(strippedText);
  return parsedText;
}

app.post('/api/extract-text', upload.single('pdf'), async (req, res) => {
  if (!req.file) {
      return res.status(400).send('No PDF file uploaded.');
  }
  try {
      const processData = async () => processPdfAndGenerateContent(req.file.buffer);
      const parsedText = await retryAsyncOperation(processData);
      res.json(parsedText);


      // Prepare the document to insert into MongoDB
      let myobj = {
          createdAt: new Date(), // Store the creation time if needed
          ...parsedText
      };

      // Insert the document into the "records" collection
      const db = dbo.getDb();
      const insertResult = await db.collection("records").insertOne(myobj);

  } catch (error) {
      console.error('Error processing the PDF or generating content:', error);
      res.status(500).send('Error extracting text from PDF or generating content.');
  }
});


// API for comparing two resumes
app.post('/api/compare-resumes', async (req, res) => {
  const { resume1, resume2 } = req.body;

  // Validate input
  if (!resume1 || !resume2) {
      return res.status(400).send('Two resumes are required.');
  }

  try {
      const genAI = new GoogleGenerativeAI(process.env.API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});

      // Construct the prompt for the AI model
      const prompt = `Given two resumes, Resume 1: ${JSON.stringify(resume1)} and Resume 2: ${JSON.stringify(resume2)}, compare the resumes and provide feedback. For context, resume 1 is someone seeking the same job that resume 2 currently is working at, in the same role and the same company. List what Resume 1 has done well as "strengths", and what it also needs to remove or improve as "recommendations". Please format your results as a JSON object as follows. DO NOT add extra backticks or double quotes. 
      
      { "strengths": ["<strength_1>", "<strength_2>", "<strength_3>", "<strength_4>", . . .], "recommendations": ["<recommendation_1>", "<recommendation_2>", "<recommendation_3>", "<recommendation_4>", . . .] }`;

      // Generate content with retries
      const feedback = await generateModelContentWithRetry(model, prompt);
      const response = await feedback.response;
      const text = await response.text();

      const strippedText = text.replace(/`/g, '').replace(/json/g, '').replace(/\n/g, '').replace(/\\/g, '');
      const parsedText = JSON.parse(strippedText);
      res.json(parsedText);
      console.log(parsedText);

  } catch (error) {
      console.error('Error comparing resumes or generating content:', error);
      res.status(500).send('Error processing request.');
  }
});
 
app.listen(port, () => {
  // Perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});