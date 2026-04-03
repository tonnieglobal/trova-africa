import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'sw' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About Us',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    
    // Home
    'home.hero.title': 'Creative Excellence in',
    'home.hero.subtitle': 'Advertising & Marketing',
    'home.hero.description': 'Trova Africa Ltd transforms brands through innovative advertising strategies, creative campaigns, and impactful out-of-home solutions across Africa.',
    'home.hero.cta': 'Get Started',
    'home.hero.learn': 'Learn More',
    'home.video.title': 'Creativity Meets Innovation',
    'home.video.subtitle': 'Discover how we leverage creativity and OOH advertising to build memorable brand experiences',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive marketing solutions tailored to your brand',
    'services.ooh.title': 'Out-of-Home Advertising',
    'services.ooh.desc': 'Strategic billboard placements, transit advertising, and creative outdoor campaigns that capture attention.',
    'services.digital.title': 'Digital Marketing',
    'services.digital.desc': 'Social media management, content creation, and digital campaigns that drive engagement.',
    'services.branding.title': 'Brand Strategy',
    'services.branding.desc': 'Complete brand identity development, positioning, and strategic planning for market success.',
    'services.creative.title': 'Creative Design',
    'services.creative.desc': 'Compelling visual content, graphic design, and creative concepts that resonate with audiences.',
    'services.media.title': 'Media Planning',
    'services.media.desc': 'Strategic media buying and planning to maximize your advertising investment and reach.',
    'services.campaigns.title': 'Campaign Management',
    'services.campaigns.desc': 'End-to-end campaign execution, monitoring, and optimization for measurable results.',
    
    // About
    'about.title': 'About Trova Africa',
    'about.subtitle': 'Your Strategic Partner in African Markets',
    'about.mission.title': 'Our Mission',
    'about.mission.text': 'To empower African brands with world-class advertising and marketing solutions that drive growth and create lasting impact.',
    'about.vision.title': 'Our Vision',
    'about.vision.text': 'To be Africa\'s most trusted and innovative advertising agency, setting new standards for creativity and results.',
    'about.values.title': 'Our Values',
    'about.values.creativity': 'Creativity',
    'about.values.integrity': 'Integrity',
    'about.values.excellence': 'Excellence',
    'about.values.innovation': 'Innovation',
    
    // Portfolio
    'portfolio.title': 'Our Work',
    'portfolio.subtitle': 'Successful campaigns that delivered results',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Let\'s create something amazing together',
    'contact.name': 'Your Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.info': 'Contact Information',
    'contact.address': 'Address',
    'contact.address.text': 'Nairobi, Kenya',
    
    // Footer
    'footer.tagline': 'Transforming brands across Africa',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.connect': 'Connect',
    'footer.rights': '© 2026 Trova Africa Ltd. All rights reserved.',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.about': 'À Propos',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    
    // Home
    'home.hero.title': 'Excellence Créative en',
    'home.hero.subtitle': 'Publicité & Marketing',
    'home.hero.description': 'Trova Africa Ltd transforme les marques grâce à des stratégies publicitaires innovantes, des campagnes créatives et des solutions d\'affichage percutantes à travers l\'Afrique.',
    'home.hero.cta': 'Commencer',
    'home.hero.learn': 'En Savoir Plus',
    'home.video.title': 'La Créativité Rencontre l\'Innovation',
    'home.video.subtitle': 'Découvrez comment nous exploitons la créativité et la publicité OOH pour créer des expériences de marque mémorables',
    
    // Services
    'services.title': 'Nos Services',
    'services.subtitle': 'Solutions marketing complètes adaptées à votre marque',
    'services.ooh.title': 'Publicité Extérieure',
    'services.ooh.desc': 'Placements stratégiques de panneaux d\'affichage, publicité en transit et campagnes extérieures créatives.',
    'services.digital.title': 'Marketing Digital',
    'services.digital.desc': 'Gestion des réseaux sociaux, création de contenu et campagnes digitales.',
    'services.branding.title': 'Stratégie de Marque',
    'services.branding.desc': 'Développement complet de l\'identité de marque et planification stratégique.',
    'services.creative.title': 'Design Créatif',
    'services.creative.desc': 'Contenu visuel convaincant, design graphique et concepts créatifs.',
    'services.media.title': 'Planification Média',
    'services.media.desc': 'Achat média stratégique pour maximiser votre investissement publicitaire.',
    'services.campaigns.title': 'Gestion de Campagnes',
    'services.campaigns.desc': 'Exécution, suivi et optimisation de campagnes pour des résultats mesurables.',
    
    // About
    'about.title': 'À Propos de Trova Africa',
    'about.subtitle': 'Votre Partenaire Stratégique sur les Marchés Africains',
    'about.mission.title': 'Notre Mission',
    'about.mission.text': 'Autonomiser les marques africaines avec des solutions publicitaires de classe mondiale.',
    'about.vision.title': 'Notre Vision',
    'about.vision.text': 'Être l\'agence publicitaire la plus fiable et innovante d\'Afrique.',
    'about.values.title': 'Nos Valeurs',
    'about.values.creativity': 'Créativité',
    'about.values.integrity': 'Intégrité',
    'about.values.excellence': 'Excellence',
    'about.values.innovation': 'Innovation',
    
    // Portfolio
    'portfolio.title': 'Notre Travail',
    'portfolio.subtitle': 'Campagnes réussies qui ont généré des résultats',
    
    // Contact
    'contact.title': 'Contactez-Nous',
    'contact.subtitle': 'Créons quelque chose d\'extraordinaire ensemble',
    'contact.name': 'Votre Nom',
    'contact.email': 'Adresse Email',
    'contact.phone': 'Numéro de Téléphone',
    'contact.message': 'Votre Message',
    'contact.send': 'Envoyer',
    'contact.info': 'Informations de Contact',
    'contact.address': 'Adresse',
    'contact.address.text': 'Nairobi, Kenya',
    
    // Footer
    'footer.tagline': 'Transformer les marques à travers l\'Afrique',
    'footer.services': 'Services',
    'footer.company': 'Entreprise',
    'footer.connect': 'Connecter',
    'footer.rights': '© 2026 Trova Africa Ltd. Tous droits réservés.',
  },
  sw: {
    // Navigation
    'nav.home': 'Nyumbani',
    'nav.services': 'Huduma',
    'nav.about': 'Kuhusu',
    'nav.portfolio': 'Kazi Zetu',
    'nav.contact': 'Wasiliana',
    
    // Home
    'home.hero.title': 'Ubora wa Ubunifu katika',
    'home.hero.subtitle': 'Utangazaji & Masoko',
    'home.hero.description': 'Trova Africa Ltd inabadilisha chapa kupitia mikakati ya utangazaji wa ubunifu, kampeni za ubunifu, na suluhisho zenye athari kote Afrika.',
    'home.hero.cta': 'Anza Sasa',
    'home.hero.learn': 'Jifunze Zaidi',
    'home.video.title': 'Ubunifu Unakutana na Ubunifu',
    'home.video.subtitle': 'Gundua jinsi tunavyotumia ubunifu na utangazaji wa OOH kujenga uzoefu wa chapa unaokumbukwa',
    
    // Services
    'services.title': 'Huduma Zetu',
    'services.subtitle': 'Suluhisho kamili za masoko zilizoundwa kwa chapa yako',
    'services.ooh.title': 'Utangazaji wa Nje ya Nyumba',
    'services.ooh.desc': 'Uwekaji wa bango la mkakati, utangazaji wa usafiri, na kampeni za nje za ubunifu.',
    'services.digital.title': 'Masoko ya Dijiti',
    'services.digital.desc': 'Usimamizi wa media ya kijamii, uundaji wa maudhui, na kampeni za dijiti.',
    'services.branding.title': 'Mkakati wa Chapa',
    'services.branding.desc': 'Maendeleo kamili ya utambulisho wa chapa na mipango ya mkakati.',
    'services.creative.title': 'Muundo wa Ubunifu',
    'services.creative.desc': 'Maudhui ya kuona yanayovutia, muundo wa picha, na dhana za ubunifu.',
    'services.media.title': 'Mipango ya Vyombo',
    'services.media.desc': 'Ununuzi wa mkakati wa media ili kuongeza uwekezaji wako wa utangazaji.',
    'services.campaigns.title': 'Usimamizi wa Kampeni',
    'campaigns.desc': 'Utekelezaji wa kampeni kutoka mwanzo hadi mwisho kwa matokeo yanayoweza kupimika.',
    
    // About
    'about.title': 'Kuhusu Trova Africa',
    'about.subtitle': 'Mshirika wako wa Mkakati katika Masoko ya Afrika',
    'about.mission.title': 'Dhamira Yetu',
    'about.mission.text': 'Kuwapa nguvu chapa za Kiafrika kwa suluhisho za utangazaji na masoko za kiwango cha kimataifa.',
    'about.vision.title': 'Maono Yetu',
    'about.vision.text': 'Kuwa wakala wa utangazaji wa kuaminika na wa ubunifu zaidi Afrika.',
    'about.values.title': 'Maadili Yetu',
    'about.values.creativity': 'Ubunifu',
    'about.values.integrity': 'Uadilifu',
    'about.values.excellence': 'Ubora',
    'about.values.innovation': 'Uvumbuzi',
    
    // Portfolio
    'portfolio.title': 'Kazi Zetu',
    'portfolio.subtitle': 'Kampeni zilizofanikiwa ambazo zilitoa matokeo',
    
    // Contact
    'contact.title': 'Wasiliana Nasi',
    'contact.subtitle': 'Hebu tuunde kitu cha ajabu pamoja',
    'contact.name': 'Jina Lako',
    'contact.email': 'Anwani ya Barua Pepe',
    'contact.phone': 'Nambari ya Simu',
    'contact.message': 'Ujumbe Wako',
    'contact.send': 'Tuma Ujumbe',
    'contact.info': 'Maelezo ya Mawasiliano',
    'contact.address': 'Anwani',
    'contact.address.text': 'Nairobi, Kenya',
    
    // Footer
    'footer.tagline': 'Kubadilisha chapa kote Afrika',
    'footer.services': 'Huduma',
    'footer.company': 'Kampuni',
    'footer.connect': 'Unganisha',
    'footer.rights': '© 2026 Trova Africa Ltd. Haki zote zimehifadhiwa.',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.about': 'Nosotros',
    'nav.portfolio': 'Portafolio',
    'nav.contact': 'Contacto',
    
    // Home
    'home.hero.title': 'Excelencia Creativa en',
    'home.hero.subtitle': 'Publicidad y Marketing',
    'home.hero.description': 'Trova Africa Ltd transforma marcas a través de estrategias publicitarias innovadoras, campañas creativas y soluciones impactantes en toda África.',
    'home.hero.cta': 'Comenzar',
    'home.hero.learn': 'Saber Más',
    'home.video.title': 'La Creatividad se Encuentra con la Innovación',
    'home.video.subtitle': 'Descubre cómo aprovechamos la creatividad y la publicidad OOH para crear experiencias de marca memorables',
    
    // Services
    'services.title': 'Nuestros Servicios',
    'services.subtitle': 'Soluciones de marketing integrales adaptadas a su marca',
    'services.ooh.title': 'Publicidad Exterior',
    'services.ooh.desc': 'Colocación estratégica de vallas publicitarias, publicidad de tránsito y campañas creativas al aire libre.',
    'services.digital.title': 'Marketing Digital',
    'services.digital.desc': 'Gestión de redes sociales, creación de contenido y campañas digitales.',
    'services.branding.title': 'Estrategia de Marca',
    'services.branding.desc': 'Desarrollo completo de identidad de marca y planificación estratégica.',
    'services.creative.title': 'Diseño Creativo',
    'services.creative.desc': 'Contenido visual convincente, diseño gráfico y conceptos creativos.',
    'services.media.title': 'Planificación de Medios',
    'services.media.desc': 'Compra de medios estratégica para maximizar su inversión publicitaria.',
    'services.campaigns.title': 'Gestión de Campañas',
    'services.campaigns.desc': 'Ejecución, seguimiento y optimización de campañas para resultados medibles.',
    
    // About
    'about.title': 'Acerca de Trova Africa',
    'about.subtitle': 'Su Socio Estratégico en Mercados Africanos',
    'about.mission.title': 'Nuestra Misión',
    'about.mission.text': 'Empoderar marcas africanas con soluciones publicitarias de clase mundial.',
    'about.vision.title': 'Nuestra Visión',
    'about.vision.text': 'Ser la agencia publicitaria más confiable e innovadora de África.',
    'about.values.title': 'Nuestros Valores',
    'about.values.creativity': 'Creatividad',
    'about.values.integrity': 'Integridad',
    'about.values.excellence': 'Excelencia',
    'about.values.innovation': 'Innovación',
    
    // Portfolio
    'portfolio.title': 'Nuestro Trabajo',
    'portfolio.subtitle': 'Campañas exitosas que entregaron resultados',
    
    // Contact
    'contact.title': 'Contáctenos',
    'contact.subtitle': 'Creemos algo increíble juntos',
    'contact.name': 'Su Nombre',
    'contact.email': 'Correo Electrónico',
    'contact.phone': 'Número de Teléfono',
    'contact.message': 'Su Mensaje',
    'contact.send': 'Enviar Mensaje',
    'contact.info': 'Información de Contacto',
    'contact.address': 'Dirección',
    'contact.address.text': 'Nairobi, Kenia',
    
    // Footer
    'footer.tagline': 'Transformando marcas en toda África',
    'footer.services': 'Servicios',
    'footer.company': 'Empresa',
    'footer.connect': 'Conectar',
    'footer.rights': '© 2026 Trova Africa Ltd. Todos los derechos reservados.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
