import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendInquiry } from '../lib/emailjs';
import { generateWhatsAppLink } from '../lib/whatsapp';

export default function Contact() {
    const { t } = useTranslation();
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [sending, setSending] = useState(false);

    const shopPhone = import.meta.env.VITE_SHOP_PHONE || '919876543210';
    const shopEmail = import.meta.env.VITE_SHOP_EMAIL || 'shop@example.com';
    const shopAddress = t('shop.address');
    const mapEmbed = import.meta.env.VITE_SHOP_MAP_EMBED || '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        const result = await sendInquiry({
            from_name: form.name,
            from_email: form.email,
            phone: form.phone,
            message: form.message,
        });
        setSending(false);

        if (result.success) {
            toast.success(t('contact.success'));
            setForm({ name: '', email: '', phone: '', message: '' });
        } else {
            toast.error(t('contact.error'));
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white">{t('contact.title')}</h1>
                    <div className="w-20 h-1 bg-gold-gradient mx-auto mt-4 rounded-full" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Form */}
                    <div className="card p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">{t('contact.name')}</label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="input-field"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">{t('contact.email')}</label>
                                    <input
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">{t('contact.phone')}</label>
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className="input-field"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">{t('contact.message')}</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    className="input-field resize-none"
                                />
                            </div>
                            <button type="submit" disabled={sending} className="btn-primary w-full flex items-center justify-center gap-2">
                                {sending ? (
                                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> {t('contact.sending')}</>
                                ) : (
                                    <><Send className="w-4 h-4" /> {t('contact.send')}</>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Info + Map */}
                    <div className="space-y-6">
                        {/* Contact cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="card p-5 flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-gold-400" />
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 uppercase">{t('contact.findUs')}</span>
                                    <p className="text-sm text-gray-300 mt-1">{shopAddress}</p>
                                </div>
                            </div>
                            <div className="card p-5 flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
                                    <Phone className="w-5 h-5 text-gold-400" />
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 uppercase">{t('contact.callUs')}</span>
                                    <a href={`tel:+${shopPhone}`} className="block text-sm text-gray-300 mt-1 hover:text-gold-400 transition-colors">
                                        +{shopPhone}
                                    </a>
                                </div>
                            </div>
                            <div className="card p-5 flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5 text-gold-400" />
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 uppercase">{t('contact.emailUs')}</span>
                                    <a href={`mailto:${shopEmail}`} className="block text-sm text-gray-300 mt-1 hover:text-gold-400 transition-colors">
                                        {shopEmail}
                                    </a>
                                </div>
                            </div>
                            <a
                                href={generateWhatsAppLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card p-5 flex items-start gap-3 hover:border-green-500/30 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                                    <MessageCircle className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 uppercase">{t('contact.whatsapp')}</span>
                                    <p className="text-sm text-gray-300 mt-1">Chat with us instantly</p>
                                </div>
                            </a>
                        </div>

                        {/* Map */}
                        <div className="card overflow-hidden">
                            {mapEmbed ? (
                                <iframe
                                    src={mapEmbed}
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Shop Location"
                                />
                            ) : (
                                <div className="h-[300px] bg-gray-800/50 flex items-center justify-center text-gray-600 text-sm">
                                    <div className="text-center">
                                        <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                                        Configure VITE_SHOP_MAP_EMBED in .env to show Google Maps
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
