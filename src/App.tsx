import { Sparkles, Download, FileText } from "lucide-react";
import { useResumeData } from "./hooks/useResumeData";
import { useAI } from "./hooks/useAI";
import { useToast } from "./hooks/useToast";
import { pdfService } from "./services/pdfService";
import { PersonalDataForm } from "./components/forms/PersonalDataForm";
import { SkillsForm } from "./components/forms/SkillsForm";
import { ToastComponent } from "./components/common/Toast";

export default function CVBuilderAI() {
  const {
    resumeData,
    updatePersonalData,
    addSkill,
    updateSkill,
    removeSkill,
    addExperience,
    updateExperience,
    removeExperience,
    updateImprovedText,
  } = useResumeData();

  const { improveText, isLoading: isLoadingAI, activeField } = useAI();
  const { toasts, removeToast, showToast } = useToast();

  // Função para melhorar texto com IA
  const handleImproveText = async (
    field: string,
    text: string,
    context: "summary" | "experience" | "skills"
  ) => {
    const improvedText = await improveText({ text, context });
    if (improvedText) {
      updateImprovedText(field, improvedText);
    }
  };

  // Função para gerar PDF (simulação)
  const handleGeneratePDF = async () => {
    if (!resumeData.personalData.name.trim()) {
      showToast("Preencha pelo menos o nome para gerar o PDF", "error");
      return;
    }
    try {
      await pdfService.generatePDF(resumeData);
      showToast("PDF gerado com sucesso!", "success");
    } catch (error) {
      showToast("Erro ao gerar PDF", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Toasts */}
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onClose={removeToast} />
      ))}
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <Sparkles className="mr-3 text-purple-500" />
            CV Builder AI
          </h1>
          <p className="text-gray-600">
            Crie seu currículo profissional com inteligência artificial
          </p>

          <div className="mt-4">
            <button
              onClick={handleGeneratePDF}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center mx-auto shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5 mr-2" />
              Exportar PDF
            </button>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-8 h-[calc(100vh-240px)]">
          {/* FORMULÁRIO */}
          <div className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FileText className="mr-3 text-blue-600" />
              Dados do Currículo
            </h2>

            <PersonalDataForm
              personalData={resumeData.personalData}
              onUpdate={updatePersonalData}
              onImproveText={handleImproveText}
              isLoadingAI={isLoadingAI}
              activeAIField={activeField}
            />

            <SkillsForm
              skills={resumeData.skills}
              onAdd={addSkill}
              onUpdate={updateSkill}
              onRemove={removeSkill}
            />

            {/* EXPERIÊNCIAS - Versão Simples por enquanto */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-700 flex items-center">
                  💼 Experiências Profissionais
                </h3>
                <button
                  onClick={addExperience}
                  className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center text-sm"
                >
                  + Adicionar
                </button>
              </div>

              <div className="space-y-6">
                {resumeData.experiences.map((exp, index) => (
                  <div
                    key={exp.id}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-700">
                        Experiência {index + 1}
                      </h4>
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) =>
                          updateExperience(exp.id, "company", e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Empresa"
                      />
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) =>
                          updateExperience(exp.id, "position", e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Cargo"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) =>
                          updateExperience(exp.id, "startDate", e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="date"
                        value={exp.endDate}
                        onChange={(e) =>
                          updateExperience(exp.id, "endDate", e.target.value)
                        }
                        disabled={exp.isCurrentJob}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>

                    <label className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        checked={exp.isCurrentJob}
                        onChange={(e) =>
                          updateExperience(
                            exp.id,
                            "isCurrentJob",
                            e.target.checked
                          )
                        }
                        className="mr-2 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        Trabalho atual
                      </span>
                    </label>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">
                          Descrição das atividades
                        </label>
                        <button
                          onClick={() =>
                            handleImproveText(
                              `experience-${exp.id}`,
                              exp.description,
                              "experience"
                            )
                          }
                          disabled={!exp.description.trim() || isLoadingAI}
                          className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded text-xs hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
                        >
                          {isLoadingAI && activeField === `experience-${exp.id}`
                            ? "Carregando..."
                            : "✨ Melhorar"}
                        </button>
                      </div>

                      <textarea
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(
                            exp.id,
                            "description",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Descreva suas responsabilidades e conquistas..."
                      />
                    </div>
                  </div>
                ))}
                {resumeData.experiences.length === 0 && (
                  <p className="text-gray-500 italic text-center py-4">
                    Clique em "Adicionar" para incluir suas experiências
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* PREVIEW */}
          <div className="bg-white rounded-lg shadow-lg p-8 overflow-y-auto">
            <div className="max-w-none">
              {/* Cabeçalho do Currículo */}
              <div className="border-b-2 border-blue-600 pb-4 mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {resumeData.personalData.name || "Seu Nome"}
                </h1>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  {resumeData.personalData.email && (
                    <div className="flex items-center">
                      📧 {resumeData.personalData.email}
                    </div>
                  )}
                  {resumeData.personalData.phone && (
                    <div className="flex items-center">
                      📱 {resumeData.personalData.phone}
                    </div>
                  )}
                  {resumeData.personalData.linkedin && (
                    <div className="flex items-center">
                      💼 {resumeData.personalData.linkedin}
                    </div>
                  )}
                </div>
              </div>

              {/* Resumo */}
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

              {/* Habilidades */}
              {resumeData.skills.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
                    HABILIDADES
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {resumeData.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex justify-between items-center"
                      >
                        <span className="text-gray-700 font-medium">
                          {skill.name}
                        </span>
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
              )}

              {/* Experiências */}
              {resumeData.experiences.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
                    EXPERIÊNCIA PROFISSIONAL
                  </h2>
                  <div className="space-y-4">
                    {resumeData.experiences.map((exp) => (
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
                                {new Date(exp.startDate).toLocaleDateString(
                                  "pt-BR",
                                  {
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                                {" - "}
                                {exp.isCurrentJob
                                  ? "Atual"
                                  : exp.endDate
                                  ? new Date(exp.endDate).toLocaleDateString(
                                      "pt-BR",
                                      {
                                        month: "short",
                                        year: "numeric",
                                      }
                                    )
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
              )}

              {/* Estado vazio */}
              {!resumeData.personalData.name &&
                resumeData.skills.length === 0 &&
                resumeData.experiences.length === 0 && (
                  <div className="text-center text-gray-500 py-12">
                    <div className="text-6xl mb-4">📄</div>
                    <p className="text-lg mb-2">
                      Seu currículo com IA aparecerá aqui
                    </p>
                    <p className="text-sm">
                      Preencha os dados e use os botões mágicos para melhorar
                      com IA
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
