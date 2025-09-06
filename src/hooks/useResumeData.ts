import { useState, useCallback } from "react";
import type { ResumeData, PersonalData, Skill, Experience } from "../types/resume";

const initialResumeData: ResumeData = {
  personalData: {
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    summary: "",
  },
  skills: [],
  experiences: [],
};

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  const updatePersonalData = useCallback(
    (field: keyof PersonalData, value: string) => {
      setResumeData((prev) => ({
        ...prev,
        personalData: {
          ...prev.personalData,
          [field]: value,
        },
      }));
    },
    []
  );

  const addSkill = useCallback(() => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: "Básico",
    };
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  }, []);

  const updateSkill = useCallback(
    (id: string, field: keyof Skill, value: string) => {
      setResumeData((prev) => ({
        ...prev,
        skills: prev.skills.map((skill) =>
          skill.id === id ? { ...skill, [field]: value } : skill
        ),
      }));
    },
    []
  );

  const removeSkill = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  }, []);

  const addExperience = useCallback(() => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrentJob: false,
      description: "",
    };
    setResumeData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExperience],
    }));
  }, []);

  const updateExperience = useCallback(
    (id: string, field: keyof Experience, value: string | boolean) => {
      setResumeData((prev) => ({
        ...prev,
        experiences: prev.experiences.map((exp) =>
          exp.id === id ? { ...exp, [field]: value } : exp
        ),
      }));
    },
    []
  );

  const removeExperience = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  }, []);

  const updateImprovedText = useCallback(
    (field: string, improvedText: string) => {
      if (field === "summary") {
        setResumeData((prev) => ({
          ...prev,
          personalData: { ...prev.personalData, summary: improvedText },
        }));
      } else if (field.startsWith("experience-")) {
        const expId = field.split("-")[1];
        setResumeData((prev) => ({
          ...prev,
          experiences: prev.experiences.map((exp) =>
            exp.id === expId ? { ...exp, description: improvedText } : exp
          ),
        }));
      }
    },
    []
  );

  return {
    resumeData,
    setResumeData,
    updatePersonalData,
    addSkill,
    updateSkill,
    removeSkill,
    addExperience,
    updateExperience,
    removeExperience,
    updateImprovedText,
  };
};
