const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const dotenv = require("dotenv")
dotenv.config()

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  // Run through returned list of matches and add each result to the pastExperience string.
  const pastExperience = "";
  
  const prompt = "Briefly summarize this person's past work experiences. Include the job title, company name, and key skills for each experience."

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();