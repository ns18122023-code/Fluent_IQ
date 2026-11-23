import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('recharts') || id.includes('d3-')) {
                return 'vendor-charts';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              return 'vendor';
            }
          },
        },
      },
    },
    plugins: [
      react(),
      {
        name: 'local-gemini-api',
        configureServer(server) {
          server.middlewares.use('/api/gemini', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method Not Allowed' }));
              return;
            }

            let bodyStr = '';
            req.on('data', chunk => { bodyStr += chunk; });
            req.on('end', async () => {
              try {
                const body = JSON.parse(bodyStr || '{}');
                const apiKey = process.env.GEMINI_API_KEY || env.GEMINI_API_KEY;
                const modelName = process.env.GEMINI_MODEL || env.GEMINI_MODEL || 'gemini-2.5-flash';

                if (!apiKey) {
                  res.statusCode = 503;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({
                    error: 'GEMINI_API_KEY is not configured on the server.',
                    code: 'NO_API_KEY',
                    message: 'Gemini API key is missing. Please set GEMINI_API_KEY in your server environment or .env file.'
                  }));
                  return;
                }

                const { prompt, systemInstruction, history, temperature = 0.7, maxOutputTokens = 2048 } = body;

                if (!prompt && (!history || history.length === 0)) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Missing prompt or history' }));
                  return;
                }

                // Format contents for Google Gemini REST API v1beta
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

                // Primary model try, with automatic fallback models in case the chosen model is overloaded or deprecated
                const candidateModels = [
                  modelName,
                  'gemini-2.5-flash',
                  'gemini-1.5-flash',
                  'gemini-1.5-flash-latest'
                ];
                // Deduplicate
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
                      // If error is 404 (model not found), try next model
                      if (geminiRes.status === 404) {
                        continue;
                      }
                      // For other errors (like 429 or 400), don't keep hammering if auth or quota is failed
                      break;
                    }
                  } catch (err) {
                    lastError = { message: err.message };
                  }
                }

                if (!responseJson) {
                  res.statusCode = 502;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({
                    error: lastError?.message || 'Failed to communicate with Gemini API',
                    details: lastError
                  }));
                  return;
                }

                const candidate = responseJson.candidates?.[0];
                const replyText = candidate?.content?.parts?.[0]?.text || '';

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  text: replyText,
                  finishReason: candidate?.finishReason,
                  usage: responseJson.usageMetadata
                }));
              } catch (serverErr) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: serverErr.message || 'Internal Server Error' }));
              }
            });
          });
        }
      }
    ]
  };
});
