const PEARL_PRODUCTS = [
  {
    id:"robe-selene", name:"Robe Sélène", category:"Femme", price:85000,
    image:"robe-selene.svg", badge:"Signature",
    description:"Une silhouette fluide et contemporaine pensée pour les rendez-vous où l'élégance parle d'elle-même.",
    sizes:["S","M","L","XL"], colors:["Noir","Ivoire"]
  },
  {
    id:"adire-nuit", name:"Robe Adire Nuit", category:"Femme", price:95000,
    image:"adire-nuit.svg", badge:"Nouvelle",
    description:"Une pièce inspirée de l'indigo africain, équilibrant caractère culturel et lignes modernes.",
    sizes:["S","M","L","XL"], colors:["Indigo","Noir"]
  },
  {
    id:"boubou-oria", name:"Boubou Oria", category:"Femme", price:110000,
    image:"boubou-oria.svg", badge:"Édition",
    description:"Un volume majestueux, des détails sobres et une présence pensée pour les grandes occasions.",
    sizes:["M","L","XL","2XL"], colors:["Sable","Or"]
  },
  {
    id:"kente-prestige", name:"Ensemble Kente Prestige", category:"Femme", price:120000,
    image:"kente-prestige.svg", badge:"Best-seller",
    description:"Le tissage africain rencontre une construction contemporaine pour une allure sophistiquée.",
    sizes:["S","M","L","XL"], colors:["Kente"]
  },
  {
    id:"ensemble-lagos", name:"Ensemble Lagos", category:"Homme", price:115000,
    image:"ensemble-lagos.svg", badge:"Signature",
    description:"Un ensemble casual-luxe inspiré du rythme urbain africain, avec une coupe nette et confortable.",
    sizes:["M","L","XL","2XL"], colors:["Noir","Beige"]
  },
  {
    id:"kaftan-heritage", name:"Kaftan Heritage", category:"Homme", price:105000,
    image:"kaftan-heritage.svg", badge:"Classique",
    description:"Une interprétation moderne du kaftan, conçue pour une élégance discrète et intemporelle.",
    sizes:["M","L","XL","2XL"], colors:["Ivoire","Noir"]
  },
  {
    id:"boubou-souverain", name:"Boubou Souverain", category:"Homme", price:135000,
    image:"boubou-souverain.svg", badge:"Prestige",
    description:"Une pièce cérémonielle au volume maîtrisé et aux finitions premium.",
    sizes:["L","XL","2XL","3XL"], colors:["Noir","Or"]
  },
  {
    id:"chemise-neo-wax", name:"Chemise Néo-Wax", category:"Homme", price:65000,
    image:"chemise-neo-wax.svg", badge:"Nouveau",
    description:"Une chemise contemporaine qui apporte une touche graphique inspirée du wax.",
    sizes:["S","M","L","XL"], colors:["Wax"]
  },
  {
    id:"ceinture-atelier", name:"Ceinture Atelier", category:"Accessoires", price:30000,
    image:"ceinture-atelier.svg", badge:"Essentiel",
    description:"Un accessoire minimaliste pour signer une silhouette PEARL avec subtilité.",
    sizes:["Unique"], colors:["Noir","Cognac"]
  },
  {
    id:"pochette-signature", name:"Pochette Signature", category:"Accessoires", price:25000,
    image:"pochette-signature.svg", badge:"Essentiel",
    description:"Une pochette élégante pour apporter la dernière touche à une tenue de caractère.",
    sizes:["Unique"], colors:["Noir","Ivoire"]
  }
];

const formatPrice = value => new Intl.NumberFormat("fr-FR").format(value) + " FCFA";
const getProduct = id => PEARL_PRODUCTS.find(product => product.id === id);
