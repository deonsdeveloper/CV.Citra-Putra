import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: '',
    message: '',
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.error) setStatus((prev) => ({ ...prev, error: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status.loading) return;

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (trimmedName.length < 2) {
      setStatus({ loading: false, success: false, error: 'Nama minimal 2 karakter.' });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus({ loading: false, success: false, error: 'Format alamat email tidak valid.' });
      return;
    }

    if (trimmedMessage.length < 5) {
      setStatus({ loading: false, success: false, error: 'Pesan wajib diisi minimal 5 karakter.' });
      return;
    }

    setStatus({ loading: true, success: false, error: '' });

    const messageText = `*INQUIRI PRODUK / KONSULTASI TEKNIS*
*CV. CITRA PUTRA MANDIRI*
---------------------------------------
👤 *Nama Lengkap:* ${trimmedName}
🏢 *Perusahaan / Pabrik:* ${formData.company.trim() || '-'}
📧 *Email Kerja:* ${trimmedEmail}
📱 *No. Telepon / WhatsApp:* ${formData.phone.trim() || '-'}
📦 *Produk / Layanan:* ${formData.product || 'Umum / Kimia Industri'}

📝 *Pesan / Detail Masalah Teknis:*
${trimmedMessage}
---------------------------------------
_Dikirim via Formulir Kontak Website CV. Citra Putra Mandiri_`;

    const encodedMessage = encodeURIComponent(messageText);
    const targetPhone = '628129483381'; // Official CV. Citra Putra Mandiri WhatsApp
    const waUrl = `https://wa.me/${targetPhone}?text=${encodedMessage}`;

    // Send asynchronously to backend without blocking user UX
    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          company: formData.company.trim(),
          email: trimmedEmail,
          phone: formData.phone.trim(),
          product: formData.product,
          message: trimmedMessage,
        }),
      }).catch(() => {});
    } catch (_) {}

    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setStatus({ loading: false, success: true, error: '' });
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      product: '',
      message: '',
    });
  };

  return (
    <section id="contact-section" className="py-24 bg-bone-100 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Asymmetrical Layout — Form Left (7 cols), Contact Info & Map Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Form Left Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-editorial border border-slate-100">
            <h3 className="text-2xl font-bold font-serif text-navy-900 mb-6">
              {t('contact_form_heading')}
            </h3>

            {status.success && (
              <div
                role="status"
                aria-live="polite"
                className="mb-6 p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm font-medium flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{t('contact_success_banner')}</span>
              </div>
            )}

            {status.error && (
              <div
                role="alert"
                aria-live="assertive"
                className="mb-6 p-4 rounded-2xl bg-rose-50 text-rose-800 border border-rose-200 text-sm font-medium flex items-center gap-3"
              >
                <span>{status.error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    {t('contact_name_label')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact_name_ph')}
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-navy-900 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    {t('contact_company_label')}
                  </label>
                  <input
                    type="text"
                    name="company"
                    maxLength={100}
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t('contact_company_ph')}
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-navy-900 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    {t('contact_email_label')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    maxLength={100}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-navy-900 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    {t('contact_phone_label')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    maxLength={30}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0812-3456-7890"
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-navy-900 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  {t('contact_prod_label')}
                </label>
                <select
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-navy-900 bg-slate-50/50"
                >
                  <option value="">{t('contact_prod_ph')}</option>
                  <option value="Water Treatment (Boiler/Cooling Tower)">Water Treatment (Boiler/Cooling Tower)</option>
                  <option value="Cleaning & Degreasing (R 1011, R 1103, R 1522)">Cleaning & Degreasing (Coil Cleaner, Motor Cleaner)</option>
                  <option value="Rust Treatment (Metal Protector, Rust Remover)">Rust Treatment & Protection</option>
                  <option value="Electrical Insulation (Varnish R 1524, R 1525)">Electrical & Insulation Varnish</option>
                  <option value="Specialty Chemicals (Cutting Oil, Fuel Treatment)">Specialty Chemicals</option>
                  <option value="Custom OEM Formulation">Custom OEM Formulation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  {t('contact_msg_label')}
                </label>
                <textarea
                  name="message"
                  required
                  maxLength={2000}
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact_msg_ph')}
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-navy-900 bg-slate-50/50"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full inline-flex items-center justify-center gap-3 bg-navy-900 hover:bg-navy-800 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-md cursor-pointer text-base"
              >
                {status.loading ? (
                  <span>Loading...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-teal-400" />
                    <span>{t('contact_submit_btn')}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Details & Map Right Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-editorial border border-slate-100 space-y-6">
              <h3 className="text-xl font-bold font-serif text-navy-900 border-b border-slate-100 pb-4">
                {t('contact_info_hq')}
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {t('contact_address_label')}
                    </h4>
                    <p className="text-sm font-medium text-navy-900 mt-1 leading-relaxed">
                      {t('contact_address_val')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {t('contact_info_call')}
                    </h4>
                    <p className="text-sm font-medium text-navy-900 mt-1">
                      08129483381 / Bustiar
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {t('contact_info_email')}
                    </h4>
                    <p className="text-sm font-medium text-navy-900 mt-1">
                      citraputramandiri@yahoo.co.id
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {t('contact_info_hours')}
                    </h4>
                    <p className="text-sm font-medium text-navy-900 mt-1">
                      {t('contact_days_hours')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Box */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href="https://wa.me/628129483381?text=Halo%20CV.%20Citra%20Putra%20Mandiri,%20saya%20ingin%20tanya%20produk%20dan%20harga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-6 rounded-2xl transition-colors shadow-sm text-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t('contact_wa_direct')}</span>
                </a>
              </div>
            </div>

            {/* Embedded Grayscale Industrial Map Placeholder Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-medium relative overflow-hidden h-48 flex items-center justify-center text-center">
              <div className="absolute inset-0 bg-cover bg-center opacity-30 grayscale" style={{ backgroundImage: "url('/assets/hero/slide-3.png')" }} />
              <div className="relative z-10 space-y-2">
                <MapPin className="w-8 h-8 text-teal-400 mx-auto animate-bounce-slow" />
                <h4 className="font-serif font-bold text-lg">{t('contact_delivery_title')}</h4>
                <p className="text-xs text-slate-300">{t('contact_delivery_desc')}</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
