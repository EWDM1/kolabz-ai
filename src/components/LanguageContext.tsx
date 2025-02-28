
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the supported languages
type Language = "en" | "es" | "fr" | "pt";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  languageOptions: { value: Language; label: string }[];
  t: (key: string, defaultText?: string) => string;
};

// Define the language options
const languageOptions: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "pt", label: "Português" },
];

// Dictionary of translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "nav.features": "Features",
    "nav.pricing": "Pricing",
    "nav.about": "About Us",
    "nav.login": "Log In",
    "nav.signup": "Sign Up",
    
    // Hero
    "hero.tagline": "Craft perfect prompts in seconds",
    "hero.title": "Master AI Prompts",
    "hero.titleAccent": "With Precision",
    "hero.description": "Kolabz empowers you to generate optimized prompts for any AI model. Create, refine, and save prompts that get better results, every time.",
    "hero.cta.trial": "Start Free Trial",
    "hero.cta.pricing": "See Pricing",
    "hero.security": "Secure payments via Stripe • 7-day free trial • Cancel anytime",
    
    // Features
    "features.title": "Designed for prompt engineering excellence",
    "features.description": "Kolabz combines intuitive design with powerful functionality to help you generate prompts that get exceptional results from any AI model.",
    "features.guided.title": "Guided Prompt Refinement",
    "features.guided.description": "Step-by-step assistance to craft the perfect prompt for any AI model, with contextual suggestions based on your goals.",
    "features.multi.title": "Multi-LLM Optimization",
    "features.multi.description": "Tailor your prompts specifically for GPT-4, Claude, Gemini, and more with model-specific enhancements.",
    "features.instant.title": "Instant Improvement",
    "features.instant.description": "Transform vague ideas into structured, detailed prompts that yield significantly better AI responses.",
    "features.save.title": "Save & Reuse",
    "features.save.description": "Build a personal library of your best prompts, organized by category and purpose for quick access.",
    "features.science.title": "The science of effective prompting",
    "features.science.description": "Our platform is built on extensive research into what makes AI responses most useful. We've distilled these insights into an intuitive system that anyone can use.",
    
    // Pricing
    "pricing.title": "Simple, transparent pricing",
    "pricing.description": "Choose the plan that's right for you. All plans include a 7-day free trial. No credit card required to start.",
    "pricing.toggle.monthly": "Monthly",
    "pricing.toggle.annual": "Annual",
    "pricing.save": "Save 16%",
    "pricing.free.name": "Free Trial",
    "pricing.free.description": "Test drive Kolabz with limited features",
    "pricing.pro.name": "Pro",
    "pricing.pro.description": "Perfect for individual creators and professionals",
    "pricing.team.name": "Team",
    "pricing.team.description": "Ideal for teams and businesses",
    "pricing.cta.trial": "Start Free Trial",
    "pricing.cta.subscribe": "Subscribe Now",
    "pricing.disclaimer": "All plans include a 7-day free trial. No credit card required to start. Cancel anytime. If you're not satisfied, contact us within 30 days for a full refund.",
    
    // Footer
    "footer.description": "Kolabz helps you craft perfect prompts for any AI model, enhancing your productivity and creativity.",
    "footer.copyright": "© 2023 Kolabz. All rights reserved.",
    "footer.tagline": "Made with care for creators everywhere",
    
    // Dashboard/Settings
    "dashboard.welcome": "Welcome back!",
    "settings.title": "Settings",
    "settings.save": "Save Changes"
  },
  es: {
    // Header
    "nav.features": "Características",
    "nav.pricing": "Precios",
    "nav.about": "Nosotros",
    "nav.login": "Iniciar Sesión",
    "nav.signup": "Registrarse",
    
    // Hero
    "hero.tagline": "Crea prompts perfectos en segundos",
    "hero.title": "Domina Prompts de IA",
    "hero.titleAccent": "Con Precisión",
    "hero.description": "Kolabz te permite generar prompts optimizados para cualquier modelo de IA. Crea, refina y guarda prompts que obtienen mejores resultados, cada vez.",
    "hero.cta.trial": "Comenzar Prueba Gratuita",
    "hero.cta.pricing": "Ver Precios",
    "hero.security": "Pagos seguros a través de Stripe • Prueba gratuita de 7 días • Cancela cuando quieras",
    
    // Features
    "features.title": "Diseñado para la excelencia en ingeniería de prompts",
    "features.description": "Kolabz combina un diseño intuitivo con una funcionalidad potente para ayudarte a generar prompts que obtienen resultados excepcionales de cualquier modelo de IA.",
    "features.guided.title": "Refinamiento Guiado de Prompts",
    "features.guided.description": "Asistencia paso a paso para crear el prompt perfecto para cualquier modelo de IA, con sugerencias contextuales basadas en tus objetivos.",
    "features.multi.title": "Optimización Multi-LLM",
    "features.multi.description": "Personaliza tus prompts específicamente para GPT-4, Claude, Gemini y más, con mejoras específicas para cada modelo.",
    "features.instant.title": "Mejora Instantánea",
    "features.instant.description": "Transforma ideas vagas en prompts estructurados y detallados que generan respuestas de IA significativamente mejores.",
    "features.save.title": "Guardar y Reutilizar",
    "features.save.description": "Construye una biblioteca personal de tus mejores prompts, organizados por categoría y propósito para un acceso rápido.",
    "features.science.title": "La ciencia del prompting efectivo",
    "features.science.description": "Nuestra plataforma está construida sobre una extensa investigación sobre lo que hace que las respuestas de IA sean más útiles. Hemos destilado estos conocimientos en un sistema intuitivo que cualquiera puede usar.",
    
    // Pricing
    "pricing.title": "Precios simples y transparentes",
    "pricing.description": "Elige el plan que sea adecuado para ti. Todos los planes incluyen una prueba gratuita de 7 días. No se requiere tarjeta de crédito para comenzar.",
    "pricing.toggle.monthly": "Mensual",
    "pricing.toggle.annual": "Anual",
    "pricing.save": "Ahorra 16%",
    "pricing.free.name": "Prueba Gratuita",
    "pricing.free.description": "Prueba Kolabz con funciones limitadas",
    "pricing.pro.name": "Pro",
    "pricing.pro.description": "Perfecto para creadores y profesionales individuales",
    "pricing.team.name": "Equipo",
    "pricing.team.description": "Ideal para equipos y empresas",
    "pricing.cta.trial": "Iniciar Prueba Gratuita",
    "pricing.cta.subscribe": "Suscribirse Ahora",
    "pricing.disclaimer": "Todos los planes incluyen una prueba gratuita de 7 días. No se requiere tarjeta de crédito para comenzar. Cancela en cualquier momento. Si no estás satisfecho, contáctanos dentro de los 30 días para un reembolso completo.",
    
    // Footer
    "footer.description": "Kolabz te ayuda a crear prompts perfectos para cualquier modelo de IA, mejorando tu productividad y creatividad.",
    "footer.copyright": "© 2023 Kolabz. Todos los derechos reservados.",
    "footer.tagline": "Hecho con cuidado para creadores en todas partes",
    
    // Dashboard/Settings
    "dashboard.welcome": "¡Bienvenido de nuevo!",
    "settings.title": "Configuración",
    "settings.save": "Guardar Cambios"
  },
  fr: {
    // Header
    "nav.features": "Fonctionnalités",
    "nav.pricing": "Tarifs",
    "nav.about": "À Propos",
    "nav.login": "Connexion",
    "nav.signup": "S'inscrire",
    
    // Hero
    "hero.tagline": "Créez des prompts parfaits en quelques secondes",
    "hero.title": "Maîtrisez les Prompts IA",
    "hero.titleAccent": "Avec Précision",
    "hero.description": "Kolabz vous permet de générer des prompts optimisés pour n'importe quel modèle d'IA. Créez, affinez et sauvegardez des prompts qui obtiennent de meilleurs résultats, à chaque fois.",
    "hero.cta.trial": "Commencer l'Essai Gratuit",
    "hero.cta.pricing": "Voir les Prix",
    "hero.security": "Paiements sécurisés via Stripe • Essai gratuit de 7 jours • Annulez à tout moment",
    
    // Features
    "features.title": "Conçu pour l'excellence en ingénierie de prompts",
    "features.description": "Kolabz combine un design intuitif avec des fonctionnalités puissantes pour vous aider à générer des prompts qui obtiennent des résultats exceptionnels de n'importe quel modèle d'IA.",
    "features.guided.title": "Raffinement Guidé de Prompts",
    "features.guided.description": "Assistance étape par étape pour créer le prompt parfait pour n'importe quel modèle d'IA, avec des suggestions contextuelles basées sur vos objectifs.",
    "features.multi.title": "Optimisation Multi-LLM",
    "features.multi.description": "Adaptez vos prompts spécifiquement pour GPT-4, Claude, Gemini, et plus avec des améliorations spécifiques à chaque modèle.",
    "features.instant.title": "Amélioration Instantanée",
    "features.instant.description": "Transformez des idées vagues en prompts structurés et détaillés qui génèrent des réponses d'IA significativement meilleures.",
    "features.save.title": "Sauvegarder et Réutiliser",
    "features.save.description": "Construisez une bibliothèque personnelle de vos meilleurs prompts, organisés par catégorie et objectif pour un accès rapide.",
    "features.science.title": "La science du prompting efficace",
    "features.science.description": "Notre plateforme est construite sur une recherche approfondie sur ce qui rend les réponses d'IA les plus utiles. Nous avons distillé ces connaissances dans un système intuitif que tout le monde peut utiliser.",
    
    // Pricing
    "pricing.title": "Tarification simple et transparente",
    "pricing.description": "Choisissez le plan qui vous convient. Tous les plans incluent un essai gratuit de 7 jours. Aucune carte de crédit requise pour commencer.",
    "pricing.toggle.monthly": "Mensuel",
    "pricing.toggle.annual": "Annuel",
    "pricing.save": "Économisez 16%",
    "pricing.free.name": "Essai Gratuit",
    "pricing.free.description": "Testez Kolabz avec des fonctionnalités limitées",
    "pricing.pro.name": "Pro",
    "pricing.pro.description": "Parfait pour les créateurs et professionnels individuels",
    "pricing.team.name": "Équipe",
    "pricing.team.description": "Idéal pour les équipes et les entreprises",
    "pricing.cta.trial": "Commencer l'Essai Gratuit",
    "pricing.cta.subscribe": "S'abonner Maintenant",
    "pricing.disclaimer": "Tous les plans incluent un essai gratuit de 7 jours. Aucune carte de crédit requise pour commencer. Annulez à tout moment. Si vous n'êtes pas satisfait, contactez-nous dans les 30 jours pour un remboursement complet.",
    
    // Footer
    "footer.description": "Kolabz vous aide à créer des prompts parfaits pour n'importe quel modèle d'IA, améliorant votre productivité et créativité.",
    "footer.copyright": "© 2023 Kolabz. Tous droits réservés.",
    "footer.tagline": "Fait avec soin pour les créateurs du monde entier",
    
    // Dashboard/Settings
    "dashboard.welcome": "Bon retour parmi nous!",
    "settings.title": "Paramètres",
    "settings.save": "Enregistrer les Modifications"
  },
  pt: {
    // Header
    "nav.features": "Recursos",
    "nav.pricing": "Preços",
    "nav.about": "Sobre Nós",
    "nav.login": "Entrar",
    "nav.signup": "Cadastrar",
    
    // Hero
    "hero.tagline": "Crie prompts perfeitos em segundos",
    "hero.title": "Domine Prompts de IA",
    "hero.titleAccent": "Com Precisão",
    "hero.description": "Kolabz permite que você gere prompts otimizados para qualquer modelo de IA. Crie, refine e salve prompts que obtêm melhores resultados, sempre.",
    "hero.cta.trial": "Iniciar Teste Gratuito",
    "hero.cta.pricing": "Ver Preços",
    "hero.security": "Pagamentos seguros via Stripe • Teste gratuito de 7 dias • Cancele quando quiser",
    
    // Features
    "features.title": "Projetado para excelência em engenharia de prompts",
    "features.description": "Kolabz combina design intuitivo com funcionalidade poderosa para ajudá-lo a gerar prompts que obtêm resultados excepcionais de qualquer modelo de IA.",
    "features.guided.title": "Refinamento Guiado de Prompts",
    "features.guided.description": "Assistência passo a passo para criar o prompt perfeito para qualquer modelo de IA, com sugestões contextuais baseadas em seus objetivos.",
    "features.multi.title": "Otimização Multi-LLM",
    "features.multi.description": "Adapte seus prompts especificamente para GPT-4, Claude, Gemini e mais, com melhorias específicas para cada modelo.",
    "features.instant.title": "Melhoria Instantânea",
    "features.instant.description": "Transforme ideias vagas em prompts estruturados e detalhados que geram respostas de IA significativamente melhores.",
    "features.save.title": "Salvar e Reutilizar",
    "features.save.description": "Construa uma biblioteca pessoal dos seus melhores prompts, organizados por categoria e propósito para acesso rápido.",
    "features.science.title": "A ciência do prompting efetivo",
    "features.science.description": "Nossa plataforma é construída em extensa pesquisa sobre o que torna as respostas de IA mais úteis. Destilamos esses insights em um sistema intuitivo que qualquer pessoa pode usar.",
    
    // Pricing
    "pricing.title": "Preços simples e transparentes",
    "pricing.description": "Escolha o plano certo para você. Todos os planos incluem um teste gratuito de 7 dias. Não é necessário cartão de crédito para começar.",
    "pricing.toggle.monthly": "Mensal",
    "pricing.toggle.annual": "Anual",
    "pricing.save": "Economize 16%",
    "pricing.free.name": "Teste Gratuito",
    "pricing.free.description": "Experimente o Kolabz com recursos limitados",
    "pricing.pro.name": "Pro",
    "pricing.pro.description": "Perfeito para criadores e profissionais individuais",
    "pricing.team.name": "Equipe",
    "pricing.team.description": "Ideal para equipes e empresas",
    "pricing.cta.trial": "Iniciar Teste Gratuito",
    "pricing.cta.subscribe": "Assinar Agora",
    "pricing.disclaimer": "Todos os planos incluem um teste gratuito de 7 dias. Não é necessário cartão de crédito para começar. Cancele a qualquer momento. Se não estiver satisfeito, entre em contato conosco em 30 dias para um reembolso total.",
    
    // Footer
    "footer.description": "Kolabz ajuda você a criar prompts perfeitos para qualquer modelo de IA, melhorando sua produtividade e criatividade.",
    "footer.copyright": "© 2023 Kolabz. Todos os direitos reservados.",
    "footer.tagline": "Feito com cuidado para criadores em todo lugar",
    
    // Dashboard/Settings
    "dashboard.welcome": "Bem-vindo de volta!",
    "settings.title": "Configurações",
    "settings.save": "Salvar Alterações"
  }
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  languageOptions,
  t: (key: string, defaultText?: string) => defaultText || key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get from local storage or default to English
    const savedLanguage = localStorage.getItem("kolabz-language");
    return (savedLanguage as Language) || "en";
  });

  useEffect(() => {
    // Save to local storage when language changes
    localStorage.setItem("kolabz-language", language);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  // Translation function
  const t = (key: string, defaultText?: string): string => {
    // Get the current language's translations
    const langTranslations = translations[language] || {};
    
    // Return the translation if it exists, otherwise return the default text or the key itself
    return langTranslations[key] || defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languageOptions, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
