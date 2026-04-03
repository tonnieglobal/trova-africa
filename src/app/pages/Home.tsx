import { ArrowRight, Play, Sparkles, TrendingUp, Users, Award } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export function Home() {
  const { t } = useLanguage();

  const stats = [
    { label: 'Happy Clients', value: '200+', icon: Users },
    { label: 'Projects Completed', value: '500+', icon: Award },
    { label: 'Years Experience', value: '10+', icon: TrendingUp },
    { label: 'Team Members', value: '50+', icon: Sparkles },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-red-50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  <Sparkles className="size-4" />
                  Award-Winning Agency
                </span>
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {t('home.hero.title')}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                    {t('home.hero.subtitle')}
                  </span>
                </h1>
              </div>
              <p className="text-lg text-gray-600 max-w-xl">
                {t('home.hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto">
                    {t('home.hero.cta')}
                    <ArrowRight className="ml-2 size-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    {t('home.hero.learn')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1774014045654-7a36a73ca401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlcnRpc2luZyUyMGJpbGxib2FyZCUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3NzUxMjEzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Advertising Billboard"
                  className="w-full h-auto"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="size-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="size-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-gray-900">98%</p>
                    <p className="text-sm text-gray-600">Client Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="size-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <stat.icon className="size-6 text-orange-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section - Drone Footage */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('home.video.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('home.video.subtitle')}
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 max-w-5xl mx-auto">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/7h1PjF0cZ6U?autoplay=1&mute=1&loop=1&playlist=7h1PjF0cZ6U"
                title="Drone Aerial View of Billboard Advertising"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          {/* Drone Footage Label */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-4 bg-white rounded-full px-6 py-3 shadow-lg">
              <div className="size-10 bg-orange-600 rounded-full flex items-center justify-center">
                <Play className="size-5 text-white ml-0.5" fill="white" />
              </div>
              <span className="text-sm font-medium text-gray-900">Drone footage of our billboard campaigns</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services Preview */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Trova Africa?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We combine creativity, strategy, and local expertise to deliver campaigns that resonate across African markets.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-orange-600 transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="size-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="size-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Creative Excellence</h3>
                <p className="text-gray-600">
                  Award-winning creative team delivering campaigns that stand out and drive results.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-orange-600 transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="size-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Data-Driven Strategy</h3>
                <p className="text-gray-600">
                  Strategic insights backed by market research and analytics for maximum impact.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-orange-600 transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="size-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Proven Results</h3>
                <p className="text-gray-600">
                  Track record of successful campaigns across diverse industries and markets.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                Explore All Services
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto">
            Let's work together to create campaigns that capture attention and drive real business results.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              Start Your Project
              <ArrowRight className="ml-2 size-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
