import { useTranslation } from 'react-i18next';
import { Mail, Phone, MessageCircle, Clock } from 'lucide-react';
import { useInquiries } from '../../hooks/useProducts';

export default function Inquiries() {
    const { t } = useTranslation();
    const { data: inquiries = [] } = useInquiries();

    return (
        <div>
            <h1 className="text-2xl font-heading font-bold text-white mb-6">{t('admin.inquiries')}</h1>

            {inquiries.length === 0 ? (
                <div className="card p-12 text-center">
                    <MessageCircle className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                    <p className="text-gray-500">No inquiries yet</p>
                    <p className="text-gray-600 text-sm mt-1">Inquiries from WhatsApp and contact form will appear here</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {inquiries.map((inq) => (
                        <div key={inq.id} className="card p-5">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <span className="text-white font-medium">{inq.name}</span>
                                    {inq.products?.name_en && (
                                        <span className="text-gold-400 text-sm ml-2">— {inq.products.name_en}</span>
                                    )}
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${inq.channel === 'whatsapp'
                                        ? 'bg-green-500/10 text-green-400'
                                        : 'bg-blue-500/10 text-blue-400'
                                    }`}>
                                    {inq.channel || 'email'}
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm mb-3">{inq.message}</p>
                            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                                {inq.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{inq.email}</span>}
                                {inq.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{inq.phone}</span>}
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {new Date(inq.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
