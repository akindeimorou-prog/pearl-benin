const CART_KEY="pearl_cart";
function getCart(){try{return JSON.parse(localStorage.getItem(CART_KEY))||[]}catch(e){return[]}}
function saveCart(c){localStorage.setItem(CART_KEY,JSON.stringify(c));updateCartCount()}
function addToCart(id,size){const c=getCart();const item=c.find(x=>x.id===id&&x.size===size);if(item)item.qty++;else c.push({id,size,qty:1});saveCart(c);alert("Pièce ajoutée au panier.");}
function removeFromCart(i){const c=getCart();c.splice(i,1);saveCart(c);renderCart()}
function updateCartCount(){document.querySelectorAll(".cart-count").forEach(e=>e.textContent=getCart().reduce((s,x)=>s+x.qty,0))}
function cartTotal(){return getCart().reduce((s,x)=>{const p=PRODUCTS.find(p=>p.id===x.id);return s+(p?p.price*x.qty:0)},0)}
function formatPrice(n){return new Intl.NumberFormat("fr-FR").format(n)+" FCFA"}
function renderCart(){const el=document.getElementById("cart");if(!el)return;const c=getCart();if(!c.length){el.innerHTML='<div class="empty"><h2>Votre panier est vide.</h2><a class="btn" href="boutique.html">Découvrir la boutique</a></div>';return}
let rows=c.map((x,i)=>{const p=PRODUCTS.find(p=>p.id===x.id);return `<div class="cart-row"><div><strong>${p.name}</strong><small>${x.size} · ${x.qty} × ${formatPrice(p.price)}</small></div><strong>${formatPrice(p.price*x.qty)}</strong><button onclick="removeFromCart(${i})">Retirer</button></div>`}).join("");
const msg=encodeURIComponent("Bonjour PEARL, je souhaite commander :\n"+c.map(x=>{const p=PRODUCTS.find(p=>p.id===x.id);return `• ${p.name} — taille ${x.size} × ${x.qty} — ${formatPrice(p.price*x.qty)}`}).join("\n")+`\nTotal : ${formatPrice(cartTotal())}`);
el.innerHTML=`<div class="cart-box">${rows}<div class="cart-total"><span>Total</span><strong>${formatPrice(cartTotal())}</strong></div><a class="btn" target="_blank" href="${SITE.whatsapp}?text=${msg}">Commander sur WhatsApp</a></div>`}
