// Demo data used when Supabase is not configured
export const mockCategories = [
    { id: 1, name_en: 'Necklaces', name_te: 'హారాలు', name_hi: 'हार', slug: 'necklaces' },
    { id: 2, name_en: 'Bangles', name_te: 'గాజులు', name_hi: 'चूड़ियाँ', slug: 'bangles' },
    { id: 3, name_en: 'Earrings', name_te: 'చెవి పోగులు', name_hi: 'झुमके', slug: 'earrings' },
    { id: 4, name_en: 'Rings', name_te: 'ఉంగరాలు', name_hi: 'अंगूठी', slug: 'rings' },
    { id: 5, name_en: 'Chains', name_te: 'చెయిన్లు', name_hi: 'चेन', slug: 'chains' },
    { id: 6, name_en: 'Pendants', name_te: 'లాకెట్లు', name_hi: 'लॉकेट', slug: 'pendants' },
    { id: 7, name_en: 'Anklets', name_te: 'కడియాలు', name_hi: 'पायल', slug: 'anklets' },
    { id: 8, name_en: 'Bracelets', name_te: 'బ్రేస్‌లెట్లు', name_hi: 'कंगन', slug: 'bracelets' },
];

export const mockProducts = [
    {
        id: 1,
        category_id: 1,
        name_en: 'Royal Temple Necklace',
        name_te: 'రాయల్ టెంపుల్ నెక్లెస్',
        name_hi: 'रॉयल टेम्पल नेकलेस',
        description_en: 'Intricately designed temple necklace with traditional motifs. Perfect for weddings and festive occasions.',
        description_te: 'సాంప్రదాయ మోటిఫ్‌లతో సంక్లిష్టంగా రూపొందించిన టెంపుల్ నెక్లెస్. పెళ్లిళ్లు మరియు పండుగ సందర్భాలకు అద్భుతం.',
        description_hi: 'पारंपरिक रूपांकनों के साथ जटिल रूप से डिज़ाइन किया गया मंदिर हार। शादियों और त्योहारों के लिए एकदम सही।',
        material: 'gold',
        purity: '22K',
        weight_grams: 45,
        image_urls: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop'],
        is_visible: true,
        views: 234,
        created_at: '2024-01-15T10:00:00Z',
    },
    {
        id: 2,
        category_id: 2,
        name_en: 'Classic Gold Bangles Set',
        name_te: 'క్లాసిక్ గోల్డ్ గాజుల సెట్',
        name_hi: 'क्लासिक गोल्ड बैंगल्स सेट',
        description_en: 'Set of 4 elegant gold bangles with delicate filigree work. A timeless addition to your jewelry collection.',
        description_te: 'సున్నితమైన ఫిలిగ్రీ పనితో 4 సొగసైన బంగారు గాజుల సెట్. మీ ఆభరణాల సేకరణకు కాలాతీత చేర్పు.',
        description_hi: 'नाजुक तारकशी काम के साथ 4 सुंदर सोने की चूड़ियों का सेट। आपके आभूषण संग्रह में कालातीत जोड़।',
        material: 'gold',
        purity: '22K',
        weight_grams: 32,
        image_urls: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop'],
        is_visible: true,
        views: 187,
        created_at: '2024-01-20T10:00:00Z',
    },
    {
        id: 3,
        category_id: 3,
        name_en: 'Diamond Jhumka Earrings',
        name_te: 'డైమండ్ జుంకా చెవి పోగులు',
        name_hi: 'डायमंड झुमका इयररिंग्स',
        description_en: 'Stunning jhumka earrings with precious stone embellishments. Traditional design meets modern elegance.',
        description_te: 'విలువైన రాతి అలంకారాలతో అద్భుతమైన జుంకా చెవి పోగులు. సాంప్రదాయ డిజైన్ ఆధునిక సొగసును కలుస్తుంది.',
        description_hi: 'कीमती पत्थर की सजावट के साथ शानदार झुमका इयररिंग्स। पारंपरिक डिजाइन आधुनिक सुंदरता से मिलता है।',
        material: 'gold',
        purity: '18K',
        weight_grams: 12,
        image_urls: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop'],
        is_visible: true,
        views: 156,
        created_at: '2024-02-01T10:00:00Z',
    },
    {
        id: 4,
        category_id: 4,
        name_en: 'Solitaire Gold Ring',
        name_te: 'సొలిటైర్ గోల్డ్ రింగ్',
        name_hi: 'सॉलिटेयर गोल्ड रिंग',
        description_en: 'Elegant solitaire ring in 18K gold. Perfect for engagements and special moments.',
        description_te: '18K బంగారంలో సొగసైన సొలిటైర్ రింగ్. నిశ్చితార్థాలు మరియు ప్రత్యేక సందర్భాలకు అద్భుతం.',
        description_hi: '18K सोने में सुंदर सॉलिटेयर रिंग। सगाई और खास पलों के लिए एकदम सही।',
        material: 'gold',
        purity: '18K',
        weight_grams: 6,
        image_urls: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop'],
        is_visible: true,
        views: 320,
        created_at: '2024-02-05T10:00:00Z',
    },
    {
        id: 5,
        category_id: 5,
        name_en: 'Thick Rope Gold Chain',
        name_te: 'మందపాటి రోప్ గోల్డ్ చెయిన్',
        name_hi: 'मोटी रोप गोल्ड चेन',
        description_en: 'Bold and luxurious rope-style gold chain. A statement piece for the discerning gentleman.',
        description_te: 'ధైర్యమైన మరియు విలాసవంతమైన రోప్-స్టైల్ గోల్ డ్ చెయిన్. విచక్షణ గల పురుషుడికి స్టేట్‌మెంట్ ముక్క.',
        description_hi: 'बोल्ड और शानदार रोप-स्टाइल गोल्ड चेन। समझदार सज्जन के लिए स्टेटमेंट पीस।',
        material: 'gold',
        purity: '24K',
        weight_grams: 25,
        image_urls: ['https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=600&fit=crop'],
        is_visible: true,
        views: 98,
        created_at: '2024-02-10T10:00:00Z',
    },
    {
        id: 6,
        category_id: 7,
        name_en: 'Silver Anklet Pair',
        name_te: 'సిల్వర్ కడియాల జత',
        name_hi: 'सिल्वर पायल जोड़ी',
        description_en: 'Beautifully crafted silver anklets with tiny bells. Traditional design with a modern twist.',
        description_te: 'చిన్న గంటలతో అందంగా తయారు చేసిన వెండి కడియాలు. ఆధునిక ట్విస్ట్‌తో సాంప్రదాయ డిజైన్.',
        description_hi: 'छोटी घंटियों के साथ खूबसूरती से तैयार की गई चांदी की पायल। आधुनिक ट्विस्ट के साथ पारंपरिक डिजाइन।',
        material: 'silver',
        purity: '92.5%',
        weight_grams: 50,
        image_urls: ['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop'],
        is_visible: true,
        views: 145,
        created_at: '2024-02-15T10:00:00Z',
    },
    {
        id: 7,
        category_id: 6,
        name_en: 'Gold Lakshmi Pendant',
        name_te: 'గోల్డ్ లక్ష్మి లాకెట్',
        name_hi: 'गोल्ड लक्ष्मी लॉकेट',
        description_en: 'Sacred Goddess Lakshmi pendant in pure gold. Blessed for prosperity and good fortune.',
        description_te: 'స్వచ్ఛమైన బంగారంలో పవిత్రమైన లక్ష్మి దేవి లాకెట్. సమృద్ధి మరియు శుభం కోసం ఆశీర్వదించబడింది.',
        description_hi: 'शुद्ध सोने में पवित्र देवी लक्ष्मी लॉकेट। समृद्धि और सौभाग्य के लिए आशीर्वादित।',
        material: 'gold',
        purity: '22K',
        weight_grams: 8,
        image_urls: ['https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&h=600&fit=crop'],
        is_visible: true,
        views: 275,
        created_at: '2024-02-20T10:00:00Z',
    },
    {
        id: 8,
        category_id: 8,
        name_en: 'Silver Chain Bracelet',
        name_te: 'సిల్వర్ చెయిన్ బ్రేస్‌లెట్',
        name_hi: 'सिल्वर चेन ब्रेसलेट',
        description_en: 'Minimalist sterling silver bracelet. Ideal for daily wear with understated elegance.',
        description_te: 'మినిమలిస్ట్ స్టెర్లింగ్ సిల్వర్ బ్రేస్‌లెట్. సున్నితమైన సొగసుతో रోజూ ధరించడానికి అనువైనది.',
        description_hi: 'मिनिमलिस्ट स्टर्लिंग सिल्वर ब्रेसलेट। सूक्ष्म सुंदरता के साथ दैनिक पहनने के लिए आदर्श।',
        material: 'silver',
        purity: '92.5%',
        weight_grams: 20,
        image_urls: ['https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop'],
        is_visible: true,
        views: 112,
        created_at: '2024-03-01T10:00:00Z',
    },
];

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
