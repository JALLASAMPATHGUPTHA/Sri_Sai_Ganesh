import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Sparkles, MessageCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { useLiveRates } from '../hooks/useLiveRates';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../data/mockData';
import { generateWhatsAppLink } from '../lib/whatsapp';
import ProductCard from '../components/ProductCard';

export default function Home() {
    const { t } = useTranslation();
    const { data: rates } = useLiveRates();
    const { data: products } = useProducts();

    const featured = products?.slice(0, 4) || [];

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-dark-gradient" />
                <div className="absolute inset-0 bg-hero-pattern" />
                <div className="absolute top-20 right-10 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
                            <Sparkles className="w-4 h-4 text-gold-400" />
                            <span className="text-gold-400 text-sm font-medium">Premium Handcrafted Jewelry</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold leading-tight animate-slide-up">
                            <span className="text-white">{t('hero.title')}</span>
                            <br />
                            <span className="text-gradient">{t('hero.subtitle')}</span>
                        </h1>

                        <p className="mt-6 text-lg text-gray-400 max-w-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            {t('hero.description')}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            <Link to="/catalog" className="btn-primary inline-flex items-center gap-2">
                                {t('hero.cta')}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a
                                href={generateWhatsAppLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary inline-flex items-center gap-2"
                            >
                                <MessageCircle className="w-4 h-4" />
                                {t('hero.cta2')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Live Rates Ticker */}
            <section className="relative -mt-16 z-10">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="glass p-6 lg:p-8">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-gold-400" />
                            <h2 className="text-white font-heading font-semibold text-lg">{t('rates.title')}</h2>
                            <span className="ml-auto text-xs text-gray-500">
                                {t('rates.lastUpdated')}: {new Date(rates?.lastUpdated || Date.now()).toLocaleTimeString()}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                            {/* Gold rates */}
                            {['24K', '22K', '18K'].map((purity) => (
                                <div key={purity} className="bg-gold-500/5 border border-gold-500/10 rounded-xl p-4 text-center">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">{t('rates.gold')} {purity}</span>
                                    <div className="text-xl font-bold text-gold-400 mt-1">
                                        {formatPrice(rates?.gold?.[purity])}
                                    </div>
                                    <span className="text-[10px] text-gray-600">{t('rates.perGram')}</span>
                                </div>
                            ))}
                            {/* Silver rates */}
                            {['92.5%', '99.9%'].map((purity) => (
                                <div key={purity} className="bg-gray-400/5 border border-gray-400/10 rounded-xl p-4 text-center">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">{t('rates.silver')} {purity}</span>
                                    <div className="text-xl font-bold text-gray-300 mt-1">
                                        {formatPrice(rates?.silver?.[purity])}
                                    </div>
                                    <span className="text-[10px] text-gray-600">{t('rates.perGram')}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white">
                            Featured <span className="text-gradient">Collection</span>
                        </h2>
                        <p className="mt-3 text-gray-500 max-w-md mx-auto">
                            Explore our finest handcrafted ornaments, curated for elegance
                        </p>
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                        {featured.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link to="/catalog" className="btn-secondary inline-flex items-center gap-2">
                            View Full Collection
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-gray-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Shield, title: t('about.quality'), text: t('about.qualityText') },
                            { icon: Award, title: t('about.craftsmanship'), text: t('about.craftsmanshipText') },
                            { icon: Sparkles, title: t('about.trust'), text: t('about.trustText') },
                        ].map((feature, i) => (
                            <div key={i} className="card p-8 text-center group">
                                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-500/20 transition-colors">
                                    <feature.icon className="w-7 h-7 text-gold-400" />
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
                        Ready to Find Your Perfect <span className="text-gradient">Ornament</span>?
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                        Visit our store or browse our complete collection online. Our experts are ready to help you choose the perfect piece.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/catalog" className="btn-primary inline-flex items-center gap-2">
                            Browse Catalog
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href={generateWhatsAppLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-500 transition-all shadow-lg shadow-green-600/20"
                        >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
