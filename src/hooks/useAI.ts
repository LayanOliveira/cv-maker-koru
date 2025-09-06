import { useState, useCallback } from "react";
import { aiService } from "../services/aiService";
import type { AIRequest } from "../services/aiService";
import { useToast } from "./useToast";

interface UseAIReturn {
  improveText: (request: AIRequest) => Promise<string | null>;
  isLoading: boolean;
  error: string | null;
  activeField: string | null;
}

export const useAI = (): UseAIReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<string | null>(null);
  const { showToast } = useToast();

  const improveText = useCallback(
    async (request: AIRequest): Promise<string | null> => {
      if (!request.text.trim()) {
        showToast("Digite algum texto antes de usar a IA", "error");
        return null;
      }

      setIsLoading(true);
      setActiveField(request.context);
      setError(null);

      try {
        const response = await aiService.improveText(request);
        showToast("Texto melhorado com sucesso!", "success");
        return response.improvedText;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro desconhecido";
        setError(errorMessage);
        showToast(errorMessage, "error");
        return null;
      } finally {
        setIsLoading(false);
        setActiveField(null);
      }
    },
    [showToast]
  );

  return {
    improveText,
    isLoading,
    error,
    activeField,
  };
};
