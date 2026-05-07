"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
}

export function useConversations(initialData?: Conversation[]) {
  return useQuery<Conversation[]>({
    queryKey: ["conversations"],
    queryFn: () => fetch("/api/conversations").then((r) => r.json()),
    initialData,
  });
}

export function useCreateConversation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (title: string) =>
      fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      }).then((r) => r.json()),

    onMutate: async (title: string) => {
      // Cancel any in-flight refetches so they don't overwrite the optimistic update
      await queryClient.cancelQueries({ queryKey: ["conversations"] });
      const previous = queryClient.getQueryData<Conversation[]>([
        "conversations",
      ]);
      // Immediately add a placeholder conversation to the list
      const optimistic: Conversation = {
        id: `temp-${Date.now()}`,
        title,
        createdAt: new Date().toISOString(),
      };
      queryClient.setQueryData<Conversation[]>(
        ["conversations"],
        (old = []) => [optimistic, ...old]
      );
      return { previous };
    },

    onError: (_err, _title, context) => {
      // Roll back to the snapshot taken before the mutation
      queryClient.setQueryData(["conversations"], context?.previous);
    },

    onSuccess: (newConv: Conversation) => {
      // Navigate to the newly created conversation
      router.push(`/chat/${newConv.id}`);
    },

    onSettled: () => {
      // Replace optimistic data with the real server state
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

export function useDeleteConversation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/conversations/${id}`, { method: "DELETE" }).then((r) =>
        r.json()
      ),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["conversations"] });
      const previous = queryClient.getQueryData<Conversation[]>([
        "conversations",
      ]);
      // Immediately remove the conversation from the list
      queryClient.setQueryData<Conversation[]>(
        ["conversations"],
        (old = []) => old.filter((c) => c.id !== id)
      );
      return { previous };
    },

    onError: (_err, _id, context) => {
      // Roll back on failure
      queryClient.setQueryData(["conversations"], context?.previous);
    },

    onSuccess: () => {
      // Re-render server components so the layout reflects the deletion
      router.refresh();
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}
