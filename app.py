from flask import Flask, render_template, request
import openai

app = Flask(__name__)

# Set your OpenAI API key
openai.api_key = 'YOUR_OPENAI_API_KEY'
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_resume', methods=['POST'])
def generate_resume():
    user_input = request.form['user_input']

    # Use OpenAI to generate AI-based resume content
    # Modify the prompt and parameters based on your needs
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=f"Generate a resume for a candidate with the following skills: {user_input}",
        max_tokens=200
    )

    resume_content = response['choices'][0]['text']

    return render_template('resume.html', resume_content=resume_content)

if __name__ == '__main__':
    app.run(debug=True)