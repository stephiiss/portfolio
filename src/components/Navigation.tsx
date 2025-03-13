
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => {
  return (
    <li>
      <a
        href={href}
        className="relative px-2 py-1 text-lg transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:text-primary hover:after:origin-bottom-left hover:after:scale-x-100"
        onClick={onClick}
      >
        {children}
      </a>
    </li>
  );
};

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle language between PT and EN
  const toggleLanguage = () => {
    setLanguage(language === "pt-BR" ? "en-US" : "pt-BR");
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  // Initialize dark mode based on user preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Handle scroll event to change navigation bar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/90 py-2 shadow-md backdrop-blur-sm dark:bg-background/80"
          : "bg-transparent py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold transition-colors hover:text-primary">
          Stephani
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8">
            <NavLink href="#home">{t.nav.home}</NavLink>
            <NavLink href="#projects">{t.nav.projects}</NavLink>
            <NavLink href="#contact">{t.nav.contact}</NavLink>
            <li>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full transition-all hover:bg-secondary"
                onClick={toggleLanguage}
                aria-label={`Switch to ${language === "pt-BR" ? "English" : "Portuguese"}`}
              >
                <Globe className="h-5 w-5" />
                <span className="ml-2 text-sm">{language === "pt-BR" ? "EN" : "PT"}</span>
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full transition-all hover:bg-secondary"
                onClick={toggleDarkMode}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </li>
          </ul>
        </nav>

        {/* Mobile Navigation Controls */}
        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 rounded-full transition-all hover:bg-secondary"
            onClick={toggleLanguage}
            aria-label={`Switch to ${language === "pt-BR" ? "English" : "Portuguese"}`}
          >
            <Globe className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 rounded-full transition-all hover:bg-secondary"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full transition-all hover:bg-secondary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed right-0 top-0 z-40 h-screen w-full bg-background p-8 shadow-lg transition-transform duration-300 dark:bg-background/95 md:hidden",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="mt-12">
            <ul className="flex flex-col space-y-6">
              <NavLink href="#home" onClick={closeMenu}>
                {t.nav.home}
              </NavLink>
              <NavLink href="#projects" onClick={closeMenu}>
                {t.nav.projects}
              </NavLink>
              <NavLink href="#contact" onClick={closeMenu}>
                {t.nav.contact}
              </NavLink>
              <li className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={toggleDarkMode}
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  <span className="ml-2">{isDarkMode ? t.nav.lightMode : t.nav.darkMode}</span>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
