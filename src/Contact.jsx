import React from 'react';
import ContactForm from '../components/ContactForm';
import { HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();

  const faqs = [
    {
      q: t('faq_q1'),
      a: t('faq_a1'),
    },
    {
      q: t('faq_q2'),
      a: t('faq_a2'),
    },
    {
      q: t('faq_q3'),
      a: t('faq_a3'),
    },
    {
      q: t('faq_q4'),
      a: t('faq_a4'),
    },
  ];

  return (
    <div className="w-full pt-20 bg-bone-100 min-h-screen">
      {/* Header Banner */}
      <div className="bg-navy-900 text-white py-16 bg-noise relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4 relative z-10">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-400">
            {t('contact_page_badge')}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif">
            {t('contact_page_title')}
          </h1>
          <p className="text-base text-slate-300 font-light max-w-2xl mx-auto">
            {t('contact_page_desc')}
          </p>
        </div>
      </div>

      {/* Main Contact Form Section */}
      <ContactForm />

      {/* FAQ Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-600">
              {t('faq_badge')}
            </span>
            <h2 className="text-3xl font-serif font-bold text-navy-900">
              {t('faq_title')}
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-bone-100/60 border border-slate-100 space-y-2">
                <h3 className="font-bold text-navy-900 text-base font-sans flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
