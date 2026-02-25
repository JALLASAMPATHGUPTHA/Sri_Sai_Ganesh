import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Gem, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { generateWhatsAppLink } from '../lib/whatsapp';

export default function Footer() {
    const { t } = useTranslation();
    const shopName = import.meta.env.VITE_SHOP_NAME || 'Sri Jewellers';
    const shopPhone = import.meta.env.VITE_SHOP_PHONE || '9160733036';
    const shopEmail = import.meta.env.VITE_SHOP_EMAIL || 'shop@example.com';
    const shopAddress = import.meta.env.VITE_SHOP_ADDRESS || '1-48 ,Vegetable Market, Ramalayam Road, Main Bazar Rd, Nandigama, Andhra Pradesh 521185';

    return (
        <footer className="bg-gray-950 border-t border-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="col-span-1 lg:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center">
                                <Gem className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-heading font-bold text-gradient text-xl whitespace-nowrap">{t('shop.name')}</span>
                        </Link>
                        <p className="text-gray-400 text-sm mb-6 max-w-sm">
                            Crafting elegance since 2022. Discover our premium collection of handcrafted gold and silver ornaments.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h4>
                        <ul className="space-y-2">
                            {[
                                { to: '/', label: t('nav.home') },
                                { to: '/catalog', label: t('nav.catalog') },
                                { to: '/about', label: t('nav.about') },
                                { to: '/contact', label: t('nav.contact') },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-500 hover:text-gold-400 transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">{t('footer.contactInfo')}</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-gray-500 text-sm">
                                <MapPin className="w-4 h-4 mt-0.5 text-gold-500 shrink-0" />
                                {shopAddress}
                            </li>
                            <li>
                                <a href={`tel:+${shopPhone}`} className="flex items-center gap-2 text-gray-500 hover:text-gold-400 transition-colors text-sm">
                                    <Phone className="w-4 h-4 text-gold-500" />
                                    +{shopPhone}
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${shopEmail}`} className="flex items-center gap-2 text-gray-500 hover:text-gold-400 transition-colors text-sm">
                                    <Mail className="w-4 h-4 text-gold-500" />
                                    {shopEmail}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* WhatsApp */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Connect</h4>
                        <a
                            href={generateWhatsAppLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-600/20 text-green-400 px-4 py-3 rounded-xl hover:bg-green-600/30 transition-all text-sm font-medium border border-green-600/20"
                        >
                            <MessageCircle className="w-5 h-5" />
                            {t('contact.whatsapp')}
                        </a>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800/50 text-center text-gray-600 text-sm">
                    © {new Date().getFullYear()} {shopName}. {t('footer.rights')}
                </div>
            </div>
        </footer>
    );
}
