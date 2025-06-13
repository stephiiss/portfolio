import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function LanguageSelector() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="flex items-center">
      <Select defaultValue={i18n.language} onValueChange={changeLanguage}>
        <SelectTrigger className="w-[70px] h-9 px-2 border-none bg-transparent hover:bg-neutral-light dark:hover:bg-dark-tertiary">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="text-sm uppercase">{i18n.language}</span>
          </div>
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value="en" className="cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="text-sm">English</span>
            </div>
          </SelectItem>
          <SelectItem value="pt" className="cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="text-sm">Português</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 