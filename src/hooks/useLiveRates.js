import { useQuery } from '@tanstack/react-query';
import { mockRates } from '../data/mockData';

const TROY_OZ_TO_GRAMS = 31.1035;

const fetchLiveRates = async () => {
    try {
        // Using a reliable open-source currency API for XAU (Gold) and XAG (Silver) rates
        const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json');
        if (!response.ok) throw new Error('API unavailable');
        const data = await response.json();

        // XAU and XAG are priced in Troy Ounces per 1 USD (i.e. 1 USD = x XAU)
        // To get USD per Troy Ounce: 1 / XAU
        const goldUsdPerOz = 1 / data.usd.xau;
        const silverUsdPerOz = 1 / data.usd.xag;
        const usdToInr = data.usd.inr;

        // Convert to INR per gram
        const goldPerGram = (goldUsdPerOz / TROY_OZ_TO_GRAMS) * usdToInr;

        const rates = {
            gold: {
                '24K': Math.round(goldPerGram),
                '22K': Math.round(goldPerGram * 0.916),
                '18K': Math.round(goldPerGram * 0.75),
            },
            silver: {
                '92.5%': Math.round((silverUsdPerOz / TROY_OZ_TO_GRAMS) * usdToInr * 0.925),
                '99.9%': Math.round((silverUsdPerOz / TROY_OZ_TO_GRAMS) * usdToInr),
            },
            lastUpdated: new Date().toISOString(),
        };
        return rates;
    } catch (error) {
        console.warn('Using mock rates:', error.message);
        return mockRates;
    }
};

export const useLiveRates = () => {
    return useQuery({
        queryKey: ['liveRates'],
        queryFn: fetchLiveRates,
        staleTime: 10 * 60 * 1000, // 10 min cache
        refetchInterval: 10 * 60 * 1000,
        placeholderData: mockRates,
    });
};
