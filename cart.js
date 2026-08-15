const CART_KEY = "pearl_cart_v3";

function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch(error){ return []; }
}

function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function cartDetails(){
  return getCart()
    .map(item => ({...item, product:getProduct(item.id)}))
    .filter(item => item.product);
}

function cartSubtotal(){
  return cartDetails().reduce((total,item) => total + item.product.price * item.quantity, 0);
}

function addToCart(id, quantity=1, size="", color=""){
  const product = getProduct(id);
  if(!product) return;

  const selectedSize = size || product.sizes[0];
  const selectedColor = color || product.colors[0];
  const key = `${id}|${selectedSize}|${selectedColor}`;
  const cart = getCart();
  const existing = cart.find(item => item.key === key);

  if(existing) existing.quantity += quantity;
  else cart.push({key,id,quantity,size:selectedSize,color:selectedColor});

  saveCart(cart);
  showToast(`${product.name} a été ajouté au panier.`);
}

function removeFromCart(key){
  saveCart(getCart().filter(item => item.key !== key));
  renderCart();
}

function changeQuantity(key, delta){
  const cart = getCart();
  const item = cart.find(row => row.key === key);
  if(!item) return;
  item.quantity += delta;
  if(item.quantity <= 0){
    removeFromCart(key);
    return;
  }
  saveCart(cart);
  renderCart();
}

function updateCartCount(){
  const count = getCart().reduce((sum,item) => sum + Number(item.quantity || 0), 0);
  document.querySelectorAll("[data-cart-count]").forEach(el => el.textContent = count);
}

function showToast(message){
  let toast = document.querySelector(".toast");
  if(!toast){
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__pearlToast);
  window.__pearlToast = setTimeout(() => toast.classList.remove("show"), 2600);
}

function buildWhatsAppMessage(){
  const lines = ["Bonjour PEARL, je souhaite commander :",""];
  cartDetails().forEach(item => {
    lines.push(`• ${item.product.name} — ${item.quantity} × ${formatPrice(item.product.price)}`);
    lines.push(`  Taille : ${item.size} | Couleur : ${item.color}`);
  });
  lines.push("",`Total : ${formatPrice(cartSubtotal())}`);
  lines.push("","Merci de me confirmer la disponibilité.");
  return encodeURIComponent(lines.join("\n"));
}

function renderCart(){
  const list = document.querySelector("[data-cart-items]");
  const summary = document.querySelector("[data-cart-summary]");
  if(!list || !summary) return;

  const items = cartDetails();

  if(!items.length){
    list.innerHTML = `
      <div class="empty-state">
        <span class="eyebrow">Votre sélection</span>
        <h2>Votre panier est vide.</h2>
        <p>Découvrez les pièces PEARL et composez votre silhouette.</p>
        <a class="btn btn-dark" href="boutique.html">Découvrir la boutique</a>
      </div>`;
    summary.innerHTML = "";
    return;
  }

  list.innerHTML = items.map(item => `
    <article class="cart-item">
      <a class="cart-thumb" href="produit.html?id=${item.id}">
        <img src="${item.product.image}" alt="${item.product.name}">
      </a>
      <div class="cart-item-main">
        <div class="eyebrow">${item.product.category}</div>
        <h3>${item.product.name}</h3>
        <p>Taille ${item.size} · ${item.color}</p>
        <strong>${formatPrice(item.product.price)}</strong>
      </div>
      <div class="qty">
        <button type="button" data-minus="${item.key}" aria-label="Diminuer">−</button>
        <span>${item.quantity}</span>
        <button type="button" data-plus="${item.key}" aria-label="Augmenter">+</button>
      </div>
      <button class="remove" type="button" data-remove="${item.key}">Supprimer</button>
    </article>
  `).join("");

  summary.innerHTML = `
    <div class="summary-card">
      <div class="eyebrow">Résumé</div>
      <h2>Votre commande</h2>
      <div class="summary-line"><span>Sous-total</span><strong>${formatPrice(cartSubtotal())}</strong></div>
      <div class="summary-note">Livraison et modalités de paiement confirmées avec PEARL avant validation.</div>
      <a class="btn btn-gold btn-full" href="https://wa.me/?text=${buildWhatsAppMessage()}" target="_blank" rel="noopener">Commander sur WhatsApp</a>
      <a class="text-link" href="boutique.html">Continuer mes achats →</a>
    </div>`;

  list.querySelectorAll("[data-minus]").forEach(btn => btn.onclick = () => changeQuantity(btn.dataset.minus,-1));
  list.querySelectorAll("[data-plus]").forEach(btn => btn.onclick = () => changeQuantity(btn.dataset.plus,1));
  list.querySelectorAll("[data-remove]").forEach(btn => btn.onclick = () => removeFromCart(btn.dataset.remove));
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
});
