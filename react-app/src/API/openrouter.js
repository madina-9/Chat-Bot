export async function fetchAIResponse(messages) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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", // Make sure "Bearer " is included if your API requires it
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "arcee-ai/trinity-large-preview:free",
      messages
    })
  });

  const data = await response.json();
  
  // error form openrouter
  if (!response.ok) {
    throw new Error(data.error?.message || "Failed to fetch AI response");
  }

  return data.choices[0].message;
}