import React from "react";
import { Award, Plus, X } from "lucide-react";
import type { Skill } from "../../types/resume";

interface SkillsFormProps {
  skills: Skill[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Skill, value: string) => void;
  onRemove: (id: string) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({
  skills,
  onAdd,
  onUpdate,
  onRemove,
}) => {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-700 flex items-center">
          <Award className="mr-2" />
          Habilidades
        </h3>
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center text-sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Adicionar
        </button>
      </div>

      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center space-x-3">
            <input
              type="text"
              value={skill.name}
              onChange={(e) => onUpdate(skill.id, "name", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nome da habilidade"
            />
            <select
              value={skill.level}
              onChange={(e) => onUpdate(skill.id, "level", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Básico">Básico</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
            <button
              onClick={() => onRemove(skill.id)}
              className="text-red-600 hover:text-red-800 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-gray-500 italic text-center py-4">
            Clique em "Adicionar" para incluir suas habilidades
          </p>
        )}
      </div>
    </section>
  );
};
