import { useTranslation } from 'react-i18next';
import { Shield, Award, Sparkles, Heart, Star, CheckCircle } from 'lucide-react';

export default function About() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white">
                        {t('about.title')}
                    </h1>
                    <div className="w-20 h-1 bg-gold-gradient mx-auto mt-4 rounded-full" />
                </div>

                {/* Story */}
                <div className="glass p-8 lg:p-12 mb-12">
                    <div className="max-w-3xl mx-auto text-center">
                        <Heart className="w-10 h-10 text-gold-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">{t('about.story')}</h2>
                        <p className="text-gray-400 leading-relaxed text-lg">{t('about.storyText')}</p>
                    </div>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {[
                        { icon: Shield, title: t('about.quality'), text: t('about.qualityText'), color: 'gold' },
                        { icon: Award, title: t('about.craftsmanship'), text: t('about.craftsmanshipText'), color: 'blue' },
                        { icon: Sparkles, title: t('about.trust'), text: t('about.trustText'), color: 'green' },
                    ].map(({ icon: Icon, title, text }, i) => (
                        <div key={i} className="card p-8 group hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-4 group-hover:bg-gold-500/20 transition-colors">
                                <Icon className="w-7 h-7 text-gold-400" />
                            </div>
                            <h3 className="text-white font-semibold text-lg mb-3">{title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="glass p-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                        {[
                            { value: '30+', label: 'Years of Trust' },
                            { value: '10,000+', label: 'Happy Customers' },
                            { value: '5,000+', label: 'Unique Designs' },
                            { value: '100%', label: 'BIS Hallmarked' },
                        ].map(({ value, label }, i) => (
                            <div key={i}>
                                <div className="text-3xl font-bold text-gradient">{value}</div>
                                <div className="text-sm text-gray-500 mt-1">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Certifications */}
                <div className="mt-16 text-center">
                    <h2 className="text-2xl font-heading font-bold text-white mb-8">Our Certifications</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['BIS Hallmark', 'ISO 9001', 'Jewellers Association', 'Trust Verified'].map((cert) => (
                            <div key={cert} className="flex items-center gap-2 bg-gold-500/5 border border-gold-500/10 px-5 py-3 rounded-xl">
                                <CheckCircle className="w-4 h-4 text-gold-400" />
                                <span className="text-sm text-gray-300">{cert}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
