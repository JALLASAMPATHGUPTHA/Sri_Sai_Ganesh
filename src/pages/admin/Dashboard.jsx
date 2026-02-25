import { useTranslation } from 'react-i18next';
import { Package, MessageSquare, Eye, TrendingUp } from 'lucide-react';
import { useAdminProducts, useAnalytics } from '../../hooks/useProducts';

export default function Dashboard() {
    const { t } = useTranslation();
    const { data: products = [] } = useAdminProducts();
    const { data: analytics = {} } = useAnalytics();

    const stats = [
        { icon: Package, label: t('admin.totalProducts'), value: products.length, color: 'gold' },
        { icon: MessageSquare, label: t('admin.totalInquiries'), value: analytics.totalInquiries || 0, color: 'blue' },
        { icon: Eye, label: t('admin.totalViews'), value: analytics.totalViews || 0, color: 'green' },
        { icon: TrendingUp, label: t('admin.todayViews'), value: analytics.todayViews || 0, color: 'purple' },
    ];

    const colorClasses = {
        gold: 'bg-gold-500/10 text-gold-400 border-gold-500/20',
        blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        green: 'bg-green-500/10 text-green-400 border-green-500/20',
        purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    };

    return (
        <div>
            <h1 className="text-2xl font-heading font-bold text-white mb-6">{t('admin.dashboard')}</h1>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className={`card p-6 border ${colorClasses[color]}`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">{value}</div>
                                <div className="text-xs text-gray-500">{label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Products */}
            <div className="card p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Recent Products</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 text-gray-500 font-medium">Product</th>
                                <th className="text-left py-3 text-gray-500 font-medium">Material</th>
                                <th className="text-left py-3 text-gray-500 font-medium">Weight</th>
                                <th className="text-left py-3 text-gray-500 font-medium">Views</th>
                                <th className="text-left py-3 text-gray-500 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.slice(0, 5).map((p) => (
                                <tr key={p.id} className="border-b border-gray-800/50 hover:bg-white/[0.02]">
                                    <td className="py-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={p.image_urls?.[0] || ''}
                                                alt=""
                                                className="w-8 h-8 rounded-lg object-cover bg-gray-800"
                                            />
                                            <span className="text-white">{p.name_en}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 text-gray-400 capitalize">{p.material}</td>
                                    <td className="py-3 text-gray-400">{p.weight_grams}g</td>
                                    <td className="py-3 text-gray-400">{p.views || 0}</td>
                                    <td className="py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.is_visible
                                                ? 'bg-green-500/10 text-green-400'
                                                : 'bg-red-500/10 text-red-400'
                                            }`}>
                                            {p.is_visible ? t('admin.visible') : t('admin.hidden')}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
