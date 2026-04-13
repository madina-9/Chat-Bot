import { streamText, UIMessage } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { createMessage, getMessages } from "@/server/messages";

const openrouter = createOpenAICompatible({
  name: "openrouter",
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  const { messages, conversationId } = (await req.json()) as {
    messages: UIMessage[];
    conversationId: string;
  };

  // Extract the user's latest message text from the parts array
  const userMessage = messages.at(-1);
  const userText =
    userMessage?.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("") ?? "";

  // Persist the user message before streaming
  await createMessage(conversationId, userText, "user");

  // Load full conversation history from DB as the source of truth
  const history = await getMessages(conversationId);

  const result = streamText({
    model: openrouter("arcee-ai/trinity-large-preview:free"),
    messages: history.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    onFinish: async ({ text }) => {
      // Persist the complete assistant message once streaming is done
      await createMessage(conversationId, text, "assistant");
    },
  });

  return result.toUIMessageStreamResponse();
}
