import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useProducts, useCategories } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

export default function Catalog() {
    const { t, i18n } = useTranslation();
    const [search, setSearch] = useState('');
    const [material, setMaterial] = useState('');
    const [purity, setPurity] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [weightRange, setWeightRange] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const { data: products = [], isLoading } = useProducts({ search: search || undefined });
    const { data: categories = [] } = useCategories();

    const lang = i18n.language;

    const filtered = useMemo(() => {
        return products.filter((p) => {
            if (material && p.material !== material) return false;
            if (purity && p.purity !== purity) return false;
            if (categoryId && p.category_id !== Number(categoryId)) return false;
            if (weightRange) {
                const [min, max] = weightRange.split('-').map(Number);
                if (p.weight_grams < min || (max && p.weight_grams > max)) return false;
            }
            return true;
        });
    }, [products, material, purity, categoryId, weightRange]);

    const hasActiveFilters = material || purity || categoryId || weightRange;

    const clearFilters = () => {
        setMaterial('');
        setPurity('');
        setCategoryId('');
        setWeightRange('');
        setSearch('');
    };

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-heading font-bold text-white">
                        {t('catalog.title')}
                    </h1>
                    <p className="mt-2 text-gray-500">
                        {filtered.length} items
                    </p>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={t('catalog.search')}
                            className="input-field pl-11"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all ${showFilters || hasActiveFilters
                            ? 'bg-gold-500/10 border-gold-500/30 text-gold-400'
                            : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600'
                            }`}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        {t('catalog.filters')}
                        {hasActiveFilters && (
                            <span className="w-2 h-2 rounded-full bg-gold-400" />
                        )}
                    </button>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <div className="glass p-6 mb-8 animate-fade-in">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Material */}
                            <div>
                                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">{t('catalog.material')}</label>
                                <select value={material} onChange={(e) => setMaterial(e.target.value)} className="input-field text-sm">
                                    <option value="">{t('catalog.all')}</option>
                                    <option value="gold">{t('common.gold')}</option>
                                    <option value="silver">{t('common.silver')}</option>
                                </select>
                            </div>

                            {/* Purity */}
                            <div>
                                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">{t('catalog.purity')}</label>
                                <select value={purity} onChange={(e) => setPurity(e.target.value)} className="input-field text-sm">
                                    <option value="">{t('catalog.all')}</option>
                                    <option value="24K">24K</option>
                                    <option value="22K">22K</option>
                                    <option value="18K">18K</option>
                                    <option value="92.5%">92.5% Silver</option>
                                </select>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">{t('catalog.category')}</label>
                                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="input-field text-sm">
                                    <option value="">{t('catalog.all')}</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat[`name_${lang}`] || cat.name_en}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Weight */}
                            <div>
                                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">{t('catalog.weight')}</label>
                                <select value={weightRange} onChange={(e) => setWeightRange(e.target.value)} className="input-field text-sm">
                                    <option value="">{t('catalog.all')}</option>
                                    <option value="0-10">0-10g</option>
                                    <option value="10-25">10-25g</option>
                                    <option value="25-50">25-50g</option>
                                    <option value="50-999">50g+</option>
                                </select>
                            </div>
                        </div>

                        {hasActiveFilters && (
                            <button onClick={clearFilters} className="mt-4 flex items-center gap-1 text-sm text-gold-400 hover:text-gold-300 transition-colors">
                                <X className="w-3 h-3" />
                                {t('catalog.clearFilters')}
                            </button>
                        )}
                    </div>
                )}

                {/* Products Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="card overflow-hidden animate-pulse">
                                <div className="aspect-square bg-gray-800" />
                                <div className="p-4 space-y-2">
                                    <div className="h-4 bg-gray-800 rounded w-3/4" />
                                    <div className="h-3 bg-gray-800 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">{t('catalog.noProducts')}</p>
                        <button onClick={clearFilters} className="mt-4 btn-secondary text-sm">
                            {t('catalog.clearFilters')}
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                        {filtered.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
