import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { ResumeData } from "../types/resume";

interface PDFOptions {
  theme?: "modern" | "classic" | "minimal";
  fontSize?: "small" | "medium" | "large";
  margins?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

class PDFService {
  async generatePDF(
    resumeData: ResumeData,
    options: PDFOptions = {}
  ): Promise<void> {
    const {
      theme = "modern",
      fontSize = "medium",
      margins = { top: 20, right: 20, bottom: 20, left: 20 },
    } = options;

    try {
      // Método 1: Usando html2canvas + jsPDF
      await this.generateFromHTML(resumeData, { theme, fontSize, margins });
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      throw new Error("Erro ao gerar PDF");
    }
  }

  private async generateFromHTML(
    resumeData: ResumeData,
    options: PDFOptions
  ): Promise<void> {
    // Criar elemento temporário com o conteúdo do currículo
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = this.buildHTMLContent(resumeData, options);
    tempDiv.style.width = "210mm"; // A4 width
    tempDiv.style.padding = "20mm";
    tempDiv.style.fontFamily = "Arial, sans-serif";
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";

    document.body.appendChild(tempDiv);

    // Capturar como canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
    });

    // Converter para PDF
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    // Download
    const fileName = `curriculo-${resumeData.personalData.name
      .toLowerCase()
      .replace(/\s+/g, "-")}.pdf`;
    pdf.save(fileName);

    // Limpar elemento temporário
    document.body.removeChild(tempDiv);
  }

  private buildHTMLContent(
    resumeData: ResumeData,
    options: PDFOptions
  ): string {
    const { theme } = options;
    const styles = this.getThemeStyles(theme!);

    return `
      <div style="${styles.container}">
        ${this.buildHeader(resumeData.personalData, styles)}
        ${
          resumeData.personalData.summary
            ? this.buildSection(
                "RESUMO PROFISSIONAL",
                resumeData.personalData.summary,
                styles
              )
            : ""
        }
        ${
          resumeData.skills.length > 0
            ? this.buildSkillsSection(resumeData.skills, styles)
            : ""
        }
        ${
          resumeData.experiences.length > 0
            ? this.buildExperienceSection(resumeData.experiences, styles)
            : ""
        }
      </div>
    `;
  }

  private getThemeStyles(theme: string) {
    const themes = {
      modern: {
        container: "color: #333; line-height: 1.6;",
        header:
          "border-bottom: 3px solid #3B82F6; padding-bottom: 15px; margin-bottom: 20px;",
        name: "font-size: 28px; font-weight: bold; color: #1F2937; margin-bottom: 8px;",
        contact: "color: #6B7280; font-size: 14px;",
        sectionTitle:
          "font-size: 16px; font-weight: bold; color: #1F2937; border-bottom: 1px solid #E5E7EB; padding-bottom: 5px; margin: 20px 0 10px 0;",
        text: "font-size: 12px; color: #374151; margin-bottom: 10px;",
      },
      classic: {
        container: "color: #000; line-height: 1.5;",
        header:
          "border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px;",
        name: "font-size: 24px; font-weight: bold; margin-bottom: 5px;",
        contact: "font-size: 12px;",
        sectionTitle:
          "font-size: 14px; font-weight: bold; text-transform: uppercase; margin: 15px 0 8px 0;",
        text: "font-size: 11px; margin-bottom: 8px;",
      },
      minimal: {
        container: "color: #333; line-height: 1.7;",
        header: "margin-bottom: 25px;",
        name: "font-size: 30px; font-weight: 300; color: #2D3748; margin-bottom: 10px;",
        contact: "color: #718096; font-size: 13px;",
        sectionTitle:
          "font-size: 14px; font-weight: 600; color: #2D3748; margin: 25px 0 12px 0;",
        text: "font-size: 12px; color: #4A5568; margin-bottom: 12px;",
      },
    };

    return themes[theme as keyof typeof themes] || themes.modern;
  }

  private buildHeader(personalData: any, styles: any): string {
    return `
      <div style="${styles.header}">
        <h1 style="${styles.name}">${personalData.name}</h1>
        <div style="${styles.contact}">
          ${personalData.email ? `📧 ${personalData.email}` : ""}
          ${personalData.phone ? ` | 📱 ${personalData.phone}` : ""}
          ${personalData.linkedin ? ` | 💼 ${personalData.linkedin}` : ""}
        </div>
      </div>
    `;
  }

  private buildSection(title: string, content: string, styles: any): string {
    return `
      <div>
        <h2 style="${styles.sectionTitle}">${title}</h2>
        <p style="${styles.text}">${content.replace(/\n/g, "<br>")}</p>
      </div>
    `;
  }

  private buildSkillsSection(skills: any[], styles: any): string {
    const skillsHTML = skills
      .map(
        (skill) =>
          `<span style="display: inline-block; background: #F3F4F6; padding: 4px 8px; margin: 2px; border-radius: 4px; font-size: 11px;">
        ${skill.name} (${skill.level})
      </span>`
      )
      .join("");

    return `
      <div>
        <h2 style="${styles.sectionTitle}">HABILIDADES</h2>
        <div style="margin-bottom: 15px;">${skillsHTML}</div>
      </div>
    `;
  }

  private buildExperienceSection(experiences: any[], styles: any): string {
    const experiencesHTML = experiences
      .map(
        (exp) => `
      <div style="margin-bottom: 15px;">
        <div style="display: flex; justify-content: space-between; align-items: start;">
          <div>
            <h3 style="font-weight: bold; margin: 0; font-size: 13px;">${
              exp.position
            }</h3>
            <p style="margin: 2px 0; color: #6B7280; font-size: 12px;">${
              exp.company
            }</p>
          </div>
          <span style="font-size: 11px; color: #9CA3AF;">
            ${
              exp.startDate
                ? new Date(exp.startDate).toLocaleDateString("pt-BR", {
                    month: "short",
                    year: "numeric",
                  })
                : ""
            } - 
            ${
              exp.isCurrentJob
                ? "Atual"
                : exp.endDate
                ? new Date(exp.endDate).toLocaleDateString("pt-BR", {
                    month: "short",
                    year: "numeric",
                  })
                : "Atual"
            }
          </span>
        </div>
        ${
          exp.description
            ? `<p style="${
                styles.text
              }; margin-top: 5px;">${exp.description.replace(
                /\n/g,
                "<br>"
              )}</p>`
            : ""
        }
      </div>
    `
      )
      .join("");

    return `
      <div>
        <h2 style="${styles.sectionTitle}">EXPERIÊNCIA PROFISSIONAL</h2>
        ${experiencesHTML}
      </div>
    `;
  }
}

export const pdfService = new PDFService();
export type { PDFOptions };
