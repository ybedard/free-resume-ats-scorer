export default {
  async fetch(request, env, ctx) {
    // 1. Define the ONLY domain allowed to talk to this Worker
    const ALLOWED_ORIGIN = env.ALLOWED_ORIGIN;

    // 2. Define the security and access headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN, // Only allows requests from the specified domain
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle pre-flight (OPTIONS) requests
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // 3. Check if the request's origin matches the allowed domain
    const requestOrigin = request.headers.get('Origin');

    if (requestOrigin !== ALLOWED_ORIGIN) {
      // Return a 403 Forbidden response for unauthorized domains
      return new Response(
        JSON.stringify({ error: 'Unauthorized request origin.' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 4. Get the API Key from SECURE environment variables
    const GEMINI_API_KEY = env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 5. Define the Google API URL
    const model = "gemini-2.5-flash-lite";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

    // 6. Get the (resume, jd) from the client's request
    let requestBody;
    try {
      requestBody = await request.json();
    }
    catch (e) {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { resume, jd } = requestBody;

    if (!resume || !jd) {
      return new Response(
        JSON.stringify({ error: "Missing resume or jd" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 7. Construct the prompt
    const prompt = `
      Analyze the following resume against the job description (JD). Provide a response in JSON format.
      The JSON object must have these exact keys: "matchScore" (a number 0-100), "matchedKeywords" (an array of strings), and "analysis" (a brief 1-2 sentence summary).

      JOB DESCRIPTION:
      ---
      ${jd}
      ---

      RESUME:
      ---
      ${resume}
      ---
    `;

    // 8. Call the Gemini API
    try {
      const googleResponse = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0,
          },
        }),
      });

      if (!googleResponse.ok) {
        const errorText = await googleResponse.text();

        return new Response(
          JSON.stringify({ error: "Gemini API Error", details: errorText }),
          {
            status: googleResponse.status,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const responseData = await googleResponse.json();

      // 9. Send the clean response back to your GitHub Pages app
      const jsonResponse = JSON.parse(responseData.candidates[0].content.parts[0].text);

      return new Response(
        JSON.stringify(jsonResponse),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    catch (error) {
      return new Response(
        JSON.stringify({ error: "Worker Error", details: error.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  },
};