import { 
  Megaphone, 
  Smartphone, 
  Palette, 
  TrendingUp, 
  Radio, 
  Target,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Megaphone,
      title: t('services.ooh.title'),
      description: t('services.ooh.desc'),
      features: [
        'Billboard Advertising',
        'Transit Advertising',
        'Street Furniture',
        'Digital OOH Screens',
        'Location Planning',
      ],
      image: 'https://images.unsplash.com/photo-1770825874964-108c4f0cad4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwYWR2ZXJ0aXNpbmclMjBjYW1wYWlnbnxlbnwxfHx8fDE3NzUxMjEzNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'orange',
    },
    {
      icon: Smartphone,
      title: t('services.digital.title'),
      description: t('services.digital.desc'),
      features: [
        'Social Media Marketing',
        'Content Creation',
        'SEO & SEM',
        'Email Marketing',
        'Analytics & Reporting',
      ],
      image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwc3RyYXRlZ3l8ZW58MXx8fHwxNzc1MDY2MTExfDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'blue',
    },
    {
      icon: Target,
      title: t('services.branding.title'),
      description: t('services.branding.desc'),
      features: [
        'Brand Identity Design',
        'Market Positioning',
        'Brand Guidelines',
        'Rebranding Services',
        'Brand Consulting',
      ],
      image: 'https://images.unsplash.com/photo-1754663186288-814432d4e3a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGRlc2lnbiUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NTEyMTM2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'purple',
    },
    {
      icon: Palette,
      title: t('services.creative.title'),
      description: t('services.creative.desc'),
      features: [
        'Graphic Design',
        'Video Production',
        'Photography',
        'Copywriting',
        'Art Direction',
      ],
      image: 'https://images.unsplash.com/photo-1565351167686-7a19c5114965?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHRlYW0lMjBicmFpbnN0b3JtaW5nfGVufDF8fHx8MTc3NTA3ODgxNXww&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'pink',
    },
    {
      icon: Radio,
      title: t('services.media.title'),
      description: t('services.media.desc'),
      features: [
        'Media Strategy',
        'Media Buying',
        'Budget Optimization',
        'Cross-Channel Planning',
        'Performance Tracking',
      ],
      image: 'https://images.unsplash.com/photo-1771495388444-6d25eea4a2dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjBhZnJpY2F8ZW58MXx8fHwxNzc1MTIxMzYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'green',
    },
    {
      icon: TrendingUp,
      title: t('services.campaigns.title'),
      description: t('services.campaigns.desc'),
      features: [
        'Campaign Strategy',
        'Project Management',
        'A/B Testing',
        'Real-time Monitoring',
        'ROI Optimization',
      ],
      image: 'https://images.unsplash.com/photo-1774014045654-7a36a73ca401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlcnRpc2luZyUyMGJpbGxib2FyZCUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3NzUxMjEzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'red',
    },
  ];

  const colorClasses = {
    orange: 'bg-orange-100 text-orange-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    pink: 'bg-pink-100 text-pink-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t('services.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <Card 
                key={service.title}
                className="overflow-hidden border-2 hover:shadow-xl transition-shadow"
              >
                <div className={`grid grid-cols-1 ${index % 2 === 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-2'} gap-0`}>
                  {/* Image */}
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} relative h-64 lg:h-auto`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} p-8 lg:p-12 flex flex-col justify-center`}>
                    <div className={`size-14 ${colorClasses[service.color]} rounded-xl flex items-center justify-center mb-6`}>
                      <service.icon className="size-7" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div>
                      <Link to="/contact">
                        <Button className="bg-orange-600 hover:bg-orange-700">
                          Get Started
                          <ArrowRight className="ml-2 size-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A proven methodology that delivers consistent results
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your brand, goals, and target audience' },
              { step: '02', title: 'Strategy', desc: 'Developing a comprehensive marketing strategy' },
              { step: '03', title: 'Execution', desc: 'Creating and launching compelling campaigns' },
              { step: '04', title: 'Optimize', desc: 'Monitoring, analyzing, and refining for best results' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center size-16 bg-orange-600 text-white rounded-full text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Elevate Your Marketing?
          </h2>
          <p className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto">
            Let's discuss how our services can help you achieve your business goals.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              Contact Us Today
              <ArrowRight className="ml-2 size-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
