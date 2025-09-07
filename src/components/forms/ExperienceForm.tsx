import React from "react";
import { Briefcase, Plus } from "lucide-react";
import { Experience } from "../../types/resume";
import { ExperienceItem } from "./ExperienceItem";

interface ExperienceFormProps {
  experiences: Experience[];
  onAdd: () => void;
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

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experiences,
  onAdd,
  onUpdate,
  onRemove,
  onImproveText,
  isLoadingAI,
  activeAIField,
}) => {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-700 flex items-center">
          <Briefcase className="mr-2" />
          Experiências Profissionais
        </h3>
        <button
          onClick={onAdd}
          className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center text-sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Adicionar
        </button>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={exp.id}
            experience={exp}
            index={index}
            onUpdate={onUpdate}
            onRemove={onRemove}
            onImproveText={onImproveText}
            isLoadingAI={isLoadingAI}
            activeAIField={activeAIField}
          />
        ))}
        {experiences.length === 0 && (
          <p className="text-gray-500 italic text-center py-4">
            Clique em "Adicionar" para incluir suas experiências
          </p>
        )}
      </div>
    </section>
  );
};
