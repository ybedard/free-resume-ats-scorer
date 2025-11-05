🎯 Free ATS Resume Match Scorer

A free, public ATS Scorer utilizing Gemini AI to help job seekers optimize their resumes. Instantly compare your resume against any job description, receive a match score, and get actionable feedback. Built as a single-file, deploy-anywhere web app (HTML/JS/Tailwind).

✨ Features

This tool uses the power of the Gemini API to perform a deep semantic analysis, comparing your plain-text resume content against a target job description:

- AI Match Scoring: Generates a precise percentage match score (0-100) simulating an Applicant Tracking System (ATS).
- Real-time Feedback: Provides instant results, including:
- Numerical Match Score.
- List of Key Matched Keywords found in both documents.
- A concise Analysis Summary with suggestions for improvement.
- Single-File Architecture: The entire app (HTML, CSS, JavaScript) is in one file for simple deployment.
- Responsive UI: Styled with Tailwind CSS for a clean, accessible interface on all devices.

🛠️ Technology Stack

The entire application is contained within a single index.html file, demonstrating a highly portable and efficient setup.

- Frontend: HTML5 / Vanilla JavaScript
- Styling: Tailwind CSS (CDN)
- AI Engine: Gemini API (gemini-2.5-flash-lite)
- Hosting: GitHub Pages

🚀 How to Use

1. Paste Job Description (JD): Copy the full text of the job description into the first box.
2. Paste Resume: Copy the plain, formatted text of your resume into the second box.
3. Click "Score My Resume": The AI analysis will run, and the results card will populate with your score, keywords, and summary.

⚙️ Deployment

Since this is a single, static HTML file, deployment is trivial:

1. Save the file **resume-scorer.html** as **index.html**.
2. Paste your Gemini API key at line 118 of the **index.html** file.
3. Upload the file to any static web host (GitHub Pages, Netlify, Vercel, etc.) and the app will be live immediately.
