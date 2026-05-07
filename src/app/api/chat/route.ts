import { streamText, UIMessage } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { createMessage, getMessages } from '@/server/messages';
import webpush from 'web-push';

const openrouter = createOpenAICompatible({
  name: 'openrouter',
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: 'https://openrouter.ai/api/v1',
});

if (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    'mailto:mazhenovam@gmail.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY,
  );
}

export async function POST(req: Request) {
  const { messages, conversationId, pushSubscription } = (await req.json()) as {
    messages: UIMessage[];
    conversationId: string;
    pushSubscription?: webpush.PushSubscription;
  };

  // Extract the user's latest message text from the parts array
  const userMessage = messages.at(-1);
  const userText =
    userMessage?.parts
      .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('') ?? '';

  // Persist the user message before streaming
  await createMessage(conversationId, userText, 'user');

  // Load full conversation history from DB as the source of truth
  const history = await getMessages(conversationId);

  const result = streamText({
    model: openrouter('nvidia/nemotron-3-super-120b-a12b:free'),
    messages: history.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
    onFinish: async ({ text }) => {
      await createMessage(conversationId, text, 'assistant');

      if (pushSubscription && process.env.VAPID_PRIVATE_KEY) {
        try {
          await webpush.sendNotification(
            pushSubscription,
            JSON.stringify({
              title: 'Felix AI',
              body: 'Your response is ready 🐱',
            }),
          );
        } catch {
          // Push may fail if the subscription expired — safe to ignore
        }
      }
    },
  });

  return result.toUIMessageStreamResponse();
}
