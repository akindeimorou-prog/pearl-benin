import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { db } from "./firebase-config.js";

const localProducts = window.PEARL_PRODUCTS || [];

function normalizeProduct(data, documentId) {
  const fallback = localProducts.find(product => product.id === documentId);

  return {
    id: data.id || documentId,
    name: data.name || fallback?.name || "Produit Pearl",
    category: data.category || fallback?.category || "Femme",
    price: Number(data.price ?? fallback?.price ?? 0),
    image: data.imageUrl || fallback?.image || "",
    badge: data.badge || fallback?.badge || "",
    description:
      data.description ||
      fallback?.description ||
      "Une pièce de la collection Pearl Bénin.",
    sizes:
      Array.isArray(data.sizes) && data.sizes.length
        ? data.sizes
        : fallback?.sizes || [],
    colors:
      Array.isArray(data.colors) && data.colors.length
        ? data.colors
        : fallback?.colors || [],
    stock: Number(data.stock ?? fallback?.stock ?? 0),
    active: data.active !== false
  };
}

async function loadProducts() {
  try {
    const productsRef = collection(db, "products");

    const productsQuery = query(
      productsRef,
      where("active", "==", true)
    );

    const snapshot = await getDocs(productsQuery);

    if (snapshot.empty) {
      console.warn(
        "Aucun produit actif trouvé dans Firestore. Utilisation du catalogue local."
      );

      return localProducts;
    }

    return snapshot.docs.map(doc =>
      normalizeProduct(doc.data(), doc.id)
    );
  } catch (error) {
    console.error(
      "Impossible de récupérer les produits Firestore :",
      error
    );

    return localProducts;
  }
}

function formatProductPrice(price) {
  if (typeof window.formatPrice === "function") {
    return window.formatPrice(price);
  }

  return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
}

function addProductToCart(id, quantity = 1, size = "", color = "") {
  if (typeof window.addToCart === "function") {
    window.addToCart(id, quantity, size, color);
    return;
  }

  console.warn("La fonction du panier est indisponible.");
}

function updateCart() {
  if (typeof window.updateCartCount === "function") {
    window.updateCartCount();
  }
}

function productCard(product) {
  return `
    <article class="product-card reveal">

      <a
        class="product-visual"
        href="produit.html?id=${encodeURIComponent(product.id)}"
      >
        ${
          product.badge
            ? `<span class="product-badge">${product.badge}</span>`
            : ""
        }

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >
      </a>

      <div class="product-info">

        <div class="product-meta">
          ${product.category}
        </div>

        <h3>
          <a href="produit.html?id=${encodeURIComponent(product.id)}">
            ${product.name}
          </a>
        </h3>

        <div class="product-bottom">

          <strong>
            ${formatProductPrice(product.price)}
          </strong>

          <button
            class="quick-add"
            type="button"
            data-add="${product.id}"
            aria-label="Ajouter ${product.name}"
          >
            +
          </button>

        </div>

      </div>

    </article>
  `;
}

function bindAddButtons(scope = document) {
  scope.querySelectorAll("[data-add]").forEach(button => {
    button.onclick = () => {
      addProductToCart(button.dataset.add);
    };
  });
}

function initMobileMenu() {
  const button = document.querySelector("[data-menu]");
  const nav = document.querySelector(".navlinks");

  if (!button || !nav) return;

  button.onclick = () => {
    nav.classList.toggle("open");

    button.setAttribute(
      "aria-expanded",
      nav.classList.contains("open")
    );
  };
}

async function initShop(products) {
  const grid = document.querySelector("[data-products]");

  if (!grid) return;

  let category = "Tous";
  let search = "";

  const draw = () => {
    let filteredProducts = [...products];

    if (category !== "Tous") {
      filteredProducts = filteredProducts.filter(
        product => product.category === category
      );
    }

    if (search) {
      const searchText = search.toLowerCase();

      filteredProducts = filteredProducts.filter(product =>
        `${product.name} ${product.category} ${product.description}`
          .toLowerCase()
          .includes(searchText)
      );
    }

    grid.innerHTML = filteredProducts.length
      ? filteredProducts.map(productCard).join("")
      : `
        <div class="empty-search">
          <h2>Aucune pièce trouvée.</h2>
          <p>
            Essayez une autre recherche ou une autre catégorie.
          </p>
        </div>
      `;

    bindAddButtons(grid);

    reveal();
  };

  document.querySelectorAll("[data-filter]").forEach(button => {
    button.onclick = () => {
      document
        .querySelectorAll("[data-filter]")
        .forEach(item => item.classList.remove("active"));

      button.classList.add("active");

      category = button.dataset.filter;

      draw();
    };
  });

  const searchInput = document.querySelector("[data-search]");

  if (searchInput) {
    searchInput.oninput = event => {
      search = event.target.value.trim();

      draw();
    };
  }

  draw();
}

async function initHome(products) {
  const grid = document.querySelector("[data-featured]");

  if (!grid) return;

  grid.innerHTML = products
    .slice(0, 4)
    .map(productCard)
    .join("");

  bindAddButtons(grid);

  reveal();
}

async function initProduct(products) {
  const root = document.querySelector("[data-product-detail]");

  if (!root) return;

  const id = new URLSearchParams(location.search).get("id");

  const product =
    products.find(item => item.id === id) ||
    products[0];

  if (!product) {
    root.innerHTML = `
      <div class="empty-search">
        <h2>Produit introuvable.</h2>
        <a class="btn" href="boutique.html">
          Retour à la boutique
        </a>
      </div>
    `;

    return;
  }

  const sizes = product.sizes.length
    ? product.sizes
    : ["Unique"];

  const colors = product.colors.length
    ? product.colors
    : ["Standard"];

  root.innerHTML = `
    <div class="product-gallery">

      <div class="product-detail-image">
        <img
          src="${product.image}"
          alt="${product.name}"
        >
      </div>

    </div>

    <div class="product-detail-copy">

      <div class="eyebrow">
        ${product.category}
        ${product.badge ? ` · ${product.badge}` : ""}
      </div>

      <h1>${product.name}</h1>

      <div class="detail-price">
        ${formatProductPrice(product.price)}
      </div>

      <p class="detail-description">
        ${product.description}
      </p>

      <div class="option-block">

        <label for="size">
          Taille
        </label>

        <select id="size">
          ${sizes.map(size => `<option>${size}</option>`).join("")}
        </select>

      </div>

      <div class="option-block">

        <label for="color">
          Couleur
        </label>

        <select id="color">
          ${colors.map(color => `<option>${color}</option>`).join("")}
        </select>

      </div>

      <div class="detail-actions">

        <button
          class="btn btn-dark btn-full"
          id="detail-add"
        >
          Ajouter au panier
        </button>

        <a
          class="btn btn-ghost btn-full"
          href="boutique.html"
        >
          Retour à la boutique
        </a>

      </div>

      <div class="product-promise">
        <span>01</span>

        <div>
          <strong>
            Confection & sélection
          </strong>

          <p>
            Une esthétique africaine contemporaine,
            pensée avec exigence.
          </p>
        </div>
      </div>

      <div class="product-promise">
        <span>02</span>

        <div>
          <strong>
            Commande personnalisée
          </strong>

          <p>
            Contactez PEARL pour les demandes
            de taille ou de finition.
          </p>
        </div>
      </div>

    </div>
  `;

  document.querySelector("#detail-add").onclick = () => {
    const size = document.querySelector("#size").value;
    const color = document.querySelector("#color").value;

    addProductToCart(
      product.id,
      1,
      size,
      color
    );
  };
}

function initContact() {
  const form = document.querySelector("[data-contact-form]");

  if (!form) return;

  form.onsubmit = event => {
    event.preventDefault();

    const data = new FormData(form);

    const name = data.get("name") || "";
    const message = data.get("message") || "";

    const text = encodeURIComponent(
      `Bonjour PEARL Bénin,\n\nJe suis ${name}.\n\n${message}`
    );

    window.open(
      `https://wa.me/?text=${text}`,
      "_blank",
      "noopener"
    );
  };
}

function reveal() {
  document
    .querySelectorAll(".reveal:not(.is-visible)")
    .forEach((element, index) => {
      setTimeout(
        () => element.classList.add("is-visible"),
        Math.min(index * 45, 300)
      );
    });
}

async function initApp() {
  updateCart();

  initMobileMenu();

  initContact();

  const products = await loadProducts();

  await initHome(products);

  await initShop(products);

  await initProduct(products);

  updateCart();

  reveal();
}

document.addEventListener(
  "DOMContentLoaded",
  initApp
);
