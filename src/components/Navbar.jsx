import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Gem, Globe } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
    const { t } = useTranslation();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => setIsOpen(false), [location]);

    const links = [
        { to: '/', label: t('nav.home') },
        { to: '/catalog', label: t('nav.catalog') },
        { to: '/about', label: t('nav.about') },
        { to: '/contact', label: t('nav.contact') },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-gray-950/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-gold-500/10'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    <Link to="/" className="flex items-center gap-2 lg:gap-3 group">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gold-gradient flex items-center justify-center shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform">
                            <Gem className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                        </div>
                        <div>
                            <span className="font-heading font-bold text-gradient text-[16px] lg:text-xl leading-tight block whitespace-nowrap">
                                {t('shop.name')}
                            </span>
                            <span className="block text-[9px] lg:text-[10px] text-gray-500 tracking-widest uppercase mt-0.5">
                                Since 2022
                            </span>
                        </div>
                    </Link>
                    <div className="hidden lg:flex items-center gap-1">
                        {links.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.to)
                                    ? 'text-gold-400 bg-gold-500/10'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="hidden lg:flex items-center gap-3">
                        <LanguageSwitcher />
                        <Link
                            to="/admin/login"
                            className="text-sm text-gray-500 hover:text-gold-400 transition-colors px-3 py-2"
                        >
                            {t('nav.admin')}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 text-gray-400 hover:text-white"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="bg-gray-950/98 backdrop-blur-xl border-t border-gray-800/50 px-4 py-4 space-y-1">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive(link.to)
                                ? 'text-gold-400 bg-gold-500/10'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="flex items-center justify-between px-4 pt-3 border-t border-gray-800/50 mt-3">
                        <LanguageSwitcher />
                        <Link
                            to="/admin/login"
                            className="text-sm text-gray-500 hover:text-gold-400 transition-colors"
                        >
                            {t('nav.admin')}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
