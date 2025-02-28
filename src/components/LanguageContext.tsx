
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the supported languages
export type Language = "en" | "es" | "fr" | "pt";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  languageOptions: { value: Language; label: string }[];
  t: (key: string) => string; // Translation function
};

// Define the language options
const languageOptions: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "pt", label: "Português" },
];

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  en: {
    // General
    "app.name": "Kolabz",
    "app.tagline": "Master AI Prompts with Precision",
    "app.description": "Kolabz empowers you to generate optimized prompts for any AI model. Create, refine, and save prompts that get better results, every time.",
    
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.myPrompts": "My Prompts",
    "nav.settings": "Settings",
    "nav.login": "Log In",
    "nav.signup": "Sign Up",
    "nav.logout": "Logout",
    "nav.features": "Features",
    "nav.pricing": "Pricing",
    "nav.about": "About Us",
    
    // User Dashboard
    "dashboard.welcome": "Welcome back",
    "dashboard.recentPrompts": "Recent Prompts",
    "dashboard.viewAll": "View All",
    "dashboard.noPrompts": "No prompts yet. Create your first prompt!",
    
    // Admin Dashboard
    "admin.users": "Users",
    "admin.addUser": "Add User",
    "admin.userManagement": "User Management",
    "admin.editUser": "Edit User",
    "admin.deleteUser": "Delete User",
    "admin.settings": "Settings",
    "admin.payments": "Payments",
    "admin.website": "Website",
    
    // User Roles
    "role.user": "User",
    "role.admin": "Admin",
    "role.superadmin": "Super Admin",
    "role.user.description": "Standard user with access to their own dashboard only",
    "role.admin.description": "Admin can manage users and basic settings",
    "role.superadmin.description": "Super Admin has full access to all features",
    
    // Prompts
    "prompt.create": "Create Prompt",
    "prompt.edit": "Edit Prompt",
    "prompt.delete": "Delete Prompt",
    "prompt.save": "Save Prompt",
    "prompt.generate": "Generate",
    "prompt.copy": "Copy",
    "prompt.refine": "Refine",
    
    // Settings
    "settings.profile": "Profile",
    "settings.security": "Security",
    "settings.notifications": "Notifications",
    "settings.appearance": "Appearance",
    "settings.billing": "Billing",
    "settings.save": "Save Changes",
    
    // Form fields
    "form.name": "Name",
    "form.email": "Email",
    "form.password": "Password",
    "form.confirmPassword": "Confirm Password",
    "form.role": "Role",
    "form.submit": "Submit",
    "form.cancel": "Cancel",
    
    // Subscription
    "subscription.manage": "Manage Subscription",
    "subscription.change": "Change Plan",
    "subscription.active": "Active",
    "subscription.inactive": "Inactive",
    "subscription.expired": "Expired",
    
    // Plans
    "plan.free": "Free Trial",
    "plan.pro": "Pro",
    "plan.team": "Team",
    
    // Notifications
    "notification.success": "Success",
    "notification.error": "Error",
    "notification.warning": "Warning",
    "notification.info": "Information",
    
    // Buttons
    "button.save": "Save",
    "button.cancel": "Cancel",
    "button.delete": "Delete",
    "button.edit": "Edit",
    "button.create": "Create",
    "button.view": "View",
    "button.download": "Download",
    "button.upload": "Upload",
    "button.filter": "Filter",
    "button.search": "Search",
    "button.apply": "Apply",
    "button.reset": "Reset",
    "button.import": "Import",
    "button.export": "Export",
    "button.back": "Back",
    "button.next": "Next",
    
    // Common actions
    "action.saving": "Saving...",
    "action.loading": "Loading...",
    "action.deleting": "Deleting...",
    "action.processing": "Processing...",
    "action.generating": "Generating...",
    "action.uploading": "Uploading...",
    "action.downloading": "Downloading...",
    
    // Messages
    "message.confirmDelete": "Are you sure you want to delete this?",
    "message.noResults": "No results found",
    "message.welcome": "Welcome to Kolabz",
    "message.passwordsMustMatch": "Passwords must match",
    "message.requiredField": "This field is required",
    "message.invalidEmail": "Invalid email address",
    "message.shortPassword": "Password must be at least 8 characters",
  },
  es: {
    // General
    "app.name": "Kolabz",
    "app.tagline": "Domina Prompts de IA con Precisión",
    "app.description": "Kolabz te permite generar prompts optimizados para cualquier modelo de IA. Crea, refina y guarda prompts que obtienen mejores resultados, cada vez.",
    
    // Navigation
    "nav.dashboard": "Panel",
    "nav.myPrompts": "Mis Prompts",
    "nav.settings": "Configuración",
    "nav.login": "Iniciar Sesión",
    "nav.signup": "Registrarse",
    "nav.logout": "Cerrar Sesión",
    "nav.features": "Características",
    "nav.pricing": "Precios",
    "nav.about": "Acerca de",
    
    // User Dashboard
    "dashboard.welcome": "Bienvenido de nuevo",
    "dashboard.recentPrompts": "Prompts Recientes",
    "dashboard.viewAll": "Ver Todos",
    "dashboard.noPrompts": "Aún no hay prompts. ¡Crea tu primer prompt!",
    
    // Admin Dashboard
    "admin.users": "Usuarios",
    "admin.addUser": "Añadir Usuario",
    "admin.userManagement": "Gestión de Usuarios",
    "admin.editUser": "Editar Usuario",
    "admin.deleteUser": "Eliminar Usuario",
    "admin.settings": "Configuración",
    "admin.payments": "Pagos",
    "admin.website": "Sitio Web",
    
    // User Roles
    "role.user": "Usuario",
    "role.admin": "Administrador",
    "role.superadmin": "Super Administrador",
    "role.user.description": "Usuario estándar con acceso solo a su propio panel",
    "role.admin.description": "El administrador puede gestionar usuarios y configuraciones básicas",
    "role.superadmin.description": "El Super Administrador tiene acceso completo a todas las funciones",
    
    // Prompts
    "prompt.create": "Crear Prompt",
    "prompt.edit": "Editar Prompt",
    "prompt.delete": "Eliminar Prompt",
    "prompt.save": "Guardar Prompt",
    "prompt.generate": "Generar",
    "prompt.copy": "Copiar",
    "prompt.refine": "Refinar",
    
    // Settings
    "settings.profile": "Perfil",
    "settings.security": "Seguridad",
    "settings.notifications": "Notificaciones",
    "settings.appearance": "Apariencia",
    "settings.billing": "Facturación",
    "settings.save": "Guardar Cambios",
    
    // Form fields
    "form.name": "Nombre",
    "form.email": "Correo Electrónico",
    "form.password": "Contraseña",
    "form.confirmPassword": "Confirmar Contraseña",
    "form.role": "Rol",
    "form.submit": "Enviar",
    "form.cancel": "Cancelar",
    
    // Subscription
    "subscription.manage": "Gestionar Suscripción",
    "subscription.change": "Cambiar Plan",
    "subscription.active": "Activa",
    "subscription.inactive": "Inactiva",
    "subscription.expired": "Expirada",
    
    // Plans
    "plan.free": "Prueba Gratuita",
    "plan.pro": "Pro",
    "plan.team": "Equipo",
    
    // Notifications
    "notification.success": "Éxito",
    "notification.error": "Error",
    "notification.warning": "Advertencia",
    "notification.info": "Información",
    
    // Buttons
    "button.save": "Guardar",
    "button.cancel": "Cancelar",
    "button.delete": "Eliminar",
    "button.edit": "Editar",
    "button.create": "Crear",
    "button.view": "Ver",
    "button.download": "Descargar",
    "button.upload": "Subir",
    "button.filter": "Filtrar",
    "button.search": "Buscar",
    "button.apply": "Aplicar",
    "button.reset": "Restablecer",
    "button.import": "Importar",
    "button.export": "Exportar",
    "button.back": "Atrás",
    "button.next": "Siguiente",
    
    // Common actions
    "action.saving": "Guardando...",
    "action.loading": "Cargando...",
    "action.deleting": "Eliminando...",
    "action.processing": "Procesando...",
    "action.generating": "Generando...",
    "action.uploading": "Subiendo...",
    "action.downloading": "Descargando...",
    
    // Messages
    "message.confirmDelete": "¿Estás seguro de que quieres eliminar esto?",
    "message.noResults": "No se encontraron resultados",
    "message.welcome": "Bienvenido a Kolabz",
    "message.passwordsMustMatch": "Las contraseñas deben coincidir",
    "message.requiredField": "Este campo es obligatorio",
    "message.invalidEmail": "Dirección de correo electrónico inválida",
    "message.shortPassword": "La contraseña debe tener al menos 8 caracteres",
  },
  fr: {
    // General
    "app.name": "Kolabz",
    "app.tagline": "Maîtrisez les Prompts IA avec Précision",
    "app.description": "Kolabz vous permet de générer des prompts optimisés pour n'importe quel modèle d'IA. Créez, affinez et sauvegardez des prompts qui obtiennent de meilleurs résultats, à chaque fois.",
    
    // Navigation
    "nav.dashboard": "Tableau de Bord",
    "nav.myPrompts": "Mes Prompts",
    "nav.settings": "Paramètres",
    "nav.login": "Connexion",
    "nav.signup": "Inscription",
    "nav.logout": "Déconnexion",
    "nav.features": "Fonctionnalités",
    "nav.pricing": "Tarifs",
    "nav.about": "À Propos",
    
    // User Dashboard
    "dashboard.welcome": "Bon retour",
    "dashboard.recentPrompts": "Prompts Récents",
    "dashboard.viewAll": "Voir Tous",
    "dashboard.noPrompts": "Pas encore de prompts. Créez votre premier prompt !",
    
    // Admin Dashboard
    "admin.users": "Utilisateurs",
    "admin.addUser": "Ajouter un Utilisateur",
    "admin.userManagement": "Gestion des Utilisateurs",
    "admin.editUser": "Modifier l'Utilisateur",
    "admin.deleteUser": "Supprimer l'Utilisateur",
    "admin.settings": "Paramètres",
    "admin.payments": "Paiements",
    "admin.website": "Site Web",
    
    // User Roles
    "role.user": "Utilisateur",
    "role.admin": "Administrateur",
    "role.superadmin": "Super Administrateur",
    "role.user.description": "Utilisateur standard avec accès uniquement à son propre tableau de bord",
    "role.admin.description": "L'administrateur peut gérer les utilisateurs et les paramètres de base",
    "role.superadmin.description": "Le Super Administrateur a un accès complet à toutes les fonctionnalités",
    
    // Prompts
    "prompt.create": "Créer un Prompt",
    "prompt.edit": "Modifier le Prompt",
    "prompt.delete": "Supprimer le Prompt",
    "prompt.save": "Enregistrer le Prompt",
    "prompt.generate": "Générer",
    "prompt.copy": "Copier",
    "prompt.refine": "Affiner",
    
    // Settings
    "settings.profile": "Profil",
    "settings.security": "Sécurité",
    "settings.notifications": "Notifications",
    "settings.appearance": "Apparence",
    "settings.billing": "Facturation",
    "settings.save": "Enregistrer les Modifications",
    
    // Form fields
    "form.name": "Nom",
    "form.email": "E-mail",
    "form.password": "Mot de Passe",
    "form.confirmPassword": "Confirmer le Mot de Passe",
    "form.role": "Rôle",
    "form.submit": "Soumettre",
    "form.cancel": "Annuler",
    
    // Subscription
    "subscription.manage": "Gérer l'Abonnement",
    "subscription.change": "Changer de Plan",
    "subscription.active": "Actif",
    "subscription.inactive": "Inactif",
    "subscription.expired": "Expiré",
    
    // Plans
    "plan.free": "Essai Gratuit",
    "plan.pro": "Pro",
    "plan.team": "Équipe",
    
    // Notifications
    "notification.success": "Succès",
    "notification.error": "Erreur",
    "notification.warning": "Avertissement",
    "notification.info": "Information",
    
    // Buttons
    "button.save": "Enregistrer",
    "button.cancel": "Annuler",
    "button.delete": "Supprimer",
    "button.edit": "Modifier",
    "button.create": "Créer",
    "button.view": "Voir",
    "button.download": "Télécharger",
    "button.upload": "Uploader",
    "button.filter": "Filtrer",
    "button.search": "Rechercher",
    "button.apply": "Appliquer",
    "button.reset": "Réinitialiser",
    "button.import": "Importer",
    "button.export": "Exporter",
    "button.back": "Retour",
    "button.next": "Suivant",
    
    // Common actions
    "action.saving": "Enregistrement...",
    "action.loading": "Chargement...",
    "action.deleting": "Suppression...",
    "action.processing": "Traitement...",
    "action.generating": "Génération...",
    "action.uploading": "Téléversement...",
    "action.downloading": "Téléchargement...",
    
    // Messages
    "message.confirmDelete": "Êtes-vous sûr de vouloir supprimer ceci ?",
    "message.noResults": "Aucun résultat trouvé",
    "message.welcome": "Bienvenue sur Kolabz",
    "message.passwordsMustMatch": "Les mots de passe doivent correspondre",
    "message.requiredField": "Ce champ est obligatoire",
    "message.invalidEmail": "Adresse e-mail invalide",
    "message.shortPassword": "Le mot de passe doit comporter au moins 8 caractères",
  },
  pt: {
    // General
    "app.name": "Kolabz",
    "app.tagline": "Domine Prompts de IA com Precisão",
    "app.description": "Kolabz permite que você gere prompts otimizados para qualquer modelo de IA. Crie, refine e salve prompts que obtêm melhores resultados, sempre.",
    
    // Navigation
    "nav.dashboard": "Painel",
    "nav.myPrompts": "Meus Prompts",
    "nav.settings": "Configurações",
    "nav.login": "Entrar",
    "nav.signup": "Registrar",
    "nav.logout": "Sair",
    "nav.features": "Recursos",
    "nav.pricing": "Preços",
    "nav.about": "Sobre Nós",
    
    // User Dashboard
    "dashboard.welcome": "Bem-vindo de volta",
    "dashboard.recentPrompts": "Prompts Recentes",
    "dashboard.viewAll": "Ver Todos",
    "dashboard.noPrompts": "Ainda não há prompts. Crie seu primeiro prompt!",
    
    // Admin Dashboard
    "admin.users": "Usuários",
    "admin.addUser": "Adicionar Usuário",
    "admin.userManagement": "Gerenciamento de Usuários",
    "admin.editUser": "Editar Usuário",
    "admin.deleteUser": "Excluir Usuário",
    "admin.settings": "Configurações",
    "admin.payments": "Pagamentos",
    "admin.website": "Site",
    
    // User Roles
    "role.user": "Usuário",
    "role.admin": "Administrador",
    "role.superadmin": "Super Administrador",
    "role.user.description": "Usuário padrão com acesso apenas ao seu próprio painel",
    "role.admin.description": "O administrador pode gerenciar usuários e configurações básicas",
    "role.superadmin.description": "O Super Administrador tem acesso completo a todos os recursos",
    
    // Prompts
    "prompt.create": "Criar Prompt",
    "prompt.edit": "Editar Prompt",
    "prompt.delete": "Excluir Prompt",
    "prompt.save": "Salvar Prompt",
    "prompt.generate": "Gerar",
    "prompt.copy": "Copiar",
    "prompt.refine": "Refinar",
    
    // Settings
    "settings.profile": "Perfil",
    "settings.security": "Segurança",
    "settings.notifications": "Notificações",
    "settings.appearance": "Aparência",
    "settings.billing": "Faturamento",
    "settings.save": "Salvar Alterações",
    
    // Form fields
    "form.name": "Nome",
    "form.email": "E-mail",
    "form.password": "Senha",
    "form.confirmPassword": "Confirmar Senha",
    "form.role": "Função",
    "form.submit": "Enviar",
    "form.cancel": "Cancelar",
    
    // Subscription
    "subscription.manage": "Gerenciar Assinatura",
    "subscription.change": "Mudar Plano",
    "subscription.active": "Ativa",
    "subscription.inactive": "Inativa",
    "subscription.expired": "Expirada",
    
    // Plans
    "plan.free": "Teste Gratuito",
    "plan.pro": "Pro",
    "plan.team": "Equipe",
    
    // Notifications
    "notification.success": "Sucesso",
    "notification.error": "Erro",
    "notification.warning": "Aviso",
    "notification.info": "Informação",
    
    // Buttons
    "button.save": "Salvar",
    "button.cancel": "Cancelar",
    "button.delete": "Excluir",
    "button.edit": "Editar",
    "button.create": "Criar",
    "button.view": "Visualizar",
    "button.download": "Baixar",
    "button.upload": "Enviar",
    "button.filter": "Filtrar",
    "button.search": "Buscar",
    "button.apply": "Aplicar",
    "button.reset": "Redefinir",
    "button.import": "Importar",
    "button.export": "Exportar",
    "button.back": "Voltar",
    "button.next": "Próximo",
    
    // Common actions
    "action.saving": "Salvando...",
    "action.loading": "Carregando...",
    "action.deleting": "Excluindo...",
    "action.processing": "Processando...",
    "action.generating": "Gerando...",
    "action.uploading": "Enviando...",
    "action.downloading": "Baixando...",
    
    // Messages
    "message.confirmDelete": "Tem certeza que deseja excluir isso?",
    "message.noResults": "Nenhum resultado encontrado",
    "message.welcome": "Bem-vindo ao Kolabz",
    "message.passwordsMustMatch": "As senhas devem corresponder",
    "message.requiredField": "Este campo é obrigatório",
    "message.invalidEmail": "Endereço de e-mail inválido",
    "message.shortPassword": "A senha deve ter pelo menos 8 caracteres",
  }
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  languageOptions,
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get from local storage or default to English
    const savedLanguage = localStorage.getItem("kolabz-language");
    return (savedLanguage as Language) || "en";
  });

  // Translation function
  const t = (key: string): string => {
    // Return the translated string or the key if not found
    return translations[language][key] || key;
  };

  useEffect(() => {
    // Save to local storage when language changes
    localStorage.setItem("kolabz-language", language);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languageOptions, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
