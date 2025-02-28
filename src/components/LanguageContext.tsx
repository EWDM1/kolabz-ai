
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
    
    // About
    "about.title": "About Us",
    "about.vision": "Our Vision for AI Prompt Engineering",
    "about.description": "We're on a mission to help creators, developers, and businesses harness the power of AI through better prompts.",
    
    "about.team.title": "Our Team",
    "about.team.description": "Founded by AI enthusiasts and prompt engineering experts with a passion for making AI more accessible.",
    "about.team.item1": "Industry experts",
    "about.team.item2": "AI researchers",
    "about.team.item3": "Prompt engineers",
    
    "about.expertise.title": "Our Expertise",
    "about.expertise.description": "Specialized in prompt engineering, AI model optimization, and creating user-friendly AI tools.",
    "about.expertise.item1": "Prompt optimization",
    "about.expertise.item2": "Model fine-tuning",
    "about.expertise.item3": "AI workflow design",
    
    "about.values.title": "Our Values",
    "about.values.description": "We believe in democratizing AI, transparency, and creating tools that respect privacy and ethics.",
    "about.values.item1": "Ethical AI",
    "about.values.item2": "Transparency",
    "about.values.item3": "Privacy-first",
    
    "about.mission.title": "Our Mission",
    "about.mission.description": "To empower everyone to unlock the full potential of AI through better prompts and intuitive tools.",
    "about.mission.item1": "Accessibility",
    "about.mission.item2": "Education",
    "about.mission.item3": "Innovation",
    
    "about.founded": "Founded in 2024, Kolabz has helped thousands of users create better AI outputs through optimized prompts. Our platform is designed for everyone from beginners to advanced users looking to get the most out of AI models.",
    
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
    
    // About
    "about.title": "Sobre Nosotros",
    "about.vision": "Nuestra Visión para la Ingeniería de Prompts de IA",
    "about.description": "Estamos en una misión para ayudar a creadores, desarrolladores y empresas a aprovechar el poder de la IA a través de mejores prompts.",
    
    "about.team.title": "Nuestro Equipo",
    "about.team.description": "Fundado por entusiastas de la IA y expertos en ingeniería de prompts con pasión por hacer la IA más accesible.",
    "about.team.item1": "Expertos de la industria",
    "about.team.item2": "Investigadores de IA",
    "about.team.item3": "Ingenieros de prompts",
    
    "about.expertise.title": "Nuestra Experiencia",
    "about.expertise.description": "Especializados en ingeniería de prompts, optimización de modelos de IA y creación de herramientas de IA fáciles de usar.",
    "about.expertise.item1": "Optimización de prompts",
    "about.expertise.item2": "Ajuste de modelos",
    "about.expertise.item3": "Diseño de flujos de trabajo de IA",
    
    "about.values.title": "Nuestros Valores",
    "about.values.description": "Creemos en democratizar la IA, la transparencia y la creación de herramientas que respeten la privacidad y la ética.",
    "about.values.item1": "IA Ética",
    "about.values.item2": "Transparencia",
    "about.values.item3": "Privacidad primero",
    
    "about.mission.title": "Nuestra Misión",
    "about.mission.description": "Capacitar a todos para desbloquear todo el potencial de la IA a través de mejores prompts y herramientas intuitivas.",
    "about.mission.item1": "Accesibilidad",
    "about.mission.item2": "Educación",
    "about.mission.item3": "Innovación",
    
    "about.founded": "Fundada en 2024, Kolabz ha ayudado a miles de usuarios a crear mejores resultados de IA a través de prompts optimizados. Nuestra plataforma está diseñada para todos, desde principiantes hasta usuarios avanzados que buscan obtener el máximo provecho de los modelos de IA.",
    
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
    
    // About
    "about.title": "À Propos de Nous",
    "about.vision": "Notre Vision pour l'Ingénierie de Prompts IA",
    "about.description": "Notre mission est d'aider les créateurs, les développeurs et les entreprises à exploiter la puissance de l'IA grâce à de meilleurs prompts.",
    
    "about.team.title": "Notre Équipe",
    "about.team.description": "Fondée par des passionnés d'IA et des experts en ingénierie de prompts avec une passion pour rendre l'IA plus accessible.",
    "about.team.item1": "Experts de l'industrie",
    "about.team.item2": "Chercheurs en IA",
    "about.team.item3": "Ingénieurs de prompts",
    
    "about.expertise.title": "Notre Expertise",
    "about.expertise.description": "Spécialisés dans l'ingénierie de prompts, l'optimisation de modèles d'IA et la création d'outils d'IA conviviaux.",
    "about.expertise.item1": "Optimisation de prompts",
    "about.expertise.item2": "Ajustement de modèles",
    "about.expertise.item3": "Conception de flux de travail IA",
    
    "about.values.title": "Nos Valeurs",
    "about.values.description": "Nous croyons en la démocratisation de l'IA, la transparence et la création d'outils qui respectent la confidentialité et l'éthique.",
    "about.values.item1": "IA Éthique",
    "about.values.item2": "Transparence",
    "about.values.item3": "Priorité à la confidentialité",
    
    "about.mission.title": "Notre Mission",
    "about.mission.description": "Permettre à chacun de libérer tout le potentiel de l'IA grâce à de meilleurs prompts et des outils intuitifs.",
    "about.mission.item1": "Accessibilité",
    "about.mission.item2": "Éducation",
    "about.mission.item3": "Innovation",
    
    "about.founded": "Fondée en 2024, Kolabz a aidé des milliers d'utilisateurs à créer de meilleurs résultats d'IA grâce à des prompts optimisés. Notre plateforme est conçue pour tous, des débutants aux utilisateurs avancés qui cherchent à tirer le meilleur parti des modèles d'IA.",
    
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
    
    // About
    "about.title": "Sobre Nós",
    "about.vision": "Nossa Visão para Engenharia de Prompts de IA",
    "about.description": "Estamos em uma missão para ajudar criadores, desenvolvedores e empresas a aproveitar o poder da IA através de melhores prompts.",
    
    "about.team.title": "Nossa Equipe",
    "about.team.description": "Fundada por entusiastas de IA e especialistas em engenharia de prompts com paixão por tornar a IA mais acessível.",
    "about.team.item1": "Especialistas da indústria",
    "about.team.item2": "Pesquisadores de IA",
    "about.team.item3": "Engenheiros de prompts",
    
    "about.expertise.title": "Nossa Expertise",
    "about.expertise.description": "Especializados em engenharia de prompts, otimização de modelos de IA e criação de ferramentas de IA fáceis de usar.",
    "about.expertise.item1": "Otimização de prompts",
    "about.expertise.item2": "Ajuste de modelos",
    "about.expertise.item3": "Design de fluxo de trabalho de IA",
    
    "about.values.title": "Nossos Valores",
    "about.values.description": "Acreditamos na democratização da IA, transparência e criação de ferramentas que respeitam a privacidade e a ética.",
    "about.values.item1": "IA Ética",
    "about.values.item2": "Transparência",
    "about.values.item3": "Privacidade em primeiro lugar",
    
    "about.mission.title": "Nossa Missão",
    "about.mission.description": "Capacitar todos a desbloquear todo o potencial da IA através de melhores prompts e ferramentas intuitivas.",
    "about.mission.item1": "Acessibilidade",
    "about.mission.item2": "Educação",
    "about.mission.item3": "Inovação",
    
    "about.founded": "Fundada em 2024, a Kolabz ajudou milhares de usuários a criar melhores resultados de IA através de prompts otimizados. Nossa plataforma é projetada para todos, desde iniciantes até usuários avançados que buscam obter o máximo dos modelos de IA.",
    
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
