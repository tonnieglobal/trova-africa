import { ExternalLink, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export function Portfolio() {
  const { t } = useLanguage();

  const projects = [
    {
      title: 'SafariCom 5G Launch',
      client: 'SafariCom',
      category: 'OOH Campaign',
      description: 'Nationwide billboard campaign for the launch of 5G network across Kenya',
      image: 'https://images.unsplash.com/photo-1770825874964-108c4f0cad4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      results: '+150% Brand Awareness',
      tags: ['OOH', 'Digital', 'Brand Strategy'],
    },
    {
      title: 'Equity Bank Digital Transformation',
      client: 'Equity Bank',
      category: 'Digital Campaign',
      description: 'Multi-channel digital marketing campaign promoting mobile banking solutions',
      image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      results: '+200K App Downloads',
      tags: ['Digital Marketing', 'Social Media', 'Content'],
    },
    {
      title: 'KenOil Brand Refresh',
      client: 'KenOil',
      category: 'Rebranding',
      description: 'Complete brand identity redesign and rollout for leading energy company',
      image: 'https://images.unsplash.com/photo-1754663186288-814432d4e3a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      results: '+85% Positive Sentiment',
      tags: ['Branding', 'Design', 'Strategy'],
    },
    {
      title: 'Tusker Beer Festival',
      client: 'EABL',
      category: 'Event Marketing',
      description: 'Integrated campaign for annual music festival including OOH, digital, and experiential',
      image: 'https://images.unsplash.com/photo-1565351167686-7a19c5114965?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      results: '50K+ Attendees',
      tags: ['Events', 'OOH', 'Digital'],
    },
    {
      title: 'AfriFresh Product Launch',
      client: 'AfriFresh Foods',
      category: 'Product Launch',
      description: 'Go-to-market strategy and campaign for new organic food line',
      image: 'https://images.unsplash.com/photo-1771495388444-6d25eea4a2dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      results: '₦2M Revenue in Month 1',
      tags: ['Launch', 'Social Media', 'Influencer'],
    },
    {
      title: 'M-Pesa Youth Campaign',
      client: 'Vodafone',
      category: 'Social Impact',
      description: 'Educational campaign targeting youth digital financial literacy',
      image: 'https://images.unsplash.com/photo-1774014045654-7a36a73ca401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      results: '1M+ Youth Reached',
      tags: ['Social Impact', 'Digital', 'Content'],
    },
  ];

  const categories = ['All', 'OOH Campaign', 'Digital Campaign', 'Rebranding', 'Event Marketing', 'Product Launch', 'Social Impact'];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t('portfolio.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === 'All' ? 'default' : 'outline'}
                className={`whitespace-nowrap cursor-pointer ${
                  category === 'All' 
                    ? 'bg-orange-600 hover:bg-orange-700' 
                    : 'hover:border-orange-600 hover:text-orange-600'
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card 
                key={project.title}
                className="group overflow-hidden border-2 hover:border-orange-600 transition-all hover:shadow-xl cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 right-4 size-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="size-5 text-gray-900" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="size-4" />
                      <span className="text-xs font-medium">{project.results}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {project.client}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study CTA */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Want to See More?
              </h2>
              <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                Download our full case studies portfolio to see detailed results and insights from our most successful campaigns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Download Portfolio
                </button>
                <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  Schedule a Presentation
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Campaign Performance Highlights
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-orange-600 mb-2">92%</p>
              <p className="text-gray-600">Average Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-orange-600 mb-2">3.5x</p>
              <p className="text-gray-600">Average ROI</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-orange-600 mb-2">45M+</p>
              <p className="text-gray-600">People Reached</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-orange-600 mb-2">98%</p>
              <p className="text-gray-600">Client Retention</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
