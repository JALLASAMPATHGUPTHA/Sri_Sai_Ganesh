export const generateWhatsAppLink = (product = null) => {
    const phone = import.meta.env.VITE_SHOP_PHONE || '9160733036';
    let message = '';

    if (product) {
        const productUrl = `${window.location.origin}/product/${product.id}`;
        message = `Hi! I'm interested in: ${product.name}\n` +
            `Material: ${product.material}\n` +
            `Purity: ${product.purity}\n` +
            `Weight: ${product.weight_grams}g\n` +
            `Product Link: ${productUrl}\n`;

        if (product.image_urls && product.image_urls.length > 0) {
            message += `Image: ${product.image_urls[0]}\n`;
        }

        message += `\nPlease share more details and pricing.`;
    } else {
        message = 'Hi! I would like to inquire about your ornament collection.';
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
