
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";

// Project interface
interface Project {
  id: number;
  title: string;
  description: {
    "pt-BR": string;
    "en-US": string;
  };
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

// Sample projects data
const projectsData: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: {
      "pt-BR": "Uma plataforma completa de e-commerce com sistema de pagamentos integrado e painel administrativo.",
      "en-US": "A complete e-commerce platform with integrated payment system and admin dashboard.",
    },
    image: "https://placehold.co/600x400/9b87f5/ffffff?text=E-commerce",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
  {
    id: 2,
    title: "Task Management App",
    description: {
      "pt-BR": "Aplicativo de gerenciamento de tarefas com recursos de colaboração em equipe e lembretes.",
      "en-US": "Task management application with team collaboration features and reminders.",
    },
    image: "https://placehold.co/600x400/7E69AB/ffffff?text=Task+App",
    tags: ["Vue.js", "Firebase", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: {
      "pt-BR": "Site de portfólio responsivo com recursos de tradução e animações interativas.",
      "en-US": "Responsive portfolio website with translation features and interactive animations.",
    },
    image: "https://placehold.co/600x400/6E59A5/ffffff?text=Portfolio",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
  {
    id: 4,
    title: "Weather App",
    description: {
      "pt-BR": "Aplicativo de previsão do tempo com design minimalista e atualizações em tempo real.",
      "en-US": "Weather forecast application with minimalist design and real-time updates.",
    },
    image: "https://placehold.co/600x400/D6BCFA/1A1F2C?text=Weather+App",
    tags: ["React Native", "OpenWeather API"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
];

const ProjectsSection = () => {
  const { language, t } = useLanguage();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold animate-fade-in">{t.projects.title}</h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">{t.projects.subtitle}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group relative transition-all duration-300 hover:scale-[1.01]"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Card className="h-full overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`h-full w-full object-cover transition-transform duration-500 ${
                      hoveredProject === project.id ? "scale-110" : "scale-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">{project.title}</CardTitle>
                  <CardDescription className="text-base">
                    {project.description[language]}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-4">
                  {project.liveUrl && (
                    <Button variant="secondary" size="sm" className="group">
                      <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" className="group">
                      <Github className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                      GitHub
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
