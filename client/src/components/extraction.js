// Extract text from PDF
const fs = require('fs');
const pdf = require('pdf-parse');

const pdfPath = 'resume.pdf';

const readPDF = async () => {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdf(dataBuffer);
  return data.text;
};

readPDF().then(pdfText => {
  console.log('PDF Text:', pdfText);
  // Now you can proceed to the next steps
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  // Access your API key as an environment variable (see "Set up your API key" above)
  const dotenv = require("dotenv")
  dotenv.config()
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);


  async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = pdfText + `\n\nReturn the experiences from this resume and format them as a JSON object, as follows:


    { "Results": [ 
        {
         "Company": "<company>",
         "Role": "<role>",
    "Description": "<description>",
    "Year": "<year>"
          }, {
          "Company": "<company>",
         "Role": "<role>",
    "Description": "<description>",
    "Year": "<year>"
    }, . . . ]
         
    }`

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    }

    run();
}).catch(error => {
  console.error('Error reading PDF:', error);
});