const PEARL_PRODUCTS=[
{id:"robe-selene",name:"Robe Sélène",category:"Femme",price:85000,image:"robe-selene.svg",description:"Silhouette contemporaine aux lignes fluides, pensée pour les occasions élégantes.",sizes:["S","M","L","XL"],colors:["Noir","Ivoire"]},
{id:"adire-nuit",name:"Robe Adire Nuit",category:"Femme",price:95000,image:"adire-nuit.svg",description:"Pièce signature inspirée des motifs indigo africains.",sizes:["S","M","L","XL"],colors:["Indigo","Noir"]},
{id:"boubou-oria",name:"Boubou Oria",category:"Femme",price:110000,image:"boubou-oria.svg",description:"Boubou premium à l'allure majestueuse et minimaliste.",sizes:["M","L","XL","2XL"],colors:["Sable","Or"]},
{id:"kente-prestige",name:"Ensemble Kente Prestige",category:"Femme",price:120000,image:"kente-prestige.svg",description:"Ensemble sophistiqué mêlant lignes contemporaines et tissage africain.",sizes:["S","M","L","XL"],colors:["Kente"]},
{id:"ensemble-lagos",name:"Ensemble Lagos",category:"Homme",price:115000,image:"ensemble-lagos.svg",description:"Ensemble casual chic inspiré de Lagos.",sizes:["M","L","XL","2XL"],colors:["Noir","Beige"]},
{id:"kaftan-heritage",name:"Kaftan Heritage",category:"Homme",price:105000,image:"kaftan-heritage.svg",description:"Kaftan élégant à la coupe nette et raffinée.",sizes:["M","L","XL","2XL"],colors:["Ivoire","Noir"]},
{id:"boubou-souverain",name:"Boubou Souverain",category:"Homme",price:135000,image:"boubou-souverain.svg",description:"Pièce cérémonielle au volume maîtrisé et aux finitions premium.",sizes:["L","XL","2XL","3XL"],colors:["Noir","Or"]},
{id:"chemise-neo-wax",name:"Chemise Néo-Wax",category:"Homme",price:65000,image:"chemise-neo-wax.svg",description:"Chemise moderne avec accents wax.",sizes:["S","M","L","XL"],colors:["Wax"]},
{id:"ceinture-atelier",name:"Ceinture Atelier",category:"Accessoires",price:30000,image:"ceinture-atelier.svg",description:"Accessoire minimaliste pour compléter les silhouettes PEARL.",sizes:["Unique"],colors:["Noir","Cognac"]},
{id:"pochette-signature",name:"Pochette Signature",category:"Accessoires",price:25000,image:"pochette-signature.svg",description:"Pochette élégante pour une finition sophistiquée.",sizes:["Unique"],colors:["Noir","Ivoire"]}
];
const formatPrice=v=>new Intl.NumberFormat("fr-FR").format(v)+" FCFA";
const getProduct=id=>PEARL_PRODUCTS.find(p=>p.id===id);
