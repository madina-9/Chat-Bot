import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface ChatMessage {
  id?: string;
  role: string;
  content: string;
  createdAt?: string;
  conversationId?: string;
}

export function useMessages(conversationId: string) {
  return useQuery<ChatMessage[]>({
    queryKey: ["messages", conversationId],
    queryFn: () =>
      fetch(`/api/conversations/${conversationId}/messages`).then((r) =>
        r.json()
      ),
    enabled: !!conversationId,
  });
}

export function useAddMessage(conversationId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (message: { role: string; content: string }) =>
      fetch(`/api/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      }).then((r) => r.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
    },
  });
}
