export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
}

export interface AIState {
  isLoading: boolean;
  field: string | null;
  error: string | null;
}
