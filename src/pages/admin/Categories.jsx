import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCategories, useCreateCategory, useDeleteCategory } from '../../hooks/useProducts';
import { isSupabaseConfigured } from '../../lib/supabase';
import { translateText } from '../../lib/translate';

export default function Categories() {
    const { t } = useTranslation();
    const { data: categories = [] } = useCategories();
    const createCategory = useCreateCategory();
    const deleteCategory = useDeleteCategory();
    const [form, setForm] = useState({ name_en: '', name_te: '', name_hi: '', slug: '' });
    const [showAdd, setShowAdd] = useState(false);

    const handleAutoTranslate = async (sourceLang) => {
        const text = form[`name_${sourceLang}`];
        if (!text) return;

        const targetLangs = ['en', 'te', 'hi'].filter(l => l !== sourceLang);
        const updates = {};

        for (const targetLang of targetLangs) {
            if (!form[`name_${targetLang}`]) {
                const translationReady = toast.loading(`Translating name to ${targetLang.toUpperCase()}...`);
                try {
                    const translated = await translateText(text, sourceLang, targetLang);
                    if (translated) updates[`name_${targetLang}`] = translated;
                    toast.dismiss(translationReady);
                } catch {
                    toast.dismiss(translationReady);
                }
            }
        }

        if (Object.keys(updates).length > 0) {
            setForm(f => ({ ...f, ...updates }));
            toast.success('Auto-translated category name');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isSupabaseConfigured()) { toast.error('Configure Supabase first'); return; }
        try {
            await createCategory.mutateAsync({
                ...form,
                slug: form.slug || form.name_en.toLowerCase().replace(/\s+/g, '-'),
            });
            toast.success('Category created');
            setForm({ name_en: '', name_te: '', name_hi: '', slug: '' });
            setShowAdd(false);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm(t('admin.deleteConfirm'))) return;
        try {
            await deleteCategory.mutateAsync(id);
            toast.success('Category deleted');
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-heading font-bold text-white">{t('admin.categories')}</h1>
                <button onClick={() => setShowAdd(!showAdd)} className="btn-primary text-sm flex items-center gap-2">
                    <Plus className="w-4 h-4" /> {t('admin.addCategory')}
                </button>
            </div>

            {showAdd && (
                <form onSubmit={handleSubmit} className="card p-6 mb-6 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        {['en', 'te', 'hi'].map(lang => (
                            <div key={lang}>
                                <label className="block text-xs text-gray-500 mb-1">Name ({lang.toUpperCase()})</label>
                                <input
                                    required={lang === 'en'}
                                    value={form[`name_${lang}`]}
                                    onChange={e => setForm(f => ({ ...f, [`name_${lang}`]: e.target.value }))}
                                    onBlur={() => handleAutoTranslate(lang)}
                                    className="input-field text-sm"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        <button type="submit" className="btn-primary text-sm">{t('admin.save')}</button>
                        <button type="button" onClick={() => setShowAdd(false)} className="btn-secondary text-sm">{t('admin.cancel')}</button>
                    </div>
                </form>
            )}

            <div className="card overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-800 bg-gray-900/50">
                            <th className="text-left p-4 text-gray-500 font-medium">English</th>
                            <th className="text-left p-4 text-gray-500 font-medium hidden sm:table-cell">Telugu</th>
                            <th className="text-left p-4 text-gray-500 font-medium hidden sm:table-cell">Hindi</th>
                            <th className="text-left p-4 text-gray-500 font-medium">Slug</th>
                            <th className="text-right p-4 text-gray-500 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat) => (
                            <tr key={cat.id} className="border-b border-gray-800/50 hover:bg-white/[0.02]">
                                <td className="p-4 text-white">{cat.name_en}</td>
                                <td className="p-4 text-gray-400 hidden sm:table-cell">{cat.name_te}</td>
                                <td className="p-4 text-gray-400 hidden sm:table-cell">{cat.name_hi}</td>
                                <td className="p-4 text-gray-500 font-mono text-xs">{cat.slug}</td>
                                <td className="p-4 text-right">
                                    <button onClick={() => handleDelete(cat.id)} className="p-2 text-gray-500 hover:text-red-400 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
