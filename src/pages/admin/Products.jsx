import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';
import {
    useAdminProducts, useCreateProduct, useUpdateProduct,
    useDeleteProduct, useCategories, uploadProductImage,
} from '../../hooks/useProducts';
import { isSupabaseConfigured } from '../../lib/supabase';
import { translateText } from '../../lib/translate';

const emptyForm = {
    name_en: '', name_te: '', name_hi: '',
    description_en: '', description_te: '', description_hi: '',
    material: 'gold', purity: '22K', weight_grams: '',
    category_id: '', image_urls: [], is_visible: true,
};

export default function Products() {
    const { t } = useTranslation();
    const { data: products = [] } = useAdminProducts();
    const { data: categories = [] } = useCategories();
    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct();
    const deleteProduct = useDeleteProduct();

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [uploading, setUploading] = useState(false);

    const openAdd = () => { setForm(emptyForm); setEditingId(null); setShowForm(true); };
    const openEdit = (p) => { setForm(p); setEditingId(p.id); setShowForm(true); };
    const closeForm = () => { setShowForm(false); setEditingId(null); };

    const handleAutoTranslate = async (fieldBase, sourceLang) => {
        const text = form[`${fieldBase}_${sourceLang}`];
        if (!text) return;

        const targetLangs = ['en', 'te', 'hi'].filter(l => l !== sourceLang);
        const updates = {};

        // Show loading optionally, but we can just do it seamlessly
        for (const targetLang of targetLangs) {
            if (!form[`${fieldBase}_${targetLang}`]) {
                const translationReady = toast.loading(`Translating ${fieldBase} to ${targetLang.toUpperCase()}...`);
                try {
                    const translated = await translateText(text, sourceLang, targetLang);
                    if (translated) {
                        updates[`${fieldBase}_${targetLang}`] = translated;
                    }
                    toast.dismiss(translationReady);
                } catch {
                    toast.dismiss(translationReady);
                }
            }
        }

        if (Object.keys(updates).length > 0) {
            setForm(f => ({ ...f, ...updates }));
            toast.success(`Auto-translated ${fieldBase}`);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!isSupabaseConfigured()) {
            toast.error('Configure Supabase to upload images');
            return;
        }
        setUploading(true);
        try {
            const url = await uploadProductImage(file);
            setForm(f => ({ ...f, image_urls: [...(f.image_urls || []), url] }));
            toast.success('Image uploaded');
        } catch (err) {
            toast.error('Upload failed: ' + err.message);
        }
        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isSupabaseConfigured()) {
            toast.error('Configure Supabase to manage products');
            return;
        }
        try {
            const payload = {
                ...form,
                weight_grams: Number(form.weight_grams),
                category_id: Number(form.category_id),
            };
            delete payload.categories;
            if (editingId) {
                await updateProduct.mutateAsync({ id: editingId, ...payload });
                toast.success('Product updated');
            } else {
                await createProduct.mutateAsync(payload);
                toast.success('Product created');
            }
            closeForm();
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm(t('admin.deleteConfirm'))) return;
        try {
            await deleteProduct.mutateAsync(id);
            toast.success('Product deleted');
        } catch (err) {
            toast.error(err.message);
        }
    };

    const toggleVisibility = async (p) => {
        if (!isSupabaseConfigured()) return;
        await updateProduct.mutateAsync({ id: p.id, is_visible: !p.is_visible });
        toast.success(p.is_visible ? 'Product hidden' : 'Product visible');
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-heading font-bold text-white">{t('admin.products')}</h1>
                <button onClick={openAdd} className="btn-primary text-sm flex items-center gap-2">
                    <Plus className="w-4 h-4" /> {t('admin.addProduct')}
                </button>
            </div>

            {/* Product Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60" onClick={closeForm} />
                    <div className="relative bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-white">
                                {editingId ? t('admin.editProduct') : t('admin.addProduct')}
                            </h2>
                            <button onClick={closeForm} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Names */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {['en', 'te', 'hi'].map(lang => (
                                    <div key={lang}>
                                        <label className="block text-xs text-gray-500 mb-1">Name ({lang.toUpperCase()})</label>
                                        <input
                                            required={lang === 'en'}
                                            value={form[`name_${lang}`]}
                                            onChange={e => setForm(f => ({ ...f, [`name_${lang}`]: e.target.value }))}
                                            onBlur={() => handleAutoTranslate('name', lang)}
                                            className="input-field text-sm"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Descriptions */}
                            {['en', 'te', 'hi'].map(lang => (
                                <div key={lang}>
                                    <label className="block text-xs text-gray-500 mb-1">Description ({lang.toUpperCase()})</label>
                                    <textarea
                                        rows={2}
                                        value={form[`description_${lang}`]}
                                        onChange={e => setForm(f => ({ ...f, [`description_${lang}`]: e.target.value }))}
                                        onBlur={() => handleAutoTranslate('description', lang)}
                                        className="input-field text-sm resize-none"
                                    />
                                </div>
                            ))}

                            {/* Specs */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Material</label>
                                    <select value={form.material} onChange={e => setForm(f => ({ ...f, material: e.target.value }))} className="input-field text-sm">
                                        <option value="gold">Gold</option>
                                        <option value="silver">Silver</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Purity</label>
                                    <select value={form.purity} onChange={e => setForm(f => ({ ...f, purity: e.target.value }))} className="input-field text-sm">
                                        <option value="24K">24K</option>
                                        <option value="22K">22K</option>
                                        <option value="18K">18K</option>
                                        <option value="92.5%">92.5%</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Weight (g)</label>
                                    <input
                                        type="number"
                                        required
                                        value={form.weight_grams}
                                        onChange={e => setForm(f => ({ ...f, weight_grams: e.target.value }))}
                                        className="input-field text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Category</label>
                                    <select value={form.category_id} onChange={e => setForm(f => ({ ...f, category_id: e.target.value }))} className="input-field text-sm">
                                        <option value="">Select...</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name_en}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-xs text-gray-500 mb-2">Images</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {(form.image_urls || []).map((url, i) => (
                                        <div key={i} className="relative group">
                                            <img src={url} alt="" className="w-16 h-16 rounded-lg object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setForm(f => ({ ...f, image_urls: f.image_urls.filter((_, j) => j !== i) }))}
                                                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <label className="inline-flex items-center gap-2 px-4 py-2 border border-dashed border-gray-700 rounded-xl text-sm text-gray-500 hover:text-gold-400 hover:border-gold-500/30 cursor-pointer transition-colors">
                                    <Upload className="w-4 h-4" />
                                    {uploading ? 'Uploading...' : t('admin.uploadImage')}
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                </label>
                            </div>

                            {/* Visibility */}
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form.is_visible}
                                    onChange={e => setForm(f => ({ ...f, is_visible: e.target.checked }))}
                                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-gold-500 focus:ring-gold-500"
                                />
                                <span className="text-sm text-gray-400">{t('admin.visible')}</span>
                            </label>

                            <div className="flex gap-3 pt-2">
                                <button type="submit" className="btn-primary flex-1">{t('admin.save')}</button>
                                <button type="button" onClick={closeForm} className="btn-secondary flex-1">{t('admin.cancel')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Products Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 bg-gray-900/50">
                                <th className="text-left p-4 text-gray-500 font-medium">Product</th>
                                <th className="text-left p-4 text-gray-500 font-medium hidden sm:table-cell">Material</th>
                                <th className="text-left p-4 text-gray-500 font-medium hidden sm:table-cell">Purity</th>
                                <th className="text-left p-4 text-gray-500 font-medium hidden md:table-cell">Weight</th>
                                <th className="text-left p-4 text-gray-500 font-medium">Status</th>
                                <th className="text-right p-4 text-gray-500 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id} className="border-b border-gray-800/50 hover:bg-white/[0.02]">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={p.image_urls?.[0] || ''} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-800" />
                                            <span className="text-white font-medium">{p.name_en}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-400 capitalize hidden sm:table-cell">{p.material}</td>
                                    <td className="p-4 text-gray-400 hidden sm:table-cell">{p.purity}</td>
                                    <td className="p-4 text-gray-400 hidden md:table-cell">{p.weight_grams}g</td>
                                    <td className="p-4">
                                        <button onClick={() => toggleVisibility(p)} className="group">
                                            {p.is_visible ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-green-500/10 text-green-400">
                                                    <Eye className="w-3 h-3" /> {t('admin.visible')}
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-red-500/10 text-red-400">
                                                    <EyeOff className="w-3 h-3" /> {t('admin.hidden')}
                                                </span>
                                            )}
                                        </button>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button onClick={() => openEdit(p)} className="p-2 text-gray-500 hover:text-blue-400 transition-colors">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-500 hover:text-red-400 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
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
