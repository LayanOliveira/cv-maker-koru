import React from "react";
import { Mail, Phone, Linkedin } from "lucide-react";
import type { PersonalData } from "../../types/resume";

interface PersonalDataSectionProps {
  personalData: PersonalData;
}

export const PersonalDataSection: React.FC<PersonalDataSectionProps> = ({
  personalData,
}) => {
  return (
    <div className="border-b-2 border-blue-600 pb-4 mb-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {personalData.name || "Seu Nome"}
      </h1>
      <div className="flex flex-wrap gap-4 text-gray-600">
        {personalData.email && (
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-1" />
            {personalData.email}
          </div>
        )}
        {personalData.phone && (
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-1" />
            {personalData.phone}
          </div>
        )}
        {personalData.linkedin && (
          <div className="flex items-center">
            <Linkedin className="w-4 h-4 mr-1" />
            {personalData.linkedin}
          </div>
        )}
      </div>
    </div>
  );
};
