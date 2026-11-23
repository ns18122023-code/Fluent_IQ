export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  if (!apiKey) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured on the server.',
      code: 'NO_API_KEY',
      message: 'Gemini API key is not configured in Vercel environment variables.'
    });
  }

  try {
    const { prompt, systemInstruction, history, temperature = 0.7, maxOutputTokens = 2048 } = req.body || {};

    if (!prompt && (!history || history.length === 0)) {
      return res.status(400).json({ error: 'Missing prompt or history' });
    }

    const contents = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content || msg.text || '' }]
        });
      }
    }

    if (prompt) {
      contents.push({
        role: 'user',
        parts: [{ text: prompt }]
      });
    }

    const requestBody = {
      contents,
      generationConfig: {
        temperature,
        maxOutputTokens
      }
    };

    if (systemInstruction) {
      requestBody.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    const candidateModels = [
      modelName,
      'gemini-2.5-flash',
      'gemini-1.5-flash',
      'gemini-1.5-flash-latest'
    ];
    const uniqueModels = [...new Set(candidateModels)];

    let lastError = null;
    let responseJson = null;

    for (const currentModel of uniqueModels) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${apiKey}`;
        const geminiRes = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });

        if (geminiRes.ok) {
          responseJson = await geminiRes.json();
          break;
        } else {
          const errData = await geminiRes.json().catch(() => ({}));
          lastError = errData.error || { message: `HTTP ${geminiRes.status}: ${geminiRes.statusText}` };
          if (geminiRes.status === 404) {
            continue;
          }
          break;
        }
      } catch (err) {
        lastError = { message: err.message };
      }
    }

    if (!responseJson) {
      return res.status(502).json({
        error: lastError?.message || 'Failed to communicate with Gemini API',
        details: lastError
      });
    }

    const candidate = responseJson.candidates?.[0];
    const replyText = candidate?.content?.parts?.[0]?.text || '';

    return res.status(200).json({
      text: replyText,
      finishReason: candidate?.finishReason,
      usage: responseJson.usageMetadata
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

