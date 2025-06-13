import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchGithubRepositories } from "@/utils/githubApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

interface Repo {
  id: number;
  name: string;
  description: string;
  topics: string[];
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
}

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const getRepos = async () => {
      try {
        setLoading(true);
        const data = await fetchGithubRepositories("stephiiss");
        setRepos(data);
      } catch (err) {
        setError(t("projects.error"));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getRepos();
  }, [t]);

  const formatRepoName = (name: string) => {
    return name
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <section id="projects" className="bg-background">
      <div className="section-container">
        <h2 className="section-title">{t("projects.title")}</h2>

        {error && (
          <div className="text-center text-red-500 mb-8">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Skeleton loading state
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={`skeleton-${index}`} className="h-full flex flex-col overflow-hidden border-pink-light/30">
                <Skeleton className="w-full h-48" />
                <CardContent className="flex-grow p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-4" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-28" />
                </CardFooter>
              </Card>
            ))
          ) : (
            repos.map((repo, index) => (
              <div
                key={repo.id}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-pink-light dark:border-dark-surface bg-card hover:bg-background dark:hover:bg-dark-hover group">
                  <CardContent className="flex-grow p-6">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl text-foreground">{formatRepoName(repo.name)}</CardTitle>
                      <div className="flex items-center text-sm text-foreground/70">
                        <Star className="h-4 w-4 mr-1" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {repo.description || t("projects.noDescription")}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {repo.language && (
                        <span className="text-xs px-2 py-1 rounded-full bg-pink-light dark:bg-pink-vibrant/20 text-foreground">
                          {repo.language}
                        </span>
                      )}
                      {repo.topics && repo.topics.slice(0, 3).map((topic, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs px-2 py-1 rounded-full bg-pink-light/70 dark:bg-pink-vibrant/15 text-foreground"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-pink-vibrant hover:bg-pink-light dark:hover:bg-pink-vibrant/20"
                      asChild
                    >
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-1 h-4 w-4" />
                        {t("projects.code")}
                      </a>
                    </Button>
                    {repo.homepage && (
                      <Button
                        size="sm"
                        className="bg-pink-vibrant hover:bg-pink-vibrant/90 text-white"
                        asChild
                      >
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1 h-4 w-4" />
                          {t("projects.liveDemo")}
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
