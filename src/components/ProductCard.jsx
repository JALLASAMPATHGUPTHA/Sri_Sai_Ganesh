import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye } from 'lucide-react';
import { useLiveRates } from '../hooks/useLiveRates';
import { calculatePrice, formatPrice } from '../data/mockData';

export default function ProductCard({ product }) {
    const { t, i18n } = useTranslation();
    const { data: rates } = useLiveRates();

    const lang = i18n.language;
    const name = product[`name_${lang}`] || product.name_en;
    const price = calculatePrice(product.material, product.purity, product.weight_grams, rates);

    return (
        <Link to={`/product/${product.id}`} className="card group overflow-hidden block">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={product.image_urls?.[0] || 'https://images.unsplash.com/photo-1515562141589-67f0d569b8e9?w=400&h=400&fit=crop'}
                    alt={name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Material badge */}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${product.material === 'gold'
                        ? 'bg-gold-500/90 text-white'
                        : 'bg-gray-300/90 text-gray-900'
                    }`}>
                    {product.material === 'gold' ? t('common.gold') : t('common.silver')}
                </div>

                {/* Purity badge */}
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-gray-900/80 text-gray-300 border border-gray-700/50 backdrop-blur-sm">
                    {product.purity}
                </div>

                {/* View button on hover */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="flex items-center justify-center gap-2 bg-gold-500/90 text-white py-2.5 rounded-xl text-sm font-semibold backdrop-blur-sm">
                        <Eye className="w-4 h-4" />
                        {t('catalog.viewDetails')}
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="p-4">
                <h3 className="text-white font-semibold text-sm lg:text-base truncate group-hover:text-gold-400 transition-colors">
                    {name}
                </h3>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-500 text-xs">
                        {product.weight_grams}{t('catalog.grams')}
                    </span>
                    <span className="price-tag text-xs">
                        {formatPrice(price)}
                    </span>
                </div>
            </div>
        </Link>
    );
}
