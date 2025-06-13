import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        fromName: formData.get('from_name'),
        fromEmail: formData.get('reply_to'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      };

      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(t('contact.errors.sendFailed'));
      }

      toast({
        title: t('contact.success.title'),
        description: t('contact.success.description'),
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: t('contact.errors.title'),
        description: t('contact.errors.description'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.email'),
      content: "stephanidejesus2@gmail.com",
      href: "mailto:stephanidejesus2@gmail.com",
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      content: "+55 (16) 99366-7268",
      href: "tel:+5516993667268",
    },
    {
      icon: MapPin,
      title: t('contact.location'),
      content: "Taquaritinga, SP",
      href: "https://www.google.com/maps/place/Taquaritinga,+SP/@-21.464333,-48.526333,13z/data=!3m1!4b1!4m6!3m5!1s0x94c6314591580559:0x174ed1681e000dbe!8m2!3d-21.464333!4d-48.526333!16s%2Fg%2F11c48tqxzn?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D",
    },
  ];

  return (
    <section id="contact" className="bg-white dark:bg-dark-DEFAULT">
      <div className="section-container">
        <h2 className="section-title">{t('contact.title')}</h2>

        <div className="flex items-center justify-center">
          <div className="opacity-0 animate-fade-in-up">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">{t('contact.subtitle')}</h3>
            <p className="text-muted-foreground mb-8">
              {t('contact.description')}
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="p-3 bg-pink-light dark:bg-pink-vibrant/10 rounded-full mr-4">
                    <item.icon className="h-5 w-5 text-pink-vibrant" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{item.title}</h4>
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-pink-vibrant transition-colors"
                    >
                      {item.content}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="opacity-0 animate-fade-in-up animate-delay-300">
            <form onSubmit={handleSubmit} className="bg-neutral-light dark:bg-dark-secondary p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-6">{t('contact.form.title')}</h3>
              
              <div className="mb-6">
                <label htmlFor="from_name" className="block mb-2 text-sm font-medium">
                  {t('contact.form.name')}
                </label>
                <Input
                  id="from_name"
                  name="from_name"
                  type="text"
                  placeholder={t('contact.form.namePlaceholder')}
                  required
                  className="bg-white dark:bg-dark-DEFAULT border-pink-light dark:border-pink-vibrant/20 focus:border-pink-vibrant focus:ring-pink-vibrant"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="reply_to" className="block mb-2 text-sm font-medium">
                  {t('contact.form.email')}
                </label>
                <Input
                  id="reply_to"
                  name="reply_to"
                  type="email"
                  placeholder={t('contact.form.emailPlaceholder')}
                  required
                  className="bg-white dark:bg-dark-DEFAULT border-pink-light dark:border-pink-vibrant/20 focus:border-pink-vibrant focus:ring-pink-vibrant"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                  {t('contact.form.subject')}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder={t('contact.form.subjectPlaceholder')}
                  required
                  className="bg-white dark:bg-dark-DEFAULT border-pink-light dark:border-pink-vibrant/20 focus:border-pink-vibrant focus:ring-pink-vibrant"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-sm font-medium">
                  {t('contact.form.message')}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t('contact.form.messagePlaceholder')}
                  required
                  rows={5}
                  className="bg-white dark:bg-dark-DEFAULT border-pink-light dark:border-pink-vibrant/20 focus:border-pink-vibrant focus:ring-pink-vibrant"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-vibrant hover:bg-pink-vibrant/90 text-white py-2 px-4 rounded-md"
              >
                {isLoading ? t('contact.form.sending') : t('contact.form.send')}
              </Button>
            </form>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
