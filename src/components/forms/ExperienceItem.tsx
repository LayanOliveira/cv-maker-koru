import React from "react";
import { X } from "lucide-react";
import type { Experience } from "../../types/resume";
import { AIButton } from "../common/AIButton";
import { SkeletonLoader } from "../common/SkeletonLoader";

interface ExperienceItemProps {
  experience: Experience;
  index: number;
  onUpdate: (
    id: string,
    field: keyof Experience,
    value: string | boolean
  ) => void;
  onRemove: (id: string) => void;
  onImproveText: (field: string, text: string, context: string) => void;
  isLoadingAI: boolean;
  activeAIField: string | null;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({
  experience,
  index,
  onUpdate,
  onRemove,
  onImproveText,
  isLoadingAI,
  activeAIField,
}) => {
  const fieldId = `experience-${experience.id}`;
  const isLoading = isLoadingAI && activeAIField === fieldId;

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-700">Experiência {index + 1}</h4>
        <button
          onClick={() => onRemove(experience.id)}
          className="text-red-600 hover:text-red-800 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <input
          type="text"
          value={experience.company}
          onChange={(e) => onUpdate(experience.id, "company", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Empresa"
        />
        <input
          type="text"
          value={experience.position}
          onChange={(e) => onUpdate(experience.id, "position", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Cargo"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <input
          type="date"
          value={experience.startDate}
          onChange={(e) => onUpdate(experience.id, "startDate", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="date"
          value={experience.endDate}
          onChange={(e) => onUpdate(experience.id, "endDate", e.target.value)}
          disabled={experience.isCurrentJob}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
        />
      </div>

      <label className="flex items-center mb-3">
        <input
          type="checkbox"
          checked={experience.isCurrentJob}
          onChange={(e) =>
            onUpdate(experience.id, "isCurrentJob", e.target.checked)
          }
          className="mr-2 rounded"
        />
        <span className="text-sm text-gray-700">Trabalho atual</span>
      </label>

      {/* DESCRIÇÃO COM IA */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            Descrição das atividades
          </label>
          <AIButton
            onClick={() =>
              onImproveText(fieldId, experience.description, "experience")
            }
            isLoading={isLoading}
            disabled={!experience.description.trim()}
          />
        </div>

        {isLoading ? (
          <div className="w-full h-20 border border-gray-300 rounded-md p-3">
            <SkeletonLoader />
          </div>
        ) : (
          <textarea
            value={experience.description}
            onChange={(e) =>
              onUpdate(experience.id, "description", e.target.value)
            }
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
            placeholder="Descreva suas responsabilidades e conquistas..."
          />
        )}
      </div>
    </div>
  );
};
