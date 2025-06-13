import React, { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Hero: React.FC = () => {
  const [isTypingDone, setIsTypingDone] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setIsTypingDone(true);
    }, 4000);

    return () => clearTimeout(typingTimer);
  }, []);

  const handleScroll = () => {
    const aboutSection = document.querySelector("#about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleParallax = () => {
      if (sectionRef.current) {
        const scrollY = window.scrollY;
        const sectionTop = sectionRef.current.offsetTop;
        const sectionHeight = sectionRef.current.offsetHeight;
        
        // Only apply parallax if we're in or near the section
        if (scrollY >= sectionTop - window.innerHeight && scrollY <= sectionTop + sectionHeight) {
          const yPos = (scrollY - sectionTop) * 0.5;
          sectionRef.current.style.backgroundPositionY = `${yPos}px`;
        }
      }
    };

    window.addEventListener("scroll", handleParallax);
    return () => {
      window.removeEventListener("scroll", handleParallax);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center bg-gradient-to-br from-pink-light via-background to-neutral-light dark:from-dark-tertiary dark:via-dark-DEFAULT dark:to-dark-secondary overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-light/30 dark:bg-pink-vibrant/20 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-pink-light/40 dark:bg-pink-vibrant/30 blur-3xl animate-float" style={{animationDelay: '1s'}}></div>

      <div className="container mx-auto px-4 z-10">
        <div className="text-center">
          <p className="text-lg md:text-xl mb-3 opacity-0 animate-fade-in animate-delay-300">
            {t("hero.greeting")}
          </p>
          <h1 className="font-bold mb-6 opacity-0 animate-fade-in animate-delay-600">
            <span className="text-pink-vibrant">Stephani</span>
          </h1>
          
          <div className="h-12 mb-8">
            <div className="typing-container animate-typing">
              <p className="text-xl md:text-2xl">{t("hero.role")}</p>
            </div>
          </div>

          <div className={`mt-8 opacity-0 ${isTypingDone ? 'animate-fade-in' : ''}`}>
            <Button 
              onClick={handleScroll}
              className="bg-pink-vibrant hover:bg-pink-vibrant/90 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all group"
            >
              {t("hero.cta")}
              <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-pink-vibrant" />
      </div>
    </section>
  );
};

export default Hero;
