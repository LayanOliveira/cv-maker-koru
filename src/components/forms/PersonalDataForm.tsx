import React from "react";
import { User } from "lucide-react";
import type { PersonalData } from "../../types/resume";
import { AIButton } from "../common/AIButton";
import { SkeletonLoader } from "../common/SkeletonLoader";

interface PersonalDataFormProps {
  personalData: PersonalData;
  onUpdate: (field: keyof PersonalData, value: string) => void;
  onImproveText: (
    field: string,
    text: string,
    context: "summary" | "experience" | "skills"
  ) => Promise<void>;
  isLoadingAI: boolean;
  activeAIField: string | null;
}

export const PersonalDataForm: React.FC<PersonalDataFormProps> = ({
  personalData,
  onUpdate,
  onImproveText,
  isLoadingAI,
  activeAIField,
}) => {
  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
        <User className="mr-2" />
        Dados Pessoais
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome Completo
          </label>
          <input
            type="text"
            value={personalData.name}
            onChange={(e) => onUpdate("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Seu nome completo"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={personalData.email}
              onChange={(e) => onUpdate("email", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="seu.email@exemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefone
            </label>
            <input
              type="tel"
              value={personalData.phone}
              onChange={(e) => onUpdate("phone", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn
          </label>
          <input
            type="url"
            value={personalData.linkedin}
            onChange={(e) => onUpdate("linkedin", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="linkedin.com/in/seu-perfil"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Resumo Profissional
              <span className="text-gray-500 text-xs ml-2">
                ({personalData.summary.length}/500)
              </span>
            </label>
            <AIButton
              onClick={() =>
                onImproveText("summary", personalData.summary, "summary")
              }
              isLoading={isLoadingAI && activeAIField === "summary"}
              disabled={!personalData.summary.trim()}
              size="md"
            />
          </div>

          {isLoadingAI && activeAIField === "summary" ? (
            <div className="w-full h-24 border border-gray-300 rounded-md p-3">
              <SkeletonLoader />
            </div>
          ) : (
            <textarea
              value={personalData.summary}
              onChange={(e) => onUpdate("summary", e.target.value)}
              maxLength={500}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
              placeholder="Descreva brevemente seu perfil profissional..."
            />
          )}
        </div>
      </div>
    </section>
  );
};
