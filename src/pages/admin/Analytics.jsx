import { useTranslation } from 'react-i18next';
import { BarChart3, Eye, MousePointer, MessageSquare } from 'lucide-react';
import { useAdminProducts } from '../../hooks/useProducts';

export default function Analytics() {
    const { t } = useTranslation();
    const { data: products = [] } = useAdminProducts();

    const topProducts = [...products]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 10);

    const totalViews = products.reduce((sum, p) => sum + (p.views || 0), 0);
    const maxViews = Math.max(...products.map(p => p.views || 0), 1);

    return (
        <div>
            <h1 className="text-2xl font-heading font-bold text-white mb-6">{t('admin.analytics')}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
                <div className="card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <Eye className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">{totalViews}</div>
                        <div className="text-xs text-gray-500">Total Product Views</div>
                    </div>
                </div>
                <div className="card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center">
                        <MousePointer className="w-6 h-6 text-gold-400" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">{products.length}</div>
                        <div className="text-xs text-gray-500">Products Listed</div>
                    </div>
                </div>
                <div className="card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">
                            {totalViews > 0 ? Math.round(totalViews / products.length) : 0}
                        </div>
                        <div className="text-xs text-gray-500">Avg Views/Product</div>
                    </div>
                </div>
            </div>

            {/* Top Products by Views */}
            <div className="card p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Top Products by Views</h2>
                <div className="space-y-4">
                    {topProducts.map((p, i) => (
                        <div key={p.id} className="flex items-center gap-4">
                            <span className="text-gray-600 font-mono text-sm w-6">{i + 1}</span>
                            <img src={p.image_urls?.[0] || ''} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-800" />
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-white text-sm font-medium">{p.name_en}</span>
                                    <span className="text-gray-500 text-xs">{p.views || 0} views</span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gold-gradient rounded-full transition-all duration-500"
                                        style={{ width: `${((p.views || 0) / maxViews) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
