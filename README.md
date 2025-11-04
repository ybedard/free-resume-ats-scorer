🎯 Free ATS Resume Match Scorer

A free, public ATS Scorer utilizing Gemini AI to help job seekers optimize their resumes. Instantly compare your resume against any job description, receive a match score, and get actionable feedback. Built as a single-file, deploy-anywhere web app (HTML/JS/Tailwind).

✨ Features

This tool uses the power of the Gemini API to perform a deep semantic analysis, comparing your plain-text resume content against a target job description.

AI Match Scoring: Generates a precise percentage match score (0-100) that simulates how an Applicant Tracking System would rank your resume.

Keyword Extraction: Identifies and lists the key matched keywords found in both documents, helping you see the gaps.

Actionable Feedback: Provides a concise Analysis Summary with clear suggestions on how to improve your resume for the specific role.

Browser-Based: The entire application runs directly in the browser and requires no backend server.

Mobile Responsive: Styled with Tailwind CSS for a clean, accessible interface on all devices.

🛠️ Technology Stack

The entire application is contained within a single index.html file, demonstrating a highly portable and efficient setup.

Component

Technology

Role

Frontend

HTML5 / Vanilla JavaScript

Core logic and UI interactions.

Styling

Tailwind CSS (CDN)

Utility-first framework for responsive design.

AI Engine

Gemini API (gemini-2.5-flash-preview-09-2025)

Structured output generation for scoring and analysis.

Hosting

Static Hosting (GitHub Pages, Netlify, Vercel)

Simple, zero-configuration deployment.

🚀 How to Use (For Job Seekers)

Paste Job Description (JD): Copy the full text of the job description into the first textarea.

Paste Resume: Copy the plain, formatted text of your resume into the second textarea.

Click "Score My Resume": The application will call the Gemini API, and after a few moments, the results card will populate with your score, matched keywords, and the AI analysis.

⚙️ Deployment (For Developers)

Since this is a single, static HTML file, deployment is trivial.

Clone the Repository

git clone [your-repo-url]
cd [your-repo-name]


Choose a Static Host

GitHub Pages: Ensure the index.html file is in the root or a specified branch (gh-pages or main's root) and enable GitHub Pages in your repository settings.

Netlify/Vercel: Create a new site and simply point it to the repository. The services will automatically detect and deploy the index.html file.

The application is immediately live and accessible upon deployment.
