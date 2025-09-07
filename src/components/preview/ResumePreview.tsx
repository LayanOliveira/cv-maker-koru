import React from "react";
import { FileText, Sparkles } from "lucide-react";
import type { ResumeData } from "../../types/resume";
import { PersonalDataSection } from "./PersonalDataSection";
import { SkillsSection } from "./SkillsSection";
import { ExperienceSection } from "./ExperienceSection";

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  const hasContent =
    resumeData.personalData.name ||
    resumeData.skills.length > 0 ||
    resumeData.experiences.length > 0;

  if (!hasContent) {
    return (
      <div className="text-center text-gray-500 py-12">
        <div className="relative">
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <Sparkles className="w-6 h-6 absolute top-0 right-1/2 transform translate-x-8 text-purple-400 animate-pulse" />
        </div>
        <p className="text-lg mb-2">Seu currículo com IA aparecerá aqui</p>
        <p className="text-sm">
          Preencha os dados e use os botões mágicos para melhorar com IA
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-none">
      <PersonalDataSection personalData={resumeData.personalData} />
      {resumeData.personalData.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
            RESUMO PROFISSIONAL
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {resumeData.personalData.summary}
          </p>
        </section>
      )}
      <SkillsSection skills={resumeData.skills} />
      <ExperienceSection experiences={resumeData.experiences} />
    </div>
  );
};
