export interface PersonalData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
}

export interface Skill {
  id: string;
  name: string;
  level: "Básico" | "Intermediário" | "Avançado";
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  description: string;
}

export interface ResumeData {
  personalData: PersonalData;
  skills: Skill[];
  experiences: Experience[];
}
