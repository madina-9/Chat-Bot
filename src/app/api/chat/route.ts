export async function POST(request: Request) {
  const { messages } = await request.json();

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "arcee-ai/trinity-large-preview:free",
      messages,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return Response.json(
      { error: data.error?.message || "Failed to fetch AI response" },
      { status: response.status }
    );
  }

  return Response.json(data.choices[0].message);
}
