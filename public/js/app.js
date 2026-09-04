const product = window.product;
const qty = document.querySelector('#qty');
const wa = document.querySelector('#wa');
if (product && qty && wa) {
  const update = () => {
    const quantity = Math.max(1, Number.parseInt(qty.value || '1', 10));
    qty.value = String(quantity);
    const message = `Bonjour, je suis intéressé(e) par ${product.name} à ${new Intl.NumberFormat('fr-FR').format(product.price)} FCFA. Quantité : ${quantity}. Est-il disponible ?`;
    wa.href = `https://wa.me/${product.number}?text=${encodeURIComponent(message)}`;
  };
  qty.addEventListener('input', update);
  update();
}
