import React from "react";
import type { Experience } from "../../types/resume";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
}) => {
  if (experiences.length === 0) return null;

  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
        EXPERIÊNCIA PROFISSIONAL
      </h2>
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id}>
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-bold text-gray-800">
                  {exp.position || "Cargo"}
                </h3>
                <p className="text-gray-600 font-medium">
                  {exp.company || "Empresa"}
                </p>
              </div>
              <div className="text-right text-sm text-gray-500">
                {exp.startDate && (
                  <>
                    {new Date(exp.startDate).toLocaleDateString("pt-BR", {
                      month: "short",
                      year: "numeric",
                    })}
                    {" - "}
                    {exp.isCurrentJob
                      ? "Atual"
                      : exp.endDate
                      ? new Date(exp.endDate).toLocaleDateString("pt-BR", {
                          month: "short",
                          year: "numeric",
                        })
                      : "Atual"}
                  </>
                )}
              </div>
            </div>
            {exp.description && (
              <div className="text-gray-700 text-sm leading-relaxed mt-2 whitespace-pre-line">
                {exp.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
