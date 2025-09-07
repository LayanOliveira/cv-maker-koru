import React from "react";
import { Sparkles, Loader2 } from "lucide-react";

interface AIButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
  size?: "sm" | "md";
}

export const AIButton: React.FC<AIButtonProps> = ({
  onClick,
  isLoading,
  disabled = false,
  size = "sm",
}) => (
  <button
    onClick={onClick}
    disabled={disabled || isLoading}
    className={`${
      size === "sm" ? "p-1" : "px-3 py-1"
    } bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
    title="Melhorar com IA"
  >
    {isLoading ? (
      <Loader2
        className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4"} animate-spin`}
      />
    ) : (
      <Sparkles className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4 mr-1"}`} />
    )}
    {size === "md" && !isLoading && "Melhorar"}
  </button>
);
