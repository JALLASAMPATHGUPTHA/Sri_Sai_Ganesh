import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MessageCircle, Scale, Gem, ShieldCheck, Tag } from 'lucide-react';
import { useProduct, useProducts, useTrackEvent } from '../hooks/useProducts';
import { useLiveRates } from '../hooks/useLiveRates';
import { calculatePrice, formatPrice } from '../data/mockData';
import { generateWhatsAppLink } from '../lib/whatsapp';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const { data: product, isLoading } = useProduct(id);
    const { data: products = [] } = useProducts();
    const { data: rates } = useLiveRates();
    const trackEvent = useTrackEvent();

    const lang = i18n.language;

    useEffect(() => {
        if (product?.id) {
            trackEvent.mutate({ product_id: product.id, event: 'view' });
        }
    }, [product?.id]);

    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
                <p className="text-gray-500 text-lg">Product not found</p>
                <Link to="/catalog" className="mt-4 btn-secondary">{t('common.back')}</Link>
            </div>
        );
    }

    const name = product[`name_${lang}`] || product.name_en;
    const description = product[`description_${lang}`] || product.description_en;
    const price = calculatePrice(product.material, product.purity, product.weight_grams, rates);

    const similar = products
        .filter(p => p.id !== product.id && p.material === product.material)
        .slice(0, 4);

    const whatsAppProduct = {
        name: product.name_en,
        material: product.material,
        purity: product.purity,
        weight_grams: product.weight_grams,
    };

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back */}
                <Link to="/catalog" className="inline-flex items-center gap-2 text-gray-500 hover:text-gold-400 transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    {t('common.back')}
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Image */}
                    <div className="card overflow-hidden">
                        <div className="aspect-square">
                            <img
                                src={product.image_urls?.[0] || 'https://images.unsplash.com/photo-1515562141589-67f0d569b8e9?w=800&h=800&fit=crop'}
                                alt={name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                        <div>
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${product.material === 'gold'
                                    ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                                    : 'bg-gray-400/10 text-gray-300 border border-gray-400/20'
                                }`}>
                                <Gem className="w-3 h-3" />
                                {product.material === 'gold' ? t('common.gold') : t('common.silver')}
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-white">{name}</h1>
                        </div>

                        <p className="text-gray-400 leading-relaxed">{description}</p>

                        {/* Specs */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Gem, label: t('product.material'), value: product.material === 'gold' ? t('common.gold') : t('common.silver') },
                                { icon: ShieldCheck, label: t('product.purity'), value: product.purity },
                                { icon: Scale, label: t('product.weight'), value: `${product.weight_grams}g` },
                                { icon: Tag, label: t('product.category'), value: product.category_id },
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Icon className="w-4 h-4 text-gold-500" />
                                        <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
                                    </div>
                                    <span className="text-white font-semibold capitalize">{value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Price */}
                        <div className="glass p-6">
                            <span className="text-xs text-gray-500 uppercase tracking-wider">{t('product.estimatedPrice')}</span>
                            <div className="text-3xl font-bold text-gold-400 mt-1">
                                {formatPrice(price)}
                            </div>
                            <span className="text-xs text-gray-600 mt-1">{t('product.basedOnLive')}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href={generateWhatsAppLink(whatsAppProduct)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackEvent.mutate({ product_id: product.id, event: 'inquiry' })}
                                className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-green-500 transition-all shadow-lg shadow-green-600/20"
                            >
                                <MessageCircle className="w-5 h-5" />
                                {t('product.inquireWhatsApp')}
                            </a>
                            <Link to="/contact" className="flex-1 btn-primary text-center">
                                {t('product.sendInquiry')}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                {similar.length > 0 && (
                    <div className="mt-20">
                        <h2 className="text-2xl font-heading font-bold text-white mb-8">
                            {t('product.similar')}
                        </h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                            {similar.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
