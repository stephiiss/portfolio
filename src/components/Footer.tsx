
import { useLanguage } from "@/context/LanguageContext";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-transform hover:scale-110 hover:text-primary"
      aria-label={label}
    >
      {icon}
    </a>
  );
};

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/40 py-6">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">{t.footer.copyright}</p>
          </div>
          <div className="flex space-x-6">
            <SocialLink
              href="https://github.com/"
              icon={<Github className="h-5 w-5" />}
              label="GitHub"
            />
            <SocialLink
              href="https://linkedin.com/"
              icon={<Linkedin className="h-5 w-5" />}
              label="LinkedIn"
            />
            <SocialLink
              href="https://twitter.com/"
              icon={<Twitter className="h-5 w-5" />}
              label="Twitter"
            />
            <SocialLink
              href="https://instagram.com/"
              icon={<Instagram className="h-5 w-5" />}
              label="Instagram"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
