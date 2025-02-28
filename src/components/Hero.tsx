
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageContext";

const Hero = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  // Function to handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute right-0 top-1/3 w-1/3 h-1/3 rounded-full bg-primary/20 filter blur-3xl"></div>
        <div className="absolute left-1/4 bottom-1/4 w-1/4 h-1/4 rounded-full bg-primary/10 filter blur-2xl"></div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-8 max-w-xl animate-fade-in">
            <div className="inline-flex self-start items-center px-3 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-2 animate-slide-up delay-100">
              <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
              {language === 'es' ? 'Crea prompts perfectos en segundos' : 
               language === 'fr' ? 'Créez des prompts parfaits en quelques secondes' : 
               language === 'pt' ? 'Crie prompts perfeitos em segundos' : 
               'Craft perfect prompts in seconds'}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight animate-slide-up delay-200">
              {language === 'es' ? 'Domina Prompts de IA' : 
               language === 'fr' ? 'Maîtrisez les Prompts IA' : 
               language === 'pt' ? 'Domine Prompts de IA' : 
               'Master AI Prompts'} <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                {language === 'es' ? 'Con Precisión' : 
                 language === 'fr' ? 'Avec Précision' : 
                 language === 'pt' ? 'Com Precisão' : 
                 'With Precision'}
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground animate-slide-up delay-300">
              {language === 'es' ? 'Kolabz te permite generar prompts optimizados para cualquier modelo de IA. Crea, refina y guarda prompts que obtienen mejores resultados, cada vez.' : 
               language === 'fr' ? 'Kolabz vous permet de générer des prompts optimisés pour n\'importe quel modèle d\'IA. Créez, affinez et sauvegardez des prompts qui obtiennent de meilleurs résultats, à chaque fois.' : 
               language === 'pt' ? 'Kolabz permite que você gere prompts otimizados para qualquer modelo de IA. Crie, refine e salve prompts que obtêm melhores resultados, sempre.' : 
               'Kolabz empowers you to generate optimized prompts for any AI model. Create, refine, and save prompts that get better results, every time.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-slide-up delay-400">
              <Button size="lg" className="relative overflow-hidden group" asChild>
                <Link to="/signup">
                  <span className="relative z-10">
                    {language === 'es' ? 'Comenzar Prueba Gratuita' : 
                     language === 'fr' ? 'Commencer l\'Essai Gratuit' : 
                     language === 'pt' ? 'Iniciar Teste Gratuito' : 
                     'Start Free Trial'}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary group-hover:translate-y-0 translate-y-12 transition-transform duration-300"></span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => scrollToSection('pricing')}
              >
                {language === 'es' ? 'Ver Precios' : 
                 language === 'fr' ? 'Voir les Prix' : 
                 language === 'pt' ? 'Ver Preços' : 
                 'See Pricing'}
              </Button>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground pt-2">
              <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>
                {language === 'es' ? 'Pagos seguros a través de Stripe • Prueba gratuita de 7 días • Cancela cuando quieras' : 
                 language === 'fr' ? 'Paiements sécurisés via Stripe • Essai gratuit de 7 jours • Annulez à tout moment' : 
                 language === 'pt' ? 'Pagamentos seguros via Stripe • Teste gratuito de 7 dias • Cancele quando quiser' : 
                 'Secure payments via Stripe • 7-day free trial • Cancel anytime'}
              </span>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="relative flex justify-center items-center animate-slide-in-right">
            <div className="relative z-10 w-full max-w-md">
              <div className={`relative shadow-xl rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} p-4`}>
                <div className={`absolute top-0 left-0 right-0 h-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} flex items-center px-4 rounded-t-2xl`}>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                
                <div className={`pt-10 pb-2 px-2 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded-b-lg`}>
                  <div className="space-y-4">
                    <div className="h-8 flex items-center text-sm font-medium">
                      <span className="text-foreground">Prompt Optimizer</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className={`p-3 rounded-lg border ${
                        theme === 'dark' 
                          ? 'border-gray-700 bg-gray-800' 
                          : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="flex justify-between">
                          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Target Model</span>
                          <span className="text-xs font-medium text-primary">GPT-4</span>
                        </div>
                        <div className="mt-1 font-medium text-sm text-foreground">Create a data visualization dashboard</div>
                      </div>
                      
                      <div className={`p-3 rounded-lg border ${
                        theme === 'dark' 
                          ? 'border-gray-700' 
                          : 'border-gray-200'
                      }`}>
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Optimized Prompt</span>
                        <div className="mt-1 text-sm leading-relaxed text-foreground">
                          {language === 'es' ? 'Diseña un panel de visualización de datos completo con las siguientes especificaciones:' : 
                           language === 'fr' ? 'Concevez un tableau de bord de visualisation de données complet avec les spécifications suivantes:' :
                           language === 'pt' ? 'Projete um painel de visualização de dados abrangente com as seguintes especificações:' :
                           'Design a comprehensive data visualization dashboard with the following specifications:'}
                          <ul className={`mt-1 pl-4 space-y-1 list-disc text-xs ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            <li>
                              {language === 'es' ? 'Incluir 4-5 métricas clave como KPIs en la parte superior' : 
                               language === 'fr' ? 'Inclure 4-5 métriques clés en tant que KPI en haut' : 
                               language === 'pt' ? 'Incluir 4-5 métricas principais como KPIs no topo' : 
                               'Include 4-5 key metrics as KPIs at the top'}
                            </li>
                            <li>
                              {language === 'es' ? 'Crear gráficos de series temporales para análisis de tendencias' : 
                               language === 'fr' ? 'Créer des graphiques chronologiques pour l\'analyse des tendances' : 
                               language === 'pt' ? 'Criar gráficos de séries temporais para análise de tendências' : 
                               'Create time-series charts for trend analysis'}
                            </li>
                            <li>
                              {language === 'es' ? 'Agregar capacidades de filtrado por rango de fechas y categorías' : 
                               language === 'fr' ? 'Ajouter des capacités de filtrage par plage de dates et catégories' : 
                               language === 'pt' ? 'Adicionar capacidades de filtragem por intervalo de datas e categorias' : 
                               'Add filtering capabilities by date range and categories'}
                            </li>
                            <li>
                              {language === 'es' ? 'Diseñar con accesibilidad y capacidad de respuesta móvil en mente' : 
                               language === 'fr' ? 'Concevoir avec accessibilité et réactivité mobile à l\'esprit' : 
                               language === 'pt' ? 'Projetar com acessibilidade e responsividade móvel em mente' : 
                               'Design with accessibility and mobile responsiveness in mind'}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                        theme === 'dark'
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      } transition-colors`}>
                        {language === 'es' ? 'Copiar' : 
                         language === 'fr' ? 'Copier' : 
                         language === 'pt' ? 'Copiar' : 
                         'Copy'}
                      </button>
                      <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                        {language === 'es' ? 'Refinar' : 
                         language === 'fr' ? 'Affiner' : 
                         language === 'pt' ? 'Refinar' : 
                         'Refine'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/4 -right-10 w-40 h-40 bg-primary/10 rounded-full filter blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/5 rounded-full filter blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
