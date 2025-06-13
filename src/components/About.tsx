import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, Code, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";

const About: React.FC = () => {
  const { t } = useTranslation();

  const cards = [
    {
      title: t("about.cards.whoIAm.title"),
      icon: User,
      content: t("about.cards.whoIAm.content"),
    },
    {
      title: t("about.cards.whatIDo.title"),
      icon: Code,
      content: t("about.cards.whatIDo.content"),
    },
    {
      title: t("about.cards.myApproach.title"),
      icon: Lightbulb,
      content: t("about.cards.myApproach.content"),
    },
  ];

  return (
    <section id="about" className="bg-neutral-light dark:bg-dark-DEFAULT">
      <div className="section-container">
        <h2 className="section-title">{t("about.title")}</h2>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-foreground">
            {t("about.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 h-full border border-pink-light dark:border-pink-vibrant/30 bg-card overflow-hidden group">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="mb-6 p-4 rounded-full bg-pink-light dark:bg-pink-vibrant/20 transition-colors ">
                    <card.icon className="h-8 w-8 text-pink-vibrant" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">{card.title}</h3>
                  <p className="text-muted-foreground">{card.content}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
