export async function fetchAIResponse(messages) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer API_key", 
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