export const formatPrice = (price) => {
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(price);
  return formattedPrice;
};
