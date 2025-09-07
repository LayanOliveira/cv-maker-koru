import React from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import type { Toast } from "../../types/ui";

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

export const ToastComponent: React.FC<ToastProps> = ({ toast, onClose }) => (
  <div
    className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 z-50 ${
      toast.type === "success"
        ? "bg-green-500 text-white"
        : "bg-red-500 text-white"
    }`}
  >
    <div className="flex items-center">
      {toast.type === "success" ? (
        <CheckCircle className="w-5 h-5 mr-2" />
      ) : (
        <AlertCircle className="w-5 h-5 mr-2" />
      )}
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={() => onClose(toast.id)}
        className="ml-2 text-white hover:text-gray-200"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  </div>
);
