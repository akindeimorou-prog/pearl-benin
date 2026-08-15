function productCard(product){
  return `
    <article class="product-card reveal">
      <a class="product-visual" href="produit.html?id=${product.id}">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </a>
      <div class="product-info">
        <div class="product-meta">${product.category}</div>
        <h3><a href="produit.html?id=${product.id}">${product.name}</a></h3>
        <div class="product-bottom">
          <strong>${formatPrice(product.price)}</strong>
          <button class="quick-add" type="button" data-add="${product.id}" aria-label="Ajouter ${product.name}">+</button>
        </div>
      </div>
    </article>`;
}

function bindAddButtons(scope=document){
  scope.querySelectorAll("[data-add]").forEach(button => {
    button.onclick = () => addToCart(button.dataset.add);
  });
}

function initMobileMenu(){
  const button = document.querySelector("[data-menu]");
  const nav = document.querySelector(".navlinks");
  if(!button || !nav) return;
  button.onclick = () => {
    nav.classList.toggle("open");
    button.setAttribute("aria-expanded", nav.classList.contains("open"));
  };
}

function initShop(){
  const grid = document.querySelector("[data-products]");
  if(!grid) return;

  let category = "Tous";
  let search = "";

  const draw = () => {
    let products = PEARL_PRODUCTS;
    if(category !== "Tous") products = products.filter(p => p.category === category);
    if(search) products = products.filter(p => `${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase()));

    grid.innerHTML = products.length
      ? products.map(productCard).join("")
      : `<div class="empty-search"><h2>Aucune pièce trouvée.</h2><p>Essayez une autre recherche ou catégorie.</p></div>`;

    bindAddButtons(grid);
    reveal();
  };

  document.querySelectorAll("[data-filter]").forEach(button => {
    button.onclick = () => {
      document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      category = button.dataset.filter;
      draw();
    };
  });

  const searchInput = document.querySelector("[data-search]");
  if(searchInput){
    searchInput.oninput = e => { search = e.target.value.trim(); draw(); };
  }
  draw();
}

function initHome(){
  const grid = document.querySelector("[data-featured]");
  if(!grid) return;
  grid.innerHTML = PEARL_PRODUCTS.slice(0,4).map(productCard).join("");
  bindAddButtons(grid);
}

function initProduct(){
  const root = document.querySelector("[data-product-detail]");
  if(!root) return;

  const id = new URLSearchParams(location.search).get("id");
  const product = getProduct(id) || PEARL_PRODUCTS[0];

  root.innerHTML = `
    <div class="product-gallery">
      <div class="product-detail-image"><img src="${product.image}" alt="${product.name}"></div>
    </div>
    <div class="product-detail-copy">
      <div class="eyebrow">${product.category} · ${product.badge || "PEARL"}</div>
      <h1>${product.name}</h1>
      <div class="detail-price">${formatPrice(product.price)}</div>
      <p class="detail-description">${product.description}</p>
      <div class="option-block">
        <label for="size">Taille</label>
        <select id="size">${product.sizes.map(s => `<option>${s}</option>`).join("")}</select>
      </div>
      <div class="option-block">
        <label for="color">Couleur</label>
        <select id="color">${product.colors.map(c => `<option>${c}</option>`).join("")}</select>
      </div>
      <div class="detail-actions">
        <button class="btn btn-dark btn-full" id="detail-add">Ajouter au panier</button>
        <a class="btn btn-ghost btn-full" href="boutique.html">Retour à la boutique</a>
      </div>
      <div class="product-promise">
        <span>01</span><div><strong>Confection & sélection</strong><p>Une esthétique africaine contemporaine, pensée avec exigence.</p></div>
      </div>
      <div class="product-promise">
        <span>02</span><div><strong>Commande personnalisée</strong><p>Contactez PEARL pour les demandes de taille ou de finition.</p></div>
      </div>
    </div>`;

  document.querySelector("#detail-add").onclick = () => {
    addToCart(product.id,1,document.querySelector("#size").value,document.querySelector("#color").value);
  };
}

function initContact(){
  const form = document.querySelector("[data-contact-form]");
  if(!form) return;
  form.onsubmit = e => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "";
    const message = data.get("message") || "";
    const text = encodeURIComponent(`Bonjour PEARL,\n\nJe suis ${name}.\n\n${message}`);
    window.open(`https://wa.me/?text=${text}`,"_blank","noopener");
  };
}

function reveal(){
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el,index) => {
    setTimeout(() => el.classList.add("is-visible"), Math.min(index * 45, 300));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initHome();
  initShop();
  initProduct();
  initContact();
  updateCartCount();
  reveal();
});
