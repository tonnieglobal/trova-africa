import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { supabase } from '../../lib/supabase';

export function Contact() {
  const { t } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const isConfigured = supabaseUrl && !supabaseUrl.includes('placeholder');
      
      if (!isConfigured) {
        // Demo mode - simulate successful submission
        console.log('Demo mode: Form data', formData);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setFormSubmitted(true);
        setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
        setTimeout(() => setFormSubmitted(false), 5000);
        return;
      }

      // Insert into database
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            company: formData.company || null,
            subject: formData.subject,
            message: formData.message,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message || 'Database error occurred');
      }

      // Trigger email notification via Edge Function (non-blocking)
      if (data) {
        try {
          await supabase.functions.invoke('send-contact-email', {
            body: { record: data },
          });
        } catch (emailError) {
          console.log('Email notification skipped:', emailError);
        }
      }

      setFormSubmitted(true);
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      const errorMessage = error?.message || 'Failed to send message. Please try again later.';
      setFormError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      detail: 'info@trovafrica.com',
      link: 'mailto:info@trovafrica.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      detail: '+254 700 000 000',
      link: 'tel:+254700000000',
    },
    {
      icon: MapPin,
      title: t('contact.address'),
      detail: t('contact.address.text'),
      link: null,
    },
    {
      icon: Clock,
      title: 'Business Hours',
      detail: 'Mon - Fri: 9:00 AM - 6:00 PM',
      link: null,
    },
  ];

  const offices = [
    {
      city: 'Nairobi',
      country: 'Kenya',
      address: 'Westlands, Nairobi',
      phone: '+254 700 000 000',
      email: 'nairobi@trovafrica.com',
    },
    {
      city: 'Lagos',
      country: 'Nigeria',
      address: 'Victoria Island, Lagos',
      phone: '+234 800 000 000',
      email: 'lagos@trovafrica.com',
    },
    {
      city: 'Johannesburg',
      country: 'South Africa',
      address: 'Sandton, Johannesburg',
      phone: '+27 10 000 0000',
      email: 'jhb@trovafrica.com',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('contact.info')}
                </h2>
                <p className="text-gray-600">
                  Have a question or want to discuss a project? We'd love to hear from you.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <Card key={item.title} className="border-2 hover:border-orange-600 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="size-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="size-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">
                            {item.title}
                          </p>
                          {item.link ? (
                            <a
                              href={item.link}
                              className="text-gray-600 hover:text-orange-600 transition-colors"
                            >
                              {item.detail}
                            </a>
                          ) : (
                            <p className="text-gray-600">{item.detail}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Social Media */}
              <div>
                <p className="font-semibold text-gray-900 mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="size-10 bg-gray-100 hover:bg-orange-600 hover:text-white rounded-lg flex items-center justify-center transition-colors"
                      aria-label={social}
                    >
                      <span className="text-sm font-semibold">
                        {social.charAt(0)}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-2">
                <CardContent className="p-8">
                  {formSubmitted ? (
                    <div className="text-center py-12">
                      <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="size-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-gray-600">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {formError && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                          {formError}
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t('contact.name')}</Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t('contact.email')}</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t('contact.phone')}</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+254 700 000 000"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            type="text"
                            placeholder="Your Company"
                            value={formData.company}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          type="text"
                          placeholder="How can we help you?"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">{t('contact.message')}</Label>
                        <Textarea
                          id="message"
                          rows={6}
                          placeholder="Tell us more about your project..."
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 size-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            {t('contact.send')}
                            <Send className="ml-2 size-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Offices
            </h2>
            <p className="text-lg text-gray-600">
              Find us across major African cities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office) => (
              <Card key={office.city} className="border-2 hover:border-orange-600 transition-all">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {office.city}
                    </h3>
                    <p className="text-gray-600">{office.country}</p>
                  </div>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="size-4 mt-0.5 flex-shrink-0 text-orange-600" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="size-4 mt-0.5 flex-shrink-0 text-orange-600" />
                      <a href={`tel:${office.phone}`} className="hover:text-orange-600">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="size-4 mt-0.5 flex-shrink-0 text-orange-600" />
                      <a href={`mailto:${office.email}`} className="hover:text-orange-600">
                        {office.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-gray-200">
        <div className="w-full h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63821.87830762679!2d36.746698!3d-1.286389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Trova Africa Office Location"
          />
        </div>
      </section>
    </div>
  );
}
