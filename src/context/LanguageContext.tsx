
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define available languages
export type Language = 'pt-BR' | 'en-US';

// Define translation content structure
export type Translations = {
  [key in Language]: {
    nav: {
      home: string;
      projects: string;
      contact: string;
      lightMode: string;
      darkMode: string;
    };
    hero: {
      greeting: string;
      title: string;
      subtitle: string;
      viewProjects: string;
      contactMe: string;
      skills: string;
      skillsList: string[];
    };
    projects: {
      title: string;
      subtitle: string;
    };
    contact: {
      title: string;
      subtitle: string;
      name: string;
      email: string;
      message: string;
      send: string;
      success: string;
    };
    footer: {
      copyright: string;
    };
  };
};

// Define the actual translations
const translations: Translations = {
  'pt-BR': {
    nav: {
      home: 'Início',
      projects: 'Projetos',
      contact: 'Contato',
      lightMode: 'Modo Claro',
      darkMode: 'Modo Escuro',
    },
    hero: {
      greeting: 'Olá, eu sou',
      title: 'Stephani',
      subtitle: 'Desenvolvedora criativa apaixonada por criar experiências digitais incríveis.',
      viewProjects: 'Ver Projetos',
      contactMe: 'Entre em Contato',
      skills: 'Minhas Habilidades',
      skillsList: ['React', 'TypeScript', 'Node.js', 'UI/UX Design', 'Tailwind CSS', 'Firebase', 'MongoDB', 'RESTful APIs'],
    },
    projects: {
      title: 'Meus Projetos',
      subtitle: 'Uma seleção dos meus melhores trabalhos',
    },
    contact: {
      title: 'Entre em Contato',
      subtitle: 'Vamos trabalhar juntos no seu próximo projeto',
      name: 'Nome',
      email: 'Email',
      message: 'Mensagem',
      send: 'Enviar',
      success: 'Mensagem enviada com sucesso!',
    },
    footer: {
      copyright: '© 2023 Stephani. Todos os direitos reservados.',
    },
  },
  'en-US': {
    nav: {
      home: 'Home',
      projects: 'Projects',
      contact: 'Contact',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
    },
    hero: {
      greeting: 'Hello, I am',
      title: 'Stephani',
      subtitle: 'Creative developer passionate about building amazing digital experiences.',
      viewProjects: 'View Projects',
      contactMe: 'Contact Me',
      skills: 'My Skills',
      skillsList: ['React', 'TypeScript', 'Node.js', 'UI/UX Design', 'Tailwind CSS', 'Firebase', 'MongoDB', 'RESTful APIs'],
    },
    projects: {
      title: 'My Projects',
      subtitle: 'A selection of my best work',
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Let\'s work together on your next project',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send',
      success: 'Message sent successfully!',
    },
    footer: {
      copyright: '© 2023 Stephani. All rights reserved.',
    },
  },
};

// Create context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations[Language];
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'pt-BR',
  setLanguage: () => {},
  t: translations['pt-BR'],
});

// Language provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt-BR');

  // Get translations for current language
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
