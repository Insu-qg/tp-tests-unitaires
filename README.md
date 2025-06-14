# TP Tests Unitaires en JavaScript

Ce projet est un TP sur les tests unitaires en JavaScript, utilisant Jest comme framework de test. Il comprend deux modules principaux avec leurs tests associés.

## 🚀 Installation

```bash
# Cloner le repository
git clone git@github.com:Insu-qg/tp-tests-unitaires.git

# Installer les dépendances
npm install
```

## 📦 Structure du Projet

```
tp-tests-unitaires/
├── utils.js         # Module avec fonctions utilitaires
├── utils.test.js    # Tests des fonctions utilitaires
├── cart.js          # Module de gestion du panier
├── cart.test.js     # Tests du module panier
└── package.json     # Configuration du projet
```

## 🛠️ Modules

### Module Utils

Contient des fonctions utilitaires diverses :

- `sum(a, b)` : Addition de deux nombres
- `isPalindrome(str)` : Vérifie si une chaîne est un palindrome
- `getMax(arr)` : Trouve le maximum dans un tableau
- `capitalize(str)` : Met en majuscule la première lettre
- `divide(a, b)` : Division de deux nombres
- `validateEmail(email)` : Validation complexe d'adresses email

### Module Cart

Système de gestion de panier d'achats avec les fonctionnalités :

- `createCart()` : Création d'un nouveau panier
- `addItem(cart, item)` : Ajout d'articles
- `removeItem(cart, itemId)` : Suppression d'articles
- `applyDiscount(cart, code)` : Application de codes de réduction
- `clearCart(cart)` : Vidage du panier

## 🧪 Tests

### Exécution des Tests

```bash
# Tous les tests
npm test

# Tests spécifiques
npm run utils    # Tests du module utils
npm run cart     # Tests du module cart
```

### Couverture des Tests

Les tests couvrent de nombreux cas :
- Cas nominaux
- Cas limites
- Gestion des erreurs
- Validations complexes

## 📝 Points Clés du TP

1. **Structuration des Tests**
   - Utilisation de `describe` pour grouper les tests
   - Organisation claire avec `beforeEach`
   - Tests paramétrés avec `test.each`

2. **Bonnes Pratiques**
   - Tests isolés et indépendants
   - Nommage explicite des tests
   - Couverture exhaustive des cas
   - Documentation des tests

3. **Validation Email**
   - Validation complexe selon les standards
   - Multiples règles de validation
   - Tests extensifs des cas limites

4. **Gestion du Panier**
   - Manipulation d'état
   - Gestion des quantités
   - Application de réductions
   - Validation des entrées
