import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { FormEvent, useState } from "react";
import { Mail, MessageSquare, Send, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const isValidEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.message.trim() !== "" &&
    isValidEmail(formData.email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: t.contact.success,
        description: new Date().toLocaleTimeString(),
      });
      setFormData({ name: "", email: "", message: "" });

      const mailtoLink = `mailto:stephanidejesus2@gmail.com?subject=Contato de ${formData.name}&body=${formData.message}`;
      window.location.href = mailtoLink;
    }, 1000);
  };

  return (
    <section id="contact" className="bg-secondary/30 py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold animate-fade-in">{t.contact.title}</h2>
            <p className="text-xl text-muted-foreground">{t.contact.subtitle}</p>
          </div>

          <Card className="overflow-hidden backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                    <label htmlFor="name" className="text-sm font-medium">
                      {t.contact.name}
                    </label>
                  </div>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-border/50 bg-background/50 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    <label htmlFor="email" className="text-sm font-medium">
                      {t.contact.email}
                    </label>
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-border/50 bg-background/50 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
                    <label htmlFor="message" className="text-sm font-medium">
                      {t.contact.message}
                    </label>
                  </div>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="border-border/50 min-h-32 bg-background/50 backdrop-blur-sm"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full transition-all hover:translate-y-[-2px]"
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                      <span>{t.contact.send}...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      <span>{t.contact.send}</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
