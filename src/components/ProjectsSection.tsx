import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

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
  githubUrl: string;
}

// Interface para dados do GitHub
interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  homepage: string;
  private: boolean;
}

const ProjectsSection = () => {
  const { language, t } = useLanguage();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const projectsPerPage = 6;

  useEffect(() => {
    const fetchGitHubProjects = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/users/stephiiss/repos?sort=updated&per_page=100'
        );
        const repos: GitHubRepo[] = await response.json();

        const formattedProjects: Project[] = repos
          .filter(repo => !repo.private)
          .map(repo => ({
            id: repo.id,
            title: repo.name,
            description: {
              "pt-BR": repo.description || "Descrição não disponível",
              "en-US": repo.description || "Description not available",
            },
            image: `https://placehold.co/600x400/6E59A5/ffffff?text=${repo.name}`,
            tags: repo.topics.length > 0 ? repo.topics : ["GitHub Project"],
            liveUrl: repo.homepage || undefined,
            githubUrl: repo.html_url,
          }));

        setProjects(formattedProjects);
        setTotalPages(Math.ceil(formattedProjects.length / projectsPerPage));
      } catch (error) {
        console.error('Error fetching GitHub projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubProjects();
  }, []);

  const paginatedProjects = projects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  if (loading) {
    return (
      <section id="projects" className="py-20">
        <div className="container text-center">
          <p>Carregando projetos...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold animate-fade-in">{t.projects.title}</h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">{t.projects.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedProjects.map((project) => (
            <div
              key={project.id}
              className="group relative w-full transition-all duration-300 hover:scale-[1.02]"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Card className="h-full overflow-hidden border bg-card/50 backdrop-blur-sm hover:border-primary/50">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`h-full w-full object-cover transition-transform duration-500 ${
                      hoveredProject === project.id ? "scale-110" : "scale-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent"></div>
                </div>
                <CardHeader className="space-y-1 pb-2">
                  <CardTitle className="text-xl font-semibold tracking-tight">{project.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                    {project.description[language]}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 pb-3">
                  {project.liveUrl && (
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="group flex-1 text-sm h-8"
                      asChild
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="group flex-1 text-sm h-8"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                      asChild
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <Github className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;