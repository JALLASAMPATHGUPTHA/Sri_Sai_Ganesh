// Demo data used when Supabase is not configured
export const mockCategories = [];

export const mockProducts = [];

// Mock live rates (INR per gram)
export const mockRates = {
    gold: {
        '24K': 7250,
        '22K': 6650,
        '18K': 5440,
    },
    silver: {
        '92.5%': 92,
        '99.9%': 95,
    },
    lastUpdated: new Date().toISOString(),
};

export const calculatePrice = (material, purity, weightGrams, rates) => {
    if (!rates) return null;
    let ratePerGram = 0;
    if (material === 'gold') {
        ratePerGram = rates.gold?.[purity] || rates.gold?.['22K'] || 6650;
    } else {
        ratePerGram = rates.silver?.[purity] || rates.silver?.['92.5%'] || 92;
    }
    return Math.round(ratePerGram * weightGrams);
};

export const formatPrice = (amount) => {
    if (!amount) return '—';
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};
