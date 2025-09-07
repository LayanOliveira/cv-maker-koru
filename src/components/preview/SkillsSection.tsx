import React from "react";
import type { Skill } from "../../types/resume";

interface SkillsSectionProps {
  skills: Skill[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  if (skills.length === 0) return null;

  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
        HABILIDADES
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {skills.map((skill) => (
          <div key={skill.id} className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">{skill.name}</span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                skill.level === "Avançado"
                  ? "bg-green-100 text-green-800"
                  : skill.level === "Intermediário"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {skill.level}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
