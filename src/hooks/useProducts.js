import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { mockProducts, mockCategories } from '../data/mockData';

// ---- Products ----
export const useProducts = (filters = {}) => {
    return useQuery({
        queryKey: ['products', filters],
        queryFn: async () => {
            if (!isSupabaseConfigured()) return mockProducts;

            let query = supabase
                .from('products')
                .select('*')
                .eq('is_visible', true)
                .order('created_at', { ascending: false });

            if (filters.category_id) query = query.eq('category_id', filters.category_id);
            if (filters.material) query = query.eq('material', filters.material);
            if (filters.purity) query = query.eq('purity', filters.purity);
            if (filters.search) query = query.or(`name_en.ilike.%${filters.search}%,name_te.ilike.%${filters.search}%,name_hi.ilike.%${filters.search}%`);
            if (filters.minWeight) query = query.gte('weight_grams', filters.minWeight);
            if (filters.maxWeight) query = query.lte('weight_grams', filters.maxWeight);

            const { data, error } = await query;
            if (error) throw error;
            return data;
        },
        placeholderData: mockProducts,
    });
};

export const useProduct = (id) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            if (!isSupabaseConfigured()) return mockProducts.find(p => p.id === Number(id));

            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();
            if (error) throw error;
            return data;
        },
        enabled: !!id,
    });
};

// ---- Categories ----
export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            if (!isSupabaseConfigured()) return mockCategories;

            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('name_en');
            if (error) throw error;
            return data;
        },
        placeholderData: mockCategories,
    });
};

// ---- Admin: All Products (incl. hidden) ----
export const useAdminProducts = () => {
    return useQuery({
        queryKey: ['adminProducts'],
        queryFn: async () => {
            if (!isSupabaseConfigured()) return mockProducts;

            const { data, error } = await supabase
                .from('products')
                .select('*, categories(name_en)')
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data;
        },
    });
};

// ---- Admin: Mutations ----
export const useCreateProduct = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (product) => {
            const { data, error } = await supabase.from('products').insert(product).select().single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['products'] });
            qc.invalidateQueries({ queryKey: ['adminProducts'] });
        },
    });
};

export const useUpdateProduct = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updates }) => {
            const { data, error } = await supabase.from('products').update(updates).eq('id', id).select().single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['products'] });
            qc.invalidateQueries({ queryKey: ['adminProducts'] });
        },
    });
};

export const useDeleteProduct = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['products'] });
            qc.invalidateQueries({ queryKey: ['adminProducts'] });
        },
    });
};

// ---- Categories mutations ----
export const useCreateCategory = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (category) => {
            const { data, error } = await supabase.from('categories').insert(category).select().single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ['categories'] }),
    });
};

export const useDeleteCategory = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { error } = await supabase.from('categories').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ['categories'] }),
    });
};

// ---- Analytics ----
export const useTrackEvent = () => {
    return useMutation({
        mutationFn: async ({ product_id, event }) => {
            if (!isSupabaseConfigured()) return;
            await supabase.from('analytics').insert({ product_id, event });
        },
    });
};

export const useAnalytics = () => {
    return useQuery({
        queryKey: ['analytics'],
        queryFn: async () => {
            if (!isSupabaseConfigured()) {
                return { totalViews: 1527, todayViews: 42, totalInquiries: 18 };
            }
            const { data: views } = await supabase.from('analytics').select('id', { count: 'exact' }).eq('event', 'view');
            const today = new Date().toISOString().split('T')[0];
            const { data: todayViews } = await supabase.from('analytics').select('id', { count: 'exact' }).eq('event', 'view').gte('created_at', today);
            const { count: inquiryCount } = await supabase.from('inquiries').select('id', { count: 'exact', head: true });
            return {
                totalViews: views?.length || 0,
                todayViews: todayViews?.length || 0,
                totalInquiries: inquiryCount || 0,
            };
        },
    });
};

// ---- Inquiries ----
export const useInquiries = () => {
    return useQuery({
        queryKey: ['inquiries'],
        queryFn: async () => {
            if (!isSupabaseConfigured()) return [];
            const { data, error } = await supabase
                .from('inquiries')
                .select('*, products(name_en)')
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data;
        },
    });
};

// ---- Image Upload ----
export const uploadProductImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error } = await supabase.storage.from('product-images').upload(filePath, file);
    if (error) throw error;

    const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
    return data.publicUrl;
};
