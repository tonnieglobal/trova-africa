import { Target, Eye, Heart, Zap, Award, Users, Globe, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent } from '../components/ui/card';

export function About() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Zap,
      title: t('about.values.creativity'),
      description: 'Pushing boundaries with innovative ideas and fresh perspectives',
    },
    {
      icon: Heart,
      title: t('about.values.integrity'),
      description: 'Building trust through honesty, transparency, and ethical practices',
    },
    {
      icon: Award,
      title: t('about.values.excellence'),
      description: 'Delivering exceptional quality in everything we do',
    },
    {
      icon: TrendingUp,
      title: t('about.values.innovation'),
      description: 'Embracing new technologies and methodologies for better results',
    },
  ];

  const team = [
    {
      name: 'Amara Okonkwo',
      role: 'Chief Executive Officer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    },
    {
      name: 'David Kamau',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    },
    {
      name: 'Fatima Hassan',
      role: 'Head of Strategy',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    },
    {
      name: 'James Mwangi',
      role: 'Digital Marketing Lead',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    },
  ];

  const achievements = [
    { icon: Award, value: '25+', label: 'Industry Awards' },
    { icon: Users, value: '200+', label: 'Happy Clients' },
    { icon: Globe, value: '15', label: 'African Countries' },
    { icon: TrendingUp, value: '500+', label: 'Successful Campaigns' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Building Brands That Matter
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2016, Trova Africa Ltd has grown from a small creative studio to one of Africa's most respected advertising and marketing agencies. Our journey has been driven by a singular mission: to help African brands tell their stories in compelling and authentic ways.
                </p>
                <p>
                  With offices in Nairobi and a network spanning 15 African countries, we combine local market knowledge with world-class creative expertise. Our diverse team of strategists, designers, and storytellers brings together the best of African creativity and international best practices.
                </p>
                <p>
                  Today, we're proud to have partnered with over 200 brands, from ambitious startups to established multinationals, helping them navigate the unique opportunities and challenges of African markets.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1565351167686-7a19c5114965?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHRlYW0lMjBicmFpbnN0b3JtaW5nfGVufDF8fHx8MTc3NTA3ODgxNXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Team Collaboration"
                className="rounded-lg shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1771495388444-6d25eea4a2dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjBhZnJpY2F8ZW58MXx8fHwxNzc1MTIxMzYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Modern Workspace"
                className="rounded-lg shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2 border-orange-200 bg-white">
              <CardContent className="p-8">
                <div className="size-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <Target className="size-7 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('about.mission.title')}
                </h3>
                <p className="text-gray-600 text-lg">
                  {t('about.mission.text')}
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200 bg-white">
              <CardContent className="p-8">
                <div className="size-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Eye className="size-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('about.vision.title')}
                </h3>
                <p className="text-gray-600 text-lg">
                  {t('about.vision.text')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('about.values.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="border-2 hover:border-orange-600 transition-all text-center">
                <CardContent className="p-6">
                  <div className="size-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="size-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Impact in Numbers
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement) => (
              <div key={achievement.label} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="size-16 bg-white/20 rounded-full flex items-center justify-center">
                    <achievement.icon className="size-8" />
                  </div>
                </div>
                <p className="text-4xl font-bold mb-2">{achievement.value}</p>
                <p className="text-orange-100">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experienced professionals driving innovation and excellence
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="border-2 hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {member.role}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
