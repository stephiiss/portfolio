
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { ChevronDown, Code, Laptop, Palette, Server } from "lucide-react";

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4 dark:from-background dark:to-secondary/10"
    >
      <div className="container max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-start space-y-6 text-left animate-fade-in">
            <span className="text-xl font-medium text-primary">{t.hero.greeting}</span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {t.hero.title}
            </h1>
            <p className="max-w-md text-xl text-muted-foreground">{t.hero.subtitle}</p>
            <div className="mt-4 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="group transition-all hover:scale-105"
                onClick={() => scrollToSection("#projects")}
              >
                {t.hero.viewProjects}
                <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="transition-all hover:scale-105"
                onClick={() => scrollToSection("#contact")}
              >
                {t.hero.contactMe}
              </Button>
            </div>
          </div>
          
          <div className="relative animate-scale-in space-y-8">
            {/* Skills and tech stack visual */}
            <div className="rounded-xl bg-card p-6 shadow-lg dark:bg-card/50 border border-border/50">
              <h3 className="mb-4 text-xl font-semibold text-card-foreground">{t.hero.skills}</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {t.hero.skillsList.map((skill, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-center rounded-lg bg-background p-3 text-sm font-medium shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-background/50"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Services/capabilities cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-primary/10 p-4 text-center shadow-sm transition-transform hover:scale-105">
                <Laptop className="mx-auto mb-2 h-8 w-8 text-primary" />
                <h4 className="font-medium">Web Development</h4>
              </div>
              <div className="rounded-lg bg-secondary/20 p-4 text-center shadow-sm transition-transform hover:scale-105">
                <Palette className="mx-auto mb-2 h-8 w-8 text-secondary" />
                <h4 className="font-medium">UI/UX Design</h4>
              </div>
              <div className="rounded-lg bg-accent/10 p-4 text-center shadow-sm transition-transform hover:scale-105">
                <Server className="mx-auto mb-2 h-8 w-8 text-accent" />
                <h4 className="font-medium">Backend</h4>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="animate-bounce cursor-pointer" onClick={() => scrollToSection("#projects")}>
            <ChevronDown className="h-10 w-10 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
