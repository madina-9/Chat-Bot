const API_KEY = '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';
const MODEL = 'arcee-ai/trinity-large-preview:free';

export async function streamChat(messages, onDelta) {
  const response = await fetch(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: MODEL, messages, stream: true }),
    },
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const lines = decoder.decode(value).split('\n');

    for (const line of lines) {
      if (!line.startsWith('data:')) continue;
      const data = line.slice(5).trim();
      if (data === '[DONE]') break;

      try {
        const parsed = JSON.parse(data);
        const delta = parsed.choices[0].delta.content;
        if (delta) {
          fullText += delta;
          onDelta(delta);
        }
      } catch {
        // skip malformed SSE lines
      }
    }
  }

  return fullText;
}
