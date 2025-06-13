import React from "react";
import { useTranslation } from "react-i18next";
import { Code2, Palette, Server, TestTube } from "lucide-react";

interface Skill {
  name: string;
}

const Skills: React.FC = () => {
  const { t } = useTranslation();

  const frontendSkills = [
    { name: "HTML & CSS" },
    { name: "JavaScript" },
    { name: "React" },
    { name: "TypeScript" },
    { name: "Tailwind CSS" },
  ];

  const backendSkills = [
    { name: "Node.js" },
    { name: "Express" },
    { name: "MongoDB" },
    { name: "Firebase" },
    { name: "API Development" },
  ];

  const otherSkills = [
    { name: "UI/UX Design" },
    { name: "Figma" },
    { name: "Git" },
    { name: "Responsive Design" },
    { name: "SEO Basics" },
  ];

  const qualitySkills = [
    { name: "Playwright" },
    { name: "POM" },
    { name: "Test Planning" },
    { name: "Bug Tracking" },
    { name: "Documentation" },
  ];

  const renderSkillsBlock = (skills: { name: string }[], title: string, icon: React.ElementType) => {
    const Icon = icon;
    return (
      <div className="bg-card p-8 rounded-lg shadow-md border border-border hover:border-pink-vibrant/50 transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-pink-light dark:bg-pink-vibrant/10 rounded-lg">
            <Icon className="h-6 w-6 text-pink-vibrant" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">{t(title)}</h3>
        </div>

        <div className="space-y-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="opacity-0 animate-fade-in p-2 rounded-md hover:bg-neutral-light dark:hover:bg-dark-tertiary transition-colors"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-sm font-medium text-foreground">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="bg-neutral-light dark:bg-dark-DEFAULT">
      <div className="section-container">
        <h2 className="section-title">{t("skills.title")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {renderSkillsBlock(frontendSkills, "skills.frontend", Code2)}
          {renderSkillsBlock(backendSkills, "skills.backend", Server)}
          {renderSkillsBlock(otherSkills, "skills.design", Palette)}
          {renderSkillsBlock(qualitySkills, "skills.quality", TestTube)}
        </div>
      </div>
    </section>
  );
};

export default Skills;
