import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
];

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const current = languages.find(l => l.code === i18n.language) || languages[0];

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm"
            >
                <Globe className="w-4 h-4 text-gold-400" />
                <span className="text-gray-300">{current.flag} {current.label}</span>
            </button>

            {open && (
                <div className="absolute right-0 bottom-full mb-2 lg:bottom-auto lg:top-full lg:mt-2 w-40 bg-gray-900 border border-gray-700 rounded-xl shadow-xl overflow-hidden animate-fade-in z-50">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => { i18n.changeLanguage(lang.code); setOpen(false); }}
                            className={`w-full flex items-center gap-2 px-4 py-3 text-sm transition-colors ${i18n.language === lang.code
                                ? 'bg-gold-500/10 text-gold-400'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <span>{lang.flag}</span>
                            <span>{lang.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
