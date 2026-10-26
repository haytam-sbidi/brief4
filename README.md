# AutoPark — Starter apprenant

Projet individuel · 5 jours · HTML / CSS / JavaScript Vanilla ES6+

## Ce qui est fourni

- `voitures.html` : la page **Gestion du parc**, sans images.
- `css/style.css` : le style complet et responsive.
- `js/data.js` : six voitures fictives sous forme de tableau d'objets exporté.
- `js/voitures.js` : point d'entrée JavaScript avec des étapes, sans implémentation.

Le formulaire, la recherche, les filtres et les boutons sont **statiques**.
Les six lignes du tableau sont uniquement des exemples HTML. Elles correspondent
aux données fournies et doivent être remplacées par votre affichage JavaScript.
Aucune fonctionnalité JavaScript du brief n'est réalisée dans ce starter.

## Lancer le projet

1. Ouvrir le dossier dans VS Code.
2. Démarrer un serveur local avec Live Server, puis ouvrir `voitures.html`.
3. Autre possibilité, si Python est installé : `python -m http.server 8000`,
   puis ouvrir `http://localhost:8000/voitures.html`.

Un serveur local est nécessaire pour travailler avec les modules ES6.
La racine du serveur ne contient pas encore de page `index.html` : ouvrir
explicitement `voitures.html` au démarrage.

## La seconde page est à créer

Le lien « Dashboard » pointe vers `index.html`. **Ce fichier n'est pas fourni** :
c'est votre deuxième mission. Tant que vous ne l'avez pas créé, ce lien ne mène
pas à une page existante.

Créer sa structure HTML, son CSS et son JavaScript. Afficher quatre compteurs :
total, disponibles, louées et en maintenance. Lire les mêmes données que la page
de gestion. Aucun graphique ni bibliothèque de graphiques n'est nécessaire.

## Travail JavaScript à réaliser

1. Importer les données initiales et générer les lignes du tableau.
2. Ajouter une voiture et valider les champs.
3. Modifier une voiture via le même formulaire et permettre l'annulation.
4. Supprimer après confirmation.
5. Combiner recherche, filtres et tri numérique des prix.
6. Sauvegarder avec `localStorage` et JSON ; récupérer les données au chargement.
7. Organiser les responsabilités dans des modules réutilisables.
8. Réaliser le dashboard et vérifier les données sur les deux pages.

Utiliser les données initiales uniquement en l'absence de sauvegarde. Un tableau
vide sauvegardé doit rester vide. Les compteurs sont actualisés à l'ouverture
ou au rechargement du dashboard.

## Repères du HTML

| Élément | Sélecteur |
| --- | --- |
| Formulaire | `#formulaire-voiture` |
| Identifiant en cours de modification | `#voiture-id` |
| Titre du formulaire | `#titre-formulaire` |
| Marque / modèle | `#marque` / `#modele` |
| Immatriculation | `#immatriculation` |
| Catégorie / statut | `#categorie` / `#statut` |
| Prix | `#prix-jour` |
| Bouton d'enregistrement | `#bouton-enregistrer` |
| Annulation de la modification | `#annuler-modification` |
| Message du formulaire | `#message-formulaire` |
| Corps du tableau | `#liste-voitures` |
| Recherche | `#recherche` |
| Filtres | `#filtre-statut` / `#filtre-categorie` |
| Tri | `#tri-prix` |
| Réinitialisation | `#reinitialiser-filtres` |
| Message de gestion | `#message-parc` |
| État vide / texte | `#etat-vide` / `#texte-etat-vide` |

Les boutons de démonstration portent `data-action="modifier"` ou
`data-action="supprimer"`, et `data-id` indique l'identifiant de la voiture.
Conserver ces repères lors de la génération dynamique si vous les utilisez.

Les éléments de message d'erreur sont déjà placés sous les champs, par exemple
`#erreur-marque` et `#erreur-prix-jour`. Ajouter `aria-invalid="true"` aux champs
invalides et le retirer après correction. Le formulaire utilise `novalidate`
pour vous laisser développer vos propres vérifications JavaScript.

Retirer ou remettre l'attribut `hidden` pour contrôler l'état vide et le bouton
d'annulation. Les classes `success` et `error` peuvent être appliquées aux messages.

Styles de statut disponibles : `.badge-disponible`, `.badge-louee`,
`.badge-maintenance`, avec la classe commune `.badge`.

Le tableau défile horizontalement dans sa propre zone sur les petits écrans.
Le reste de la page reste adapté à la largeur de l'écran.

## À vérifier avant de rendre

- Ajout valide et refus des champs vides ou composés uniquement d'espaces.
- Prix positif et immatriculation unique, y compris lors d'une modification.
- Annulation et confirmation des actions.
- Recherche, filtres et tri utilisés ensemble.
- Conservation des données après rechargement, même quand le parc est vide.
- Exactitude des quatre compteurs et navigation entre les deux pages.
- Utilisation sur mobile et absence d'erreurs dans la console.

Compléter ensuite ce README avec vos choix, les fonctionnalités réalisées,
l'organisation de vos modules et le lien de déploiement.
