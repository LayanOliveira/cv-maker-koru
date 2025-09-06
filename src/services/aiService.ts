export interface AIRequest {
  text: string;
  context: "summary" | "experience" | "skills";
}

export interface AIResponse {
  improvedText: string;
  confidence: number;
}

const improveTextWithAI = async (
  text: string,
  context: string
): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const improvements = {
    summary: `${text}\n\nProfissional experiente com forte orientação para resultados e capacidade comprovada de liderar equipes multifuncionais. Especialista em implementação de soluções inovadoras que impulsionam o crescimento organizacional e a eficiência operacional.`,
    experience: `• Liderou implementação de sistema que resultou em 30% de aumento na eficiência operacional\n• Gerenciou equipe de 15 profissionais, mantendo 95% de satisfação da equipe\n• Desenvolveu processos inovadores que reduziram custos em R$ 200.000 anuais\n• Implementou metodologias ágeis que aceleraram entregas em 40%\n• ${text}`,
    default: `${text} (melhorado com IA para maior impacto profissional)`,
  };

  if (Math.random() < 0.1) {
    throw new Error("Serviço de IA temporariamente indisponível");
  }

  return (
    improvements[context as keyof typeof improvements] || improvements.default
  );
};

class AIService {
  async improveText(request: AIRequest): Promise<AIResponse> {
    const improvedText = await improveTextWithAI(request.text, request.context);
    return { improvedText, confidence: 0.95 };
  }
}

export const aiService = new AIService();
